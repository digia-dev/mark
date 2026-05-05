class AssignTechnicianUseCase {
  constructor({ installationRepository }) {
    this.installationRepository = installationRepository;
  }

  async execute(id, technicianId) {
    const installation = await this.installationRepository.findById(id);
    if (!installation) {
      throw new Error('Instalasi tidak ditemukan');
    }

    return await this.installationRepository.assignTechnician(id, technicianId);
  }
}

module.exports = AssignTechnicianUseCase;
