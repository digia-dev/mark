const Lead = require('../../domain/entities/lead');

class CreateLeadUseCase {
  constructor({ leadRepository }) {
    this.leadRepository = leadRepository;
  }

  async execute(leadData) {
    const lead = Lead.create(leadData);
    return await this.leadRepository.create(lead);
  }
}

module.exports = CreateLeadUseCase;
