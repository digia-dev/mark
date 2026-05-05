# backend.md — Mark backend development guide

> panduan lengkap pengembangan backend Mark. dokumen ini menjadi sumber
> kebenaran tunggal untuk semua keputusan teknis di sisi server. wajib dibaca
> sebelum menulis satu baris kode backend.

---

## 0. stack teknologi

| package | versi | fungsi |
|---|---|---|
| node-js | 20.x lts | javascript runtime |
| express-js | 4.x | http server & routing |
| prisma | 5.x | orm untuk mysql |
| mysql | 8.x | relational database |
| jsonwebtoken | 9.x | issue & verify jwt |
| bcryptjs | 2.x | password hashing |
| zod | 3.x | validasi input & dto schema |
| multer | 1.x | file upload (multipart) |
| nodemailer | 6.x | pengiriman email |
| express-rate-limit | 7.x | rate limiting per endpoint |
| helmet | 7.x | security headers http |
| cors | 2.x | cors policy |
| morgan | 1.x | http request logging (dev) |
| winston | 3.x | structured application logging |
| swagger-ui-express | 5.x | dokumentasi api interaktif |
| dayjs | 1.x | manipulasi tanggal |
| exceljs | 4.x | generate file excel (.xlsx) |
| puppeteer | latest | generate pdf dari html template |

> ⚠️ **dilarang** menambah library baru tanpa diskusi tim.

---

## 1. clean architecture — prinsip wajib

### hierarki lapisan

```
┌──────────────────────────────────────┐
│           infrastructure             │  lapisan 4
│  prisma repos, mail, pdf, upload     │
│  boleh import library eksternal      │
├──────────────────────────────────────┤
│             interfaces               │  lapisan 3
│  controllers, routes, dto, middleware│
│  hanya import dari use-cases & domain│
├──────────────────────────────────────┤
│             use-cases                │  lapisan 2
│  application services (1 file/aksi) │
│  hanya import dari domain            │
├──────────────────────────────────────┤
│               domain                 │  lapisan 1
│  entities, repositories (interface) │
│  value-objects                       │
│  ZERO EXTERNAL DEPENDENCY            │
└──────────────────────────────────────┘

aturan arah dependency:
✅ infrastructure  → interfaces → use-cases → domain
❌ domain tidak boleh tahu siapapun di atas
❌ use-case tidak boleh tahu express, prisma, atau http
❌ controller tidak boleh instansiasi repository sendiri
```

### composition root

**semua** instansiasi class hanya terjadi di `src/main.js`. tidak ada `new SomeClass()`
di luar file tersebut. ini bukan opsional.

```
src/main.js
  → new PrismaClient()
  → new PrismaCustomerRepository(prisma)
  → new CreateCustomerUseCase({ customerRepository })
  → new CustomerController({ createCustomerUseCase, ... })
  → diekspor ke router
```

---

## 2. struktur folder

