const Quotation = require('../../domain/entities/quotation');

class DuplicateQuotationUseCase {
  constructor({ quotationRepository }) {
    this.quotationRepository = quotationRepository;
  }

  async execute(id) {
    const existing = await this.quotationRepository.findById(id);
    if (!existing) throw new Error('QUOTATION_NOT_FOUND');

    const year = new Date().getFullYear();
    const latestNum = await this.quotationRepository.getLatestNumber(year);
    const sequence = latestNum ? parseInt(latestNum.split('-')[2]) + 1 : 1;
    const newNumber = Quotation.generateNumber(sequence, year);

    const duplicateData = {
      ...existing,
      id: undefined,
      quot_number: newNumber,
      status: 'draft',
      version: existing.version + 1,
      parent_id: existing.id,
      sent_at: null,
      approved_at: null,
      rejected_at: null,
      pdf_url: null,
      created_at: undefined,
      updated_at: undefined,
      items: existing.items.map(item => ({ ...item, id: undefined, quotation_id: undefined }))
    };

    return await this.quotationRepository.create(duplicateData);
  }
}

module.exports = DuplicateQuotationUseCase;
