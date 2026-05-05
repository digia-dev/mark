class Installation {
  constructor({
    id,
    inst_number,
    customer_id,
    deal_id,
    product_id,
    sales_id,
    technician_id,
    address,
    area,
    scheduled_date,
    start_date,
    target_end_date,
    actual_end_date,
    duration_days,
    status = 'scheduled',
    current_stage = 'survey',
    notes,
    created_by,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.inst_number = inst_number;
    this.customer_id = customer_id;
    this.deal_id = deal_id;
    this.product_id = product_id;
    this.sales_id = sales_id;
    this.technician_id = technician_id;
    this.address = address;
    this.area = area;
    this.scheduled_date = scheduled_date;
    this.start_date = start_date;
    this.target_end_date = target_end_date;
    this.actual_end_date = actual_end_date;
    this.duration_days = duration_days;
    this.status = status;
    this.current_stage = current_stage;
    this.notes = notes;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  isOverdue() {
    if (this.status === 'done' || this.status === 'cancelled') return false;
    return new Date() > new Date(this.target_end_date);
  }

  static generateNumber(sequence, year = new Date().getFullYear()) {
    return `INST-${year}-${sequence.toString().padStart(4, '0')}`;
  }
}

module.exports = Installation;
