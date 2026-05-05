const { successResponse, errorResponse } = require('../../shared/response');

class InstallationController {
  constructor({ scheduleInstallationUseCase, getInstallationListUseCase, updateInstallationStatusUseCase }) {
    this.scheduleInstallationUseCase = scheduleInstallationUseCase;
    this.getInstallationListUseCase = getInstallationListUseCase;
    this.updateInstallationStatusUseCase = updateInstallationStatusUseCase;
  }

  async schedule(req, res) {
    try {
      const data = { ...req.body, sales_id: req.user.id };
      const installation = await this.scheduleInstallationUseCase.execute(data);
      res.status(201).json(successResponse(installation));
    } catch (error) {
      res.status(400).json(errorResponse('SCHEDULE_INSTALLATION_ERROR', error.message));
    }
  }

  async list(req, res) {
    try {
      const result = await this.getInstallationListUseCase.execute(req.query);
      res.json(successResponse(result.data, result.meta));
    } catch (error) {
      res.status(400).json(errorResponse('LIST_INSTALLATION_ERROR', error.message));
    }
  }

  async updateStatus(req, res) {
    try {
      const installation = await this.updateInstallationStatusUseCase.execute(parseInt(req.params.id), req.body);
      res.json(successResponse(installation));
    } catch (error) {
      res.status(400).json(errorResponse('UPDATE_STATUS_ERROR', error.message));
    }
  }
}

module.exports = InstallationController;
