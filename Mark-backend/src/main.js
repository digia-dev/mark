const express = require('express');
const router = express.Router();

// This is the composition root where we will wire up all dependencies
// and mount feature-specific routes.

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
