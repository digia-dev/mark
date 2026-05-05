/**
 * Get Notification List Use Case
 */
class GetNotificationListUseCase {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async execute(userId, query = {}) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;

    const where = {
      user_id: userId
    };

    if (query.is_read !== undefined) {
      where.is_read = query.is_read === 'true';
    }

    const [notifications, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        orderBy: {
          created_at: 'desc'
        },
        skip,
        take: limit
      }),
      this.prisma.notification.count({ where })
    ]);

    return {
      data: notifications,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = GetNotificationListUseCase;
