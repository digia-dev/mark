const express = require('express');

function createReportRouter({ reportController, authMiddleware }) {
  const router = express.Router();

  router.use(authMiddleware);

  router.get('/dashboard', (req, res, next) => reportController.getDashboardStats(req, res, next));

  return router;
}

module.exports = createReportRouter;
