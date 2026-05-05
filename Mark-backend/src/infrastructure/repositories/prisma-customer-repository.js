class PrismaCustomerRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(customer) {
    return await this.prisma.customer.create({
      data: {
        customer_code: customer.customer_code,
        name: customer.name,
        type: customer.type,
        email: customer.email,
        phone: customer.phone,
        website: customer.website,
        npwp: customer.npwp,
        address: customer.address,
        city: customer.city,
        province: customer.province,
        postal_code: customer.postal_code,
        lat: customer.lat,
        lng: customer.lng,
        area: customer.area,
        sector: customer.sector,
        contact_person: customer.contact_person,
        status: customer.status,
        sales_id: customer.sales_id,
        branch_id: customer.branch_id,
        since_date: customer.since_date,
        notes: customer.notes
      }
    });
  }

  async update(id, data) {
    return await this.prisma.customer.update({
      where: { id },
      data
    });
  }

  async findById(id) {
    return await this.prisma.customer.findUnique({
      where: { id },
      include: {
        sales: { select: { id: true, name: true, avatar: true } },
        interactions: {
          orderBy: { created_at: 'desc' },
          take: 10,
          include: { creator: { select: { name: true, avatar: true } } }
        },
        customer_services: {
          include: { product: { select: { name: true, price: true } } }
        },
        invoices: {
          orderBy: { invoice_date: 'desc' },
          take: 5
        },
        _count: {
          select: { 
            deals: true, 
            quotations: true, 
            installations: true, 
            trouble_tickets: true 
          }
        }
      }
    });
  }

  async findAll({ offset, limit, search, status, type, area, salesId, branchId }) {
    const where = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { customer_code: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } }
      ];
    }
    
    if (status) where.status = status;
    if (type) where.type = type;
    if (area) where.area = area;
    if (salesId) where.sales_id = parseInt(salesId);
    if (branchId) where.branch_id = parseInt(branchId);

    return await this.prisma.customer.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { created_at: 'desc' },
      include: {
        sales: { select: { name: true } }
      }
    });
  }

  async count(whereClause) {
    const where = {};
    const { search, status, type, area, salesId, branchId } = whereClause;

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { customer_code: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } }
      ];
    }
    
    if (status) where.status = status;
    if (type) where.type = type;
    if (area) where.area = area;
    if (salesId) where.sales_id = parseInt(salesId);
    if (branchId) where.branch_id = parseInt(branchId);

    return await this.prisma.customer.count({ where });
  }

  async getLatestCustomerCode(year) {
    const latest = await this.prisma.customer.findFirst({
      where: {
        customer_code: {
          startsWith: `CUS-${year}-`
        }
      },
      orderBy: {
        customer_code: 'desc'
      },
      select: {
        customer_code: true
      }
    });

    return latest ? latest.customer_code : null;
  }
}

module.exports = PrismaCustomerRepository;
