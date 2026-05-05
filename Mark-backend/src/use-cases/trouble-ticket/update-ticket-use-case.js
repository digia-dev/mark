class UpdateTicketUseCase {
  constructor({ troubleTicketRepository }) {
    this.troubleTicketRepository = troubleTicketRepository;
  }

  async execute(id, data) {
    const ticket = await this.troubleTicketRepository.findById(id);
    if (!ticket) {
      throw new Error('Ticket tidak ditemukan');
    }

    return await this.troubleTicketRepository.update(id, data);
  }
}

module.exports = UpdateTicketUseCase;
