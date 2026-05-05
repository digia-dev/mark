/**
 * Mark All Notifications As Read Use Case
 */
class MarkAllAsReadUseCase {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async execute(userId) {
    const result = await this.prisma.notification.updateMany({
      where: {
        user_id: userId,
        is_read: false
      },
      data: {
        is_read: true
      }
    });

    return { updatedCount: result.count };
  }
}

module.exports = MarkAllAsReadUseCase;
