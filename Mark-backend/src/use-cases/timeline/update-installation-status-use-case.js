class UpdateInstallationStatusUseCase {
  constructor({ installationRepository }) {
    this.installationRepository = installationRepository;
  }

  async execute(id, { status, current_stage, notes }) {
    const installation = await this.installationRepository.findById(id);
    if (!installation) throw new Error('Installation not found');

    const updateData = { status, current_stage, notes };
    
    if (status === 'on-progress' && !installation.start_date) {
      updateData.start_date = new Date();
    }

    if (status === 'done') {
      updateData.actual_end_date = new Date();
    }

    return await this.installationRepository.update(id, updateData);
  }
}

module.exports = UpdateInstallationStatusUseCase;
