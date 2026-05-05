const Installation = require('../../domain/entities/installation');

class ScheduleInstallationUseCase {
  constructor({ installationRepository }) {
    this.installationRepository = installationRepository;
  }

  async execute(data) {
    const year = new Date().getFullYear();
    const latestNumber = await this.installationRepository.getLatestNumber(year);
    let sequence = 1;
    if (latestNumber) {
      const parts = latestNumber.split('-');
      sequence = parseInt(parts[2]) + 1;
    }
    const inst_number = Installation.generateNumber(sequence, year);

    return await this.installationRepository.create({
      ...data,
      inst_number,
      status: 'scheduled',
      scheduled_date: new Date(data.scheduled_date),
      target_end_date: new Date(data.target_end_date),
      created_by: data.sales_id
    });
  }
}

module.exports = ScheduleInstallationUseCase;
