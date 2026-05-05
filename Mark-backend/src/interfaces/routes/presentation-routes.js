const express = require('express');

const createPresentationRoutes = ({ presentationController, authMiddleware }) => {
  const router = express.Router();

  router.use(authMiddleware);

  router.get('/', presentationController.list.bind(presentationController));
  router.get('/search', presentationController.list.bind(presentationController));
  router.post('/', presentationController.create.bind(presentationController));

  return router;
};

module.exports = createPresentationRoutes;
