const { successResponse, errorResponse } = require('../../shared/response');
const { 
  createInstallationSchema, 
  updateInstallationSchema, 
  updateStageSchema, 
  assignTechnicianSchema 
} = require('../dtos/installation-dto');

class InstallationController {
  constructor({ 
    createInstallationUseCase, 
    getInstallationListUseCase, 
    getInstallationDetailUseCase,
    updateInstallationUseCase,
    updateInstallationStageUseCase,
    assignTechnicianUseCase,
    getInstallationGanttUseCase,
    getInstallationStatsUseCase
  }) {
    this.createInstallationUseCase = createInstallationUseCase;
    this.getInstallationListUseCase = getInstallationListUseCase;
    this.getInstallationDetailUseCase = getInstallationDetailUseCase;
    this.updateInstallationUseCase = updateInstallationUseCase;
    this.updateInstallationStageUseCase = updateInstallationStageUseCase;
    this.assignTechnicianUseCase = assignTechnicianUseCase;
    this.getInstallationGanttUseCase = getInstallationGanttUseCase;
    this.getInstallationStatsUseCase = getInstallationStatsUseCase;
  }

  async create(req, res) {
    try {
      const validatedData = createInstallationSchema.parse({
        ...req.body,
        sales_id: req.body.sales_id || req.user.id
      });
      const installation = await this.createInstallationUseCase.execute(validatedData);
      res.status(201).json(successResponse(installation));
    } catch (error) {
      res.status(400).json(errorResponse('CREATE_INSTALLATION_ERROR', error.message));
    }
  }

  async list(req, res) {
    try {
      const result = await this.getInstallationListUseCase.execute(req.query);
      res.json(successResponse(result.data, result.meta));
    } catch (error) {
      res.status(400).json(errorResponse('LIST_INSTALLATION_ERROR', error.message));
    }
  }

  async detail(req, res) {
    try {
      const installation = await this.getInstallationDetailUseCase.execute(parseInt(req.params.id));
      res.json(successResponse(installation));
    } catch (error) {
      res.status(404).json(errorResponse('NOT_FOUND', error.message));
    }
  }

  async update(req, res) {
    try {
      const validatedData = updateInstallationSchema.parse(req.body);
      const installation = await this.updateInstallationUseCase.execute(parseInt(req.params.id), validatedData);
      res.json(successResponse(installation));
    } catch (error) {
      res.status(400).json(errorResponse('UPDATE_INSTALLATION_ERROR', error.message));
    }
  }

  async updateStage(req, res) {
    try {
      const validatedData = updateStageSchema.parse(req.body);
      const installation = await this.updateInstallationStageUseCase.execute(parseInt(req.params.id), validatedData);
      res.json(successResponse(installation));
    } catch (error) {
      res.status(400).json(errorResponse('UPDATE_STAGE_ERROR', error.message));
    }
  }

  async assignTechnician(req, res) {
    try {
      const { technician_id } = assignTechnicianSchema.parse(req.body);
      const installation = await this.assignTechnicianUseCase.execute(parseInt(req.params.id), technician_id);
      res.json(successResponse(installation));
    } catch (error) {
      res.status(400).json(errorResponse('ASSIGN_TECHNICIAN_ERROR', error.message));
    }
  }

  async getGantt(req, res) {
    try {
      const data = await this.getInstallationGanttUseCase.execute(req.query);
      res.json(successResponse(data));
    } catch (error) {
      res.status(400).json(errorResponse('GANTT_ERROR', error.message));
    }
  }

  async getStats(req, res) {
    try {
      const stats = await this.getInstallationStatsUseCase.execute();
      res.json(successResponse(stats));
    } catch (error) {
      res.status(400).json(errorResponse('STATS_ERROR', error.message));
    }
  }
}

module.exports = InstallationController;
