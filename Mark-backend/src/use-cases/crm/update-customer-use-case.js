class UpdateCustomerUseCase {
  constructor({ customerRepository }) {
    this.customerRepository = customerRepository;
  }

  async execute(id, customerData) {
    const existing = await this.customerRepository.findById(id);
    if (!existing) {
      throw new Error('Customer not found');
    }

    return await this.customerRepository.update(id, customerData);
  }
}

module.exports = UpdateCustomerUseCase;
