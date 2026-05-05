const express = require('express');
const router = express.Router();

module.exports = ({ installationController, authMiddleware }) => {
  router.use(authMiddleware);

  router.get('/', (req, res) => installationController.list(req, res));
  router.get('/stats', (req, res) => installationController.getStats(req, res));
  router.get('/gantt', (req, res) => installationController.getGantt(req, res));
  router.get('/search', (req, res) => installationController.list(req, res));
  router.post('/', (req, res) => installationController.create(req, res));
  
  router.get('/:id', (req, res) => installationController.detail(req, res));
  router.put('/:id', (req, res) => installationController.update(req, res));
  router.patch('/:id/update-stage', (req, res) => installationController.updateStage(req, res));
  router.patch('/:id/assign-technician', (req, res) => installationController.assignTechnician(req, res));

  return router;
};
