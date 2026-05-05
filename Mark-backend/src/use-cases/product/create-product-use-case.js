class CreateProductUseCase {
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  async execute(data) {
    return await this.productRepository.create(data);
  }
}

module.exports = CreateProductUseCase;
