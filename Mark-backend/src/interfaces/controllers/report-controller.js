const { successResponse } = require('../../shared/response');

class ReportController {
  constructor({ getDashboardStatsUseCase }) {
    this.getDashboardStatsUseCase = getDashboardStatsUseCase;
  }

  async getDashboardStats(req, res, next) {
    try {
      const { startDate, endDate, salesId } = req.query;
      const data = await this.getDashboardStatsUseCase.execute({ startDate, endDate, salesId });
      return res.status(200).json(successResponse(data));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ReportController;
