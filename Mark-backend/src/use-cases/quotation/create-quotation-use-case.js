const Quotation = require('../../domain/entities/quotation');

class CreateQuotationUseCase {
  constructor({ quotationRepository }) {
    this.quotationRepository = quotationRepository;
  }

  async execute(data) {
    const { items, discount, tax_rate, sales_id, ...rest } = data;

    // 1. Calculate Totals
    const { subtotal, tax, total } = Quotation.calculateTotals(items, discount, tax_rate);

    // 2. Generate Number
    const year = new Date().getFullYear();
    const latestNumber = await this.quotationRepository.getLatestNumber(year);
    let sequence = 1;
    if (latestNumber) {
      const parts = latestNumber.split('-');
      sequence = parseInt(parts[2]) + 1;
    }
    const quot_number = Quotation.generateNumber(sequence, year);

    // 3. Set Default Valid Until (30 days)
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    // 4. Create in Repository
    const quotation = await this.quotationRepository.create({
      ...rest,
      quot_number,
      sales_id,
      subtotal,
      discount: discount || 0,
      tax_rate: tax_rate || 0.11,
      tax,
      total,
      valid_until: data.valid_until ? new Date(data.valid_until) : validUntil,
      status: 'draft',
      created_by: sales_id,
      items: items.map(item => ({
        ...item,
        total: item.price * item.quantity
      }))
    });

    return quotation;
  }
}

module.exports = CreateQuotationUseCase;
