class LoggerService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async log({ userId, action, module, entityType, entityId, description, oldValues, newValues, ipAddress, userAgent }) {
    try {
      return await this.prisma.activityLog.create({
        data: {
          user_id: userId,
          action,
          module,
          entity_type: entityType,
          entity_id: entityId,
          description,
          old_values: oldValues,
          new_values: newValues,
          ip_address: ipAddress,
          user_agent: userAgent
        }
      });
    } catch (error) {
      console.error('FAILED_TO_LOG_ACTIVITY:', error);
    }
  }
}

module.exports = LoggerService;
