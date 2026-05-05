class ExportCustomersUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.type) where.type = filters.type;
    if (filters.area) where.area = filters.area;
    if (filters.sales_id) where.sales_id = parseInt(filters.sales_id);

    const customers = await this.prisma.customer.findMany({
      where,
      include: {
        sales: {
          select: { name: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    return customers.map(c => ({
      'Customer Code': c.customer_code,
      'Name': c.name,
      'Type': c.type,
      'Email': c.email || '',
      'Phone': c.phone,
      'Address': c.address || '',
      'City': c.city || '',
      'Area': c.area || '',
      'Status': c.status,
      'Sales Rep': c.sales ? c.sales.name : '',
      'Registered At': c.created_at.toISOString()
    }));
  }
}

module.exports = ExportCustomersUseCase;
