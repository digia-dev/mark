class UpdateTicketStatusUseCase {
  constructor({ troubleTicketRepository }) {
    this.troubleTicketRepository = troubleTicketRepository;
  }

  async execute(id, { status, notes }) {
    const ticket = await this.troubleTicketRepository.findById(id);
    if (!ticket) {
      throw new Error('Ticket tidak ditemukan');
    }

    const validTransitions = {
      'open': ['in-progress', 'resolved', 'cancelled'],
      'in-progress': ['resolved', 'on-hold', 'cancelled'],
      'on-hold': ['in-progress', 'resolved', 'cancelled'],
      'resolved': ['closed', 'in-progress'],
      'closed': ['open'],
      'cancelled': ['open']
    };

    if (!validTransitions[ticket.status].includes(status)) {
      throw new Error(`Transisi status dari ${ticket.status} ke ${status} tidak valid`);
    }

    const extraData = { notes };
    if (status === 'resolved') extraData.resolved_at = new Date();
    if (status === 'closed') extraData.closed_at = new Date();

    return await this.troubleTicketRepository.updateStatus(id, status, extraData);
  }
}

module.exports = UpdateTicketStatusUseCase;
