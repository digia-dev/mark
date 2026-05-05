class Invoice {
  static generateInvoiceNumber(sequence, year = new Date().getFullYear()) {
    const formattedSequence = String(sequence).padStart(4, '0');
    return `INV-${year}-${formattedSequence}`;
  }

  static calculateTotal(items = [], discount = 0, taxRate = 0.11) {
    let subtotal = 0;
    items.forEach(item => {
      subtotal += (item.qty * item.unit_price);
    });
    const tax = (subtotal - discount) * taxRate;
    const total = subtotal - discount + tax;
    
    return {
      subtotal,
      tax,
      total
    };
  }

  constructor(data) {
    this.id = data.id;
    this.inv_number = data.inv_number;
    this.customer_id = data.customer_id;
    this.quotation_id = data.quotation_id;
    this.sales_id = data.sales_id;
    this.type = data.type || 'penagihan';
    this.subtotal = data.subtotal || 0;
    this.tax_rate = data.tax_rate || 0.11;
    this.tax = data.tax || 0;
    this.discount = data.discount || 0;
    this.total = data.total || 0;
    this.paid_amount = data.paid_amount || 0;
    this.remaining = data.remaining || this.total;
    this.status = data.status || 'draft';
    this.invoice_date = data.invoice_date;
    this.due_date = data.due_date;
  }

  getRemainingBalance() {
    return Math.max(0, this.total - this.paid_amount);
  }

  isOverdue() {
    const now = new Date();
    return ['unpaid', 'partial'].includes(this.status) && new Date(this.due_date) < now;
  }

  isPaid() {
    return this.status === 'paid';
  }

  updatePaymentStatus(amountPaid) {
    const newPaidAmount = Number(this.paid_amount) + Number(amountPaid);
    this.paid_amount = newPaidAmount;
    this.remaining = Math.max(0, this.total - this.paid_amount);
    
    if (this.remaining <= 0) {
      this.status = 'paid';
    } else if (newPaidAmount > 0) {
      this.status = 'partial';
    }
    return this.status;
  }
}

module.exports = Invoice;
