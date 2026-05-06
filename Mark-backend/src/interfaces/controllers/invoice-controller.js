const { successResponse, errorResponse } = require('../../shared/response');
const { createInvoiceSchema, updateInvoiceSchema, recordPaymentSchema } = require('../dtos/invoice-dto');

class InvoiceController {
  constructor({
    createInvoiceUseCase,
    updateInvoiceUseCase,
    getInvoiceListUseCase,
    getInvoiceDetailUseCase,
    deleteInvoiceUseCase,
    recordPaymentUseCase,
    sendInvoiceUseCase,
    generatePdfUseCase,
    getInvoiceStatsUseCase
  }) {
    this.createInvoiceUseCase = createInvoiceUseCase;
    this.updateInvoiceUseCase = updateInvoiceUseCase;
    this.getInvoiceListUseCase = getInvoiceListUseCase;
    this.getInvoiceDetailUseCase = getInvoiceDetailUseCase;
    this.deleteInvoiceUseCase = deleteInvoiceUseCase;
    this.recordPaymentUseCase = recordPaymentUseCase;
    this.sendInvoiceUseCase = sendInvoiceUseCase;
    this.generatePdfUseCase = generatePdfUseCase;
    this.getInvoiceStatsUseCase = getInvoiceStatsUseCase;
  }

  async create(req, res, next) {
    try {
      const validatedData = createInvoiceSchema.parse({
        ...req.body,
        sales_id: req.body.sales_id || req.user.id
      });
      const invoice = await this.createInvoiceUseCase.execute({
        ...validatedData,
        created_by: req.user.id
      });
      res.status(201).json(successResponse(invoice));
    } catch (error) {
      next(error);
    }
  }

  async list(req, res, next) {
    try {
      const result = await this.getInvoiceListUseCase.execute(req.query);
      res.json(successResponse(result.data, result.meta));
    } catch (error) {
      next(error);
    }
  }

  async detail(req, res, next) {
    try {
      const invoice = await this.getInvoiceDetailUseCase.execute(parseInt(req.params.id));
      res.json(successResponse(invoice));
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const validatedData = updateInvoiceSchema.parse(req.body);
      const invoice = await this.updateInvoiceUseCase.execute(parseInt(req.params.id), validatedData);
      res.json(successResponse(invoice));
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await this.deleteInvoiceUseCase.execute(parseInt(req.params.id));
      res.json(successResponse({ deleted: true }));
    } catch (error) {
      next(error);
    }
  }

  async recordPayment(req, res, next) {
    try {
      const validatedData = recordPaymentSchema.parse(req.body);
      const payment = await this.recordPaymentUseCase.execute(parseInt(req.params.id), {
        ...validatedData,
        created_by: req.user.id
      });
      res.status(201).json(successResponse(payment));
    } catch (error) {
      next(error);
    }
  }

  async send(req, res, next) {
    try {
      const invoice = await this.sendInvoiceUseCase.execute(parseInt(req.params.id));
      res.json(successResponse(invoice));
    } catch (error) {
      next(error);
    }
  }

  async generatePdf(req, res, next) {
    try {
      const result = await this.generatePdfUseCase.execute(parseInt(req.params.id));
      res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async getStats(req, res, next) {
    try {
      const stats = await this.getInvoiceStatsUseCase.execute();
      res.json(successResponse(stats));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = InvoiceController;
