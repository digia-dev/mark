class Lead {
  constructor({
    id,
    name,
    company,
    phone,
    email,
    address,
    area,
    source,
    status,
    assigned_to,
    notes,
    follow_up_date,
    lost_reason,
    converted_at,
    customer_id,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.name = name;
    this.company = company;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.area = area;
    this.source = source;
    this.status = status;
    this.assigned_to = assigned_to;
    this.notes = notes;
    this.follow_up_date = follow_up_date;
    this.lost_reason = lost_reason;
    this.converted_at = converted_at;
    this.customer_id = customer_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static create(data) {
    if (!data.name) throw new Error('Lead name is required');
    if (!data.phone) throw new Error('Lead phone is required');

    return new Lead({
      ...data,
      status: data.status || 'new',
      created_at: data.created_at || new Date(),
      updated_at: data.updated_at || new Date()
    });
  }
}

module.exports = Lead;
