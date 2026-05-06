class GetCustomerStatsUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute() {
    const baseWhere = { deleted_at: null };

    const [total, active, inactive, corporate, personal] = await Promise.all([
      this.prisma.customer.count({ where: baseWhere }),
      this.prisma.customer.count({ where: { ...baseWhere, status: 'active' } }),
      this.prisma.customer.count({ where: { ...baseWhere, status: 'inactive' } }),
      this.prisma.customer.count({ where: { ...baseWhere, type: 'corporate' } }),
      this.prisma.customer.count({ where: { ...baseWhere, type: 'personal' } })
    ]);

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const newThisMonth = await this.prisma.customer.count({
      where: { ...baseWhere, created_at: { gte: startOfMonth } }
    });

    return {
      total,
      active,
      inactive,
      corporate,
      personal,
      new_this_month: newThisMonth
    };
  }
}

module.exports = GetCustomerStatsUseCase;
