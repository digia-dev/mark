const express = require('express');
const validate = require('../middlewares/validate-request');
const { loginSchema, registerSchema } = require('../dtos/auth-dto');

const createAuthRoutes = ({ authController, authMiddleware }) => {
  const router = express.Router();

  router.post('/register', validate(registerSchema), (req, res, next) => authController.register(req, res, next));
  router.post('/login', validate(loginSchema), (req, res, next) => authController.login(req, res, next));
  router.post('/logout', authMiddleware, (req, res, next) => authController.logout(req, res, next));
  router.post('/refresh', (req, res, next) => authController.refreshToken(req, res, next));
  router.get('/me', authMiddleware, (req, res, next) => authController.getProfile(req, res, next));

  return router;
};

module.exports = createAuthRoutes;
