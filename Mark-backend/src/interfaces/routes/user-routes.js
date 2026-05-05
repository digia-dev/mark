const express = require('express');
const validate = require('../middlewares/validate-request');
const roleMiddleware = require('../middlewares/role-middleware');
const activityLogger = require('../middlewares/activity-logger');
const { createUserSchema, updateUserSchema, changePasswordSchema } = require('../dtos/user-dto');

const createUserRoutes = ({ userController, authMiddleware, activityLogRepository }) => {
  const router = express.Router();

  // Semua route user butuh auth
  router.use(authMiddleware);

  router.get('/', 
    roleMiddleware(['super-admin', 'admin']), 
    (req, res, next) => userController.list(req, res, next)
  );

  router.post('/', 
    roleMiddleware(['super-admin', 'admin']), 
    validate(createUserSchema), 
    activityLogger(activityLogRepository, { module: 'user', action: 'dibuat', description: 'Membuat user baru' }),
    (req, res, next) => userController.create(req, res, next)
  );
  
  router.get('/:id', 
    roleMiddleware(['super-admin', 'admin']), 
    (req, res, next) => userController.detail(req, res, next)
  );

  router.put('/:id', 
    roleMiddleware(['super-admin', 'admin']), 
    validate(updateUserSchema), 
    activityLogger(activityLogRepository, { module: 'user', action: 'diperbarui', description: 'Memperbarui data user' }),
    (req, res, next) => userController.update(req, res, next)
  );

  router.delete('/:id', 
    roleMiddleware(['super-admin']), 
    activityLogger(activityLogRepository, { module: 'user', action: 'dihapus', description: 'Menghapus user' }),
    (req, res, next) => userController.delete(req, res, next)
  );
  
  router.patch('/:id/password', 
    validate(changePasswordSchema), 
    activityLogger(activityLogRepository, { module: 'user', action: 'diubah', description: 'Mengubah password user' }),
    (req, res, next) => userController.changePassword(req, res, next)
  );

  return router;
};

module.exports = createUserRoutes;
