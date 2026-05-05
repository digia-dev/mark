/**
 * Get Activity Log List Use Case
 */
class GetActivityLogListUseCase {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async execute(query = {}) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const where = {};

    if (query.user_id) {
      where.user_id = query.user_id;
    }
    
    if (query.module) {
      where.module = query.module;
    }

    if (query.action) {
      where.action = query.action;
    }

    if (query.search) {
      where.OR = [
        { description: { contains: query.search } },
        { entity_type: { contains: query.search } }
      ];
    }

    if (query.start_date && query.end_date) {
      where.created_at = {
        gte: new Date(query.start_date),
        lte: new Date(query.end_date)
      };
    }

    const [logs, total] = await Promise.all([
      this.prisma.activityLog.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
        include: {
          user: {
            select: { id: true, name: true, role: true }
          }
        }
      }),
      this.prisma.activityLog.count({ where })
    ]);

    return {
      data: logs,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = GetActivityLogListUseCase;