```
Mark-backend/
├── src/
│   ├── domain/                        # lapisan 1 — zero dependency
│   │   ├── entities/
│   │   │   ├── user.js
│   │   │   ├── customer.js
│   │   │   ├── lead.js
│   │   │   ├── deal.js
│   │   │   ├── quotation.js
│   │   │   ├── presentation.js
│   │   │   ├── installation.js
│   │   │   ├── trouble-ticket.js
│   │   │   ├── invoice.js
│   │   │   └── product.js
│   │   ├── repositories/              # interface abstract (bukan implementasi)
│   │   │   ├── user-repository.js
│   │   │   ├── customer-repository.js
│   │   │   ├── lead-repository.js
│   │   │   ├── deal-repository.js
│   │   │   ├── quotation-repository.js
│   │   │   ├── presentation-repository.js
│   │   │   ├── installation-repository.js
│   │   │   ├── trouble-ticket-repository.js
│   │   │   ├── invoice-repository.js
│   │   │   └── product-repository.js
│   │   └── value-objects/
│   │       ├── email.js
│   │       ├── phone.js
│   │       └── money.js
│   │
│   ├── use-cases/                     # lapisan 2 — 1 file = 1 use-case
│   │   ├── auth/
│   │   │   ├── login-use-case.js
│   │   │   ├── logout-use-case.js
│   │   │   └── refresh-token-use-case.js
│   │   ├── customer/
│   │   │   ├── create-customer-use-case.js
│   │   │   ├── update-customer-use-case.js
│   │   │   ├── get-customer-list-use-case.js
│   │   │   ├── get-customer-detail-use-case.js
│   │   │   └── delete-customer-use-case.js
│   │   ├── lead/
│   │   │   ├── create-lead-use-case.js
│   │   │   ├── update-lead-use-case.js
│   │   │   ├── update-lead-status-use-case.js
│   │   │   └── assign-lead-use-case.js
│   │   ├── deal/
│   │   │   ├── create-deal-use-case.js
│   │   │   ├── update-deal-use-case.js
│   │   │   ├── move-deal-stage-use-case.js
│   │   │   ├── update-deal-probability-use-case.js
│   │   │   └── duplicate-deal-use-case.js
│   │   ├── quotation/
│   │   │   ├── create-quotation-use-case.js
│   │   │   ├── update-quotation-use-case.js
│   │   │   ├── send-quotation-use-case.js
│   │   │   ├── duplicate-quotation-use-case.js
│   │   │   ├── update-quotation-status-use-case.js
│   │   │   ├── generate-quotation-pdf-use-case.js
│   │   │   └── convert-to-invoice-use-case.js
│   │   ├── presentation/
│   │   │   ├── create-presentation-use-case.js
│   │   │   ├── update-presentation-use-case.js
│   │   │   └── generate-presentation-pdf-use-case.js
│   │   ├── installation/
│   │   │   ├── create-installation-use-case.js
│   │   │   ├── update-installation-stage-use-case.js
│   │   │   └── assign-technician-use-case.js
│   │   ├── trouble-ticket/
│   │   │   ├── create-trouble-ticket-use-case.js
│   │   │   ├── update-trouble-ticket-status-use-case.js
│   │   │   └── assign-trouble-ticket-use-case.js
│   │   ├── invoice/
│   │   │   ├── create-invoice-use-case.js
│   │   │   ├── create-invoice-from-quotation-use-case.js
│   │   │   ├── record-payment-use-case.js
│   │   │   └── send-invoice-use-case.js
│   │   ├── product/
│   │   │   ├── create-product-use-case.js
│   │   │   ├── update-product-use-case.js
│   │   │   └── get-product-list-use-case.js
│   │   ├── report/
│   │   │   ├── get-dashboard-stats-use-case.js
│   │   │   ├── get-sales-report-use-case.js
│   │   │   ├── get-pipeline-report-use-case.js
│   │   │   ├── get-product-report-use-case.js
│   │   │   └── get-conversion-report-use-case.js
│   │   └── notification/
│   │       ├── create-notification-use-case.js
│   │       ├── mark-as-read-use-case.js
│   │       └── get-notification-list-use-case.js
│   │
│   ├── interfaces/                    # lapisan 3 — adapter http
│   │   ├── controllers/
│   │   │   ├── auth-controller.js
│   │   │   ├── customer-controller.js
│   │   │   ├── lead-controller.js
│   │   │   ├── deal-controller.js
│   │   │   ├── quotation-controller.js
│   │   │   ├── presentation-controller.js
│   │   │   ├── installation-controller.js
│   │   │   ├── trouble-ticket-controller.js
│   │   │   ├── invoice-controller.js
│   │   │   ├── product-controller.js
│   │   │   ├── report-controller.js
│   │   │   ├── notification-controller.js
│   │   │   └── activity-log-controller.js
│   │   ├── routes/
│   │   │   ├── auth-routes.js
│   │   │   ├── customer-routes.js
│   │   │   ├── lead-routes.js
│   │   │   ├── deal-routes.js
│   │   │   ├── quotation-routes.js
│   │   │   ├── presentation-routes.js
│   │   │   ├── installation-routes.js
│   │   │   ├── trouble-ticket-routes.js
│   │   │   ├── invoice-routes.js
│   │   │   ├── product-routes.js
│   │   │   ├── report-routes.js
│   │   │   ├── notification-routes.js
│   │   │   ├── activity-log-routes.js
│   │   │   └── index.js              # gabungkan semua routes
│   │   ├── middleware/
│   │   │   ├── auth-middleware.js
│   │   │   ├── role-middleware.js
│   │   │   ├── error-handler.js
│   │   │   ├── rate-limiter.js
│   │   │   ├── validate-request.js
│   │   │   └── activity-logger.js
│   │   └── dto/
│   │       ├── auth/
│   │       │   └── login-dto.js
│   │       ├── customer/
│   │       │   ├── create-customer-dto.js
│   │       │   └── update-customer-dto.js
│   │       ├── lead/
│   │       │   └── create-lead-dto.js
│   │       ├── deal/
│   │       │   ├── create-deal-dto.js
│   │       │   └── move-stage-dto.js
│   │       ├── quotation/
│   │       │   ├── create-quotation-dto.js
│   │       │   └── update-quotation-dto.js
│   │       ├── installation/
│   │       │   └── create-installation-dto.js
│   │       ├── trouble-ticket/
│   │       │   └── create-trouble-ticket-dto.js
│   │       └── invoice/
│   │           └── create-invoice-dto.js
│   │
│   ├── infrastructure/                # lapisan 4 — implementasi konkret
│   │   ├── database/
│   │   │   └── prisma-client.js
│   │   ├── repositories/              # implement interface dari domain
│   │   │   ├── prisma-user-repository.js
│   │   │   ├── prisma-customer-repository.js
│   │   │   ├── prisma-lead-repository.js
│   │   │   ├── prisma-deal-repository.js
│   │   │   ├── prisma-quotation-repository.js
│   │   │   ├── prisma-presentation-repository.js
│   │   │   ├── prisma-installation-repository.js
│   │   │   ├── prisma-trouble-ticket-repository.js
│   │   │   ├── prisma-invoice-repository.js
│   │   │   └── prisma-product-repository.js
│   │   ├── services/
│   │   │   ├── mail-service.js
│   │   │   ├── pdf-service.js
│   │   │   ├── file-upload-service.js
│   │   │   ├── excel-service.js
│   │   │   └── whatsapp-service.js
│   │   └── config/
│   │       ├── app-config.js
│   │       └── jwt-config.js
│   │
│   ├── main.js                        # ← composition root, satu-satunya tempat `new`
│   └── app.js                         # express setup, middleware global
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.js
├── uploads/                           # file upload (gitignored)
├── logs/                              # winston logs (gitignored)
├── .env.example
├── package.json
└── readme.md
```

