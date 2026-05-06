const { successResponse } = require('../../shared/response');
const { createCustomerDto, updateCustomerDto } = require('../dto/crm/customer-dto');
const ExcelJS = require('exceljs');

class CustomerController {
  constructor({ 
    createCustomerUseCase, 
    getCustomerListUseCase, 
    getCustomerDetailUseCase, 
    updateCustomerUseCase,
    addInteractionUseCase,
    getCustomerStatsUseCase,
    importCustomersUseCase,
    exportCustomersUseCase,
    deleteCustomerUseCase,
    getCustomerInteractionsUseCase,
    getCustomerServicesUseCase,
    getCustomerInvoicesUseCase,
    getCustomerTicketsUseCase
  }) {
    this.createCustomerUseCase = createCustomerUseCase;
    this.getCustomerListUseCase = getCustomerListUseCase;
    this.getCustomerDetailUseCase = getCustomerDetailUseCase;
    this.updateCustomerUseCase = updateCustomerUseCase;
    this.addInteractionUseCase = addInteractionUseCase;
    this.getCustomerStatsUseCase = getCustomerStatsUseCase;
    this.importCustomersUseCase = importCustomersUseCase;
    this.exportCustomersUseCase = exportCustomersUseCase;
    this.deleteCustomerUseCase = deleteCustomerUseCase;
    this.getCustomerInteractionsUseCase = getCustomerInteractionsUseCase;
    this.getCustomerServicesUseCase = getCustomerServicesUseCase;
    this.getCustomerInvoicesUseCase = getCustomerInvoicesUseCase;
    this.getCustomerTicketsUseCase = getCustomerTicketsUseCase;
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

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.deleteCustomerUseCase.execute(parseInt(id));
      return res.status(200).json(successResponse({ message: 'Customer deleted successfully' }));
    } catch (error) {
      next(error);
    }
  }

  async getInteractions(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.getCustomerInteractionsUseCase.execute(id);
      return res.status(200).json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async getServices(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.getCustomerServicesUseCase.execute(id);
      return res.status(200).json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async getInvoices(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.getCustomerInvoicesUseCase.execute(id);
      return res.status(200).json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async getTickets(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.getCustomerTicketsUseCase.execute(id);
      return res.status(200).json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async addInteraction(req, res, next) {
    try {
      const { id } = req.params;
      const interaction = await this.addInteractionUseCase.execute(id, req.body, req.user.id);
      return res.status(201).json(successResponse(interaction));
    } catch (error) {
      next(error);
    }
  }

  async getStats(req, res, next) {
    try {
      const stats = await this.getCustomerStatsUseCase.execute();
      return res.status(200).json(successResponse(stats));
    } catch (error) {
      next(error);
    }
  }

  async importCustomers(req, res, next) {
    try {
      let customers = [];

      // If client sent JSON payload with customers array
      if (req.body && req.body.customers && Array.isArray(req.body.customers)) {
        customers = req.body.customers;
      } else if (req.file && req.file.buffer) {
        const fileName = req.file.originalname || '';
        const isXlsx = fileName.toLowerCase().endsWith('.xlsx') || req.file.mimetype.includes('spreadsheet');

        if (isXlsx) {
          // Parse XLSX using exceljs
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(req.file.buffer);
          const worksheet = workbook.worksheets[0];
          const headerRow = worksheet.getRow(1);
          const headers = headerRow.values.filter(v => v !== undefined).slice(1).map(h => String(h).trim());

          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return; // skip header
            const values = row.values.filter(v => v !== undefined).slice(1);
            const obj = {};
            headers.forEach((h, i) => {
              obj[h] = values[i] !== undefined ? values[i] : null;
            });
            customers.push(obj);
          });
        } else {
          // Parse CSV (simple parser)
          const text = req.file.buffer.toString('utf8');
          const lines = text.split(/\r?\n/).filter(l => l.trim() !== '');
          if (lines.length > 0) {
            const header = lines[0].split(',').map(h => h.trim());
            for (let i = 1; i < lines.length; i++) {
              const row = lines[i];
              const cols = row.split(',').map(c => c.trim());
              const obj = {};
              header.forEach((h, idx) => {
                obj[h] = cols[idx] !== undefined ? cols[idx] : null;
              });
              customers.push(obj);
            }
          }
        }
      } else {
        return res.status(400).json({ success: false, error: { code: 'INVALID_PAYLOAD', message: 'No customers data or file provided' } });
      }

      const result = await this.importCustomersUseCase.execute(customers, req.user.id);
      return res.status(200).json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async exportCustomers(req, res, next) {
    try {
      const result = await this.exportCustomersUseCase.execute(req.query);
      return res.status(200).json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
