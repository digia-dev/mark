class GetCustomerInteractionsUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(customerId) {
    return this.prisma.interaction.findMany({
      where: { customer_id: parseInt(customerId) },
      include: {
        creator: {
          select: { name: true, role: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });
  }
}

module.exports = GetCustomerInteractionsUseCase;
