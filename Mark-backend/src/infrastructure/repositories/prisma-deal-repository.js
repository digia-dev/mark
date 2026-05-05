class PrismaDealRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(deal) {
    return await this.prisma.deal.create({
      data: {
        name: deal.name,
        customer_id: deal.customer_id,
        lead_id: deal.lead_id,
        value: deal.value,
        stage: deal.stage,
        probability: deal.probability,
        expected_closing_date: deal.expected_closing_date,
        sales_id: deal.sales_id,
        area: deal.area,
        status: deal.status,
        notes: deal.notes
      }
    });
  }

  async update(id, data) {
    return await this.prisma.deal.update({
      where: { id },
      data
    });
  }

  async findById(id) {
    return await this.prisma.deal.findUnique({
      where: { id },
      include: {
        customer: { select: { id: true, name: true } },
        lead: { select: { id: true, name: true } },
        sales: { select: { id: true, name: true } }
      }
    });
  }

  async findForKanban({ salesId, area, search }) {
    const where = {};
    if (salesId) where.sales_id = parseInt(salesId);
    if (area) where.area = area;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { customer: { name: { contains: search } } },
        { lead: { name: { contains: search } } }
      ];
    }

    return await this.prisma.deal.findMany({
      where,
      orderBy: { updated_at: 'desc' },
      include: {
        customer: { select: { name: true } },
        lead: { select: { name: true } },
        sales: { select: { name: true } }
      }
    });
  }

  async addActivity(dealId, activity) {
    return await this.prisma.dealActivity.create({
      data: {
        deal_id: dealId,
        type: activity.type,
        description: activity.description,
        notes: activity.notes
      }
    });
  }
}

module.exports = PrismaDealRepository;
