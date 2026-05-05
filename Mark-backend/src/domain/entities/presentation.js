class Presentation {
  constructor({
    id,
    pres_number,
    customer_id,
    sales_id,
    title,
    presentation_date,
    location,
    status = 'scheduled',
    notes,
    feedback,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.pres_number = pres_number;
    this.customer_id = customer_id;
    this.sales_id = sales_id;
    this.title = title;
    this.presentation_date = presentation_date;
    this.location = location;
    this.status = status;
    this.notes = notes;
    this.feedback = feedback;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}

module.exports = Presentation;
