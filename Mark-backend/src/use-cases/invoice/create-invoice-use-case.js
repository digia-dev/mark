const Invoice = require('../../domain/entities/invoice');

class CreateInvoiceUseCase {
  constructor({ invoiceRepository }) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(data) {
    const year = new Date(data.invoice_date || new Date()).getFullYear();
    const latestNumber = await this.invoiceRepository.getLatestNumber(year);
    
    let sequence = 1;
    if (latestNumber) {
      const parts = latestNumber.split('-');
      if (parts.length === 3) {
        sequence = parseInt(parts[2]) + 1;
      }
    }
    
    const inv_number = Invoice.generateInvoiceNumber(sequence, year);

    // Calculate totals based on items
    const { subtotal, tax, total } = Invoice.calculateTotal(
      data.items || [], 
      data.discount || 0, 
      data.tax_rate || 0.11
    );

    const invoiceData = {
      ...data,
      inv_number,
      subtotal,
      tax,
      total,
      paid_amount: 0,
      remaining: total,
      status: 'unpaid' // Set default status for created invoices
    };

    return await this.invoiceRepository.create(invoiceData);
  }
}

module.exports = CreateInvoiceUseCase;
