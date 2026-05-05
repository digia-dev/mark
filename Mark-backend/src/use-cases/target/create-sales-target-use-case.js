class CreateSalesTargetUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(userId, data) {
    const { target, month, year, notes } = data;

    // Use upsert to handle create or update
    const salesTarget = await this.prisma.salesTarget.upsert({
      where: {
        user_id_month_year: {
          user_id: userId,
          month: month,
          year: year
        }
      },
      update: {
        target: target,
        notes: notes
      },
      create: {
        user_id: userId,
        month: month,
        year: year,
        target: target,
        notes: notes
      }
    });

    return salesTarget;
  }
}

module.exports = CreateSalesTargetUseCase;
