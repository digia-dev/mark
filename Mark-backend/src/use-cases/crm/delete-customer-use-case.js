class DeleteCustomerUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(id) {
    return this.prisma.customer.delete({
      where: { id: parseInt(id) }
    });
  }
}

module.exports = DeleteCustomerUseCase;
