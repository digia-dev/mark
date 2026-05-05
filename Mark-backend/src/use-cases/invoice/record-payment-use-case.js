const Invoice = require('../../domain/entities/invoice');
const Payment = require('../../domain/entities/payment');

class RecordPaymentUseCase {
  constructor({ invoiceRepository, paymentRepository }) {
    this.invoiceRepository = invoiceRepository;
    this.paymentRepository = paymentRepository;
  }

  async execute(invoiceId, paymentData) {
    const invoiceRecord = await this.invoiceRepository.findById(invoiceId);
    if (!invoiceRecord) {
      throw new Error('Invoice tidak ditemukan');
    }

    const invoice = new Invoice(invoiceRecord);
    const amountPaid = Number(paymentData.amount);

    if (amountPaid <= 0) {
      throw new Error('Jumlah pembayaran harus lebih dari 0');
    }

    if (amountPaid > invoice.getRemainingBalance()) {
      throw new Error('Jumlah pembayaran melebihi sisa tagihan');
    }

    const year = new Date(paymentData.paid_at || new Date()).getFullYear();
    const latestPaymentNumber = await this.paymentRepository.getLatestNumber(year);
    
    let sequence = 1;
    if (latestPaymentNumber) {
      const parts = latestPaymentNumber.split('-');
      if (parts.length === 3) {
        sequence = parseInt(parts[2]) + 1;
      }
    }
    
    const pay_number = Payment.generatePaymentNumber(sequence, year);

    // Create payment record
    const payment = await this.paymentRepository.create({
      ...paymentData,
      pay_number,
      invoice_id: invoiceId
    });

    // Update invoice status & paid amount
    const newStatus = invoice.updatePaymentStatus(amountPaid);
    
    const updateData = {
      paid_amount: invoice.paid_amount,
      remaining: invoice.remaining,
      status: newStatus
    };
    
    if (newStatus === 'paid') {
      updateData.paid_at = paymentData.paid_at || new Date();
    }

    await this.invoiceRepository.updateStatus(invoiceId, newStatus, updateData);

    return payment;
  }
}

module.exports = RecordPaymentUseCase;
