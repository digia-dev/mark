const { successResponse, errorResponse } = require('../../shared/response');

class QuotationController {
  constructor({ 
    createQuotationUseCase, 
    getQuotationListUseCase, 
    getQuotationDetailUseCase,
    updateQuotationUseCase,
    deleteQuotationUseCase,
    sendQuotationUseCase,
    updateQuotationStatusUseCase,
    duplicateQuotationUseCase,
    generatePdfUseCase,
    convertToInvoiceUseCase,
    getQuotationStatsUseCase
  }) {
    this.createQuotationUseCase = createQuotationUseCase;
    this.getQuotationListUseCase = getQuotationListUseCase;
    this.getQuotationDetailUseCase = getQuotationDetailUseCase;
    this.updateQuotationUseCase = updateQuotationUseCase;
    this.deleteQuotationUseCase = deleteQuotationUseCase;
    this.sendQuotationUseCase = sendQuotationUseCase;
    this.updateQuotationStatusUseCase = updateQuotationStatusUseCase;
    this.duplicateQuotationUseCase = duplicateQuotationUseCase;
    this.generatePdfUseCase = generatePdfUseCase;
    this.convertToInvoiceUseCase = convertToInvoiceUseCase;
    this.getQuotationStatsUseCase = getQuotationStatsUseCase;
  }

  async create(req, res) {
    try {
      const data = { ...req.body, sales_id: req.user.id };
      const quotation = await this.createQuotationUseCase.execute(data);
      res.status(201).json(successResponse(quotation));
    } catch (error) {
      res.status(400).json(errorResponse('CREATE_QUOTATION_ERROR', error.message));
    }
  }

  async update(req, res) {
    try {
      const quotation = await this.updateQuotationUseCase.execute(parseInt(req.params.id), req.body);
      res.json(successResponse(quotation));
    } catch (error) {
      res.status(400).json(errorResponse('UPDATE_QUOTATION_ERROR', error.message));
    }
  }

  async delete(req, res) {
    try {
      await this.deleteQuotationUseCase.execute(parseInt(req.params.id));
      res.json(successResponse({ message: 'Quotation deleted successfully' }));
    } catch (error) {
      res.status(400).json(errorResponse('DELETE_QUOTATION_ERROR', error.message));
    }
  }

  async list(req, res) {
    try {
      const result = await this.getQuotationListUseCase.execute(req.query);
      res.json(successResponse(result.data, result.meta));
    } catch (error) {
      res.status(400).json(errorResponse('LIST_QUOTATION_ERROR', error.message));
    }
  }

  async detail(req, res) {
    try {
      const quotation = await this.getQuotationDetailUseCase.execute(parseInt(req.params.id));
      res.json(successResponse(quotation));
    } catch (error) {
      res.status(404).json(errorResponse('QUOTATION_NOT_FOUND', error.message));
    }
  }

  async send(req, res) {
    try {
      const quotation = await this.sendQuotationUseCase.execute(parseInt(req.params.id));
      res.json(successResponse(quotation));
    } catch (error) {
      res.status(400).json(errorResponse('SEND_QUOTATION_ERROR', error.message));
    }
  }

  async updateStatus(req, res) {
    try {
      const quotation = await this.updateQuotationStatusUseCase.execute(
        parseInt(req.params.id), 
        req.body.status
      );
      res.json(successResponse(quotation));
    } catch (error) {
      res.status(400).json(errorResponse('UPDATE_STATUS_ERROR', error.message));
    }
  }

  async duplicate(req, res) {
    try {
      const quotation = await this.duplicateQuotationUseCase.execute(parseInt(req.params.id));
      res.status(201).json(successResponse(quotation));
    } catch (error) {
      res.status(400).json(errorResponse('DUPLICATE_QUOTATION_ERROR', error.message));
    }
  }

  async getPdf(req, res) {
    try {
      const pdfBuffer = await this.generatePdfUseCase.execute(parseInt(req.params.id));
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=Quotation-${req.params.id}.pdf`,
        'Content-Length': pdfBuffer.length
      });
      res.send(pdfBuffer);
    } catch (error) {
      res.status(400).json(errorResponse('GENERATE_PDF_ERROR', error.message));
    }
  }

  async convertToInvoice(req, res) {
    try {
      const invoice = await this.convertToInvoiceUseCase.execute(parseInt(req.params.id));
      res.status(201).json(successResponse(invoice));
    } catch (error) {
      res.status(400).json(errorResponse('CONVERT_TO_INVOICE_ERROR', error.message));
    }
  }

  async getStats(req, res) {
    try {
      const stats = await this.getQuotationStatsUseCase.execute();
      res.json(successResponse(stats));
    } catch (error) {
      res.status(400).json(errorResponse('GET_STATS_ERROR', error.message));
    }
  }
}

module.exports = QuotationController;
