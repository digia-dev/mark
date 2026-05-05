class DuplicateDealUseCase {
  constructor({ dealRepository }) {
    this.dealRepository = dealRepository;
  }

  async execute(id) {
    const deal = await this.dealRepository.findById(id);
    if (!deal) throw new Error('DEAL_NOT_FOUND');

    const duplicateData = {
      ...deal,
      id: undefined,
      name: `${deal.name} (Copy)`,
      created_at: undefined,
      updated_at: undefined,
      status: 'prospek',
      stage: 'prospek',
      probability: 20
    };

    return this.dealRepository.create(duplicateData);
  }
}

module.exports = DuplicateDealUseCase;
