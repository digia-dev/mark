class AddTicketNoteUseCase {
  constructor({ troubleTicketRepository }) {
    this.troubleTicketRepository = troubleTicketRepository;
  }

  async execute(id, { content, is_internal, user_id }) {
    const ticket = await this.troubleTicketRepository.findById(id);
    if (!ticket) {
      throw new Error('Ticket tidak ditemukan');
    }

    return await this.troubleTicketRepository.addNote(id, {
      content,
      is_internal,
      user_id
    });
  }
}

module.exports = AddTicketNoteUseCase;
