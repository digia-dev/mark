class PrismaTroubleTicketRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(data) {
    return await this.prisma.troubleTicket.create({
      data,
      include: {
        customer: { select: { name: true } },
        assignedUser: { select: { name: true } }
      }
    });
  }

  async update(id, data) {
    return await this.prisma.troubleTicket.update({
      where: { id },
      data,
      include: {
        customer: { select: { name: true } },
        assignedUser: { select: { name: true } }
      }
    });
  }

  async findById(id) {
    return await this.prisma.troubleTicket.findUnique({
      where: { id },
      include: {
        customer: true,
        assignedUser: true,
        interactions: { orderBy: { created_at: 'desc' } }
      }
    });
  }

  async findAll({ offset, limit, search, status, priority, area }) {
    const where = {};
    if (search) {
      where.OR = [
        { ticket_number: { contains: search } },
        { title: { contains: search } },
        { customer: { name: { contains: search } } }
      ];
    }
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (area) where.area = area;

    return await this.prisma.troubleTicket.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { created_at: 'desc' },
      include: {
        customer: { select: { name: true } },
        assignedUser: { select: { name: true } }
      }
    });
  }

  async count(filters) {
    const where = {};
    const { search, status, priority, area } = filters;
    if (search) {
      where.OR = [
        { ticket_number: { contains: search } },
        { title: { contains: search } },
        { customer: { name: { contains: search } } }
      ];
    }
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (area) where.area = area;

    return await this.prisma.troubleTicket.count({ where });
  }

  async getLatestNumber(year) {
    const latest = await this.prisma.troubleTicket.findFirst({
      where: { ticket_number: { startsWith: `TT-${year}-` } },
      orderBy: { ticket_number: 'desc' },
      select: { ticket_number: true }
    });
    return latest ? latest.ticket_number : null;
  }
}

module.exports = PrismaTroubleTicketRepository;
