const { successResponse } = require('../../shared/response');

class SettingController {
  constructor({
    getCompanyProfileUseCase,
    updateCompanyProfileUseCase,
    getSettingsUsersUseCase,
    getPreferencesUseCase,
    updatePreferencesUseCase
  }) {
    this.getCompanyProfileUseCase = getCompanyProfileUseCase;
    this.updateCompanyProfileUseCase = updateCompanyProfileUseCase;
    this.getSettingsUsersUseCase = getSettingsUsersUseCase;
    this.getPreferencesUseCase = getPreferencesUseCase;
    this.updatePreferencesUseCase = updatePreferencesUseCase;
  }

  async getCompanyProfile(req, res, next) {
    try {
      const result = await this.getCompanyProfileUseCase.execute();
      res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async updateCompanyProfile(req, res, next) {
    try {
      const result = await this.updateCompanyProfileUseCase.execute(req.body);
      res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const result = await this.getSettingsUsersUseCase.execute();
      res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async getPreferences(req, res, next) {
    try {
      const result = await this.getPreferencesUseCase.execute();
      res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }

  async updatePreferences(req, res, next) {
    try {
      const result = await this.updatePreferencesUseCase.execute(req.body);
      res.json(successResponse(result));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SettingController;
