const Installation = require('../../domain/entities/installation');

class CreateInstallationUseCase {
  constructor({ installationRepository }) {
    this.installationRepository = installationRepository;
  }

  async execute(data) {
    const year = new Date().getFullYear();
    const latestNumber = await this.installationRepository.getLatestNumber(year);
    
    let sequence = 1;
    if (latestNumber) {
      const parts = latestNumber.split('-');
      if (parts.length === 3) {
        sequence = parseInt(parts[2]) + 1;
      }
    }
    
    const inst_number = Installation.generateInstNumber(sequence, year);

    // Initial stages for tracking
    const stages = [
      { stage_name: 'survey', status: 'scheduled', order: 1 },
      { stage_name: 'preparation', status: 'scheduled', order: 2 },
      { stage_name: 'installation', status: 'scheduled', order: 3 },
      { stage_name: 'testing', status: 'scheduled', order: 4 },
    ];

    return await this.installationRepository.create({
      ...data,
      inst_number,
      status: 'scheduled',
      current_stage: 'survey',
      stages
    });
  }
}

module.exports = CreateInstallationUseCase;
