class PrismaLeadRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(lead) {
    return await this.prisma.lead.create({
      data: {
        name: lead.name,
        company: lead.company,
        phone: lead.phone,
        email: lead.email,
        address: lead.address,
        area: lead.area,
        source: lead.source,
        status: lead.status,
        assigned_to: lead.assigned_to,
        notes: lead.notes,
        follow_up_date: lead.follow_up_date
      }
    });
  }

  async update(id, data) {
    return await this.prisma.lead.update({
      where: { id },
      data
    });
  }

  async findById(id) {
    return await this.prisma.lead.findUnique({
      where: { id },
      include: {
        assigned_user: { select: { id: true, name: true } }
      }
    });
  }

  async findAll({ offset, limit, search, status, source, assignedTo }) {
    const where = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { company: { contains: search } },
        { phone: { contains: search } }
      ];
    }
    if (status) where.status = status;
    if (source) where.source = source;
    if (assignedTo) where.assigned_to = parseInt(assignedTo);

    return await this.prisma.lead.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { created_at: 'desc' },
      include: {
        assigned_user: { select: { name: true } }
      }
    });
  }

  async count(whereClause) {
    const where = {};
    const { search, status, source, assignedTo } = whereClause;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { company: { contains: search } },
        { phone: { contains: search } }
      ];
    }
    if (status) where.status = status;
    if (source) where.source = source;
    if (assignedTo) where.assigned_to = parseInt(assignedTo);

    return await this.prisma.lead.count({ where });
  }

  async delete(id) {
    return await this.prisma.lead.delete({
      where: { id }
    });
  }
}

module.exports = PrismaLeadRepository;
