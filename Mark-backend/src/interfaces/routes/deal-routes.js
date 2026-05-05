const express = require('express');

function createDealRouter({ dealController, authMiddleware }) {
  const router = express.Router();

  router.use(authMiddleware);

  router.get('/kanban', (req, res, next) => dealController.getKanban(req, res, next));
  router.post('/', (req, res, next) => dealController.create(req, res, next));
  router.patch('/:id/move-stage', (req, res, next) => dealController.moveStage(req, res, next));

  return router;
}

module.exports = createDealRouter;
