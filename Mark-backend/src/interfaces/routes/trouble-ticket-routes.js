const express = require('express');

const createTroubleTicketRoutes = ({ troubleTicketController, authMiddleware }) => {
  const router = express.Router();

  router.use(authMiddleware);

  router.get('/', troubleTicketController.list.bind(troubleTicketController));
  router.post('/', troubleTicketController.create.bind(troubleTicketController));
  router.patch('/:id/status', troubleTicketController.updateStatus.bind(troubleTicketController));

  return router;
};

module.exports = createTroubleTicketRoutes;
