class NotificationService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async send({ userId, title, message, type, priority = 'normal', entityType, entityId, actionUrl }) {
    try {
      return await this.prisma.notification.create({
        data: {
          user_id: userId,
          title,
          message,
          type,
          priority,
          entity_type: entityType,
          entity_id: entityId,
          action_url: actionUrl
        }
      });
    } catch (error) {
      console.error('FAILED_TO_SEND_NOTIFICATION:', error);
    }
  }

  async markAsRead(id) {
    return await this.prisma.notification.update({
      where: { id },
      data: { is_read: true, read_at: new Date() }
    });
  }

  async getUnread(userId) {
    return await this.prisma.notification.findMany({
      where: { user_id: userId, is_read: false },
      orderBy: { created_at: 'desc' }
    });
  }
}

module.exports = NotificationService;
