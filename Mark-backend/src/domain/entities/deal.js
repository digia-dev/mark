class Deal {
  constructor({
    id,
    name,
    customer_id,
    lead_id,
    value,
    stage,
    probability,
    expected_closing_date,
    sales_id,
    area,
    status,
    notes,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.name = name;
    this.customer_id = customer_id;
    this.lead_id = lead_id;
    this.value = value;
    this.stage = stage;
    this.probability = probability;
    this.expected_closing_date = expected_closing_date;
    this.sales_id = sales_id;
    this.area = area;
    this.status = status;
    this.notes = notes;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static create(data) {
    if (!data.name) throw new Error('Deal name is required');
    if (!data.customer_id && !data.lead_id) throw new Error('Customer or Lead is required');

    return new Deal({
      ...data,
      stage: data.stage || 'prospek',
      probability: data.probability || 20,
      status: data.status || 'open',
      created_at: data.created_at || new Date(),
      updated_at: data.updated_at || new Date()
    });
  }
}

module.exports = Deal;
