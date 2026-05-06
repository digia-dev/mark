const express = require('express');
const router = express.Router();

module.exports = ({ settingController, authMiddleware, roleMiddleware }) => {
  router.use(authMiddleware);
  
  router.get('/company', (req, res) => settingController.getCompanyProfile(req, res));
  router.put('/company', roleMiddleware(['super-admin', 'admin']), (req, res) => settingController.updateCompanyProfile(req, res));
  
  router.get('/users', roleMiddleware(['super-admin', 'admin']), (req, res) => settingController.getUsers(req, res));
  
  router.get('/preferences', (req, res) => settingController.getPreferences(req, res));
  router.put('/preferences', (req, res) => settingController.updatePreferences(req, res));

  return router;
};
