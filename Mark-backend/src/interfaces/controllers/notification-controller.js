class NotificationController {
  constructor({
    getNotificationListUseCase,
    markAsReadUseCase,
    markAllAsReadUseCase,
    deleteNotificationUseCase,
    getNotificationStatsUseCase
  }) {
    this.getNotificationListUseCase = getNotificationListUseCase;
    this.markAsReadUseCase = markAsReadUseCase;
    this.markAllAsReadUseCase = markAllAsReadUseCase;
    this.deleteNotificationUseCase = deleteNotificationUseCase;
    this.getNotificationStatsUseCase = getNotificationStatsUseCase;
  }

  async getList(req, res, next) {
    try {
      const result = await this.getNotificationListUseCase.execute(req.user.id, req.query);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getStats(req, res, next) {
    try {
      const data = await this.getNotificationStatsUseCase.execute(req.user.id);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req, res, next) {
    try {
      const data = await this.markAsReadUseCase.execute(req.params.id, req.user.id);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async markAllAsRead(req, res, next) {
    try {
      const data = await this.markAllAsReadUseCase.execute(req.user.id);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await this.deleteNotificationUseCase.execute(req.params.id, req.user.id);
      res.json({ success: true, message: 'Notifikasi berhasil dihapus' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NotificationController;
