const Deal = require('../../domain/entities/deal');

class CreateDealUseCase {
  constructor({ dealRepository }) {
    this.dealRepository = dealRepository;
  }

  async execute(dealData) {
    const deal = Deal.create(dealData);
    return await this.dealRepository.create(deal);
  }
}

module.exports = CreateDealUseCase;
