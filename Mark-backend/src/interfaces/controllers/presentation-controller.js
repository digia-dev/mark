const { successResponse, errorResponse } = require('../../shared/response');

class PresentationController {
  constructor({ 
    createPresentationUseCase, 
    getPresentationListUseCase,
    getPresentationDetailUseCase,
    updatePresentationUseCase,
    deletePresentationUseCase
  }) {
    this.createPresentationUseCase = createPresentationUseCase;
    this.getPresentationListUseCase = getPresentationListUseCase;
    this.getPresentationDetailUseCase = getPresentationDetailUseCase;
    this.updatePresentationUseCase = updatePresentationUseCase;
    this.deletePresentationUseCase = deletePresentationUseCase;
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

  async getDetail(req, res) {
    try {
      const { id } = req.params;
      const presentation = await this.getPresentationDetailUseCase.execute(id);
      res.json(successResponse(presentation));
    } catch (error) {
      if (error.message === 'Presentation not found') {
        return res.status(404).json(errorResponse('NOT_FOUND', error.message));
      }
      res.status(400).json(errorResponse('GET_PRESENTATION_ERROR', error.message));
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const presentation = await this.updatePresentationUseCase.execute(id, req.body);
      res.json(successResponse(presentation));
    } catch (error) {
      if (error.message === 'Presentation not found') {
        return res.status(404).json(errorResponse('NOT_FOUND', error.message));
      }
      res.status(400).json(errorResponse('UPDATE_PRESENTATION_ERROR', error.message));
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await this.deletePresentationUseCase.execute(id);
      res.json(successResponse({ message: 'Presentation deleted successfully' }));
    } catch (error) {
      if (error.message === 'Presentation not found') {
        return res.status(404).json(errorResponse('NOT_FOUND', error.message));
      }
      res.status(400).json(errorResponse('DELETE_PRESENTATION_ERROR', error.message));
    }
  }
}

module.exports = PresentationController;
