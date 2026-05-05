const Invoice = require('../../domain/entities/invoice');

class CreateInvoiceUseCase {
  constructor({ invoiceRepository }) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(data) {
    const year = new Date().getFullYear();
    const latestNumber = await this.invoiceRepository.getLatestNumber(year);
    let sequence = 1;
    if (latestNumber) {
      const parts = latestNumber.split('-');
      sequence = parseInt(parts[2]) + 1;
    }
    const inv_number = Invoice.generateNumber(sequence, year);

    // Calculate tax and total if not provided
    const subtotal = parseFloat(data.subtotal);
    const discount = parseFloat(data.discount || 0);
    const taxRate = parseFloat(data.tax_rate || 0.11);
    const tax = (subtotal - discount) * taxRate;
    const total = subtotal - discount + tax;

    return await this.invoiceRepository.create({
      ...data,
      inv_number,
      subtotal,
      discount,
      tax_rate: taxRate,
      tax,
      total,
      status: 'unpaid',
      invoice_date: new Date(data.invoice_date || new Date()),
      due_date: new Date(data.due_date)
    });
  }
}

module.exports = CreateInvoiceUseCase;
