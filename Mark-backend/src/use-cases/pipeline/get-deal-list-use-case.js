class GetDealListUseCase {
  constructor({ dealRepository }) {
    this.dealRepository = dealRepository;
  }

  async execute(filters) {
    return this.dealRepository.findAll(filters);
  }
}

module.exports = GetDealListUseCase;
