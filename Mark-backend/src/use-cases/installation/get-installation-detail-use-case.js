class GetInstallationDetailUseCase {
  constructor({ installationRepository }) {
    this.installationRepository = installationRepository;
  }

  async execute(id) {
    const installation = await this.installationRepository.findById(id);
    if (!installation) {
      throw new Error('Instalasi tidak ditemukan');
    }
    return installation;
  }
}

module.exports = GetInstallationDetailUseCase;
