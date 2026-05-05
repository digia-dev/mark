const { successResponse } = require('../../shared/response');

class AuthController {
  constructor({ loginUseCase, logoutUseCase, refreshTokenUseCase, getProfileUseCase, registerUseCase }) {
    this.loginUseCase = loginUseCase;
    this.logoutUseCase = logoutUseCase;
    this.refreshTokenUseCase = refreshTokenUseCase;
    this.getProfileUseCase = getProfileUseCase;
    this.registerUseCase = registerUseCase;
  }

  async register(req, res, next) {
    try {
      const result = await this.registerUseCase.execute(req.body);
      res.status(201).json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await this.loginUseCase.execute(req.body);
      res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const refreshToken = req.body.refreshToken || req.headers['x-refresh-token'];
      await this.logoutUseCase.execute({ refreshToken });
      res.json(successResponse({ message: 'Logout berhasil' }));
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.body.refreshToken || req.headers['x-refresh-token'];
      const result = await this.refreshTokenUseCase.execute({ refreshToken });
      res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const result = await this.getProfileUseCase.execute(req.user.id);
      res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
