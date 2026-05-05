class GeneratePdfUseCase {
  constructor({ quotationRepository, pdfService }) {
    this.quotationRepository = quotationRepository;
    this.pdfService = pdfService;
  }

  async execute(id) {
    const quotation = await this.quotationRepository.findById(id);
    if (!quotation) throw new Error('QUOTATION_NOT_FOUND');

    return await this.pdfService.generateQuotationPdf(quotation);
  }
}

module.exports = GeneratePdfUseCase;
