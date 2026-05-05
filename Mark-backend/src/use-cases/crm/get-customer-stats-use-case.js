class GetCustomerStatsUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute() {
    const totalCustomers = await this.prisma.customer.count();
    
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const newThisMonth = await this.prisma.customer.count({
      where: { created_at: { gte: startOfMonth } }
    });

    const activeCustomers = await this.prisma.customer.count({
      where: { status: 'active' }
    });

    const inactiveCustomers = await this.prisma.customer.count({
      where: { status: 'inactive' }
    });
    
    const byType = await this.prisma.customer.groupBy({
      by: ['type'],
      _count: true
    });

    return {
      total: totalCustomers,
      new_this_month: newThisMonth,
      active: activeCustomers,
      inactive: inactiveCustomers,
      by_type: byType
    };
  }
}

module.exports = GetCustomerStatsUseCase;
