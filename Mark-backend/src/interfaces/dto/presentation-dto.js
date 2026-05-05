const { z } = require('zod');

// Slide Schema
const slideSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  layout: z.enum(['title', 'standard', 'image', 'quote']).default('standard'),
  imageUrl: z.string().optional()
});

// Create Presentation Schema
const createPresentationSchema = z.object({
  title: z.string({
    required_error: "Judul presentasi wajib diisi"
  }).min(3, "Judul presentasi minimal 3 karakter"),
  customer_id: z.string({
    required_error: "ID Customer wajib diisi"
  }).uuid("ID Customer tidak valid"),
  product_id: z.string().uuid("ID Product tidak valid").optional().nullable(),
  presentation_date: z.string().datetime().optional().nullable(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  theme: z.enum(['default', 'dark', 'minimal', 'vibrant']).default('default'),
  content: z.object({
    theme: z.enum(['default', 'dark', 'minimal', 'vibrant']).optional(),
    slides: z.array(slideSchema).optional()
  }).optional()
});

// Update Presentation Schema
const updatePresentationSchema = createPresentationSchema.partial();

// Get Presentation List Query Schema
const getPresentationListQuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  customer_id: z.string().uuid().optional(),
  search: z.string().optional()
});

module.exports = {
  createPresentationSchema,
  updatePresentationSchema,
  getPresentationListQuerySchema
};
