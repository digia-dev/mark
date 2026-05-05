class ToggleProductStatusUseCase {
  constructor({ productRepository }) {
    this.productRepository = productRepository;
  }

  async execute(id, status) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.code = 'NOT_FOUND';
      throw error;
    }

    const allowedStatus = ['active', 'inactive', 'promo'];
    if (!allowedStatus.includes(status)) {
      const error = new Error('Invalid status');
      error.code = 'VALIDATION_ERROR';
      throw error;
    }

    return await this.productRepository.updateStatus(id, status);
  }
}

module.exports = ToggleProductStatusUseCase;
