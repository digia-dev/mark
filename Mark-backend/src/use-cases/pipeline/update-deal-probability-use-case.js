class UpdateDealProbabilityUseCase {
  constructor({ dealRepository }) {
    this.dealRepository = dealRepository;
  }

  async execute(id, probability) {
    return this.dealRepository.update(id, { probability });
  }
}

module.exports = UpdateDealProbabilityUseCase;
