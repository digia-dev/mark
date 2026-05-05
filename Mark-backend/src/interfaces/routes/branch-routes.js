const express = require('express');
const { branchSchema } = require('../dtos/branch-dto');
const validate = require('../middlewares/validate-request');
const roleMiddleware = require('../middlewares/role-middleware');

function createBranchRouter({ branchController, authMiddleware, activityLogger }) {
  const router = express.Router();

  // All routes require authentication
  router.use(authMiddleware);

  router.get('/', (req, res, next) => branchController.list(req, res, next));

  router.post(
    '/',
    roleMiddleware(['super-admin', 'admin']),
    validate(branchSchema),
    (req, res, next) => branchController.create(req, res, next),
    activityLogger // Catat log setelah berhasil
  );

  router.put(
    '/:id',
    roleMiddleware(['super-admin', 'admin']),
    validate(branchSchema),
    (req, res, next) => branchController.update(req, res, next),
    activityLogger
  );

  router.delete(
    '/:id',
    roleMiddleware(['super-admin']),
    (req, res, next) => branchController.delete(req, res, next),
    activityLogger
  );

  return router;
}

module.exports = createBranchRouter;
