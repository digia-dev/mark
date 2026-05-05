const { z } = require('zod');

const createUserSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter').optional(),
  role: z.enum(['super-admin', 'admin', 'sales', 'teknisi']),
  branch_id: z.number().optional(),
  phone: z.string().optional(),
  department: z.string().optional(),
  is_active: z.boolean().optional()
});

const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  role: z.enum(['super-admin', 'admin', 'sales', 'teknisi']).optional(),
  branch_id: z.number().optional(),
  phone: z.string().optional(),
  department: z.string().optional(),
  is_active: z.boolean().optional()
});

const changePasswordSchema = z.object({
  oldPassword: z.string().optional(),
  newPassword: z.string().min(8)
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  changePasswordSchema
};
