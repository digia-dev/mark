class GetSalesTargetUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(userId, month, year) {
    const target = await this.prisma.salesTarget.findUnique({
      where: {
        user_id_month_year: {
          user_id: userId,
          month: month,
          year: year
        }
      }
    });

    if (!target) {
      // Return a default target structure if none exists
      return {
        user_id: userId,
        month: month,
        year: year,
        target: 0,
        achieved: 0,
        percentage: 0
      };
    }

    const percentage = target.target > 0 ? (target.achieved / target.target) * 100 : 0;

    return {
      ...target,
      percentage: Math.round(percentage)
    };
  }
}

module.exports = GetSalesTargetUseCase;
