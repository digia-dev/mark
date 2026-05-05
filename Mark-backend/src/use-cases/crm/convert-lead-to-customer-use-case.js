class ConvertLeadToCustomerUseCase {
  constructor({ leadRepository, customerRepository, createCustomerUseCase }) {
    this.leadRepository = leadRepository;
    this.customerRepository = customerRepository;
    this.createCustomerUseCase = createCustomerUseCase;
  }

  async execute(leadId, additionalData = {}) {
    const lead = await this.leadRepository.findById(leadId);
    if (!lead) {
      throw new Error('Lead not found');
    }

    if (lead.status === 'converted') {
      throw new Error('Lead is already converted');
    }

    // 1. Create Customer from Lead data
    const customerData = {
      name: lead.name,
      type: additionalData.type || 'personal', // Default to personal
      email: lead.email,
      phone: lead.phone,
      address: lead.address,
      area: lead.area,
      sales_id: lead.assigned_to,
      notes: `Converted from Lead: ${lead.notes || ''}`,
      ...additionalData
    };

    const customer = await this.createCustomerUseCase.execute(customerData);

    // 2. Update Lead status
    await this.leadRepository.update(leadId, {
      status: 'converted',
      converted_at: new Date(),
      customer_id: customer.id
    });

    return customer;
  }
}

module.exports = ConvertLeadToCustomerUseCase;
