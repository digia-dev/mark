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
  router.get('/:id', (req, res, next) => customerController.getDetail(req, res, next));
  router.put('/:id', (req, res, next) => customerController.update(req, res, next));

  return router;
}

module.exports = createCustomerRouter;
