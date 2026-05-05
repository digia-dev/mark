class GetLeadDetailUseCase {
  constructor({ leadRepository }) {
    this.leadRepository = leadRepository;
  }

  async execute(id) {
    const lead = await this.leadRepository.findById(parseInt(id));
    if (!lead) {
      const error = new Error('Lead not found');
      error.code = 'NOT_FOUND';
      throw error;
    }
    return lead;
  }
}

module.exports = GetLeadDetailUseCase;
