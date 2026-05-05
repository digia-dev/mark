class PrismaPaymentRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(data) {
    return await this.prisma.payment.create({
      data
    });
  }

  async findById(id) {
    return await this.prisma.payment.findUnique({
      where: { id },
      include: { invoice: true }
    });
  }

  async findAll(filters = {}) {
    return await this.prisma.payment.findMany({
      where: filters,
      orderBy: { paid_at: 'desc' }
    });
  }

  async findByInvoiceId(invoiceId) {
    return await this.prisma.payment.findMany({
      where: { invoice_id: invoiceId },
      orderBy: { paid_at: 'desc' }
    });
  }

  async getLatestNumber(year) {
    const latest = await this.prisma.payment.findFirst({
      where: { pay_number: { startsWith: `PAY-${year}-` } },
      orderBy: { pay_number: 'desc' },
      select: { pay_number: true }
    });
    return latest ? latest.pay_number : null;
  }
}

module.exports = PrismaPaymentRepository;
