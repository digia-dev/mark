const { successResponse, errorResponse } = require('../../shared/response');

class TargetController {
  constructor({ createSalesTargetUseCase, getSalesTargetUseCase }) {
    this.createSalesTargetUseCase = createSalesTargetUseCase;
    this.getSalesTargetUseCase = getSalesTargetUseCase;
  }

  async getTarget(req, res, next) {
    try {
      const { month, year } = req.query;
      const userId = req.user.id;
      
      const targetMonth = month ? parseInt(month) : new Date().getMonth() + 1;
      const targetYear = year ? parseInt(year) : new Date().getFullYear();

      const result = await this.getSalesTargetUseCase.execute(userId, targetMonth, targetYear);
      return res.status(200).json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async createTarget(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await this.createSalesTargetUseCase.execute(userId, req.body);
      return res.status(200).json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TargetController;
