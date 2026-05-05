const express = require('express');

const createInstallationRoutes = ({ installationController, authMiddleware }) => {
  const router = express.Router();

  router.use(authMiddleware);

  router.get('/', installationController.list.bind(installationController));
  router.post('/', installationController.schedule.bind(installationController));
  router.patch('/:id/status', installationController.updateStatus.bind(installationController));

  return router;
};

module.exports = createInstallationRoutes;
