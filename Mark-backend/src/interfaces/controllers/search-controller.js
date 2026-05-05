const { successResponse, errorResponse } = require('../../shared/response');

class SearchController {
  constructor(globalSearchUseCase) {
    this.globalSearchUseCase = globalSearchUseCase;
  }

  async search(req, res, next) {
    try {
      const { q } = req.query;
      const results = await this.globalSearchUseCase.execute(q);
      
      return res.status(200).json(successResponse(results));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SearchController;
