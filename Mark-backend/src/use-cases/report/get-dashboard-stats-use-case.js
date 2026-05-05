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
      created_at: {
        gte: start,
        lte: end
      }
    };

    const prevWhereDate = {
      created_at: {
        gte: prevStart,
        lte: prevEnd
      }
    };

    if (salesId && salesId !== 'all') {
      whereDate.sales_id = parseInt(salesId);
      prevWhereDate.sales_id = parseInt(salesId);
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
      salesList
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

    // Mock revenue chart data (as we don't have enough data to group by month properly yet)
    const revenueChart = [
      { name: 'Jan', revenue: 400, target: 500 },
      { name: 'Feb', revenue: 300, target: 500 },
      { name: 'Mar', revenue: 600, target: 500 },
      { name: 'Apr', revenue: 800, target: 1000 },
      { name: 'Mei', revenue: Math.round(rev / 1000000) || 850, target: 1000 },
    ];

    const pipelineFunnel = [
      { stage: 'Prospek', count: 214 },
      { stage: 'Negosiasi', count: 86 },
      { stage: 'Penawaran', count: 54 },
      { stage: 'Closing', count: totalDeals || 12 },
      { stage: 'Instalasi', count: installations || 5 },
    ];

    return {
      statCards: {
        totalCustomers: { value: totalCustomers, trend: calculateTrend(totalCustomers, prevTotalCustomers), isUp: totalCustomers >= prevTotalCustomers },
        revenue: { value: rev, trend: calculateTrend(rev, prevRev), isUp: rev >= prevRev },
        deals: { value: totalDeals, trend: calculateTrend(totalDeals, prevTotalDeals), isUp: totalDeals >= prevTotalDeals },
        activeInstallations: { value: installations, trend: calculateTrend(installations, prevInstallations), isUp: installations >= prevInstallations },
        activeTickets: { value: activeTickets, trend: calculateTrend(activeTickets, prevActiveTickets), isUp: activeTickets <= prevActiveTickets } // For tickets, down is good
      },
      revenueChart,
      pipelineFunnel,
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
        target: 1000000000,
        achieved: rev,
        percentage: Math.min(100, Math.round((rev / 1000000000) * 100))
      }
    };
  }

}

module.exports = GetDashboardStatsUseCase;
