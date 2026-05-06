class GetQuotationStatsUseCase {
  constructor({ quotationRepository }) {
    this.quotationRepository = quotationRepository;
  }

  async execute() {
    return await this.quotationRepository.getStats();
  }
}

module.exports = GetQuotationStatsUseCase;
