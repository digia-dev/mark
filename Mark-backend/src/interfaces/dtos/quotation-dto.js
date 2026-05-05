const { z } = require('zod');

const quotationItemSchema = z.object({
  product_id: z.number().optional(),
  name: z.string(),
  description: z.string().optional(),
  quantity: z.number().min(1),
  price: z.number().min(0),
  discount: z.number().min(0).default(0)
});

const createQuotationSchema = z.object({
  customer_id: z.number().optional(),
  lead_id: z.number().optional(),
  deal_id: z.number().optional(),
  area: z.string().optional(),
  valid_until: z.string().optional(),
  discount: z.number().min(0).default(0),
  tax_rate: z.number().min(0).default(0.11),
  notes: z.string().optional(),
  terms: z.string().optional(),
  items: z.array(quotationItemSchema).min(1, 'Minimal 1 item required')
});

const updateQuotationStatusSchema = z.object({
  status: z.enum(['draft', 'sent', 'approved', 'rejected', 'expired'])
});

module.exports = {
  createQuotationSchema,
  updateQuotationStatusSchema
};
