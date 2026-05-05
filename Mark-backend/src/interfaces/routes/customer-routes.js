const express = require('express');

function createCustomerRouter({ customerController, authMiddleware, activityLogger }) {
  const router = express.Router();

  router.use(authMiddleware);
  // Inject activityLogger for use in controller
  router.use((req, res, next) => {
    req.activityLogger = activityLogger;
    next();
  });

  router.post('/', (req, res, next) => customerController.create(req, res, next));
  router.get('/', (req, res, next) => customerController.getList(req, res, next));
  
  // Specific routes
  router.get('/stats', (req, res, next) => customerController.getStats(req, res, next));
  router.post('/import', (req, res, next) => customerController.importCustomers(req, res, next));
  router.get('/export', (req, res, next) => customerController.exportCustomers(req, res, next));
  
  // Parameterized routes
  router.get('/:id', (req, res, next) => customerController.getDetail(req, res, next));
  router.put('/:id', (req, res, next) => customerController.update(req, res, next));
  router.delete('/:id', (req, res, next) => customerController.delete(req, res, next));
  
  // Sub-resources
  router.get('/:id/interactions', (req, res, next) => customerController.getInteractions(req, res, next));
  router.post('/:id/interactions', (req, res, next) => customerController.addInteraction(req, res, next));
  router.get('/:id/services', (req, res, next) => customerController.getServices(req, res, next));
  router.get('/:id/invoices', (req, res, next) => customerController.getInvoices(req, res, next));
  router.get('/:id/tickets', (req, res, next) => customerController.getTickets(req, res, next));

  return router;
}

module.exports = createCustomerRouter;
