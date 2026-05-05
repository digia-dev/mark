class PrismaInvoiceRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(data) {
    return await this.prisma.invoice.create({
      data,
      include: {
        customer: { select: { name: true } }
      }
    });
  }

  async update(id, data) {
    return await this.prisma.invoice.update({
      where: { id },
      data,
      include: {
        customer: { select: { name: true } }
      }
    });
  }

  async findById(id) {
    return await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
        items: true,
        payments: true
      }
    });
  }

  async findAll({ offset, limit, search, status, type }) {
    const where = {};
    if (search) {
      where.OR = [
        { inv_number: { contains: search } },
        { customer: { name: { contains: search } } }
      ];
    }
    if (status) where.status = status;
    if (type) where.type = type;

    return await this.prisma.invoice.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { invoice_date: 'desc' },
      include: {
        customer: { select: { name: true } }
      }
    });
  }

  async count(filters) {
    const where = {};
    const { search, status, type } = filters;
    if (search) {
      where.OR = [
        { inv_number: { contains: search } },
        { customer: { name: { contains: search } } }
      ];
    }
    if (status) where.status = status;
    if (type) where.type = type;

    return await this.prisma.invoice.count({ where });
  }

  async getLatestNumber(year) {
    const latest = await this.prisma.invoice.findFirst({
      where: { inv_number: { startsWith: `INV-${year}-` } },
      orderBy: { inv_number: 'desc' },
      select: { inv_number: true }
    });
    return latest ? latest.inv_number : null;
  }
}

module.exports = PrismaInvoiceRepository;
