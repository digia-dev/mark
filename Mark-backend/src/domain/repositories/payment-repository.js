class PaymentRepository {
  async create(data) { throw new Error('Not implemented'); }
  async findById(id) { throw new Error('Not implemented'); }
  async findAll(filters) { throw new Error('Not implemented'); }
  async getLatestNumber(year) { throw new Error('Not implemented'); }
  async findByInvoiceId(invoiceId) { throw new Error('Not implemented'); }
}

module.exports = PaymentRepository;
