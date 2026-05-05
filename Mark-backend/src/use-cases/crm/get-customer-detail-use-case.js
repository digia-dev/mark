class GetCustomerDetailUseCase {
  constructor({ customerRepository }) {
    this.customerRepository = customerRepository;
  }

  async execute(id) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer;
  }
}

module.exports = GetCustomerDetailUseCase;
