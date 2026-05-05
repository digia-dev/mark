const { z } = require('zod');

const invoiceItemSchema = z.object({
  product_id: z.number().optional(),
  description: z.string().min(3),
  qty: z.number().min(1),
  unit: z.string().default('unit'),
  unit_price: z.number().min(0),
});

const createInvoiceSchema = z.object({
  customer_id: z.number({ required_error: 'Customer wajib diisi' }),
  quotation_id: z.number().optional(),
  sales_id: z.number({ required_error: 'Sales ID wajib diisi' }),
  type: z.enum(['penagihan', 'proforma', 'kredit']).default('penagihan'),
  period_start: z.string().datetime().optional(),
  period_end: z.string().datetime().optional(),
  invoice_date: z.string().datetime({ required_error: 'Tanggal invoice wajib diisi' }),
  due_date: z.string().datetime({ required_error: 'Tanggal jatuh tempo wajib diisi' }),
  discount: z.number().default(0),
  tax_rate: z.number().default(0.11),
  notes: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1, 'Minimal satu item invoice'),
});

const updateInvoiceSchema = z.object({
  type: z.enum(['penagihan', 'proforma', 'kredit']).optional(),
  period_start: z.string().datetime().optional(),
  period_end: z.string().datetime().optional(),
  invoice_date: z.string().datetime().optional(),
  due_date: z.string().datetime().optional(),
  discount: z.number().optional(),
  tax_rate: z.number().optional(),
  notes: z.string().optional(),
  items: z.array(invoiceItemSchema).optional(),
});

const recordPaymentSchema = z.object({
  amount: z.number({ required_error: 'Jumlah pembayaran wajib diisi' }).min(1),
  method: z.enum(['transfer-bank', 'tunai', 'kartu-kredit', 'qris', 'virtual-account'], { required_error: 'Metode pembayaran wajib diisi' }),
  bank_name: z.string().optional(),
  account_number: z.string().optional(),
  reference: z.string().optional(),
  notes: z.string().optional(),
  paid_by: z.string().optional(),
  paid_at: z.string().datetime({ required_error: 'Tanggal bayar wajib diisi' }),
});

module.exports = {
  createInvoiceSchema,
  updateInvoiceSchema,
  recordPaymentSchema
};
