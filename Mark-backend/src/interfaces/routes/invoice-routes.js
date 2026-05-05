const express = require('express');
const router = express.Router();

module.exports = ({ invoiceController, authMiddleware }) => {
  router.use(authMiddleware);

  router.get('/', (req, res) => invoiceController.list(req, res));
  router.get('/stats', (req, res) => invoiceController.getStats(req, res));
  router.post('/', (req, res) => invoiceController.create(req, res));
  
  router.get('/:id', (req, res) => invoiceController.detail(req, res));
  router.put('/:id', (req, res) => invoiceController.update(req, res));
  router.delete('/:id', (req, res) => invoiceController.delete(req, res));
  
  router.post('/:id/record-payment', (req, res) => invoiceController.recordPayment(req, res));
  router.patch('/:id/send', (req, res) => invoiceController.send(req, res));
  router.get('/:id/pdf', (req, res) => invoiceController.generatePdf(req, res));

  return router;
};
