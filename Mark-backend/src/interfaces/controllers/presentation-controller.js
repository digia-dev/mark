const { successResponse, errorResponse } = require('../../shared/response');

class PresentationController {
  constructor({ createPresentationUseCase, getPresentationListUseCase }) {
    this.createPresentationUseCase = createPresentationUseCase;
    this.getPresentationListUseCase = getPresentationListUseCase;
  }

  async create(req, res) {
    try {
      const data = { ...req.body, sales_id: req.user.id };
      const presentation = await this.createPresentationUseCase.execute(data);
      res.status(201).json(successResponse(presentation));
    } catch (error) {
      res.status(400).json(errorResponse('CREATE_PRESENTATION_ERROR', error.message));
    }
  }

  async list(req, res) {
    try {
      const result = await this.getPresentationListUseCase.execute(req.query);
      res.json(successResponse(result.data, result.meta));
    } catch (error) {
      res.status(400).json(errorResponse('LIST_PRESENTATION_ERROR', error.message));
    }
  }
}

module.exports = PresentationController;
