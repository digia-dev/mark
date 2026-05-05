class PrismaPresentationRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(data) {
    return await this.prisma.productPresentation.create({
      data,
      include: {
        customer: { select: { name: true } },
        user: { select: { name: true } }
      }
    });
  }

  async update(id, data) {
    return await this.prisma.productPresentation.update({
      where: { id },
      data,
      include: {
        customer: { select: { name: true } },
        user: { select: { name: true } }
      }
    });
  }

  async findById(id) {
    return await this.prisma.productPresentation.findUnique({
      where: { id },
      include: {
        customer: true,
        user: true
      }
    });
  }

  async findAll({ offset, limit, search, status, salesId }) {
    const where = {};
    if (search) {
      where.OR = [
        { pres_number: { contains: search } },
        { title: { contains: search } },
        { customer: { name: { contains: search } } }
      ];
    }
    if (status) where.status = status;
    if (salesId) where.sales_id = parseInt(salesId);

    return await this.prisma.productPresentation.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { presentation_date: 'desc' },
      include: {
        customer: { select: { name: true } },
        user: { select: { name: true } }
      }
    });
  }

  async count(filters) {
    const where = {};
    const { search, status, salesId } = filters;
    if (search) {
      where.OR = [
        { pres_number: { contains: search } },
        { title: { contains: search } },
        { customer: { name: { contains: search } } }
      ];
    }
    if (status) where.status = status;
    if (salesId) where.sales_id = parseInt(salesId);

    return await this.prisma.productPresentation.count({ where });
  }

  async getLatestNumber(year) {
    const latest = await this.prisma.productPresentation.findFirst({
      where: { pres_number: { startsWith: `PRES-${year}-` } },
      orderBy: { pres_number: 'desc' },
      select: { pres_number: true }
    });
    return latest ? latest.pres_number : null;
  }
}

module.exports = PrismaPresentationRepository;
