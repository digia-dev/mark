class ConvertToInvoiceUseCase {
  constructor({ quotationRepository, createInvoiceUseCase }) {
    this.quotationRepository = quotationRepository;
    this.createInvoiceUseCase = createInvoiceUseCase;
  }

  async execute(quotationId) {
    const quotation = await this.quotationRepository.findById(quotationId);
    if (!quotation) throw new Error('QUOTATION_NOT_FOUND');
    if (quotation.status !== 'approved') throw new Error('ONLY_APPROVED_QUOTATION_CAN_BE_CONVERTED');

    const invoiceData = {
      customer_id: quotation.customer_id,
      quotation_id: quotation.id,
      subtotal: quotation.subtotal,
      discount: quotation.discount,
      tax_rate: quotation.tax_rate,
      due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      items: quotation.items.map(item => ({
        product_id: item.product_id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.total
      }))
    };

    const invoice = await this.createInvoiceUseCase.execute(invoiceData);

    // Update quotation with invoice reference
    await this.quotationRepository.update(quotationId, { invoice_id: invoice.id });

    return invoice;
  }
}

module.exports = ConvertToInvoiceUseCase;
