class SendInvoiceUseCase {
  constructor({ invoiceRepository, mailService, notificationService }) {
    this.invoiceRepository = invoiceRepository;
    this.mailService = mailService;
    this.notificationService = notificationService;
  }

  async execute(id) {
    const invoice = await this.invoiceRepository.findById(id);
    if (!invoice) {
      throw new Error('Invoice tidak ditemukan');
    }

    if (!invoice.customer || !invoice.customer.email) {
      throw new Error('Customer tidak memiliki alamat email');
    }

    // Simulate sending email
    if (this.mailService) {
      await this.mailService.sendInvoice(invoice.customer.email, invoice);
    }

    // Update status to unpaid if it was draft
    const newStatus = invoice.status === 'draft' ? 'unpaid' : invoice.status;
    
    await this.invoiceRepository.updateStatus(id, newStatus, { sent_at: new Date() });

    if (this.notificationService) {
      await this.notificationService.notifyCustomer(invoice.customer_id, `Invoice ${invoice.inv_number} telah diterbitkan.`);
    }

    return await this.invoiceRepository.findById(id);
  }
}

module.exports = SendInvoiceUseCase;
