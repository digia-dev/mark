class GeneratePdfUseCase {
  constructor({ invoiceRepository, pdfService }) {
    this.invoiceRepository = invoiceRepository;
    this.pdfService = pdfService;
  }

  async execute(id) {
    const invoice = await this.invoiceRepository.findById(id);
    if (!invoice) {
      throw new Error('Invoice tidak ditemukan');
    }

    if (this.pdfService) {
      // Simulate PDF Generation
      const pdfUrl = await this.pdfService.generateInvoicePdf(invoice);
      await this.invoiceRepository.updateStatus(id, invoice.status, { pdf_url: pdfUrl });
      return { pdf_url: pdfUrl };
    }

    // Mock response if service not available
    const fakeUrl = `/uploads/invoices/${invoice.inv_number}.pdf`;
    await this.invoiceRepository.updateStatus(id, invoice.status, { pdf_url: fakeUrl });
    return { pdf_url: fakeUrl };
  }
}

module.exports = GeneratePdfUseCase;
