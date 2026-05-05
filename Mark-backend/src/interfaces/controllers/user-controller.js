const { successResponse } = require('../../shared/response');

class UserController {
  constructor({
    getUserListUseCase,
    getUserDetailUseCase,
    createUserUseCase,
    updateUserUseCase,
    deleteUserUseCase,
    changePasswordUseCase
  }) {
    this.getUserListUseCase = getUserListUseCase;
    this.getUserDetailUseCase = getUserDetailUseCase;
    this.createUserUseCase = createUserUseCase;
    this.updateUserUseCase = updateUserUseCase;
    this.deleteUserUseCase = deleteUserUseCase;
    this.changePasswordUseCase = changePasswordUseCase;
  }

  async list(req, res, next) {
    try {
      const result = await this.getUserListUseCase.execute(req.query);
      res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async detail(req, res, next) {
    try {
      const result = await this.getUserDetailUseCase.execute(req.params.id);
      res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const result = await this.createUserUseCase.execute(req.body);
      res.status(201).json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const result = await this.updateUserUseCase.execute(req.params.id, req.body);
      res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await this.deleteUserUseCase.execute(req.params.id);
      res.json(successResponse({ message: 'User berhasil dihapus' }));
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const id = req.params.id === 'me' ? req.user.id : req.params.id;
      await this.changePasswordUseCase.execute(id, req.body);
      res.json(successResponse({ message: 'Password berhasil diubah' }));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
