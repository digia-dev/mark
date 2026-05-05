const express = require('express');

const createInvoiceRoutes = ({ invoiceController, authMiddleware }) => {
  const router = express.Router();

  router.use(authMiddleware);

  router.get('/', invoiceController.list.bind(invoiceController));
  router.post('/', invoiceController.create.bind(invoiceController));

  return router;
};

module.exports = createInvoiceRoutes;
