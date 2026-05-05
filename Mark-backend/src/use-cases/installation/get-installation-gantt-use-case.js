class GetInstallationGanttUseCase {
  constructor({ installationRepository }) {
    this.installationRepository = installationRepository;
  }

  async execute(filters) {
    return await this.installationRepository.getGanttData(filters);
  }
}

module.exports = GetInstallationGanttUseCase;
