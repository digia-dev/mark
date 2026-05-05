class UpdateInstallationStageUseCase {
  constructor({ installationRepository }) {
    this.installationRepository = installationRepository;
  }

  async execute(id, stageData) {
    const installationData = await this.installationRepository.findById(id);
    if (!installationData) {
      throw new Error('Instalasi tidak ditemukan');
    }

    // Logic for stage transition could be here or in entity
    // For now, let the repository handle the complex update of stages array
    return await this.installationRepository.updateStage(id, stageData);
  }
}

module.exports = UpdateInstallationStageUseCase;
