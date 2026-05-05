class GetDealDetailUseCase {
  constructor({ dealRepository }) {
    this.dealRepository = dealRepository;
  }

  async execute(id) {
    const deal = await this.dealRepository.findById(id);
    if (!deal) {
      throw new Error('DEAL_NOT_FOUND');
    }
    return deal;
  }
}

module.exports = GetDealDetailUseCase;
