class GetTicketDetailUseCase {
  constructor({ troubleTicketRepository }) {
    this.troubleTicketRepository = troubleTicketRepository;
  }

  async execute(id) {
    const ticket = await this.troubleTicketRepository.findById(id);
    if (!ticket) {
      throw new Error('Ticket tidak ditemukan');
    }
    return ticket;
  }
}

module.exports = GetTicketDetailUseCase;
