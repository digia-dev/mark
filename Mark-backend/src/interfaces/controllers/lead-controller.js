const { successResponse } = require('../../shared/response');
const { createLeadDto, updateLeadDto, convertLeadDto } = require('../dto/crm/lead-dto');

class LeadController {
  constructor({ 
    createLeadUseCase, 
    getLeadListUseCase, 
    getLeadDetailUseCase,
    updateLeadUseCase,
    updateLeadStatusUseCase,
    deleteLeadUseCase,
    assignLeadUseCase,
    convertLeadToCustomerUseCase,
    importLeadsUseCase,
    exportLeadsUseCase
  }) {
    this.createLeadUseCase = createLeadUseCase;
    this.getLeadListUseCase = getLeadListUseCase;
    this.getLeadDetailUseCase = getLeadDetailUseCase;
    this.updateLeadUseCase = updateLeadUseCase;
    this.updateLeadStatusUseCase = updateLeadStatusUseCase;
    this.deleteLeadUseCase = deleteLeadUseCase;
    this.assignLeadUseCase = assignLeadUseCase;
    this.convertLeadToCustomerUseCase = convertLeadToCustomerUseCase;
    this.importLeadsUseCase = importLeadsUseCase;
    this.exportLeadsUseCase = exportLeadsUseCase;
  }

  async create(req, res, next) {
    try {
      const validatedData = createLeadDto.parse(req.body);
      const lead = await this.createLeadUseCase.execute(validatedData);
      return res.status(201).json(successResponse(lead));
    } catch (error) {
      next(error);
    }
  }

  async getList(req, res, next) {
    try {
      const result = await this.getLeadListUseCase.execute(req.query);
      return res.status(200).json(successResponse(result.leads, result.meta));
    } catch (error) {
      next(error);
    }
  }

  async getDetail(req, res, next) {
    try {
      const { id } = req.params;
      const lead = await this.getLeadDetailUseCase.execute(id);
      return res.status(200).json(successResponse(lead));
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const validatedData = updateLeadDto.parse(req.body);
      const lead = await this.updateLeadUseCase.execute(parseInt(id), validatedData);
      return res.status(200).json(successResponse(lead));
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.deleteLeadUseCase.execute(id);
      return res.status(200).json(successResponse({ message: 'Lead deleted successfully' }));
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const lead = await this.updateLeadStatusUseCase.execute(id, status, req.user.id);
      return res.status(200).json(successResponse(lead));
    } catch (error) {
      next(error);
    }
  }

  async assign(req, res, next) {
    try {
      const { id } = req.params;
      const { assigned_to } = req.body;
      const lead = await this.assignLeadUseCase.execute(id, assigned_to);
      return res.status(200).json(successResponse(lead));
    } catch (error) {
      next(error);
    }
  }

  async convert(req, res, next) {
    try {
      const { id } = req.params;
      const validatedData = convertLeadDto.parse(req.body);
      const customer = await this.convertLeadToCustomerUseCase.execute(parseInt(id), validatedData);
      return res.status(200).json(successResponse(customer));
    } catch (error) {
      next(error);
    }
  }

  async importLeads(req, res, next) {
    try {
      const result = await this.importLeadsUseCase.execute(req.body);
      return res.status(200).json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async exportLeads(req, res, next) {
    try {
      const result = await this.exportLeadsUseCase.execute(req.query);
      return res.status(200).json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LeadController;
