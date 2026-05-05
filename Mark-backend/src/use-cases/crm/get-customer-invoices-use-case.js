class GetCustomerInvoicesUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(customerId) {
    return this.prisma.invoice.findMany({
      where: { customer_id: parseInt(customerId) },
      orderBy: { created_at: 'desc' }
    });
  }
}

module.exports = GetCustomerInvoicesUseCase;
