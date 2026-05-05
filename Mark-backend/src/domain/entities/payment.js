class Payment {
  static generatePaymentNumber(sequence, year = new Date().getFullYear()) {
    const formattedSequence = String(sequence).padStart(4, '0');
    return `PAY-${year}-${formattedSequence}`;
  }

  constructor(data) {
    this.id = data.id;
    this.pay_number = data.pay_number;
    this.invoice_id = data.invoice_id;
    this.amount = data.amount;
    this.method = data.method;
    this.bank_name = data.bank_name;
    this.account_number = data.account_number;
    this.reference = data.reference;
    this.notes = data.notes;
    this.paid_by = data.paid_by;
    this.paid_at = data.paid_at;
    this.created_by = data.created_by;
  }
}

module.exports = Payment;
