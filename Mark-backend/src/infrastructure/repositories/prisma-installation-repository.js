class PrismaInstallationRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(data) {
    const { stages, ...rest } = data;
    return await this.prisma.installation.create({
      data: {
        ...rest,
        stages: stages ? {
          create: stages
        } : undefined
      },
      include: {
        customer: { select: { name: true } },
        technician: { select: { name: true } },
        stages: true
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

  async updateStage(id, stageData) {
    // This is complex because stages is a related model or a JSON field?
    // Based on findById include stages, it seems to be a related model: installation_stages
    const { stage, status, notes } = stageData;
    
    // Update the specific stage record
    await this.prisma.installation_stage.updateMany({
      where: {
        installation_id: id,
        stage_name: stage
      },
      data: {
        status,
        notes,
        updated_at: new Date()
      }
    });

    // Update current_stage on main installation
    return await this.prisma.installation.update({
      where: { id },
      data: {
        current_stage: stage,
        status: status === 'on-progress' ? 'on-progress' : (stage === 'testing' && status === 'done' ? 'done' : undefined)
      },
      include: {
        stages: true,
        customer: { select: { name: true } }
      }
    });
  }

  async assignTechnician(id, technician_id) {
    return await this.prisma.installation.update({
      where: { id },
      data: { technician_id },
      include: {
        technician: { select: { name: true } },
        customer: { select: { name: true } }
      }
    });
  }

  async getStats() {
    const counts = await this.prisma.installation.groupBy({
      by: ['status'],
      _count: { id: true }
    });

    const statusCounts = counts.reduce((acc, c) => ({ ...acc, [c.status]: c._count.id }), {});

    const overdueCount = await this.prisma.installation.count({
      where: {
        status: { notIn: ['done', 'cancelled'] },
        target_end_date: { lt: new Date() }
      }
    });

    const totalCount = await this.prisma.installation.count();

    return {
      total: totalCount,
      scheduled: statusCounts['scheduled'] || 0,
      onProgress: statusCounts['on-progress'] || 0,
      done: statusCounts['done'] || 0,
      delayed: overdueCount
    };
  }

  async getGanttData(filters) {
    // Simplistic gantt data return
    return await this.prisma.installation.findMany({
      where: filters,
      select: {
        id: true,
        inst_number: true,
        scheduled_date: true,
        target_end_date: true,
        status: true,
        current_stage: true,
        customer: { select: { name: true } }
      },
      orderBy: { scheduled_date: 'asc' }
    });
  }
}

module.exports = PrismaInstallationRepository;
