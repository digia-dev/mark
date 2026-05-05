class PrismaInvoiceRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(data) {
    const { items, ...rest } = data;
    return await this.prisma.invoice.create({
      data: {
        ...rest,
        items: items ? { create: items } : undefined
      },
      include: {
        customer: { select: { name: true } },
        items: true
      }
    });
  }

  async update(id, data) {
    const { items, ...rest } = data;
    
    return await this.prisma.$transaction(async (tx) => {
      if (items) {
        await tx.invoiceItem.deleteMany({ where: { invoice_id: id } });
        rest.items = { create: items };
      }
      
      return await tx.invoice.update({
        where: { id },
        data: rest,
        include: {
          customer: { select: { name: true } },
          items: true
        }
      });
    });
  }

  async findById(id) {
    return await this.prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
        quotation: { select: { quot_number: true } },
        items: true,
        payments: { orderBy: { paid_at: 'desc' } }
      }
    });
  }

  async findAll({ offset, limit, search, status, customer_id, sales_id }) {
    const where = {};
    if (search) {
      where.OR = [
        { inv_number: { contains: search } },
        { customer: { name: { contains: search } } }
      ];
    }
    if (status) where.status = status;
    if (customer_id) where.customer_id = parseInt(customer_id);
    if (sales_id) where.sales_id = parseInt(sales_id);

    return await this.prisma.invoice.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { created_at: 'desc' },
      include: {
        customer: { select: { name: true } }
      }
    });
  }

  async count(filters) {
    const where = {};
    const { search, status, customer_id, sales_id } = filters;
    if (search) {
      where.OR = [
        { inv_number: { contains: search } },
        { customer: { name: { contains: search } } }
      ];
    }
    if (status) where.status = status;
    if (customer_id) where.customer_id = parseInt(customer_id);
    if (sales_id) where.sales_id = parseInt(sales_id);

    return await this.prisma.invoice.count({ where });
  }

  async delete(id) {
    return await this.prisma.invoice.delete({ where: { id } });
  }

  async getLatestNumber(year) {
    const latest = await this.prisma.invoice.findFirst({
      where: { inv_number: { startsWith: `INV-${year}-` } },
      orderBy: { inv_number: 'desc' },
      select: { inv_number: true }
    });
    return latest ? latest.inv_number : null;
  }

  async updateStatus(id, status, extraData = {}) {
    return await this.prisma.invoice.update({
      where: { id },
      data: { status, ...extraData }
    });
  }

  async getStats() {
    const counts = await this.prisma.invoice.groupBy({
      by: ['status'],
      _count: { id: true }
    });
    
    const totals = await this.prisma.invoice.aggregate({
      _sum: {
        total: true,
        paid_amount: true,
        remaining: true
      }
    });

    const totalInvoices = await this.prisma.invoice.count();

    return {
      total: totalInvoices,
      by_status: counts.reduce((acc, c) => ({ ...acc, [c.status]: c._count.id }), {}),
      financial: {
        total_billed: Number(totals._sum.total || 0),
        total_paid: Number(totals._sum.paid_amount || 0),
        total_remaining: Number(totals._sum.remaining || 0)
      }
    };
  }
}

module.exports = PrismaInvoiceRepository;
