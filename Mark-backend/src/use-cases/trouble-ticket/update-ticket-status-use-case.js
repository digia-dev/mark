class UpdateTicketStatusUseCase {
  constructor({ troubleTicketRepository }) {
    this.troubleTicketRepository = troubleTicketRepository;
  }

  async execute(id, { status, resolution }) {
    const ticket = await this.troubleTicketRepository.findById(id);
    if (!ticket) throw new Error('Ticket not found');

    const updateData = { status };
    
    if (status === 'resolved') {
      updateData.resolved_at = new Date();
    }

    if (status === 'closed') {
      updateData.closed_at = new Date();
    }

    return await this.troubleTicketRepository.update(id, updateData);
  }
}

module.exports = UpdateTicketStatusUseCase;
