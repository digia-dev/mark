class GlobalSearchUseCase {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async execute(query) {
    if (!query) return { customers: [], leads: [], quotations: [], deals: [] };

    const searchQuery = {
      contains: query,
    };

    // Parallel search across different modules
    const [customers, leads, quotations, deals] = await Promise.all([
      this.prisma.customer.findMany({
        where: {
          OR: [
            { name: searchQuery },
            { customer_code: searchQuery },
            { email: searchQuery },
            { phone: searchQuery },
          ],
        },
        take: 5,
        select: { id: true, name: true, customer_code: true, type: true }
      }),
      this.prisma.lead.findMany({
        where: {
          OR: [
            { name: searchQuery },
            { company: searchQuery },
            { email: searchQuery },
            { phone: searchQuery },
          ],
        },
        take: 5,
        select: { id: true, name: true, company: true, status: true }
      }),
      this.prisma.quotation.findMany({
        where: {
          quot_number: searchQuery,
        },
        take: 5,
        include: {
          customer: { select: { name: true } }
        }
      }),
      this.prisma.deal.findMany({
        where: {
          name: searchQuery,
        },
        take: 5,
        select: { id: true, name: true, value: true, stage: true }
      })
    ]);

    return {
      customers: customers.map(c => ({ 
        id: c.id, 
        name: c.name, 
        code: c.customer_code, 
        type: 'customer' 
      })),
      leads: leads.map(l => ({ 
        id: l.id, 
        name: l.name, 
        company: l.company, 
        type: 'lead' 
      })),
      quotations: quotations.map(q => ({ 
        id: q.id, 
        number: q.quot_number, 
        customer: q.customer?.name || 'Unknown', 
        type: 'quotation' 
      })),
      deals: deals.map(d => ({ 
        id: d.id, 
        name: d.name, 
        value: d.value, 
        type: 'deal' 
      }))
    };
  }
}

module.exports = GlobalSearchUseCase;
