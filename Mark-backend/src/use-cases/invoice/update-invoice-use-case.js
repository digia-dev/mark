const Invoice = require('../../domain/entities/invoice');

class UpdateInvoiceUseCase {
  constructor({ invoiceRepository }) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(id, data) {
    const existing = await this.invoiceRepository.findById(id);
    if (!existing) {
      throw new Error('Invoice tidak ditemukan');
    }

    if (existing.status !== 'draft' && existing.status !== 'unpaid') {
      throw new Error(`Tidak dapat mengubah invoice dengan status ${existing.status}`);
    }

    const { subtotal, tax, total } = Invoice.calculateTotal(
      data.items || existing.items, 
      data.discount !== undefined ? data.discount : existing.discount, 
      data.tax_rate !== undefined ? data.tax_rate : existing.tax_rate
    );

    const updateData = {
      ...data,
      subtotal,
      tax,
      total,
      remaining: total - existing.paid_amount
    };

    return await this.invoiceRepository.update(id, updateData);
  }
}

module.exports = UpdateInvoiceUseCase;
