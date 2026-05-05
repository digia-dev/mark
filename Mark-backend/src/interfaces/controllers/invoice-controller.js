const { successResponse, errorResponse } = require('../../shared/response');

class InvoiceController {
  constructor({ createInvoiceUseCase, getInvoiceListUseCase }) {
    this.createInvoiceUseCase = createInvoiceUseCase;
    this.getInvoiceListUseCase = getInvoiceListUseCase;
  }

  async create(req, res) {
    try {
      const data = { ...req.body, sales_id: req.user.id };
      const invoice = await this.createInvoiceUseCase.execute(data);
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
}

module.exports = InvoiceController;
