# tech-arch.md — Mark technical architecture

> dokumen ini mendefinisikan arsitektur teknis, struktur folder, stack teknologi, dan pola implementasi untuk aplikasi Mark menggunakan clean architecture.

---

## 1. gambaran umum sistem

```
┌─────────────────────────────────────────────────────────────┐
│                        client layer                         │
│              react-js (vite) + tailwind-css                 │
│         feature-based architecture + atomic design          │
└──────────────────────────┬──────────────────────────────────┘
                           │ http/rest (json)
                           │ jwt bearer token
┌──────────────────────────▼──────────────────────────────────┐
│                       api layer                             │
│              node-js + express-js (rest api)                │
│                   clean architecture                        │
│    domain → use-cases → interfaces → infrastructure        │
└──────────────────────────┬──────────────────────────────────┘
                           │ prisma orm
┌──────────────────────────▼──────────────────────────────────┐
│                     database layer                          │
│                      mysql 8.x                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. stack teknologi

### frontend
| teknologi | versi | fungsi |
|---|---|---|
| react-js | 18.x | ui framework |
| vite | 5.x | build tool & dev server |
| react-router-dom | v6 | client-side routing |
| zustand | 4.x | global state management |
| tanstack-query | v5 | server state, caching, data fetching |
| axios | 1.x | http client |
| tailwind-css | 3.x | utility-first styling |
| shadcn-ui | latest | headless component library |
| recharts | 2.x | chart & data visualization |
| react-pdf / jspdf | latest | pdf generation |
| framer-motion | 10.x | animasi & transisi |
| leaflet-js | 1.x | peta sebaran customer |
| react-beautiful-dnd | latest | drag & drop kanban board |
| date-fns | 3.x | manipulasi tanggal |
| react-hook-form | 7.x | form management |
| zod | 3.x | schema validasi frontend |
| lucide-react | latest | ikon konsisten |

### backend
| teknologi | versi | fungsi |
|---|---|---|
| node-js | 20.x lts | javascript runtime |
| express-js | 4.x | http server & routing |
| prisma | 5.x | orm untuk mysql |
| mysql | 8.x | relational database |
| jsonwebtoken | 9.x | jwt auth |
| bcryptjs | 2.x | password hashing |
| zod | 3.x | validasi input & dto |
| multer | 1.x | file upload |
| nodemailer | 6.x | pengiriman email |
| express-rate-limit | 7.x | rate limiting |
| helmet | 7.x | security headers |
| cors | 2.x | cors policy |
| morgan | 1.x | http request logging |
| winston | 3.x | application logging |
| swagger-ui-express | 5.x | dokumentasi api |
| dayjs | 1.x | manipulasi tanggal |
| exceljs | 4.x | generate excel |
| puppeteer / html-pdf | latest | generate pdf |

---

## 3. clean architecture — backend

### prinsip dasar
setiap lapisan hanya boleh bergantung ke lapisan di bawahnya. alur dependency: `infrastructure` → `interfaces` → `use-cases` → `domain`.

```
┌──────────────────────────────────┐
│         infrastructure           │  ← lapisan 4
│  prisma repos, mail, pdf, upload │
├──────────────────────────────────┤
│           interfaces             │  ← lapisan 3
│     controllers, routes, dto     │
├──────────────────────────────────┤
│           use-cases              │  ← lapisan 2
│      application services        │
├──────────────────────────────────┤
│             domain               │  ← lapisan 1
│   entities, repos (interface)    │
│       value-objects               │
└──────────────────────────────────┘
```

### lapisan 1 — domain
- berisi: `entities/`, `repositories/` (interface/abstract), `value-objects/`
- **zero external dependency** — tidak boleh import library apapun
- mendefinisikan aturan bisnis murni (validasi, kalkulasi, status transition)

contoh entity `quotation.js`:
```javascript
// src/domain/entities/quotation.js
class Quotation {
  constructor({ id, quotNumber, customerId, items, status, validUntil }) {
    this.id = id
    this.quotNumber = quotNumber
    this.customerId = customerId
    this.items = items
    this.status = status
    this.validUntil = validUntil
  }

  isExpired() {
    return new Date() > new Date(this.validUntil)
  }

