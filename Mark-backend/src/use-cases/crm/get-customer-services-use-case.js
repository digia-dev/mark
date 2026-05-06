class GetCustomerServicesUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(customerId) {
    return this.prisma.customerService.findMany({
      where: { customer_id: parseInt(customerId) },
      include: {
        product: {
          select: {
            name: true,
            category: true,
            technology: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });
  }
}

module.exports = GetCustomerServicesUseCase;
