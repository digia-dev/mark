class GetProductListUseCase {
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  async execute(filters = {}) {
    const { status, category, technology, search, page = 1, limit = 10 } = filters;
    
    return await this.productRepository.findAll({
      status,
      category,
      technology,
      search,
      page: parseInt(page),
      limit: parseInt(limit)
    });
  }
}

module.exports = GetProductListUseCase;
