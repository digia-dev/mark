class PrismaInstallationRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(data) {
    return await this.prisma.installation.create({
      data,
      include: {
        customer: { select: { name: true } },
        technician: { select: { name: true } }
      }
    });
  }

  async update(id, data) {
    return await this.prisma.installation.update({
      where: { id },
      data,
      include: {
        customer: { select: { name: true } },
        technician: { select: { name: true } }
      }
    });
  }

  async findById(id) {
    return await this.prisma.installation.findUnique({
      where: { id },
      include: {
        customer: true,
        technician: true,
        stages: { orderBy: { created_at: 'asc' } }
      }
    });
  }

  async findAll({ offset, limit, search, status, technicianId, area }) {
    const where = {};
    if (search) {
      where.OR = [
        { inst_number: { contains: search } },
        { customer: { name: { contains: search } } }
      ];
    }
    if (status) where.status = status;
    if (technicianId) where.technician_id = parseInt(technicianId);
    if (area) where.area = area;

    return await this.prisma.installation.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { scheduled_date: 'asc' },
      include: {
        customer: { select: { name: true } },
        technician: { select: { name: true } }
      }
    });
  }

  async count(filters) {
    const where = {};
    const { search, status, technicianId, area } = filters;
    if (search) {
      where.OR = [
        { inst_number: { contains: search } },
        { customer: { name: { contains: search } } }
      ];
    }
    if (status) where.status = status;
    if (technicianId) where.technician_id = parseInt(technicianId);
    if (area) where.area = area;

    return await this.prisma.installation.count({ where });
  }

  async getLatestNumber(year) {
    const latest = await this.prisma.installation.findFirst({
      where: { inst_number: { startsWith: `INST-${year}-` } },
      orderBy: { inst_number: 'desc' },
      select: { inst_number: true }
    });
    return latest ? latest.inst_number : null;
  }
}

module.exports = PrismaInstallationRepository;
