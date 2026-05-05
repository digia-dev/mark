const { successResponse } = require('../../shared/response');

class BranchController {
  constructor({ 
    getBranchListUseCase, 
    createBranchUseCase, 
    updateBranchUseCase, 
    deleteBranchUseCase 
  }) {
    this.getBranchListUseCase = getBranchListUseCase;
    this.createBranchUseCase = createBranchUseCase;
    this.updateBranchUseCase = updateBranchUseCase;
    this.deleteBranchUseCase = deleteBranchUseCase;
  }

  async list(req, res, next) {
    try {
      const branches = await this.getBranchListUseCase.execute();
      return res.status(200).json(successResponse(branches));
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const branch = await this.createBranchUseCase.execute(req.body);
      return res.status(201).json(successResponse(branch));
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const branch = await this.updateBranchUseCase.execute(id, req.body);
      return res.status(200).json(successResponse(branch));
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.deleteBranchUseCase.execute(id);
      return res.status(200).json(successResponse({ message: 'Branch deleted successfully' }));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BranchController;
