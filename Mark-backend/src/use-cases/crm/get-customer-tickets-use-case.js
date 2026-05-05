class GetCustomerTicketsUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(customerId) {
    return this.prisma.troubleTicket.findMany({
      where: { customer_id: parseInt(customerId) },
      orderBy: { created_at: 'desc' }
    });
  }
}

module.exports = GetCustomerTicketsUseCase;
