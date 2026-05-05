const { z } = require('zod');

const branchSchema = z.object({
  name: z.string().min(3).max(100),
  address: z.string().max(255).optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  is_active: z.boolean().optional(),
});

module.exports = {
  branchSchema,
};
