class ImportCustomersUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(customers, userId) {
    let imported = 0;
    let failed = 0;
    const errors = [];

    for (const data of customers) {
      try {
        await this.prisma.customer.create({
          data: {
            customer_code: data.customer_code || `CUS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
            name: data.name,
            type: data.type || 'personal',
            email: data.email || null,
            phone: data.phone,
            address: data.address || null,
            city: data.city || null,
            area: data.area || null,
            status: data.status || 'active',
            sales_id: data.sales_id ? parseInt(data.sales_id) : null
          }
        });
        imported++;
      } catch (err) {
        failed++;
        errors.push({ name: data.name, error: err.message });
      }
    }

    return { imported, failed, errors };
  }
}

module.exports = ImportCustomersUseCase;
