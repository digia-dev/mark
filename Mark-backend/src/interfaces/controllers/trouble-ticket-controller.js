const { successResponse, errorResponse } = require('../../shared/response');

class TroubleTicketController {
  constructor({ createTicketUseCase, getTicketListUseCase, updateTicketStatusUseCase }) {
    this.createTicketUseCase = createTicketUseCase;
    this.getTicketListUseCase = getTicketListUseCase;
    this.updateTicketStatusUseCase = updateTicketStatusUseCase;
  }

  async create(req, res) {
    try {
      const data = { ...req.body, pic_id: req.user.id };
      const ticket = await this.createTicketUseCase.execute(data);
      res.status(201).json(successResponse(ticket));
    } catch (error) {
      res.status(400).json(errorResponse('CREATE_TICKET_ERROR', error.message));
    }
  }

  async list(req, res) {
    try {
      const result = await this.getTicketListUseCase.execute(req.query);
      res.json(successResponse(result.data, result.meta));
    } catch (error) {
      res.status(400).json(errorResponse('LIST_TICKET_ERROR', error.message));
    }
  }

  async updateStatus(req, res) {
    try {
      const ticket = await this.updateTicketStatusUseCase.execute(parseInt(req.params.id), req.body);
      res.json(successResponse(ticket));
    } catch (error) {
      res.status(400).json(errorResponse('UPDATE_STATUS_ERROR', error.message));
    }
  }
}

module.exports = TroubleTicketController;