---

## 3. template kode per lapisan

### lapisan 1 — entity

```javascript
// src/domain/entities/quotation.js
// ATURAN: tidak boleh ada require() atau import apapun di sini

class Quotation {
  constructor({ id, quotNumber, customerId, leadId, salesId, items = [],
                status, validUntil, subtotal, discount, tax, total, version }) {
    this.id = id
    this.quotNumber = quotNumber
    this.customerId = customerId
    this.leadId = leadId
    this.salesId = salesId
    this.items = items
    this.status = status
    this.validUntil = validUntil
    this.subtotal = subtotal
    this.discount = discount
    this.tax = tax
    this.total = total
    this.version = version
  }

  // business rules — hanya logika murni
  isExpired() {
    return new Date() > new Date(this.validUntil)
  }

  canBeSent() {
    return this.status === 'draft'
  }

  canBeApproved() {
    return this.status === 'sent'
  }

  calculateTotals() {
    const subtotal = this.items.reduce((s, i) => s + (i.qty * i.unitPrice) - i.discount, 0)
    const tax = subtotal * 0.11
    return { subtotal, tax, total: subtotal + tax }
  }
}

module.exports = Quotation
```

### lapisan 1 — repository interface

```javascript
// src/domain/repositories/quotation-repository.js
// interface abstract — diimplementasi di infrastructure

class QuotationRepository {
  async findById(id)          { throw new Error('not implemented') }
  async findAll(filters)      { throw new Error('not implemented') }
  async create(data)          { throw new Error('not implemented') }
  async update(id, data)      { throw new Error('not implemented') }
  async delete(id)            { throw new Error('not implemented') }
  async generateQuotNumber()  { throw new Error('not implemented') }
}

module.exports = QuotationRepository
```

### lapisan 2 — use-case

```javascript
// src/use-cases/quotation/create-quotation-use-case.js
// ATURAN: tidak boleh ada require dari luar domain/

class CreateQuotationUseCase {
  constructor({ quotationRepository, customerRepository }) {
    this.quotationRepository = quotationRepository
    this.customerRepository = customerRepository
  }

  async execute({ customerId, leadId, salesId, items, validUntil, notes }) {
    // 1. validasi domain
    if (!customerId && !leadId) {
      throw new Error('customer atau lead wajib dipilih')
    }

    // 2. cek data terkait
    if (customerId) {
      const customer = await this.customerRepository.findById(customerId)
      if (!customer) throw new Error('customer tidak ditemukan')
    }

    // 3. hitung total
    const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0)
    const tax      = subtotal * 0.11
    const total    = subtotal + tax

    // 4. generate nomor dokumen
    const quotNumber = await this.quotationRepository.generateQuotNumber()

    // 5. simpan
    return this.quotationRepository.create({
      quotNumber, customerId, leadId, salesId,
      status: 'draft', validUntil, subtotal,
      discount: 0, tax, total, notes, version: 1, items
    })
  }
}

module.exports = CreateQuotationUseCase
```

