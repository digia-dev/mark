class UpdateDealUseCase {
  constructor({ dealRepository }) {
    this.dealRepository = dealRepository;
  }

  async execute(id, data) {
    return this.dealRepository.update(id, data);
  }
}

module.exports = UpdateDealUseCase;
