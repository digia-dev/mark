class GetQuotationListUseCase {
  constructor({ quotationRepository }) {
    this.quotationRepository = quotationRepository;
  }

  async execute(params) {
    const { page = 1, limit = 10, ...filters } = params;
    const offset = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.quotationRepository.findAll({ offset, limit, ...filters }),
      this.quotationRepository.count(filters)
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

module.exports = GetQuotationListUseCase;
