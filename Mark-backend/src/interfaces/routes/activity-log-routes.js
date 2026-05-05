const express = require('express');
const router = express.Router();

function createActivityLogRoutes({
  activityLogController,
  authMiddleware,
  roleMiddleware
}) {
  // Semua endpoint membutuhkan autentikasi
  router.use(authMiddleware);
  
  // Endpoint ini idealnya dibatasi hanya untuk admin atau super-admin
  // router.use(roleMiddleware(['super-admin', 'admin']));

  // Endpoint untuk stats
  router.get('/stats', activityLogController.getStats.bind(activityLogController));

  // Endpoint untuk list activity logs
  router.get('/', activityLogController.getList.bind(activityLogController));

  return router;
}

module.exports = createActivityLogRoutes;
