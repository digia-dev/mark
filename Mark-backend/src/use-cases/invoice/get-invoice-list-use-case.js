class GetInvoiceListUseCase {
  constructor({ invoiceRepository }) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(params) {
    const { page = 1, limit = 10, ...filters } = params;
    const offset = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.invoiceRepository.findAll({ offset, limit, ...filters }),
      this.invoiceRepository.count(filters)
    ]);

    return {
      data,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        total_pages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = GetInvoiceListUseCase;
