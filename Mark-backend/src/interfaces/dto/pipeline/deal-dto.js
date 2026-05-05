const { z } = require('zod');

const baseDealSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  customer_id: z.number().int().optional(),
  lead_id: z.number().int().optional(),
  value: z.number().min(0),
  stage: z.enum(['prospek', 'negosiasi', 'penawaran', 'closing', 'instalasi']).optional(),
  probability: z.number().min(0).max(100).optional(),
  expected_closing_date: z.string().optional().transform(val => val ? new Date(val) : undefined),
  sales_id: z.number().int().optional(),
  area: z.string().optional(),
  notes: z.string().optional()
});

const createDealDto = baseDealSchema.refine(data => data.customer_id || data.lead_id, {
  message: "Either customer_id or lead_id must be provided"
});

const updateDealDto = baseDealSchema.partial();

const moveStageDto = z.object({
  targetStage: z.enum(['prospek', 'negosiasi', 'penawaran', 'closing', 'instalasi']),
  notes: z.string().optional()
});

module.exports = {
  createDealDto,
  updateDealDto,
  moveStageDto
};
