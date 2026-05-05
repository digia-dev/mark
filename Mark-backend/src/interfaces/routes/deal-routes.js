const express = require('express');

function createDealRouter({ dealController, authMiddleware }) {
  const router = express.Router();

  router.use(authMiddleware);

  router.get('/kanban', (req, res, next) => dealController.getKanban(req, res, next));
  router.get('/summary', (req, res, next) => dealController.getSummary(req, res, next));
  router.get('/', (req, res, next) => dealController.getList(req, res, next));
  router.post('/', (req, res, next) => dealController.create(req, res, next));
  router.get('/:id', (req, res, next) => dealController.getDetail(req, res, next));
  router.put('/:id', (req, res, next) => dealController.update(req, res, next));
  router.delete('/:id', (req, res, next) => dealController.delete(req, res, next));
  router.patch('/:id/move-stage', (req, res, next) => dealController.moveStage(req, res, next));
  router.patch('/:id/probability', (req, res, next) => dealController.updateProbability(req, res, next));
  router.post('/:id/duplicate', (req, res, next) => dealController.duplicate(req, res, next));
  router.patch('/:id/won', (req, res, next) => dealController.markWon(req, res, next));
  router.patch('/:id/lost', (req, res, next) => dealController.markLost(req, res, next));

  return router;
}

module.exports = createDealRouter;