  canBeSent() {
    return this.status === 'draft'
  }

  calculateTotal() {
    const subtotal = this.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
    const tax = subtotal * 0.11
    return { subtotal, tax, total: subtotal + tax }
  }
}
module.exports = Quotation
```

contoh interface repository `quotation-repository.js`:
```javascript
// src/domain/repositories/quotation-repository.js
class QuotationRepository {
  async findById(id) { throw new Error('not implemented') }
  async findAll(filters) { throw new Error('not implemented') }
  async create(data) { throw new Error('not implemented') }
  async update(id, data) { throw new Error('not implemented') }
  async delete(id) { throw new Error('not implemented') }
}
module.exports = QuotationRepository
```

### lapisan 2 — use-cases
- berisi satu file per satu use-case (single responsibility)
- menerima dependency melalui constructor (dependency injection)
- tidak mengetahui express, prisma, atau http sama sekali

contoh `create-quotation-use-case.js`:
```javascript
// src/use-cases/quotation/create-quotation-use-case.js
class CreateQuotationUseCase {
  constructor({ quotationRepository, customerRepository, generateQuotNumber }) {
    this.quotationRepository = quotationRepository
    this.customerRepository = customerRepository
    this.generateQuotNumber = generateQuotNumber
  }

  async execute({ customerId, leadId, salesId, items, validUntil, notes }) {
    const customer = await this.customerRepository.findById(customerId)
    if (!customer) throw new Error('customer tidak ditemukan')

    const quotNumber = await this.generateQuotNumber()
    const subtotal = items.reduce((s, i) => s + i.qty * i.unitPrice, 0)
    const tax = subtotal * 0.11
    const total = subtotal + tax

    return this.quotationRepository.create({
      quotNumber, customerId, leadId, salesId,
      status: 'draft', validUntil, subtotal,
      discount: 0, tax, total, notes, version: 1,
      items
    })
  }
}
module.exports = CreateQuotationUseCase
```

### lapisan 3 — interfaces
- controller: menerima req/res express, memanggil use-case, mengembalikan response
- dto: schema zod untuk validasi input
- routes: mendefinisikan endpoint dan middleware

contoh `quotation-controller.js`:
```javascript
// src/interfaces/controllers/quotation-controller.js
class QuotationController {
  constructor({ createQuotationUseCase, getQuotationListUseCase }) {
    this.createQuotationUseCase = createQuotationUseCase
    this.getQuotationListUseCase = getQuotationListUseCase
  }

  async create(req, res, next) {
    try {
      const quotation = await this.createQuotationUseCase.execute(req.body)
      res.status(201).json({ success: true, data: quotation })
    } catch (err) {
      next(err)
    }
  }

