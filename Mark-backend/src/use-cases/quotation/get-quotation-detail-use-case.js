class GetQuotationDetailUseCase {
  constructor({ quotationRepository }) {
    this.quotationRepository = quotationRepository;
  }

  async execute(id) {
    const quotation = await this.quotationRepository.findById(id);
    if (!quotation) {
      throw new Error('Quotation not found');
    }
    return quotation;
  }
}

module.exports = GetQuotationDetailUseCase;
