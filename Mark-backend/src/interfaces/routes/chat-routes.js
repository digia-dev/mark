const express = require('express');

module.exports = ({ chatController, authMiddleware }) => {
  const router = express.Router();

  router.post('/', authMiddleware, chatController.sendMessage);
  router.get('/', authMiddleware, chatController.listMessages);

  return router;
};
