const express = require('express');

function createLeadRouter({ leadController, authMiddleware }) {
  const router = express.Router();

  router.use(authMiddleware);

  router.post('/', (req, res, next) => leadController.create(req, res, next));
  router.get('/', (req, res, next) => leadController.getList(req, res, next));
  router.post('/import', (req, res, next) => leadController.importLeads(req, res, next));
  router.get('/export', (req, res, next) => leadController.exportLeads(req, res, next));
  router.get('/:id', (req, res, next) => leadController.getDetail(req, res, next));
  router.put('/:id', (req, res, next) => leadController.update(req, res, next));
  router.delete('/:id', (req, res, next) => leadController.delete(req, res, next));
  router.patch('/:id/status', (req, res, next) => leadController.updateStatus(req, res, next));
  router.patch('/:id/assign', (req, res, next) => leadController.assign(req, res, next));
  router.post('/:id/convert', (req, res, next) => leadController.convert(req, res, next));

  return router;
}

module.exports = createLeadRouter;
