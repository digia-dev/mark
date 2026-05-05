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

  canUpdateStage(newStage) {
    const stages = ['survey', 'preparation', 'installation', 'testing'];
    const currentIndex = stages.indexOf(this.current_stage);
    const nextIndex = stages.indexOf(newStage);
    
    // Allow moving forward or staying in the same stage
    return nextIndex >= currentIndex;
  }

  getDuration() {
    if (!this.start_date || !this.actual_end_date) return this.duration_days || 0;
    const start = new Date(this.start_date);
    const end = new Date(this.actual_end_date);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  static generateInstNumber(sequence, year = new Date().getFullYear()) {
    return `INST-${year}-${sequence.toString().padStart(4, '0')}`;
  }
}

module.exports = Installation;
