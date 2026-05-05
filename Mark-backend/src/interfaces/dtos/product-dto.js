const { z } = require('zod');

const productSchema = z.object({
  name: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  description: z.string().max(1000).optional().nullable(),
  image_url: z.string().url().optional().nullable(),
  speed_down: z.number().int().positive().optional().nullable(),
  speed_up: z.number().int().positive().optional().nullable(),
  price: z.number().positive(),
  technology: z.string().max(30).optional().nullable(),
  area_coverage: z.string().max(255).optional().nullable(),
  is_best_seller: z.boolean().optional(),
  is_promo: z.boolean().optional(),
  promo_price: z.number().positive().optional().nullable(),
  promo_end_date: z.string().datetime().optional().nullable(),
  status: z.enum(['active', 'inactive', 'promo']).optional(),
});

module.exports = {
  productSchema,
};
