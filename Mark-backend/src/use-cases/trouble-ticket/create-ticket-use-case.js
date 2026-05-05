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
      if (parts.length === 3) {
        sequence = parseInt(parts[2]) + 1;
      }
    }
    
    const ticket_number = TroubleTicket.generateTicketNumber(sequence, year);

    // Calculate SLA deadline
    const now = new Date();
    let slaHours = 48; // Default Low
    switch (data.priority) {
      case 'critical': slaHours = 4; break;
      case 'high': slaHours = 8; break;
      case 'medium': slaHours = 24; break;
      case 'low': slaHours = 48; break;
    }
    
    const sla_deadline = new Date(now.getTime() + slaHours * 60 * 60 * 1000);

    return await this.troubleTicketRepository.create({
      ...data,
      ticket_number,
      status: 'open',
      sla_deadline
    });
  }
}

module.exports = CreateTicketUseCase;