### lapisan 3 — dto (zod)

```javascript
// src/interfaces/dto/quotation/create-quotation-dto.js
const { z } = require('zod')

const quotationItemSchema = z.object({
  productId:   z.number().int().optional(),
  description: z.string().min(1, 'deskripsi item wajib diisi'),
  qty:         z.number().int().min(1),
  unitPrice:   z.number().min(0),
  discount:    z.number().min(0).default(0),
})

const createQuotationDto = z.object({
  customerId:  z.number().int().optional(),
  leadId:      z.number().int().optional(),
  salesId:     z.number().int({ required_error: 'sales wajib dipilih' }),
  validUntil:  z.string().min(1, 'tanggal berlaku wajib diisi'),
  items:       z.array(quotationItemSchema).min(1, 'minimal 1 item penawaran'),
  notes:       z.string().optional(),
  terms:       z.string().optional(),
}).refine(
  (data) => data.customerId || data.leadId,
  { message: 'customer atau lead wajib dipilih' }
)

module.exports = { createQuotationDto }
```

### lapisan 3 — controller

```javascript
// src/interfaces/controllers/quotation-controller.js
// ATURAN: tidak ada business logic, tidak ada new Repository()

class QuotationController {
  constructor({
    createQuotationUseCase,
    getQuotationListUseCase,
    getQuotationDetailUseCase,
    updateQuotationUseCase,
    sendQuotationUseCase,
    generateQuotationPdfUseCase,
    updateQuotationStatusUseCase,
    duplicateQuotationUseCase,
    convertToInvoiceUseCase,
  }) {
    Object.assign(this, arguments[0])

    // bind semua method agar `this` tidak hilang di express
    this.list    = this.list.bind(this)
    this.detail  = this.detail.bind(this)
    this.create  = this.create.bind(this)
    this.update  = this.update.bind(this)
    this.send    = this.send.bind(this)
    this.pdf     = this.pdf.bind(this)
  }

  async list(req, res, next) {
    try {
      const result = await this.getQuotationListUseCase.execute({
        ...req.query,
        salesId: req.user.role === 'sales' ? req.user.id : req.query.salesId
      })
      res.json({ success: true, ...result })
    } catch (err) { next(err) }
  }

  async detail(req, res, next) {
    try {
      const data = await this.getQuotationDetailUseCase.execute(+req.params.id)
      res.json({ success: true, data })
    } catch (err) { next(err) }
  }

  async create(req, res, next) {
    try {
      const data = await this.createQuotationUseCase.execute({
        ...req.body,
        salesId: req.user.id
      })
      res.status(201).json({ success: true, data })
    } catch (err) { next(err) }
  }

  async pdf(req, res, next) {
    try {
      const buffer = await this.generateQuotationPdfUseCase.execute(+req.params.id)
      res.set('Content-Type', 'application/pdf')
      res.send(buffer)
    } catch (err) { next(err) }
  }
}

module.exports = QuotationController
```

### lapisan 3 — route

```javascript
// src/interfaces/routes/quotation-routes.js
const express  = require('express')
const authMw   = require('../middleware/auth-middleware')
const roleMw   = require('../middleware/role-middleware')
const validate = require('../middleware/validate-request')
const { createQuotationDto } = require('../dto/quotation/create-quotation-dto')

// controller diinject dari main.js
function makeQuotationRouter(quotationController) {
  const router = express.Router()

  router.use(authMw)   // semua route butuh login

  router.get ('/',        quotationController.list)
  router.get ('/:id',     quotationController.detail)
  router.post('/',        roleMw(['super-admin','admin','sales']),
                          validate(createQuotationDto),
                          quotationController.create)
  router.put ('/:id',     roleMw(['super-admin','admin','sales']),
                          quotationController.update)
  router.patch('/:id/send',   quotationController.send)
  router.patch('/:id/status', quotationController.updateStatus)
  router.post ('/:id/duplicate', quotationController.duplicate)
  router.get  ('/:id/pdf',       quotationController.pdf)
  router.post ('/:id/send-email',          quotationController.sendEmail)
  router.post ('/:id/convert-to-invoice',  quotationController.convertToInvoice)

  return router
}

module.exports = makeQuotationRouter
```

### lapisan 4 — prisma repository

