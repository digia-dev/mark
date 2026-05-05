const { z } = require('zod');

const createInstallationSchema = z.object({
  deal_id: z.number({ required_error: 'Deal ID wajib diisi' }),
  customer_id: z.number({ required_error: 'Customer ID wajib diisi' }),
  product_id: z.number({ required_error: 'Produk ID wajib diisi' }),
  sales_id: z.number().optional(),
  technician_id: z.number().optional(),
  address: z.string().min(5, 'Alamat minimal 5 karakter'),
  area: z.string().optional(),
  scheduled_date: z.string().transform((str) => new Date(str)),
  target_end_date: z.string().transform((str) => new Date(str)),
  notes: z.string().optional(),
});

const updateInstallationSchema = z.object({
  technician_id: z.number().optional(),
  address: z.string().optional(),
  area: z.string().optional(),
  scheduled_date: z.string().transform((str) => new Date(str)).optional(),
  start_date: z.string().transform((str) => new Date(str)).optional(),
  target_end_date: z.string().transform((str) => new Date(str)).optional(),
  actual_end_date: z.string().transform((str) => new Date(str)).optional(),
  status: z.enum(['scheduled', 'on-progress', 'done', 'tertunda', 'cancelled']).optional(),
  current_stage: z.enum(['survey', 'preparation', 'installation', 'testing']).optional(),
  notes: z.string().optional(),
});

const updateStageSchema = z.object({
  stage: z.enum(['survey', 'preparation', 'installation', 'testing']),
  status: z.enum(['scheduled', 'on-progress', 'done']),
  notes: z.string().optional(),
});

const assignTechnicianSchema = z.object({
  technician_id: z.number({ required_error: 'Technician ID wajib diisi' }),
});

module.exports = {
  createInstallationSchema,
  updateInstallationSchema,
  updateStageSchema,
  assignTechnicianSchema,
};
