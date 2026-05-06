class GetDashboardStatsUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute({ startDate, endDate, salesId }) {
    // Basic date parsing
    const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = endDate ? new Date(endDate) : new Date();

    // Calculate duration of current period to get the previous period
    const durationMs = end.getTime() - start.getTime();
    const prevStart = new Date(start.getTime() - durationMs);
    const prevEnd = new Date(start.getTime());

    const whereDate = {
      created_at: { gte: start, lte: end },
      deleted_at: null
    };

    const prevWhereDate = {
      created_at: { gte: prevStart, lte: prevEnd },
      deleted_at: null
    };

    const filterSales = salesId && salesId !== 'all' ? parseInt(salesId) : null;
    if (filterSales) {
      whereDate.sales_id = filterSales;
      prevWhereDate.sales_id = filterSales;
    }

    // Parallel queries for current period
    const [
      totalCustomers,
      prevTotalCustomers,
      totalRevenue,
      prevTotalRevenue,
      totalDeals,
      prevTotalDeals,
      activeTickets,
      prevActiveTickets,
      installations,
      prevInstallations,
      recentActivities,
      recentLeads,
      upcomingTasks,
      salesList,
      revenueByMonth,
      dealsByStage,
      currentTarget
    ] = await Promise.all([
      // Current Stats
      this.prisma.customer.count({ where: whereDate }),
      this.prisma.customer.count({ where: prevWhereDate }),
      
      this.prisma.invoice.aggregate({
        where: { ...whereDate, status: 'paid' },
        _sum: { total: true }
      }),
      this.prisma.invoice.aggregate({
        where: { ...prevWhereDate, status: 'paid' },
        _sum: { total: true }
      }),

      this.prisma.deal.count({ where: whereDate }),
      this.prisma.deal.count({ where: prevWhereDate }),

      this.prisma.troubleTicket.count({
        where: { ...whereDate, status: { not: 'closed' } }
      }),
      this.prisma.troubleTicket.count({
        where: { ...prevWhereDate, status: { not: 'closed' } }
      }),

      this.prisma.installation.count({
        where: { ...whereDate, status: 'on-progress' }
      }),
      this.prisma.installation.count({
        where: { ...prevWhereDate, status: 'on-progress' }
      }),

      // Lists
      this.prisma.activityLog.findMany({
        take: 10,
        orderBy: { created_at: 'desc' },
        include: { user: { select: { name: true } } }
      }),
      this.prisma.lead.findMany({
        where: { deleted_at: null },
        take: 5,
        orderBy: { created_at: 'desc' },
        select: { id: true, name: true, company: true, status: true, created_at: true }
      }),
      this.prisma.interaction.findMany({
        where: {
          next_action_date: { gte: new Date() },
          next_action: { not: null }
        },
        take: 10,
        orderBy: { next_action_date: 'asc' },
        include: { 
          customer: { select: { name: true } },
          lead: { select: { name: true } },
          creator: { select: { name: true } }
        }
      }),
      this.prisma.user.findMany({
        where: { role: 'sales', is_active: true },
        select: { id: true, name: true }
      }),

      // Charts & Grouping
      this.prisma.invoice.groupBy({
        by: ['invoice_date'],
        where: {
          invoice_date: { gte: new Date(new Date().getFullYear(), 0, 1) }, // Since Jan
          status: 'paid',
          deleted_at: null
        },
        _sum: { total: true }
      }),
      this.prisma.deal.groupBy({
        by: ['stage'],
        where: { deleted_at: null },
        _count: { id: true }
      }),
      this.prisma.salesTarget.findFirst({
        where: {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          user_id: filterSales || undefined
        }
      })
    ]);

    // Calculate trends
    const calculateTrend = (current, previous) => {
      if (previous === 0) return current > 0 ? '+100%' : '0%';
      const diff = ((current - previous) / previous) * 100;
      return `${diff > 0 ? '+' : ''}${diff.toFixed(1)}%`;
    };

    const rev = totalRevenue._sum.total || 0;
    const prevRev = prevTotalRevenue._sum.total || 0;

    // Process revenue chart (Group by month)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const monthlyRev = Array(12).fill(0).map((_, i) => ({ name: months[i], revenue: 0, target: 1000 }));
    
    revenueByMonth.forEach(item => {
      const m = new Date(item.invoice_date).getMonth();
      monthlyRev[m].revenue += Math.round(Number(item._sum.total) / 1000000);
    });

    // Process pipeline funnel
    const stages = ['prospek', 'negosiasi', 'penawaran', 'closing', 'instalasi'];
    const funnel = stages.map(s => {
      const found = dealsByStage.find(d => d.stage.toLowerCase() === s);
      return {
        stage: s.charAt(0).toUpperCase() + s.slice(1),
        count: found ? found._count.id : 0
      };
    });

    return {
      statCards: {
        totalCustomers: { value: totalCustomers, trend: calculateTrend(totalCustomers, prevTotalCustomers), isUp: totalCustomers >= prevTotalCustomers },
        revenue: { value: rev, trend: calculateTrend(rev, prevRev), isUp: rev >= prevRev },
        deals: { value: totalDeals, trend: calculateTrend(totalDeals, prevTotalDeals), isUp: totalDeals >= prevTotalDeals },
        activeInstallations: { value: installations, trend: calculateTrend(installations, prevInstallations), isUp: installations >= prevInstallations },
        activeTickets: { value: activeTickets, trend: calculateTrend(activeTickets, prevActiveTickets), isUp: activeTickets <= prevActiveTickets }
      },
      revenueChart: monthlyRev.slice(0, new Date().getMonth() + 1),
      pipelineFunnel: funnel,
      recentActivities: recentActivities.map(log => ({
        id: log.id,
        user: log.user?.name || 'System',
        action: log.action,
        module: log.module,
        time: log.created_at
      })),
      recentLeads,
      upcomingTasks: upcomingTasks.map(task => ({
        id: task.id,
        customer: task.customer?.name || task.lead?.name || 'Unknown',
        task: task.next_action,
        date: task.next_action_date.toISOString().split('T')[0],
        assigned: task.creator?.name || 'System'
      })),
      salesList,
      targetBulanIni: {
        target: Number(currentTarget?.target) || 1000000000,
        achieved: rev,
        percentage: currentTarget ? Math.min(100, Math.round((rev / Number(currentTarget.target)) * 100)) : 0
      }
    };
  }
}

module.exports = GetDashboardStatsUseCase;
