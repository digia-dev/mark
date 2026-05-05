class GetCustomerServicesUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(customerId) {
    return this.prisma.customerService.findMany({
      where: { customer_id: parseInt(customerId) },
      include: {
        product: true
      }
    });
  }
}

module.exports = GetCustomerServicesUseCase;
