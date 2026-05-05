const Lead = require('../../domain/entities/lead');

class CreateLeadUseCase {
  constructor({ leadRepository, loggerService }) {
    this.leadRepository = leadRepository;
    this.loggerService = loggerService;
  }

  async execute(leadData) {
    const lead = Lead.create(leadData);
    const created = await this.leadRepository.create(lead);
    
    if (this.loggerService) {
      await this.loggerService.log({
        userId: created.sales_id,
        action: 'dibuat',
        module: 'lead',
        entityType: 'Lead',
        entityId: created.id,
        description: `Membuat lead baru: ${created.name} dari ${created.company}`
      });
    }

    return created;
  }
}

module.exports = CreateLeadUseCase;