```javascript
// src/infrastructure/repositories/prisma-quotation-repository.js
const QuotationRepository = require('../../domain/repositories/quotation-repository')

class PrismaQuotationRepository extends QuotationRepository {
  constructor(prisma) {
    super()
    this.prisma = prisma
  }

  async findById(id) {
    return this.prisma.quotation.findUnique({
      where: { id },
      include: {
        items:    true,
        customer: { select: { id: true, name: true, email: true, phone: true, address: true } },
        lead:     { select: { id: true, name: true } },
      }
    })
  }

  async findAll({ page = 1, limit = 10, status, salesId, area, search, startDate, endDate }) {
    const where = {
      ...(status   && { status }),
      ...(salesId  && { sales_id: +salesId }),
      ...(area     && { area }),
      ...(search   && {
        OR: [
          { quot_number: { contains: search } },
          { customer: { name: { contains: search } } }
        ]
      }),
      ...(startDate && endDate && {
        created_at: { gte: new Date(startDate), lte: new Date(endDate) }
      }),
    }
    const [data, total] = await Promise.all([
      this.prisma.quotation.findMany({
        where,
        include: { customer: { select: { name: true } }, items: true },
        orderBy: { created_at: 'desc' },
        skip: (page - 1) * limit,
        take: +limit,
      }),
      this.prisma.quotation.count({ where })
    ])
    return { data, meta: { total, page: +page, limit: +limit, totalPages: Math.ceil(total / limit) } }
  }

  async create({ items, ...quotationData }) {
    return this.prisma.quotation.create({
      data: {
        ...quotationData,
        items: { create: items }
      },
      include: { items: true }
    })
  }

  async generateQuotNumber() {
    const year = new Date().getFullYear()
    const last = await this.prisma.quotation.findFirst({
      where: { quot_number: { startsWith: `Q-${year}-` } },
      orderBy: { quot_number: 'desc' }
    })
    const seq = last ? parseInt(last.quot_number.split('-')[2]) + 1 : 1
    return `Q-${year}-${String(seq).padStart(4, '0')}`
  }
}

module.exports = PrismaQuotationRepository
```

### composition root — main.js

```javascript
// src/main.js — SATU-SATUNYA tempat `new` boleh dipanggil

const prisma = require('./infrastructure/database/prisma-client')

// ── repositories ──────────────────────────────────────────────────
const PrismaUserRepository         = require('./infrastructure/repositories/prisma-user-repository')
const PrismaCustomerRepository     = require('./infrastructure/repositories/prisma-customer-repository')
const PrismaLeadRepository         = require('./infrastructure/repositories/prisma-lead-repository')
const PrismaDealRepository         = require('./infrastructure/repositories/prisma-deal-repository')
const PrismaQuotationRepository    = require('./infrastructure/repositories/prisma-quotation-repository')
const PrismaInstallationRepository = require('./infrastructure/repositories/prisma-installation-repository')
const PrismaTicketRepository       = require('./infrastructure/repositories/prisma-trouble-ticket-repository')
const PrismaInvoiceRepository      = require('./infrastructure/repositories/prisma-invoice-repository')
const PrismaProductRepository      = require('./infrastructure/repositories/prisma-product-repository')

const userRepository         = new PrismaUserRepository(prisma)
const customerRepository     = new PrismaCustomerRepository(prisma)
const leadRepository         = new PrismaLeadRepository(prisma)
const dealRepository         = new PrismaDealRepository(prisma)
const quotationRepository    = new PrismaQuotationRepository(prisma)
const installationRepository = new PrismaInstallationRepository(prisma)
const ticketRepository       = new PrismaTicketRepository(prisma)
const invoiceRepository      = new PrismaInvoiceRepository(prisma)
const productRepository      = new PrismaProductRepository(prisma)

// ── services ──────────────────────────────────────────────────────
const MailService       = require('./infrastructure/services/mail-service')
const PdfService        = require('./infrastructure/services/pdf-service')
const mailService       = new MailService()
const pdfService        = new PdfService()

// ── use-cases (quotation contoh) ──────────────────────────────────
const CreateQuotationUseCase        = require('./use-cases/quotation/create-quotation-use-case')
const GetQuotationListUseCase       = require('./use-cases/quotation/get-quotation-list-use-case')
const GetQuotationDetailUseCase     = require('./use-cases/quotation/get-quotation-detail-use-case')
const SendQuotationUseCase          = require('./use-cases/quotation/send-quotation-use-case')
const GenerateQuotationPdfUseCase   = require('./use-cases/quotation/generate-quotation-pdf-use-case')

const createQuotationUseCase      = new CreateQuotationUseCase({ quotationRepository, customerRepository })
const getQuotationListUseCase     = new GetQuotationListUseCase({ quotationRepository })
const getQuotationDetailUseCase   = new GetQuotationDetailUseCase({ quotationRepository })
const sendQuotationUseCase        = new SendQuotationUseCase({ quotationRepository, mailService })
const generateQuotationPdfUseCase = new GenerateQuotationPdfUseCase({ quotationRepository, pdfService })

// ── controllers ───────────────────────────────────────────────────
const QuotationController = require('./interfaces/controllers/quotation-controller')
const quotationController = new QuotationController({
  createQuotationUseCase,
  getQuotationListUseCase,
  getQuotationDetailUseCase,
  sendQuotationUseCase,
  generateQuotationPdfUseCase,
})

// ── routers ───────────────────────────────────────────────────────
const makeQuotationRouter = require('./interfaces/routes/quotation-routes')

module.exports = {
  routers: {
    quotation: makeQuotationRouter(quotationController),
    // ... semua modul lain
  }
}
```

