class GetInvoiceDetailUseCase {
  constructor({ invoiceRepository }) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(id) {
    const invoice = await this.invoiceRepository.findById(id);
    if (!invoice) {
      throw new Error('Invoice tidak ditemukan');
    }
    return invoice;
  }
}

module.exports = GetInvoiceDetailUseCase;
