const Quotation = require('../../domain/entities/quotation');

class UpdateQuotationUseCase {
  constructor({ quotationRepository }) {
    this.quotationRepository = quotationRepository;
  }

  async execute(id, data) {
    const existing = await this.quotationRepository.findById(id);
    if (!existing) throw new Error('QUOTATION_NOT_FOUND');
    if (existing.status !== 'draft') throw new Error('ONLY_DRAFT_CAN_BE_UPDATED');

    if (data.items) {
      const { subtotal, tax, total } = Quotation.calculateTotals(data.items, data.discount || existing.discount);
      data.subtotal = subtotal;
      data.tax = tax;
      data.total = total;
    }

    return await this.quotationRepository.update(id, data);
  }
}

module.exports = UpdateQuotationUseCase;