---

## 4. middleware chain & order

setiap request melewati chain berikut secara berurutan:

```
incoming request
  │
  ├─ cors()                          → allow frontend domain
  ├─ helmet()                        → security headers
  ├─ express.json()                  → parse body
  ├─ morgan('dev')                   → log request (dev only)
  ├─ rateLimiter (global)            → 100 req / 15 menit per IP
  │
  │  ← route handler mulai di sini
  │
  ├─ auth-middleware                 → verify JWT → inject req.user
  ├─ role-middleware(['admin',…])    → cek permission role
  ├─ validate-request(schema)        → validasi body/query dengan zod
  ├─ controller.method()             → jalankan use-case
  ├─ activity-logger (async)         → catat ke activity_logs (non-blocking)
  │
outgoing response
  │
  └─ error-handler                   → format error → kirim response
```

### auth-middleware

```javascript
// src/interfaces/middleware/auth-middleware.js
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../infrastructure/config/jwt-config')

module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'token tidak ditemukan' }
    })
  }
  try {
    const token = authHeader.split(' ')[1]
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'token tidak valid atau kadaluarsa' }
    })
  }
}
```

### role-middleware

```javascript
// src/interfaces/middleware/role-middleware.js
module.exports = function roleMw(allowedRoles = []) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user?.role)) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'akses ditolak' }
      })
    }
    next()
  }
}
```

### validate-request

```javascript
// src/interfaces/middleware/validate-request.js
module.exports = function validateRequest(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'input tidak valid',
          details: result.error.issues.map(i => ({
            field: i.path.join('.'),
            message: i.message
          }))
        }
      })
    }
    req.body = result.data   // replace dengan data yang sudah di-sanitize
    next()
  }
}
```

### error-handler (harus didaftarkan paling akhir)

```javascript
// src/interfaces/middleware/error-handler.js
const { logger } = require('../../infrastructure/config/app-config')

module.exports = function errorHandler(err, req, res, next) {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    userId: req.user?.id,
  })

  // known errors
  if (err.message === 'customer tidak ditemukan') {
    return res.status(404).json({
      success: false, error: { code: 'NOT_FOUND', message: err.message }
    })
  }

  // prisma unique constraint
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false, error: { code: 'CONFLICT', message: 'data sudah terdaftar' }
    })
  }

  // fallback
  res.status(500).json({
    success: false, error: { code: 'INTERNAL_ERROR', message: 'terjadi kesalahan server' }
  })
}
```

### activity-logger

```javascript
// src/interfaces/middleware/activity-logger.js
// dipasang SETELAH controller, async agar tidak blocking response

module.exports = function activityLogger(prisma) {
  return (req, res, next) => {
    const originalJson = res.json.bind(res)
    res.json = function (body) {
      // catat aktivitas hanya untuk mutasi yang berhasil
      if (['POST','PUT','PATCH','DELETE'].includes(req.method) && body?.success) {
        setImmediate(async () => {
          try {
            await prisma.activityLog.create({ data: {
              user_id:     req.user.id,
              action:      METHOD_TO_ACTION[req.method],
              module:      resolveModule(req.path),
              entity_type: resolveModule(req.path),
              entity_id:   body?.data?.id ?? 0,
              description: `${req.user.name} ${METHOD_TO_ACTION[req.method]} data`,
              ip_address:  req.ip,
            }})
          } catch { /* log error, jangan sampai crash */ }
        })
      }
      return originalJson(body)
    }
    next()
  }
}

const METHOD_TO_ACTION = {
  POST: 'dibuat', PUT: 'diperbarui', PATCH: 'diubah', DELETE: 'dihapus'
}
```

