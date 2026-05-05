class TroubleTicket {
  constructor({
    id,
    ticket_number,
    customer_id,
    title,
    description,
    category,
    priority,
    status,
    assigned_to,
    created_by,
    sla_deadline,
    resolved_at,
    closed_at,
    created_at,
    updated_at,
    customer,
    assigned_user
  }) {
    this.id = id;
    this.ticket_number = ticket_number;
    this.customer_id = customer_id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.priority = priority;
    this.status = status || 'open';
    this.assigned_to = assigned_to;
    this.created_by = created_by;
    this.sla_deadline = sla_deadline;
    this.resolved_at = resolved_at;
    this.closed_at = closed_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.customer = customer;
    this.assigned_user = assigned_user;
  }

  isOverSla() {
    if (this.status === 'resolved' || this.status === 'closed') return false;
    if (!this.sla_deadline) return false;
    return new Date() > new Date(this.sla_deadline);
  }

  getSlaRemaining() {
    if (!this.sla_deadline) return 0;
    const now = new Date();
    const deadline = new Date(this.sla_deadline);
    const diffMs = deadline - now;
    return Math.max(0, Math.floor(diffMs / (1000 * 60))); // return in minutes
  }

  canClose() {
    return this.status === 'resolved';
  }

  canReopen() {
    return this.status === 'closed';
  }

  static generateTicketNumber(sequence, year = new Date().getFullYear()) {
    return `TT-${year}-${sequence.toString().padStart(4, '0')}`;
  }
}

module.exports = TroubleTicket;
