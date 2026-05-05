const { successResponse } = require('../../shared/response');
const { createCustomerDto, updateCustomerDto } = require('../dto/crm/customer-dto');

class CustomerController {
  constructor({ 
    createCustomerUseCase, 
    getCustomerListUseCase, 
    getCustomerDetailUseCase, 
    updateCustomerUseCase 
  }) {
    this.createCustomerUseCase = createCustomerUseCase;
    this.getCustomerListUseCase = getCustomerListUseCase;
    this.getCustomerDetailUseCase = getCustomerDetailUseCase;
    this.updateCustomerUseCase = updateCustomerUseCase;
  }

  async create(req, res, next) {
    try {
      const validatedData = createCustomerDto.parse(req.body);
      const customer = await this.createCustomerUseCase.execute(validatedData);
      
      // Log activity
      if (req.activityLogger) {
        await req.activityLogger.log({
          userId: req.user.id,
          action: 'dibuat',
          module: 'customer',
          entityType: 'customer',
          entityId: customer.id,
          description: `Membuat customer baru: ${customer.name}`,
          newValues: customer
        });
      }

      return res.status(201).json(successResponse(customer));
    } catch (error) {
      next(error);
    }
  }

  async getList(req, res, next) {
    try {
      const { page, limit, search, status, type, area, salesId, branchId } = req.query;
      const result = await this.getCustomerListUseCase.execute({
        page, limit, search, status, type, area, salesId, branchId
      });
      return res.status(200).json(successResponse(result.customers, result.meta));
    } catch (error) {
      next(error);
    }
  }

  async getDetail(req, res, next) {
    try {
      const { id } = req.params;
      const customer = await this.getCustomerDetailUseCase.execute(parseInt(id));
      return res.status(200).json(successResponse(customer));
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const validatedData = updateCustomerDto.parse(req.body);
      const customer = await this.updateCustomerUseCase.execute(parseInt(id), validatedData);
      
      return res.status(200).json(successResponse(customer));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
