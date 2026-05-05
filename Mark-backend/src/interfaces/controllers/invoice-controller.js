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

  async create(req, res) {
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
      res.status(400).json(errorResponse('CREATE_INVOICE_ERROR', error.message));
    }
  }

  async list(req, res) {
    try {
      const result = await this.getInvoiceListUseCase.execute(req.query);
      res.json(successResponse(result.data, result.meta));
    } catch (error) {
      res.status(400).json(errorResponse('LIST_INVOICE_ERROR', error.message));
    }
  }

  async detail(req, res) {
    try {
      const invoice = await this.getInvoiceDetailUseCase.execute(parseInt(req.params.id));
      res.json(successResponse(invoice));
    } catch (error) {
      res.status(404).json(errorResponse('NOT_FOUND', error.message));
    }
  }

  async update(req, res) {
    try {
      const validatedData = updateInvoiceSchema.parse(req.body);
      const invoice = await this.updateInvoiceUseCase.execute(parseInt(req.params.id), validatedData);
      res.json(successResponse(invoice));
    } catch (error) {
      res.status(400).json(errorResponse('UPDATE_INVOICE_ERROR', error.message));
    }
  }

  async delete(req, res) {
    try {
      await this.deleteInvoiceUseCase.execute(parseInt(req.params.id));
      res.json(successResponse({ deleted: true }));
    } catch (error) {
      res.status(400).json(errorResponse('DELETE_INVOICE_ERROR', error.message));
    }
  }

  async recordPayment(req, res) {
    try {
      const validatedData = recordPaymentSchema.parse(req.body);
      const payment = await this.recordPaymentUseCase.execute(parseInt(req.params.id), {
        ...validatedData,
        created_by: req.user.id
      });
      res.status(201).json(successResponse(payment));
    } catch (error) {
      res.status(400).json(errorResponse('RECORD_PAYMENT_ERROR', error.message));
    }
  }

  async send(req, res) {
    try {
      const invoice = await this.sendInvoiceUseCase.execute(parseInt(req.params.id));
      res.json(successResponse(invoice));
    } catch (error) {
      res.status(400).json(errorResponse('SEND_INVOICE_ERROR', error.message));
    }
  }

  async generatePdf(req, res) {
    try {
      const result = await this.generatePdfUseCase.execute(parseInt(req.params.id));
      res.json(successResponse(result));
    } catch (error) {
      res.status(400).json(errorResponse('GENERATE_PDF_ERROR', error.message));
    }
  }

  async getStats(req, res) {
    try {
      const stats = await this.getInvoiceStatsUseCase.execute();
      res.json(successResponse(stats));
    } catch (error) {
      res.status(400).json(errorResponse('STATS_ERROR', error.message));
    }
  }
}

module.exports = InvoiceController;
