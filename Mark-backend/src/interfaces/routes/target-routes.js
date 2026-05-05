const express = require('express');

function createTargetRoutes({ targetController, authMiddleware }) {
  const router = express.Router();

  router.use(authMiddleware);

  router.get('/', (req, res, next) => targetController.getTarget(req, res, next));
  router.post('/', (req, res, next) => targetController.createTarget(req, res, next));

  return router;
}

module.exports = createTargetRoutes;
