class GetTicketStatsUseCase {
  constructor({ troubleTicketRepository }) {
    this.troubleTicketRepository = troubleTicketRepository;
  }

  async execute() {
    return await this.troubleTicketRepository.getStats();
  }
}

module.exports = GetTicketStatsUseCase;
