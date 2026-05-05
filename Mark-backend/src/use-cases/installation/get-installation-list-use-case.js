class GetInstallationListUseCase {
  constructor({ installationRepository }) {
    this.installationRepository = installationRepository;
  }

  async execute(filters) {
    const data = await this.installationRepository.findAll(filters);
    const total = await this.installationRepository.count(filters);

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

module.exports = GetInstallationListUseCase;
