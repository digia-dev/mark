const express = require('express');
const { productSchema } = require('../dtos/product-dto');
const validate = require('../middlewares/validate-request');
const roleMiddleware = require('../middlewares/role-middleware');

function createProductRouter({ productController, authMiddleware, activityLogger }) {
  const router = express.Router();

  // Public read access for authenticated users
  router.use(authMiddleware);

  router.get('/', (req, res, next) => productController.list(req, res, next));
  router.get('/:id', (req, res, next) => productController.detail(req, res, next));

  // Write operations restricted to super-admin and admin
  router.post(
    '/',
    roleMiddleware(['super-admin', 'admin']),
    validate(productSchema),
    (req, res, next) => productController.create(req, res, next),
    activityLogger
  );

  router.put(
    '/:id',
    roleMiddleware(['super-admin', 'admin']),
    validate(productSchema),
    (req, res, next) => productController.update(req, res, next),
    activityLogger
  );

  router.delete(
    '/:id',
    roleMiddleware(['super-admin', 'admin']),
    (req, res, next) => productController.delete(req, res, next),
    activityLogger
  );

  router.patch(
    '/:id/status',
    roleMiddleware(['super-admin', 'admin']),
    (req, res, next) => productController.updateStatus(req, res, next),
    activityLogger
  );

  return router;
}

module.exports = createProductRouter;
