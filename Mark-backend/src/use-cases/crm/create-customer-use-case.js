const Customer = require('../../domain/entities/customer');

class CreateCustomerUseCase {
  constructor({ customerRepository }) {
    this.customerRepository = customerRepository;
  }

  async execute(customerData) {
    // 1. Generate Customer Code
    const year = new Date().getFullYear();
    const lastCode = await this.customerRepository.getLatestCustomerCode(year);
    
    let sequence = 1;
    if (lastCode) {
      const parts = lastCode.split('-');
      sequence = parseInt(parts[2]) + 1;
    }
    
    const customerCode = `CUS-${year}-${sequence.toString().padStart(6, '0')}`;
    
    // 2. Create Entity
    const customer = Customer.create({
      ...customerData,
      customer_code: customerCode
    });

    // 3. Save to Repository
    return await this.customerRepository.create(customer);
  }
}

module.exports = CreateCustomerUseCase;
