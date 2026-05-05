const express = require('express');
const router = express.Router();

module.exports = ({ troubleTicketController, authMiddleware }) => {
  router.use(authMiddleware);

  router.get('/', (req, res) => troubleTicketController.list(req, res));
  router.get('/stats', (req, res) => troubleTicketController.getStats(req, res));
  router.post('/', (req, res) => troubleTicketController.create(req, res));
  
  router.get('/:id', (req, res) => troubleTicketController.detail(req, res));
  router.put('/:id', (req, res) => troubleTicketController.update(req, res));
  router.patch('/:id/status', (req, res) => troubleTicketController.updateStatus(req, res));
  router.patch('/:id/assign', (req, res) => troubleTicketController.assign(req, res));
  router.post('/:id/notes', (req, res) => troubleTicketController.addNote(req, res));

  return router;
};
