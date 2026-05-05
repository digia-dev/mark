class ActivityLogController {
  constructor({
    getActivityLogListUseCase,
    getActivityLogStatsUseCase
  }) {
    this.getActivityLogListUseCase = getActivityLogListUseCase;
    this.getActivityLogStatsUseCase = getActivityLogStatsUseCase;
  }

  async getList(req, res, next) {
    try {
      const result = await this.getActivityLogListUseCase.execute(req.query);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getStats(req, res, next) {
    try {
      const data = await this.getActivityLogStatsUseCase.execute(req.query);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ActivityLogController;
