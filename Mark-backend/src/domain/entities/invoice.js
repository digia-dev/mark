class Invoice {
  constructor({
    id,
    inv_number,
    customer_id,
    quotation_id,
    sales_id,
    type = 'penagihan',
    period_start,
    period_end,
    invoice_date,
    due_date,
    subtotal,
    discount = 0,
    tax_rate = 0.11,
    tax,
    total,
    status = 'unpaid',
    notes,
    pdf_url,
    paid_at,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.inv_number = inv_number;
    this.customer_id = customer_id;
    this.quotation_id = quotation_id;
    this.sales_id = sales_id;
    this.type = type;
    this.period_start = period_start;
    this.period_end = period_end;
    this.invoice_date = invoice_date;
    this.due_date = due_date;
    this.subtotal = subtotal;
    this.discount = discount;
    this.tax_rate = tax_rate;
    this.tax = tax;
    this.total = total;
    this.status = status;
    this.notes = notes;
    this.pdf_url = pdf_url;
    this.paid_at = paid_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  isOverdue() {
    if (this.status === 'paid' || this.status === 'cancelled') return false;
    return new Date() > new Date(this.due_date);
  }

  static generateNumber(sequence, year = new Date().getFullYear()) {
    return `INV-${year}-${sequence.toString().padStart(4, '0')}`;
  }
}

module.exports = Invoice;
