class SendQuotationUseCase {
  constructor({ quotationRepository, pdfService, mailService }) {
    this.quotationRepository = quotationRepository;
    this.pdfService = pdfService;
    this.mailService = mailService;
  }

  async execute(id) {
    const quotation = await this.quotationRepository.findById(id);
    if (!quotation) throw new Error('QUOTATION_NOT_FOUND');
    if (quotation.status !== 'draft') throw new Error('QUOTATION_ALREADY_SENT');

    // 1. Generate PDF
    const pdfBuffer = await this.pdfService.generateQuotationPdf(quotation);

    // 2. Send Email
    const targetEmail = quotation.customer?.email || quotation.lead?.email;
    if (!targetEmail) throw new Error('CUSTOMER_EMAIL_NOT_FOUND');

    await this.mailService.sendQuotationEmail(targetEmail, quotation, pdfBuffer);

    // 3. Update Status
    return await this.quotationRepository.updateStatus(id, 'sent', { sent_at: new Date() });
  }
}

module.exports = SendQuotationUseCase;
