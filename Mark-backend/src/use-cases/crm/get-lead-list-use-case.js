class GetLeadListUseCase {
  constructor({ leadRepository }) {
    this.leadRepository = leadRepository;
  }

  async execute(params) {
    const { page = 1, limit = 10, search, status, source, assignedTo } = params;
    const offset = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      this.leadRepository.findAll({
        offset,
        limit: parseInt(limit),
        search,
        status,
        source,
        assignedTo
      }),
      this.leadRepository.count({
        search,
        status,
        source,
        assignedTo
      })
    ]);

    return {
      leads,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        total_pages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = GetLeadListUseCase;
