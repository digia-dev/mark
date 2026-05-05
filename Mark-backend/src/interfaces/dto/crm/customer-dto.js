const { z } = require('zod');

const createCustomerDto = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['personal', 'corporate']),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().min(5, 'Phone number is required'),
  website: z.string().url().optional().or(z.literal('')),
  npwp: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postal_code: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  area: z.string().optional(),
  sector: z.string().optional(),
  contact_person: z.string().optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
  sales_id: z.number().int().optional(),
  branch_id: z.number().int().optional(),
  since_date: z.string().optional().transform(val => val ? new Date(val) : undefined),
  notes: z.string().optional()
});

const updateCustomerDto = createCustomerDto.partial();

module.exports = {
  createCustomerDto,
  updateCustomerDto
};
