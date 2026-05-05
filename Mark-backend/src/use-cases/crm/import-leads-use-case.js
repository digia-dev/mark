class ImportLeadsUseCase {
  constructor({ leadRepository }) {
    this.leadRepository = leadRepository;
  }

  async execute(leads) {
    let imported = 0;
    let failed = 0;
    const errors = [];

    for (const leadData of leads) {
      try {
        await this.leadRepository.create(leadData);
        imported++;
      } catch (error) {
        failed++;
        errors.push({ name: leadData.name || 'Unknown', error: error.message });
      }
    }

    return { imported, failed, errors };
  }
}

module.exports = ImportLeadsUseCase;
