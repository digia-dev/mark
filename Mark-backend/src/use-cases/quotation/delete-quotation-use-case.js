class DeleteQuotationUseCase {
  constructor({ quotationRepository }) {
    this.quotationRepository = quotationRepository;
  }

  async execute(id) {
    const existing = await this.quotationRepository.findById(id);
    if (!existing) throw new Error('QUOTATION_NOT_FOUND');
    if (existing.status !== 'draft') throw new Error('ONLY_DRAFT_CAN_BE_DELETED');

    return await this.quotationRepository.delete(id);
  }
}

module.exports = DeleteQuotationUseCase;
