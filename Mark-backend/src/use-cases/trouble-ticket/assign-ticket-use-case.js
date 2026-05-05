class AssignTicketUseCase {
  constructor({ troubleTicketRepository }) {
    this.troubleTicketRepository = troubleTicketRepository;
  }

  async execute(id, user_id) {
    const ticket = await this.troubleTicketRepository.findById(id);
    if (!ticket) {
      throw new Error('Ticket tidak ditemukan');
    }

    return await this.troubleTicketRepository.assign(id, user_id);
  }
}

module.exports = AssignTicketUseCase;
