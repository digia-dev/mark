class MarkDealWonUseCase {
  constructor({ dealRepository }) {
    this.dealRepository = dealRepository;
  }

  async execute(id) {
    return this.dealRepository.update(id, { 
      status: 'won', 
      probability: 100,
      closed_at: new Date()
    });
  }
}

module.exports = MarkDealWonUseCase;
