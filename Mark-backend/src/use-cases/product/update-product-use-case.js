class UpdateProductUseCase {
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  async execute(id, data) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.code = 'NOT_FOUND';
      throw error;
    }

    return await this.productRepository.update(id, data);
  }
}

module.exports = UpdateProductUseCase;
