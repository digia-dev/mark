/**
 * Get Notification Stats Use Case
 */
class GetNotificationStatsUseCase {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async execute(userId) {
    const unreadCount = await this.prisma.notification.count({
      where: {
        user_id: userId,
        is_read: false
      }
    });

    return {
      unreadCount
    };
  }
}

module.exports = GetNotificationStatsUseCase;
