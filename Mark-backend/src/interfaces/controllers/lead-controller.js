const { successResponse } = require('../../shared/response');
const { createLeadDto, updateLeadDto, convertLeadDto } = require('../dto/crm/lead-dto');

class LeadController {
  constructor({ 
    createLeadUseCase, 
    getLeadListUseCase, 
    updateLeadUseCase,
    convertLeadToCustomerUseCase
  }) {
    this.createLeadUseCase = createLeadUseCase;
    this.getLeadListUseCase = getLeadListUseCase;
    this.updateLeadUseCase = updateLeadUseCase;
    this.convertLeadToCustomerUseCase = convertLeadToCustomerUseCase;
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
}

module.exports = LeadController;
