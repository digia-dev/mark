class Quotation {
  constructor({
    id,
    quot_number,
    customer_id,
    lead_id,
    deal_id,
    sales_id,
    area,
    status = 'draft',
    valid_until,
    subtotal,
    discount = 0,
    tax_rate = 0.11,
    tax,
    total,
    currency = 'IDR',
    notes,
    terms,
    version = 1,
    parent_id,
    sent_at,
    approved_at,
    rejected_at,
    pdf_url,
    created_by,
    created_at,
    updated_at
  }) {
    this.id = id;
    this.quot_number = quot_number;
    this.customer_id = customer_id;
    this.lead_id = lead_id;
    this.deal_id = deal_id;
    this.sales_id = sales_id;
    this.area = area;
    this.status = status;
    this.valid_until = valid_until;
    this.subtotal = subtotal;
    this.discount = discount;
    this.tax_rate = tax_rate;
    this.tax = tax;
    this.total = total;
    this.currency = currency;
    this.notes = notes;
    this.terms = terms;
    this.version = version;
    this.parent_id = parent_id;
    this.sent_at = sent_at;
    this.approved_at = approved_at;
    this.rejected_at = rejected_at;
    this.pdf_url = pdf_url;
    this.created_by = created_by;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  isExpired() {
    return new Date() > new Date(this.valid_until);
  }

  canBeSent() {
    return this.status === 'draft';
  }

  canBeApproved() {
    return this.status === 'sent';
  }

  static calculateTotals(items, discount = 0, taxRate = 0.11) {
    const subtotal = items.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);

    const tax = (subtotal - discount) * taxRate;
    const total = subtotal - discount + tax;

    return {
      subtotal,
      tax,
      total
    };
  }

  static generateNumber(sequence, year = new Date().getFullYear()) {
    return `Q-${year}-${sequence.toString().padStart(4, '0')}`;
  }
}

module.exports = Quotation;
