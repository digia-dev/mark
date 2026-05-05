class DeleteInvoiceUseCase {
  constructor({ invoiceRepository }) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(id) {
    const existing = await this.invoiceRepository.findById(id);
    if (!existing) {
      throw new Error('Invoice tidak ditemukan');
    }

    if (existing.status !== 'draft') {
      throw new Error('Hanya invoice draft yang dapat dihapus');
    }

    return await this.invoiceRepository.delete(id);
  }
}

module.exports = DeleteInvoiceUseCase;
