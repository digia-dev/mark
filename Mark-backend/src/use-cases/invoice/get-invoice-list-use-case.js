class GetInvoiceListUseCase {
  constructor({ invoiceRepository }) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(filters) {
    const data = await this.invoiceRepository.findAll(filters);
    const total = await this.invoiceRepository.count(filters);

    return {
      data,
      meta: {
        total,
        page: parseInt(filters.page) || 1,
        limit: parseInt(filters.limit) || 10,
        total_pages: Math.ceil(total / (parseInt(filters.limit) || 10))
      }
    };
  }
}

module.exports = GetInvoiceListUseCase;
