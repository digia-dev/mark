class PrismaQuotationRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(data) {
    const { items, ...quotationData } = data;
    return await this.prisma.quotation.create({
      data: {
        ...quotationData,
        items: {
          create: items.map(item => ({
            product_id: item.product_id,
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount || 0,
            total: item.total
          }))
        }
      },
      include: { items: true }
    });
  }

  async update(id, data) {
    const { items, ...quotationData } = data;
    
    // If items are provided, we update them (re-create for simplicity in this case)
    if (items) {
      await this.prisma.quotationItem.deleteMany({ where: { quotation_id: id } });
      return await this.prisma.quotation.update({
        where: { id },
        data: {
          ...quotationData,
          items: {
            create: items.map(item => ({
              product_id: item.product_id,
              name: item.name,
              description: item.description,
              quantity: item.quantity,
              price: item.price,
              discount: item.discount || 0,
              total: item.total
            }))
          }
        },
        include: { items: true }
      });
    }

    return await this.prisma.quotation.update({
      where: { id },
      data: quotationData,
      include: { items: true }
    });
  }

  async findById(id) {
    return await this.prisma.quotation.findUnique({
      where: { id },
      include: {
        items: true,
        customer: { select: { name: true, email: true, phone: true, address: true } },
        lead: { select: { name: true, company: true, email: true, phone: true } },
        sales: { select: { name: true, email: true } }
      }
    });
  }

  async findAll({ offset, limit, search, status, salesId, customerId, area }) {
    const where = {};
    if (search) {
      where.OR = [
        { quot_number: { contains: search } },
        { customer: { name: { contains: search } } },
        { lead: { name: { contains: search } } }
      ];
    }
    if (status) where.status = status;
    if (salesId) where.sales_id = parseInt(salesId);
    if (customerId) where.customer_id = parseInt(customerId);
    if (area) where.area = area;

    return await this.prisma.quotation.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { created_at: 'desc' },
      include: {
        customer: { select: { name: true } },
        lead: { select: { name: true, company: true } },
        sales: { select: { name: true } }
      }
    });
  }

  async count(whereClause) {
    const where = {};
    const { search, status, salesId, customerId, area } = whereClause;
    
    if (search) {
      where.OR = [
        { quot_number: { contains: search } },
        { customer: { name: { contains: search } } },
        { lead: { name: { contains: search } } }
      ];
    }
    if (status) where.status = status;
    if (salesId) where.sales_id = parseInt(salesId);
    if (customerId) where.customer_id = parseInt(customerId);
    if (area) where.area = area;

    return await this.prisma.quotation.count({ where });
  }

  async getLatestNumber(year) {
    const latest = await this.prisma.quotation.findFirst({
      where: { quot_number: { startsWith: `Q-${year}-` } },
      orderBy: { quot_number: 'desc' },
      select: { quot_number: true }
    });
    return latest ? latest.quot_number : null;
  }

  async updateStatus(id, status, extraData = {}) {
    return await this.prisma.quotation.update({
      where: { id },
      data: {
        status,
        ...extraData
      }
    });
  }

  async delete(id) {
    return await this.prisma.quotation.delete({
      where: { id }
    });
  }
  
  async getStats() {
    const totalCount = await this.prisma.quotation.count();
    const aggregate = await this.prisma.quotation.aggregate({
      _sum: { total: true },
      _avg: { total: true }
    });
    
    const approvedCount = await this.prisma.quotation.count({
      where: { status: 'approved' }
    });
    
    return {
      total: totalCount,
      totalValue: Number(aggregate._sum.total || 0),
      approved: approvedCount,
      conversionRate: totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0,
      averageValue: Math.round(Number(aggregate._avg.total || 0))
    };
  }
}

module.exports = PrismaQuotationRepository;
