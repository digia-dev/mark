const express = require('express');

function createLeadRouter({ leadController, authMiddleware }) {
  const router = express.Router();

  router.use(authMiddleware);

  router.post('/', (req, res, next) => leadController.create(req, res, next));
  router.get('/', (req, res, next) => leadController.getList(req, res, next));
  router.put('/:id', (req, res, next) => leadController.update(req, res, next));
  router.post('/:id/convert', (req, res, next) => leadController.convert(req, res, next));

  return router;
}

module.exports = createLeadRouter;
