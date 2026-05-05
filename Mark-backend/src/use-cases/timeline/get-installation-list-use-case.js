class GetInstallationListUseCase {
  constructor({ installationRepository }) {
    this.installationRepository = installationRepository;
  }

  async execute(params) {
    const { page = 1, limit = 10, ...filters } = params;
    const offset = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.installationRepository.findAll({ offset, limit, ...filters }),
      this.installationRepository.count(filters)
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

module.exports = GetInstallationListUseCase;
