const TroubleTicket = require('../../domain/entities/trouble-ticket');

class CreateTicketUseCase {
  constructor({ troubleTicketRepository }) {
    this.troubleTicketRepository = troubleTicketRepository;
  }

  async execute(data) {
    const year = new Date().getFullYear();
    const latestNumber = await this.troubleTicketRepository.getLatestNumber(year);
    let sequence = 1;
    if (latestNumber) {
      const parts = latestNumber.split('-');
      sequence = parseInt(parts[2]) + 1;
    }
    const ticket_number = TroubleTicket.generateNumber(sequence, year);

    return await this.troubleTicketRepository.create({
      ...data,
      ticket_number,
      status: 'open',
      created_at: new Date()
    });
  }
}

module.exports = CreateTicketUseCase;
