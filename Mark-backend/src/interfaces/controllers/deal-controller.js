const { successResponse } = require('../../shared/response');
const { createDealDto, updateDealDto, moveStageDto } = require('../dto/pipeline/deal-dto');

class DealController {
  constructor({ 
    getDealKanbanUseCase,
    createDealUseCase,
    updateDealUseCase,
    moveDealStageUseCase
  }) {
    this.getDealKanbanUseCase = getDealKanbanUseCase;
    this.createDealUseCase = createDealUseCase;
    this.updateDealUseCase = updateDealUseCase;
    this.moveDealStageUseCase = moveDealStageUseCase;
  }

  async getKanban(req, res, next) {
    try {
      const groupedDeals = await this.getDealKanbanUseCase.execute(req.query);
      return res.status(200).json(successResponse(groupedDeals));
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
}

module.exports = DealController;
