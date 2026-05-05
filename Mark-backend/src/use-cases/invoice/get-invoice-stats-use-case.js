class GetInvoiceStatsUseCase {
  constructor({ invoiceRepository }) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute() {
    return await this.invoiceRepository.getStats();
  }
}

module.exports = GetInvoiceStatsUseCase;
