const express = require('express');
const router = express.Router();

function createNotificationRoutes({
  notificationController,
  authMiddleware
}) {
  // Semua endpoint membutuhkan autentikasi
  router.use(authMiddleware);

  // Endpoint untuk stats
  router.get('/stats', notificationController.getStats.bind(notificationController));

  // Endpoint untuk mark all as read (harus sebelum /:id agar tidak terbaca sebagai parameter id)
  router.patch('/read-all', notificationController.markAllAsRead.bind(notificationController));

  // Endpoint CRUD & aksi spesifik
  router.get('/', notificationController.getList.bind(notificationController));
  router.patch('/:id/read', notificationController.markAsRead.bind(notificationController));
  router.delete('/:id', notificationController.delete.bind(notificationController));

  return router;
}

module.exports = createNotificationRoutes;
