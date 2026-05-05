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
}

module.exports = PrismaActivityLogRepository;
