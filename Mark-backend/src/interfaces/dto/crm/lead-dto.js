const { z } = require('zod');

const createLeadDto = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().optional(),
  phone: z.string().min(5, 'Phone number is required'),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().optional(),
  area: z.string().optional(),
  source: z.string().optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'negosiasi', 'penawaran', 'lost', 'converted']).optional(),
  assigned_to: z.number().int().optional(),
  notes: z.string().optional(),
  follow_up_date: z.string().optional().transform(val => val ? new Date(val) : undefined)
});

const updateLeadDto = createLeadDto.partial().extend({
  lost_reason: z.string().optional()
});

const convertLeadDto = z.object({
  type: z.enum(['personal', 'corporate']),
  sector: z.string().optional(),
  npwp: z.string().optional(),
  contact_person: z.string().optional()
});

module.exports = {
  createLeadDto,
  updateLeadDto,
  convertLeadDto
};
