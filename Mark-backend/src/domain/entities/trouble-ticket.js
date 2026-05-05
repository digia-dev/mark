class TroubleTicket {
  constructor({
    id,
    ticket_number,
    customer_id,
    service_id,
    title,
    description,
    category,
    sub_category,
    source,
    priority = 'medium',
    status = 'open',
    pic_id,
    assigned_to,
    sales_id,
    area,
    resolved_at,
    closed_at,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.ticket_number = ticket_number;
    this.customer_id = customer_id;
    this.service_id = service_id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.sub_category = sub_category;
    this.source = source;
    this.priority = priority;
    this.status = status;
    this.pic_id = pic_id;
    this.assigned_to = assigned_to;
    this.sales_id = sales_id;
    this.area = area;
    this.resolved_at = resolved_at;
    this.closed_at = closed_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static generateNumber(sequence, year = new Date().getFullYear()) {
    return `TT-${year}-${sequence.toString().padStart(4, '0')}`;
  }
}

module.exports = TroubleTicket;
