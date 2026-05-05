const { successResponse } = require('../../shared/response');

class ProductController {
  constructor({
    getProductListUseCase,
    getProductDetailUseCase,
    createProductUseCase,
    updateProductUseCase,
    deleteProductUseCase,
    toggleProductStatusUseCase
  }) {
    this.getProductListUseCase = getProductListUseCase;
    this.getProductDetailUseCase = getProductDetailUseCase;
    this.createProductUseCase = createProductUseCase;
    this.updateProductUseCase = updateProductUseCase;
    this.deleteProductUseCase = deleteProductUseCase;
    this.toggleProductStatusUseCase = toggleProductStatusUseCase;
  }

  async list(req, res, next) {
    try {
      const results = await this.getProductListUseCase.execute(req.query);
      return res.status(200).json(successResponse(results.data, results.meta));
    } catch (error) {
      next(error);
    }
  }

  async detail(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.getProductDetailUseCase.execute(id);
      return res.status(200).json(successResponse(product));
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const product = await this.createProductUseCase.execute(req.body);
      return res.status(201).json(successResponse(product));
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.updateProductUseCase.execute(id, req.body);
      return res.status(200).json(successResponse(product));
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.deleteProductUseCase.execute(id);
      return res.status(200).json(successResponse({ message: 'Product deleted successfully' }));
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const product = await this.toggleProductStatusUseCase.execute(id, status);
      return res.status(200).json(successResponse(product));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
