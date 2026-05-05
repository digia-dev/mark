const { z } = require('zod');

const createTicketSchema = z.object({
  customer_id: z.number({ required_error: 'Customer ID wajib diisi' }),
  title: z.string().min(5, 'Judul minimal 5 karakter'),
  description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
  category: z.enum(['technical', 'billing', 'sales', 'general', 'other']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  assigned_to: z.number().optional(),
});

const updateTicketSchema = z.object({
  title: z.string().min(5).optional(),
  description: z.string().min(10).optional(),
  category: z.enum(['technical', 'billing', 'sales', 'general', 'other']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  assigned_to: z.number().optional(),
  status: z.enum(['open', 'in-progress', 'on-hold', 'resolved', 'closed', 'cancelled']).optional(),
});

const addNoteSchema = z.object({
  content: z.string().min(2, 'Catatan minimal 2 karakter'),
  is_internal: z.boolean().default(true),
});

const assignTicketSchema = z.object({
  user_id: z.number({ required_error: 'User ID wajib diisi' }),
});

const updateStatusSchema = z.object({
  status: z.enum(['open', 'in-progress', 'on-hold', 'resolved', 'closed', 'cancelled']),
  notes: z.string().optional(),
});

module.exports = {
  createTicketSchema,
  updateTicketSchema,
  addNoteSchema,
  assignTicketSchema,
  updateStatusSchema
};
