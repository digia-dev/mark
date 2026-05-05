class DeleteDealUseCase {
  constructor({ dealRepository }) {
    this.dealRepository = dealRepository;
  }

  async execute(id) {
    return this.dealRepository.delete(id);
  }
}

module.exports = DeleteDealUseCase;
