const { successResponse, errorResponse } = require('../../shared/response');
const { 
  createTicketSchema, 
  updateTicketSchema, 
  addNoteSchema, 
  assignTicketSchema,
  updateStatusSchema
} = require('../dtos/trouble-ticket-dto');

class TroubleTicketController {
  constructor({ 
    createTicketUseCase, 
    getTicketListUseCase, 
    getTicketDetailUseCase,
    updateTicketUseCase,
    updateTicketStatusUseCase,
    assignTicketUseCase,
    addTicketNoteUseCase,
    getTicketStatsUseCase
  }) {
    this.createTicketUseCase = createTicketUseCase;
    this.getTicketListUseCase = getTicketListUseCase;
    this.getTicketDetailUseCase = getTicketDetailUseCase;
    this.updateTicketUseCase = updateTicketUseCase;
    this.updateTicketStatusUseCase = updateTicketStatusUseCase;
    this.assignTicketUseCase = assignTicketUseCase;
    this.addTicketNoteUseCase = addTicketNoteUseCase;
    this.getTicketStatsUseCase = getTicketStatsUseCase;
  }

  async create(req, res) {
    try {
      const validatedData = createTicketSchema.parse({
        ...req.body,
        created_by: req.user.id
      });
      const ticket = await this.createTicketUseCase.execute(validatedData);
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

  async detail(req, res) {
    try {
      const ticket = await this.getTicketDetailUseCase.execute(parseInt(req.params.id));
      res.json(successResponse(ticket));
    } catch (error) {
      res.status(404).json(errorResponse('NOT_FOUND', error.message));
    }
  }

  async update(req, res) {
    try {
      const validatedData = updateTicketSchema.parse(req.body);
      const ticket = await this.updateTicketUseCase.execute(parseInt(req.params.id), validatedData);
      res.json(successResponse(ticket));
    } catch (error) {
      res.status(400).json(errorResponse('UPDATE_TICKET_ERROR', error.message));
    }
  }

  async updateStatus(req, res) {
    try {
      const validatedData = updateStatusSchema.parse(req.body);
      const ticket = await this.updateTicketStatusUseCase.execute(parseInt(req.params.id), validatedData);
      res.json(successResponse(ticket));
    } catch (error) {
      res.status(400).json(errorResponse('UPDATE_STATUS_ERROR', error.message));
    }
  }

  async assign(req, res) {
    try {
      const { user_id } = assignTicketSchema.parse(req.body);
      const ticket = await this.assignTicketUseCase.execute(parseInt(req.params.id), user_id);
      res.json(successResponse(ticket));
    } catch (error) {
      res.status(400).json(errorResponse('ASSIGN_TICKET_ERROR', error.message));
    }
  }

  async addNote(req, res) {
    try {
      const validatedData = addNoteSchema.parse(req.body);
      const note = await this.addTicketNoteUseCase.execute(parseInt(req.params.id), {
        ...validatedData,
        user_id: req.user.id
      });
      res.status(201).json(successResponse(note));
    } catch (error) {
      res.status(400).json(errorResponse('ADD_NOTE_ERROR', error.message));
    }
  }

  async getStats(req, res) {
    try {
      const stats = await this.getTicketStatsUseCase.execute();
      res.json(successResponse(stats));
    } catch (error) {
      res.status(400).json(errorResponse('STATS_ERROR', error.message));
    }
  }
}

module.exports = TroubleTicketController;
