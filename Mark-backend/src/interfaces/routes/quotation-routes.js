const express = require('express');
const validate = require('../middlewares/validate-request');
const { createQuotationSchema, updateQuotationStatusSchema } = require('../dtos/quotation-dto');

const createQuotationRoutes = ({ quotationController, authMiddleware }) => {
  const router = express.Router();

  router.use(authMiddleware);

  router.get('/', quotationController.list.bind(quotationController));
  router.get('/search', quotationController.list.bind(quotationController));
  router.post('/', validate(createQuotationSchema), quotationController.create.bind(quotationController));
  router.get('/:id', quotationController.detail.bind(quotationController));
  router.put('/:id', quotationController.update.bind(quotationController));
  router.delete('/:id', quotationController.delete.bind(quotationController));
  
  router.post('/:id/send', quotationController.send.bind(quotationController));
  router.patch('/:id/status', validate(updateQuotationStatusSchema), quotationController.updateStatus.bind(quotationController));
  router.post('/:id/duplicate', quotationController.duplicate.bind(quotationController));
  router.get('/:id/pdf', quotationController.getPdf.bind(quotationController));
  router.post('/:id/convert', quotationController.convertToInvoice.bind(quotationController));

  return router;
};

module.exports = createQuotationRoutes;
