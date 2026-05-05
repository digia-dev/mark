class UpdateInstallationUseCase {
  constructor({ installationRepository }) {
    this.installationRepository = installationRepository;
  }

  async execute(id, data) {
    const installation = await this.installationRepository.findById(id);
    if (!installation) {
      throw new Error('Instalasi tidak ditemukan');
    }

    return await this.installationRepository.update(id, data);
  }
}

module.exports = UpdateInstallationUseCase;