---

## 5. format response api

### sukses list

```json
{
  "success": true,
  "data": [ { "id": 1, "quot_number": "Q-2025-0520", "..." } ],
  "meta": {
    "total": 153,
    "page": 1,
    "limit": 10,
    "totalPages": 16
  }
}
```

### sukses single

```json
{
  "success": true,
  "data": { "id": 1, "quot_number": "Q-2025-0520" }
}
```

### error

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "input tidak valid",
    "details": [
      { "field": "customerId", "message": "customer wajib dipilih" }
    ]
  }
}
```

### kode error & http status

| kode | http status | kapan digunakan |
|---|---|---|
| `VALIDATION_ERROR` | 400 | input gagal validasi zod |
| `UNAUTHORIZED` | 401 | token tidak ada / expired |
| `FORBIDDEN` | 403 | role tidak punya permission |
| `NOT_FOUND` | 404 | data tidak ditemukan |
| `CONFLICT` | 409 | data duplikat (unique constraint) |
| `INTERNAL_ERROR` | 500 | server error yang tidak terduga |

---

## 6. permission matrix per role

| aksi | super-admin | admin | sales | teknisi |
|---|---|---|---|---|
| read semua data | ✓ | ✓ | ✓ | ✓ |
| read data sendiri | ✓ | ✓ | ✓ | ✓ |
| create customer/lead | ✓ | ✓ | ✓ | ✗ |
| edit customer/lead | ✓ | ✓ | ✓ | ✗ |
| delete customer/lead | ✓ | ✓ | ✗ | ✗ |
| create/edit deal | ✓ | ✓ | ✓ | ✗ |
| create/edit quotation | ✓ | ✓ | ✓ | ✗ |
| create/edit presentation | ✓ | ✓ | ✓ | ✗ |
| update installation stage | ✓ | ✓ | ✗ | ✓ |
| create/edit invoice | ✓ | ✓ | ✗ | ✗ |
| record payment | ✓ | ✓ | ✗ | ✗ |
| create trouble ticket | ✓ | ✓ | ✓ | ✓ |
| update ticket status | ✓ | ✓ | ✗ | ✓ |
| manage users | ✓ | ✓ | ✗ | ✗ |
| settings | ✓ | ✓ | ✗ | ✗ |
| reports semua | ✓ | ✓ | ✗ | ✗ |
| reports data sendiri | ✓ | ✓ | ✓ | ✗ |
| delete data apapun | ✓ | ✓ | ✗ | ✗ |

> sales yang membaca laporan: hanya mendapat data miliknya sendiri.
> filter `salesId` di use-case wajib diset dari `req.user.id` jika role = `sales`.

---

## 7. autentikasi jwt

### flow lengkap

```
POST /api/auth/login
  → validate dto (email, password)
  → user repository findByEmail
  → bcrypt.compare password
  → issue access token (8h) + refresh token (30d)
  → simpan refresh token hash ke database
  → return { accessToken, refreshToken, user }

semua request lain:
  → header: Authorization: Bearer <accessToken>
  → auth-middleware verify token → inject req.user

POST /api/auth/refresh-token
  → terima refreshToken di body
  → cari di database → verify signature
  → issue access token baru
  → return { accessToken }

POST /api/auth/logout
  → hapus refresh token dari database
  → return 200
```

### generate token

```javascript
// src/infrastructure/config/jwt-config.js
const jwt = require('jsonwebtoken')

const JWT_SECRET         = process.env.JWT_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

function signAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' })
}

function signRefreshToken(payload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' })
}

function verifyAccessToken(token) {
  return jwt.verify(token, JWT_SECRET)
}

module.exports = { JWT_SECRET, signAccessToken, signRefreshToken, verifyAccessToken }
```

---

## 8. prisma — aturan database

### wajib

```prisma
// setiap field WAJIB punya @map dengan snake_case
model Quotation {
  id          Int      @id @default(autoincrement())
  quotNumber  String   @unique @map("quot_number")   // ← @map wajib
  customerId  Int?     @map("customer_id")           // ← @map wajib
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  @@map("quotations")  // ← nama tabel snake_case
}
```

### index yang wajib ada

```prisma
@@index([status])
@@index([sales_id])        // pada semua tabel yang punya kolom sales_id
@@index([customer_id])     // pada semua tabel yang punya relasi customer
@@index([created_at])
// kolom pencarian:
@@index([email])
@@index([phone])
```

### migrasi

```bash
# buat migrasi — nama harus deskriptif
npx prisma migrate dev --name add-sla-fields-to-trouble-tickets

