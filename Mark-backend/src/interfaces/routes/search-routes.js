const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');

function createSearchRouter(searchController) {
  const router = express.Router();

  // All search routes are protected
  router.use(authMiddleware);

  router.get('/', (req, res, next) => searchController.search(req, res, next));

  return router;
}

module.exports = createSearchRouter;