  async list(req, res, next) {
    try {
      const result = await this.getQuotationListUseCase.execute(req.query)
      res.json({ success: true, ...result })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = QuotationController
```

### lapisan 4 — infrastructure
- `prisma-quotation-repository.js`: implementasi konkret dari interface domain
- `mail-service.js`: nodemailer
- `pdf-service.js`: puppeteer / html-pdf
- `file-upload-service.js`: multer

contoh `prisma-quotation-repository.js`:
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
      include: { items: true }
    })
  }

  async create(data) {
    const { items, ...quotationData } = data
    return this.prisma.quotation.create({
      data: { ...quotationData, items: { create: items } },
      include: { items: true }
    })
  }
}
module.exports = PrismaQuotationRepository
```

### composition root — main.js
semua dependency di-wire di satu tempat:
```javascript
// src/main.js
const prisma = require('./infrastructure/database/prisma-client')
const PrismaQuotationRepository = require('./infrastructure/repositories/prisma-quotation-repository')
const CreateQuotationUseCase = require('./use-cases/quotation/create-quotation-use-case')
const QuotationController = require('./interfaces/controllers/quotation-controller')
const quotationRoutes = require('./interfaces/routes/quotation-routes')

const quotationRepository = new PrismaQuotationRepository(prisma)
const createQuotationUseCase = new CreateQuotationUseCase({ quotationRepository })
const quotationController = new QuotationController({ createQuotationUseCase })

module.exports = { quotationController }
```

---

## 4. struktur folder backend

```
Mark-backend/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── user.js
│   │   │   ├── customer.js
│   │   │   ├── lead.js
│   │   │   ├── deal.js
│   │   │   ├── quotation.js
│   │   │   ├── installation.js
│   │   │   ├── trouble-ticket.js
│   │   │   ├── invoice.js
│   │   │   └── product.js
│   │   ├── repositories/
│   │   │   ├── user-repository.js
│   │   │   ├── customer-repository.js
│   │   │   ├── lead-repository.js
│   │   │   ├── deal-repository.js
│   │   │   ├── quotation-repository.js
│   │   │   ├── installation-repository.js
│   │   │   ├── trouble-ticket-repository.js
│   │   │   ├── invoice-repository.js
│   │   │   └── product-repository.js
│   │   └── value-objects/
│   │       ├── email.js
│   │       ├── phone.js
│   │       └── money.js
│   │
│   ├── use-cases/
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
│   ├── interfaces/
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
│   │   │   └── index.js
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
│   │       ├── quotation/
│   │       │   ├── create-quotation-dto.js
│   │       │   └── update-quotation-dto.js
│   │       └── deal/
│   │           ├── create-deal-dto.js
│   │           └── move-stage-dto.js
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │   │   └── prisma-client.js
│   │   ├── repositories/
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
│   ├── main.js                   # composition root
│   └── app.js                    # express setup
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.js
├── uploads/                      # file uploads (gitignored)
├── logs/                         # winston logs (gitignored)
├── .env.example
├── package.json
└── readme.md
```

---

## 5. struktur folder frontend

```
Mark-frontend/
├── public/
│   └── logo.svg
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── router.jsx
│   │   └── providers.jsx
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── FilterPopup.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── ExportPopup.jsx
│   │   │   ├── ImportPopup.jsx
│   │   │   ├── ColumnSettings.jsx
│   │   │   └── Pagination.jsx
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Topbar.jsx
│   │   │   └── SidePanel.jsx
│   │   ├── hooks/
│   │   │   ├── use-auth.js
│   │   │   ├── use-debounce.js
│   │   │   ├── use-pagination.js
│   │   │   ├── use-filter.js
│   │   │   └── use-local-storage.js
│   │   └── utils/
│   │       ├── format-currency.js
│   │       ├── format-date.js
│   │       ├── format-number.js
│   │       ├── generate-quot-number.js
│   │       └── cn.js              # class-names helper
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   └── LoginForm.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-login.js
│   │   │   ├── services/
│   │   │   │   └── auth-service.js
│   │   │   └── store/
│   │   │       └── auth-store.js
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   ├── RevenueChart.jsx
│   │   │   │   ├── PipelineFunnel.jsx
│   │   │   │   ├── CustomerMap.jsx
│   │   │   │   ├── DealsBySales.jsx
│   │   │   │   ├── ActivityFeed.jsx
│   │   │   │   ├── PipelineOverview.jsx
│   │   │   │   ├── RecentLeads.jsx
│   │   │   │   └── UpcomingTasks.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-dashboard.js
│   │   │   └── services/
│   │   │       └── dashboard-service.js
│   │   │
│   │   ├── crm/
│   │   │   ├── components/
│   │   │   │   ├── CustomerTable.jsx
│   │   │   │   ├── CustomerForm.jsx
│   │   │   │   ├── LeadForm.jsx
│   │   │   │   ├── CustomerDetail.jsx
│   │   │   │   ├── LeadDetail.jsx
│   │   │   │   ├── InteractionLog.jsx
│   │   │   │   ├── AddInteractionForm.jsx
│   │   │   │   └── QuickView.jsx
│   │   │   ├── hooks/
│   │   │   │   ├── use-customers.js
│   │   │   │   └── use-leads.js
│   │   │   └── services/
│   │   │       ├── customer-service.js
│   │   │       └── lead-service.js
│   │   │
│   │   ├── pipeline/
│   │   │   ├── components/
│   │   │   │   ├── KanbanBoard.jsx
│   │   │   │   ├── KanbanColumn.jsx
│   │   │   │   ├── DealCard.jsx
│   │   │   │   ├── DealForm.jsx
│   │   │   │   ├── DealDetail.jsx
│   │   │   │   ├── MoveStagePopup.jsx
│   │   │   │   ├── UpdateProbabilityPopup.jsx
│   │   │   │   └── PipelineSummary.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-pipeline.js
│   │   │   └── services/
│   │   │       └── deal-service.js
│   │   │
│   │   ├── quotation/
│   │   │   ├── components/
│   │   │   │   ├── QuotationTable.jsx
│   │   │   │   ├── QuotationForm.jsx
│   │   │   │   ├── QuotationItemRow.jsx
│   │   │   │   ├── QuotationDetail.jsx
│   │   │   │   ├── QuotationPreview.jsx
│   │   │   │   ├── QuotationStatusBadge.jsx
│   │   │   │   ├── SendEmailPopup.jsx
│   │   │   │   ├── DownloadPdfPopup.jsx
│   │   │   │   └── CreateInvoicePopup.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-quotation.js
│   │   │   └── services/
│   │   │       └── quotation-service.js
│   │   │
│   │   ├── presentation/
│   │   │   ├── components/
│   │   │   │   ├── PresentationTable.jsx
│   │   │   │   ├── PresentationForm.jsx
│   │   │   │   ├── SlideBuilder.jsx
│   │   │   │   ├── SlidePreview.jsx
│   │   │   │   ├── TemplateSelector.jsx
│   │   │   │   └── PresentationDetail.jsx
│   │   │   └── services/
│   │   │       └── presentation-service.js
│   │   │
│   │   ├── timeline/
│   │   │   ├── components/
│   │   │   │   ├── GanttChart.jsx
│   │   │   │   ├── GanttRow.jsx
│   │   │   │   ├── GanttBar.jsx
│   │   │   │   ├── InstallationDetail.jsx
│   │   │   │   ├── InstallationForm.jsx
│   │   │   │   └── StageTracker.jsx
│   │   │   ├── hooks/
│   │   │   │   └── use-timeline.js
│   │   │   └── services/
│   │   │       └── installation-service.js
│   │   │
│   │   ├── trouble-ticket/
│   │   │   ├── components/
│   │   │   │   ├── TicketTable.jsx
│   │   │   │   ├── TicketForm.jsx
│   │   │   │   ├── TicketDetail.jsx
│   │   │   │   ├── SlaTimer.jsx
│   │   │   │   └── TicketProgress.jsx
│   │   │   └── services/
│   │   │       └── trouble-ticket-service.js
│   │   │
│   │   ├── invoice/
│   │   │   ├── components/
│   │   │   │   ├── InvoiceTable.jsx
│   │   │   │   ├── InvoiceForm.jsx
│   │   │   │   ├── InvoiceDetail.jsx
│   │   │   │   └── PaymentHistory.jsx
│   │   │   └── services/
│   │   │       └── invoice-service.js
│   │   │
│   │   ├── product/
│   │   │   ├── components/
│   │   │   │   ├── ProductGrid.jsx
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductTable.jsx
│   │   │   │   └── ProductForm.jsx
│   │   │   └── services/
│   │   │       └── product-service.js
│   │   │
│   │   ├── report/
│   │   │   ├── components/
│   │   │   │   ├── SalesChart.jsx
│   │   │   │   ├── FunnelChart.jsx
│   │   │   │   ├── PipelineChart.jsx
│   │   │   │   ├── ProductPerformanceCard.jsx
│   │   │   │   ├── SalesTargetGauge.jsx
│   │   │   │   ├── SalesByArea.jsx
│   │   │   │   └── ReportFilter.jsx
│   │   │   └── services/
│   │   │       └── report-service.js
│   │   │
│   │   ├── notification/
│   │   │   ├── components/
│   │   │   │   ├── NotificationBell.jsx
│   │   │   │   ├── NotificationList.jsx
│   │   │   │   ├── NotificationItem.jsx
│   │   │   │   └── NotificationSettings.jsx
│   │   │   └── services/
│   │   │       └── notification-service.js
│   │   │
│   │   └── activity-log/
│   │       ├── components/
│   │       │   ├── ActivityLogTable.jsx
│   │       │   ├── ActivityByModule.jsx
│   │       │   └── ActivityByAction.jsx
│   │       └── services/
│   │           └── activity-log-service.js
│   │
│   ├── pages/
│   │   ├── dashboard-page.jsx
│   │   ├── crm/
│   │   │   ├── crm-page.jsx
│   │   │   ├── customer-detail-page.jsx
│   │   │   └── lead-detail-page.jsx
│   │   ├── pipeline-page.jsx
│   │   ├── quotation/
│   │   │   ├── quotation-page.jsx
│   │   │   └── quotation-detail-page.jsx
│   │   ├── presentation-page.jsx
│   │   ├── timeline-page.jsx
│   │   ├── trouble-ticket-page.jsx
│   │   ├── invoice-page.jsx
│   │   ├── product-page.jsx
│   │   ├── reports/
│   │   │   ├── reports-overview-page.jsx
│   │   │   ├── sales-performance-page.jsx
│   │   │   ├── product-performance-page.jsx
│   │   │   ├── pipeline-report-page.jsx
│   │   │   └── conversion-report-page.jsx
│   │   ├── notification-page.jsx
│   │   ├── activity-log-page.jsx
│   │   ├── profile-page.jsx
│   │   └── settings-page.jsx
│   │
│   └── constants/
│       ├── api-endpoints.js
│       ├── route-paths.js
│       ├── deal-stages.js
│       ├── ticket-priorities.js
│       └── status-colors.js
│
├── .env.example
├── tailwind.config.js
├── vite.config.js
├── package.json
└── readme.md
```

---

## 6. api endpoints

### auth
```
post   /api/auth/login
post   /api/auth/logout
post   /api/auth/refresh-token
post   /api/auth/reset-password
get    /api/auth/me
```

### crm — customers
```
get    /api/customers                    # list + filter + pagination
post   /api/customers                    # create
get    /api/customers/:id                # detail
put    /api/customers/:id                # update
delete /api/customers/:id                # delete
get    /api/customers/:id/interactions   # list interaksi
post   /api/customers/:id/interactions   # tambah interaksi
get    /api/customers/:id/services       # layanan aktif
get    /api/customers/:id/invoices       # invoice customer
get    /api/customers/:id/tickets        # trouble ticket customer
```

### crm — leads
```
get    /api/leads
post   /api/leads
get    /api/leads/:id
put    /api/leads/:id
delete /api/leads/:id
patch  /api/leads/:id/status
patch  /api/leads/:id/assign
post   /api/leads/import
get    /api/leads/export
```

### deals (pipeline)
```
get    /api/deals
post   /api/deals
get    /api/deals/:id
put    /api/deals/:id
delete /api/deals/:id
patch  /api/deals/:id/move-stage
patch  /api/deals/:id/probability
post   /api/deals/:id/duplicate
post   /api/deals/import
```

### quotations
```
get    /api/quotations
post   /api/quotations
get    /api/quotations/:id
put    /api/quotations/:id
delete /api/quotations/:id
patch  /api/quotations/:id/send
patch  /api/quotations/:id/status
post   /api/quotations/:id/duplicate
get    /api/quotations/:id/pdf
post   /api/quotations/:id/send-email
post   /api/quotations/:id/convert-to-invoice
```

### presentations
```
get    /api/presentations
post   /api/presentations
get    /api/presentations/:id
put    /api/presentations/:id
delete /api/presentations/:id
get    /api/presentations/:id/pdf
post   /api/presentations/:id/share        # generate share link
get    /api/presentation-templates         # daftar template
```

### installations (timeline)
```
get    /api/installations
post   /api/installations
get    /api/installations/:id
put    /api/installations/:id
patch  /api/installations/:id/update-stage
patch  /api/installations/:id/assign-technician
```

### trouble-tickets
```
get    /api/trouble-tickets
post   /api/trouble-tickets
get    /api/trouble-tickets/:id
put    /api/trouble-tickets/:id
patch  /api/trouble-tickets/:id/status
patch  /api/trouble-tickets/:id/assign
post   /api/trouble-tickets/:id/notes
```

### invoices
```
get    /api/invoices
post   /api/invoices
get    /api/invoices/:id
put    /api/invoices/:id
delete /api/invoices/:id
post   /api/invoices/:id/record-payment
patch  /api/invoices/:id/send
get    /api/invoices/:id/pdf
```

### products
```
get    /api/products
post   /api/products
get    /api/products/:id
put    /api/products/:id
delete /api/products/:id
patch  /api/products/:id/status
```

### reports
```
get    /api/reports/dashboard
get    /api/reports/sales
get    /api/reports/pipeline
get    /api/reports/product-performance
get    /api/reports/conversion
get    /api/reports/export           # export laporan ke excel/pdf
```

### notifications
```
get    /api/notifications
patch  /api/notifications/:id/read
patch  /api/notifications/read-all
delete /api/notifications/:id
```

### activity-logs
```
get    /api/activity-logs            # list + filter
get    /api/activity-logs/stats      # statistik agregat
```

---

## 7. middleware chain

setiap request melalui chain berikut:

```
request
  → cors
  → helmet
  → rate-limiter (global)
  → json body parser
  → morgan (logging)
  → auth-middleware     (verifikasi jwt, inject req.user)
  → role-middleware     (cek permission berdasarkan role)
  → validate-request    (validasi dto dengan zod)
  → controller.method
  → activity-logger     (catat log aktivitas async)
  → error-handler
response
```

### role-middleware permission matrix

| endpoint | super-admin | admin | sales | teknisi |
|---|---|---|---|---|
| semua read | ✓ | ✓ | ✓ | ✓ |
| customer crud | ✓ | ✓ | ✓ | ✗ |
| lead crud | ✓ | ✓ | ✓ | ✗ |
| deal crud | ✓ | ✓ | ✓ | ✗ |
| quotation create/edit | ✓ | ✓ | ✓ | ✗ |
| installation update | ✓ | ✓ | ✗ | ✓ |
| invoice create/edit | ✓ | ✓ | ✗ | ✗ |
| user management | ✓ | ✓ | ✗ | ✗ |
| settings | ✓ | ✓ | ✗ | ✗ |
| delete data | ✓ | ✓ | ✗ | ✗ |
| reports | ✓ | ✓ | own data | ✗ |

---

## 8. autentikasi & keamanan

### jwt flow
```
login → server validasi password → issue access token (8h) + refresh token (30d)
request → bearer token di header authorization
token expired → call /api/auth/refresh-token dengan refresh token
logout → invalidate refresh token di database
```

### password security
- bcrypt dengan salt rounds 12
- minimum 8 karakter, harus ada huruf dan angka

### rate limiting
- global: 100 req/15 menit per ip
- endpoint login: 10 req/15 menit per ip

### cors
- allowed origins: hanya domain frontend (dari env)
- allowed methods: get, post, put, patch, delete, options
- allowed headers: content-type, authorization

### activity logger
setiap operasi create/update/delete otomatis dicatat ke tabel `activity_logs` melalui middleware async (tidak memblokir response).

---

## 9. format response api

### sukses
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "total": 153,
    "page": 1,
    "limit": 10,
    "totalPages": 16
  }
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
      { "field": "email", "message": "email tidak valid" }
    ]
  }
}
```

### kode error standar
| kode | http status | keterangan |
|---|---|---|
| VALIDATION_ERROR | 400 | input gagal validasi zod |
| UNAUTHORIZED | 401 | token tidak valid atau expired |
| FORBIDDEN | 403 | tidak punya permission |
| NOT_FOUND | 404 | data tidak ditemukan |
| CONFLICT | 409 | data duplikat |
| INTERNAL_ERROR | 500 | server error |

---

## 10. .env.example

```env
# aplikasi
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173

# database
DATABASE_URL="mysql://user:password@localhost:3306/rapid_mark"

# jwt
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=8h
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=30d

# email
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=your@email.com
MAIL_PASS=your-app-password
MAIL_FROM="Mark <noreply@rapidmark.co.id>"

# upload
UPLOAD_MAX_SIZE=5242880
UPLOAD_PATH=./uploads

# whatsapp (opsional)
WA_GATEWAY_URL=https://api.fonnte.com/send
WA_TOKEN=your-wa-token
```

---

*tech-arch.md — Mark isp sales & management system*
*versi: 1.0 | referensi: screenshot ui aktual + clean architecture*
