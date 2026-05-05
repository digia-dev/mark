class GetCustomerListUseCase {
  constructor({ customerRepository }) {
    this.customerRepository = customerRepository;
  }

  async execute(params) {
    const { page = 1, limit = 10, search, status, type, area, salesId, branchId } = params;
    
    const offset = (page - 1) * limit;
    
    const [customers, total] = await Promise.all([
      this.customerRepository.findAll({
        offset,
        limit: parseInt(limit),
        search,
        status,
        type,
        area,
        salesId,
        branchId
      }),
      this.customerRepository.count({
        search,
        status,
        type,
        area,
        salesId,
        branchId
      })
    ]);

    return {
      customers,
      meta: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        total_pages: Math.ceil(total / limit)
      }
    };
  }
}

module.exports = GetCustomerListUseCase;