# jangan pernah edit file migrasi yang sudah di-commit
# jika salah → buat migrasi baru untuk memperbaiki
```

---

## 9. generate dokumen (pdf & excel)

### pdf — puppeteer

```javascript
// src/infrastructure/services/pdf-service.js
const puppeteer = require('puppeteer')

class PdfService {
  async generateFromHtml(html) {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page    = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    const buffer  = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' }
    })
    await browser.close()
    return buffer
  }
}

module.exports = PdfService
```

use-case memanggil `pdfService.generateFromHtml(htmlTemplate)` dan mengembalikan buffer ke controller.
controller mengirim buffer dengan header `Content-Type: application/pdf`.

### excel — exceljs

```javascript
// src/infrastructure/services/excel-service.js
const ExcelJS = require('exceljs')

class ExcelService {
  async generateQuotationList(data) {
    const workbook  = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('quotation')

    worksheet.columns = [
      { header: 'no. quotation', key: 'quot_number', width: 18 },
      { header: 'customer',     key: 'customer',     width: 25 },
      { header: 'sales',        key: 'sales',        width: 20 },
      { header: 'total',        key: 'total',        width: 18 },
      { header: 'status',       key: 'status',       width: 12 },
    ]

    data.forEach(row => worksheet.addRow(row))

    const buffer = await workbook.xlsx.writeBuffer()
    return buffer
  }
}

module.exports = ExcelService
```

---

## 10. logging — winston

```javascript
// src/infrastructure/config/app-config.js
const winston = require('winston')

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ]
})

module.exports = { logger }
```

**jangan** gunakan `console.log` di production. selalu gunakan `logger.info()`,
`logger.warn()`, `logger.error()`.

---

## 11. checklist sebelum pr

```
arsitektur:
  [ ] tidak ada import prisma di domain atau use-case
  [ ] tidak ada new Class() di luar main.js
  [ ] tidak ada business logic di controller
  [ ] setiap use-case punya constructor dengan dependency injection
  [ ] route baru sudah didaftarkan di interfaces/routes/index.js
  [ ] controller baru sudah di-wire di main.js

kode:
  [ ] dto zod sudah dibuat untuk semua endpoint yang menerima body
  [ ] semua async function punya try/catch → next(err)
  [ ] tidak ada console.log yang tertinggal
  [ ] response selalu menggunakan format standar { success, data, meta }

database:
  [ ] semua field baru punya @map dengan snake_case
  [ ] semua tabel baru punya @@map
  [ ] migrasi sudah dijalankan dan berhasil
  [ ] index sudah ditambahkan untuk FK dan kolom filter

keamanan:
  [ ] endpoint mutasi sudah ada auth-middleware
  [ ] endpoint admin/super-admin sudah ada role-middleware
  [ ] input sudah divalidasi dengan zod sebelum masuk use-case
```

---

## 12. rekomendasi tambahan

berikut rekomendasi yang belum tercakup di `rules.md` namun sangat disarankan:

### 12.1 pagination cursor-based untuk tabel besar
untuk modul activity-logs dan crm list yang bisa memiliki ratusan ribu baris,
pertimbangkan cursor-based pagination (bukan offset) agar performa tetap konsisten
di halaman-halaman belakang.

### 12.2 queue untuk operasi berat
generate pdf, kirim email, dan catat activity log sebaiknya dijalankan melalui
background queue (bisa menggunakan `bull` + redis). ini mencegah response lambat
saat operasi tersebut berjalan bersamaan oleh banyak user.

### 12.3 standardisasi error domain
buat class error custom di domain agar controller bisa membedakan jenis error
tanpa harus melakukan string matching:
```javascript
// src/domain/errors/not-found-error.js
class NotFoundError extends Error {
  constructor(entity) {
    super(`${entity} tidak ditemukan`)
    this.name = 'NotFoundError'
    this.statusCode = 404
    this.code = 'NOT_FOUND'
  }
}
module.exports = NotFoundError
```

### 12.4 health check endpoint
tambahkan `GET /health` yang mengembalikan status koneksi database dan uptime server.
dibutuhkan oleh load balancer dan monitoring tool.

### 12.5 api versioning
pertimbangkan prefix `/api/v1/` dari awal agar mudah menambah versi baru di masa
depan tanpa breaking change untuk client yang sudah ada.

---

*backend.md — Mark isp sales & management system*
*versi: 1.0*