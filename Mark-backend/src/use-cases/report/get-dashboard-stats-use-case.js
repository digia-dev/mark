class GetDashboardStatsUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute({ startDate, endDate, salesId }) {
    // Basic date parsing (simplified)
    const start = startDate ? new Date(startDate) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = endDate ? new Date(endDate) : new Date();

    const whereDate = {
      created_at: {
        gte: start,
        lte: end
      }
    };

    // Parallel queries
    const [
      totalCustomers,
      totalLeads,
      totalDeals,
      totalRevenue,
      activeTickets,
      recentActivities,
      recentLeads,
      dealsBySales,
      installations
    ] = await Promise.all([
      this.prisma.customer.count(),
      this.prisma.lead.count({ where: whereDate }),
      this.prisma.deal.count({ where: whereDate }),
      this.prisma.invoice.aggregate({
        where: { ...whereDate, status: 'paid' },
        _sum: { total_amount: true }
      }),
      this.prisma.troubleTicket.count({
        where: { status: { not: 'closed' } }
      }),
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
      this.prisma.deal.groupBy({
        by: ['sales_id'],
        _count: { id: true },
        _sum: { value: true },
        where: whereDate
      }),
      this.prisma.installation.count({
        where: { status: 'on-progress' }
      })
    ]);

    // Mocking chart data for now since we don't have enough data in DB yet
    // In a real app, this would be grouped by month/day
    const revenueChart = [
      { name: 'Jan', revenue: 400, target: 500 },
      { name: 'Feb', revenue: 300, target: 500 },
      { name: 'Mar', revenue: 600, target: 500 },
      { name: 'Apr', revenue: 800, target: 1000 },
      { name: 'Mei', revenue: totalRevenue._sum.total_amount || 850, target: 1000 },
    ];

    const pipelineFunnel = [
      { stage: 'Prospek', count: 214 },
      { stage: 'Negosiasi', count: 86 },
      { stage: 'Penawaran', count: 54 },
      { stage: 'Closing', count: totalDeals },
      { stage: 'Instalasi', count: 18 },
    ];

    return {
      statCards: {
        totalCustomers,
        revenue: totalRevenue._sum.total_amount || 0,
        deals: totalDeals,
        activeInstallations: installations,
        activeTickets
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
      targetBulanIni: {
        target: 1000000000,
        achieved: totalRevenue._sum.total_amount || 0,
        percentage: Math.min(100, Math.round(((totalRevenue._sum.total_amount || 0) / 1000000000) * 100))
      }
    };
  }
}

module.exports = GetDashboardStatsUseCase;
