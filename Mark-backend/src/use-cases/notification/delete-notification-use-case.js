/**
 * Delete Notification Use Case
 */
class DeleteNotificationUseCase {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async execute(notificationId, userId) {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId }
    });

    if (!notification) {
      const error = new Error('Notifikasi tidak ditemukan');
      error.code = 'NOT_FOUND';
      throw error;
    }

    if (notification.user_id !== userId) {
      const error = new Error('Anda tidak memiliki akses ke notifikasi ini');
      error.code = 'FORBIDDEN';
      throw error;
    }

    await this.prisma.notification.delete({
      where: { id: notificationId }
    });

    return { success: true };
  }
}

module.exports = DeleteNotificationUseCase;
