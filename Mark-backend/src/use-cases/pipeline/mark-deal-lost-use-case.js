class MarkDealLostUseCase {
  constructor({ dealRepository }) {
    this.dealRepository = dealRepository;
  }

  async execute(id, reason) {
    return this.dealRepository.update(id, { 
      status: 'lost', 
      probability: 0,
      lost_reason: reason,
      closed_at: new Date()
    });
  }
}

module.exports = MarkDealLostUseCase;
