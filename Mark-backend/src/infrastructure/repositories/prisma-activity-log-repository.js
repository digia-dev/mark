class PrismaActivityLogRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create(data) {
    return this.prisma.activityLog.create({
      data
    });
  }

  async findAll(filters = {}) {
    const { user_id, module, action, entity_type, entity_id } = filters;
    const where = {};

    if (user_id) where.user_id = parseInt(user_id);
    if (module) where.module = module;
    if (action) where.action = action;
    if (entity_type) where.entity_type = entity_type;
    if (entity_id) where.entity_id = parseInt(entity_id);

    return this.prisma.activityLog.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: { user: { select: { name: true, email: true } } }
    });
  }

  async getStats() {
    const byModule = await this.prisma.activityLog.groupBy({
      by: ['module'],
      _count: { id: true }
    });

    const byAction = await this.prisma.activityLog.groupBy({
      by: ['action'],
      _count: { id: true }
    });

    const totalLogs = await this.prisma.activityLog.count();

    return {
      byModule: byModule.map(m => ({
        name: m.module.charAt(0).toUpperCase() + m.module.slice(1),
        value: m._count.id
      })),
      byAction: byAction.map(a => ({
        name: a.action,
        count: a._count.id
      })),
      recentActivityCount: totalLogs
    };
  }
}

module.exports = PrismaActivityLogRepository;
