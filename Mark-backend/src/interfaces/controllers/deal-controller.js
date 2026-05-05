const { successResponse } = require('../../shared/response');
const { createDealDto, updateDealDto, moveStageDto } = require('../dto/pipeline/deal-dto');

class DealController {
  constructor({ 
    getDealKanbanUseCase,
    getDealListUseCase,
    getDealDetailUseCase,
    createDealUseCase,
    updateDealUseCase,
    deleteDealUseCase,
    moveDealStageUseCase,
    updateDealProbabilityUseCase,
    duplicateDealUseCase,
    markDealWonUseCase,
    markDealLostUseCase,
    getPipelineSummaryUseCase
  }) {
    this.getDealKanbanUseCase = getDealKanbanUseCase;
    this.getDealListUseCase = getDealListUseCase;
    this.getDealDetailUseCase = getDealDetailUseCase;
    this.createDealUseCase = createDealUseCase;
    this.updateDealUseCase = updateDealUseCase;
    this.deleteDealUseCase = deleteDealUseCase;
    this.moveDealStageUseCase = moveDealStageUseCase;
    this.updateDealProbabilityUseCase = updateDealProbabilityUseCase;
    this.duplicateDealUseCase = duplicateDealUseCase;
    this.markDealWonUseCase = markDealWonUseCase;
    this.markDealLostUseCase = markDealLostUseCase;
    this.getPipelineSummaryUseCase = getPipelineSummaryUseCase;
  }

  async getKanban(req, res, next) {
    try {
      const groupedDeals = await this.getDealKanbanUseCase.execute(req.query);
      return res.status(200).json(successResponse(groupedDeals));
    } catch (error) {
      next(error);
    }
  }

  async getList(req, res, next) {
    try {
      const deals = await this.getDealListUseCase.execute(req.query);
      return res.status(200).json(successResponse(deals));
    } catch (error) {
      next(error);
    }
  }

  async getDetail(req, res, next) {
    try {
      const { id } = req.params;
      const deal = await this.getDealDetailUseCase.execute(parseInt(id));
      return res.status(200).json(successResponse(deal));
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const validatedData = createDealDto.parse(req.body);
      const deal = await this.createDealUseCase.execute(validatedData);
      return res.status(201).json(successResponse(deal));
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const validatedData = updateDealDto.parse(req.body);
      const deal = await this.updateDealUseCase.execute(parseInt(id), validatedData);
      return res.status(200).json(successResponse(deal));
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.deleteDealUseCase.execute(parseInt(id));
      return res.status(200).json(successResponse({ message: 'Deal deleted successfully' }));
    } catch (error) {
      next(error);
    }
  }

  async moveStage(req, res, next) {
    try {
      const { id } = req.params;
      const validatedData = moveStageDto.parse(req.body);
      const deal = await this.moveDealStageUseCase.execute(parseInt(id), validatedData);
      return res.status(200).json(successResponse(deal));
    } catch (error) {
      next(error);
    }
  }

  async updateProbability(req, res, next) {
    try {
      const { id } = req.params;
      const { probability } = req.body;
      const deal = await this.updateDealProbabilityUseCase.execute(parseInt(id), probability);
      return res.status(200).json(successResponse(deal));
    } catch (error) {
      next(error);
    }
  }

  async duplicate(req, res, next) {
    try {
      const { id } = req.params;
      const deal = await this.duplicateDealUseCase.execute(parseInt(id));
      return res.status(201).json(successResponse(deal));
    } catch (error) {
      next(error);
    }
  }

  async markWon(req, res, next) {
    try {
      const { id } = req.params;
      const deal = await this.markDealWonUseCase.execute(parseInt(id));
      return res.status(200).json(successResponse(deal));
    } catch (error) {
      next(error);
    }
  }

  async markLost(req, res, next) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const deal = await this.markDealLostUseCase.execute(parseInt(id), reason);
      return res.status(200).json(successResponse(deal));
    } catch (error) {
      next(error);
    }
  }

  async getSummary(req, res, next) {
    try {
      const summary = await this.getPipelineSummaryUseCase.execute(req.query);
      return res.status(200).json(successResponse(summary));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DealController;
