class DeleteCustomerUseCase {
  constructor({ customerRepository }) {
    this.customerRepository = customerRepository;
  }

  async execute(id) {
    return await this.customerRepository.delete(parseInt(id));
  }
}

module.exports = DeleteCustomerUseCase;
