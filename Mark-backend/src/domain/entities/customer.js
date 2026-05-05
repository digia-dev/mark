class Customer {
  constructor({
    id,
    customer_code,
    name,
    type,
    email,
    phone,
    website,
    npwp,
    address,
    city,
    province,
    postal_code,
    lat,
    lng,
    area,
    sector,
    contact_person,
    status,
    sales_id,
    branch_id,
    since_date,
    notes,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.customer_code = customer_code;
    this.name = name;
    this.type = type;
    this.email = email;
    this.phone = phone;
    this.website = website;
    this.npwp = npwp;
    this.address = address;
    this.city = city;
    this.province = province;
    this.postal_code = postal_code;
    this.lat = lat;
    this.lng = lng;
    this.area = area;
    this.sector = sector;
    this.contact_person = contact_person;
    this.status = status;
    this.sales_id = sales_id;
    this.branch_id = branch_id;
    this.since_date = since_date;
    this.notes = notes;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static create(data) {
    // Basic domain validation
    if (!data.name) throw new Error('Customer name is required');
    if (!data.phone) throw new Error('Customer phone is required');
    if (!['personal', 'corporate'].includes(data.type)) {
      throw new Error('Invalid customer type');
    }

    return new Customer({
      ...data,
      status: data.status || 'active',
      created_at: data.created_at || new Date(),
      updated_at: data.updated_at || new Date()
    });
  }
}

module.exports = Customer;
