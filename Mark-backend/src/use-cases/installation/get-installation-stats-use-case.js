class GetInstallationStatsUseCase {
  constructor({ installationRepository }) {
    this.installationRepository = installationRepository;
  }

  async execute() {
    return await this.installationRepository.getStats();
  }
}

module.exports = GetInstallationStatsUseCase;
