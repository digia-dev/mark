class DeleteProductUseCase {
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.code = 'NOT_FOUND';
      throw error;
    }

    return await this.productRepository.delete(id);
  }
}

module.exports = DeleteProductUseCase;
