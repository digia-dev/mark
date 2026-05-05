# task.md — Mark development task list

> task list lengkap pembangunan aplikasi Mark dari 0 code.
> setiap task dilengkapi dengan kode workflow, file yang dibuat, dan urutan pengerjaan.
> gunakan checklist ini untuk melacak progress seluruh sprint.

---

## legenda

```
[ ] → belum dikerjakan
[x] → selesai
[~] → sedang dikerjakan
[!] → blocked / ada masalah

/wf-01 → membuat fitur baru
/wf-02 → memperbaiki bug
/wf-03 → membuat komponen ui baru
/wf-04 → perubahan skema database
/wf-05 → membuat endpoint api baru
/wf-06 → refactoring kode
/wf-07 → review & merge kode
/wf-08 → release & deployment
/wf-09 → onboarding sprint baru
/wf-10 → hotfix production
```

---

## sprint-1 — setup, autentikasi & manajemen user

> fondasi project. semua sprint lain bergantung pada sprint ini.

---

### TASK-001 — inisialisasi project backend `/wf-01`

```
[x] buat folder: Mark-backend/
[x] jalankan: npm init -y
[x] install dependencies produksi:
    npm install express prisma @prisma/client mysql2 jsonwebtoken bcryptjs
    zod multer nodemailer express-rate-limit helmet cors morgan winston
    swagger-ui-express dayjs exceljs dotenv
[x] install dependencies development:
    npm install -D nodemon eslint prettier
[x] buat file: .env (salin dari .env.example di tech-arch.md)
[x] buat file: .env.example
[x] buat file: .gitignore
    → node_modules/, .env, uploads/, prisma/dev.db
[x] buat file: package.json → tambahkan scripts:
    "start": "node src/server.js"
    "dev": "nodemon src/server.js"
    "seed": "node prisma/seed.js"
[x] buat folder struktur awal:
    src/domain/entities/
    src/domain/repositories/
    src/domain/value-objects/
    src/use-cases/auth/
    src/interfaces/controllers/
    src/interfaces/routes/
    src/interfaces/dtos/
    src/interfaces/middlewares/
    src/infrastructure/repositories/
    src/infrastructure/services/
    src/infrastructure/database/
```

---

### TASK-002 — inisialisasi project frontend `/wf-01`

```
[x] jalankan: npm create vite@latest Mark-frontend -- --template react
[x] masuk folder dan install dependencies:
    npm install react-router-dom zustand @tanstack/react-query axios
    tailwindcss @tailwindcss/vite
    react-hook-form zod @hookform/resolvers
    lucide-react recharts date-fns framer-motion
    leaflet react-leaflet
    react-beautiful-dnd
    @radix-ui/react-dialog @radix-ui/react-dropdown-menu
    @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-tooltip
[x] setup tailwind:
    → buat tailwind.config.js dengan palet warna dari design.md
    → tambahkan @import "tailwindcss" di index.css
[x] setup folder struktur:
    src/features/auth/
    src/features/crm/
    src/features/pipeline/
    src/features/quotation/
    src/features/presentation/
    src/features/timeline/
    src/features/trouble-ticket/
    src/features/invoice/
    src/features/product/
    src/features/report/
    src/features/notification/
    src/features/activity-log/
    src/shared/components/
    src/shared/hooks/
    src/shared/utils/
    src/shared/constants/
    src/pages/
    src/lib/
[x] buat file: src/lib/axios.js → setup axios instance dengan base url & interceptor jwt
[x] buat file: src/lib/query-client.js → setup tanstack query client
[x] update main.jsx → wrap dengan QueryClientProvider + BrowserRouter
```

---

### TASK-003 — setup database & prisma `/wf-04`

```
[x] jalankan: npx prisma init
[x] edit prisma/schema.prisma → salin schema lengkap dari database.md:
    - model User
    - model RefreshToken
    - model Branch
    - model Customer
    - model Lead
    - model Interaction
    - model Product
    - model Deal
    - model DealActivity
    - model Quotation
    - model QuotationItem
    - model Presentation
    - model PresentationSlide
    - model Installation
    - model InstallationStage
    - model TroubleTicket
    - model TicketNote
    - model Invoice
    - model InvoiceItem
    - model Payment
    - model CustomerService
    - model Notification
    - model ActivityLog
    - model SalesTarget
[x] buat database mysql:
    mysql -u root -p -e "create database Mark_ISP character set utf8mb4 collate utf8mb4_unicode_ci;"
[x] jalankan: npx prisma generate
[x] jalankan: npx prisma migrate dev --name init
[x] buat file: prisma/seed.js (salin dari database.md bagian seed data)
[x] tambahkan ke package.json:
    "prisma": { "seed": "node prisma/seed.js" }
[x] jalankan: npx prisma db seed
[x] verifikasi dengan: npx prisma studio
[x] buat file: src/infrastructure/database/prisma-client.js
    → export singleton prisma instance
```

---

### TASK-004 — setup express server `/wf-01`

```
[x] buat file: src/server.js → entry point express
[x] buat file: src/app.js → setup express app:
    - helmet()
    - cors() dengan allowed origins dari .env
    - express.json()
    - morgan('combined')
    - rate limiter global (100 req/15 menit)
    - mount semua routes dari main.js
    - global error handler middleware
[x] buat file: src/interfaces/middlewares/error-handler.js
    → tangkap semua error, format sesuai standar response api
[x] buat file: src/interfaces/middlewares/not-found.js
    → 404 handler
[x] buat file: src/shared/response.js
    → helper: successResponse(data, meta) dan errorResponse(code, message, details)
[x] buat file: src/main.js → composition root (masih kosong, diisi per modul)
[x] test: jalankan npm run dev → server harus running di port 3000
```

---

### TASK-005 — domain layer: user entity `/wf-01`

```
[x] buat file: src/domain/entities/user.js
    method yang diperlukan:
    - isActive() → return this.is_active
    - hasRole(role) → return this.role === role
    - canAccess(permission) → cek matrix permission
[x] buat file: src/domain/repositories/user-repository.js
    method interface:
    - findById(id)
    - findByEmail(email)
    - findAll(filters)
    - create(data)
    - update(id, data)
    - delete(id)
```

---

### TASK-006 — use-cases: autentikasi `/wf-01`

```
[x] buat file: src/use-cases/auth/login-use-case.js
    - terima: { email, password }
    - validasi user ada dan is_active
    - verify bcrypt password
    - issue access token (jwt, 8h) + refresh token (jwt, 30d)
    - simpan refresh token ke database
    - return: { user, accessToken, refreshToken }

[x] buat file: src/use-cases/auth/logout-use-case.js
    - hapus refresh token dari database

[x] buat file: src/use-cases/auth/refresh-token-use-case.js
    - verify refresh token
    - cek token masih ada di database (tidak di-blacklist)
    - issue access token baru
    - return: { accessToken }

[x] buat file: src/use-cases/auth/get-profile-use-case.js
    - return: data user dari req.user (sudah di-inject middleware)
```

---

### TASK-007 — infrastructure: auth repository & service `/wf-01`

```
[x] buat file: src/infrastructure/repositories/prisma-user-repository.js
    - implementasi semua method dari user-repository.js
    - findByEmail harus include password_hash

[x] buat file: src/infrastructure/services/jwt-service.js
    - generateAccessToken(payload)
    - generateRefreshToken(payload)
    - verifyAccessToken(token)
    - verifyRefreshToken(token)

[x] buat file: src/infrastructure/services/bcrypt-service.js
    - hash(password) → salt rounds 12
    - compare(password, hash)
```

---

### TASK-008 — interfaces: auth controller, dto, route `/wf-05`

```
[x] buat file: src/interfaces/dtos/auth-dto.js
    schema zod:
    - loginSchema: { email: string().email(), password: string().min(8) }

[x] buat file: src/interfaces/controllers/auth-controller.js
    methods: login(), logout(), refreshToken(), getProfile()

[x] buat file: src/interfaces/middlewares/auth-middleware.js
    - ambil bearer token dari Authorization header
    - verify dengan jwt-service
    - inject req.user = payload
    - next() atau 401

[x] buat file: src/interfaces/middlewares/role-middleware.js
    - factory: roleMiddleware(allowedRoles)
    - cek req.user.role ada di allowedRoles
    - 403 jika tidak ada akses

[x] buat file: src/interfaces/middlewares/validate-request.js
    - factory: validate(schema)
    - parse req.body dengan zod schema
    - 400 VALIDATION_ERROR jika gagal

[x] buat file: src/interfaces/routes/auth-routes.js
    POST /api/auth/login   → no auth → login
    POST /api/auth/logout  → auth → logout
    POST /api/auth/refresh → no auth → refreshToken
    GET  /api/auth/me      → auth → getProfile

[x] update src/main.js → wire auth dependencies
[x] test semua endpoint auth di postman
```

---

### TASK-009 — use-cases & endpoint: manajemen user `/wf-01` `/wf-05`

```
[x] buat file: src/use-cases/user/create-user-use-case.js
    - validasi email unik
    - hash password dengan bcrypt
    - generate user baru

[x] buat file: src/use-cases/user/update-user-use-case.js
[x] buat file: src/use-cases/user/get-user-list-use-case.js
    - support filter: role, branch, is_active, search name/email
    - pagination
[x] buat file: src/use-cases/user/get-user-detail-use-case.js
[x] buat file: src/use-cases/user/delete-user-use-case.js
[x] buat file: src/use-cases/user/change-password-use-case.js

[x] buat file: src/interfaces/dtos/user-dto.js
[x] buat file: src/interfaces/controllers/user-controller.js
[x] buat file: src/interfaces/routes/user-routes.js
    GET    /api/users          → super-admin, admin
    POST   /api/users          → super-admin, admin
    GET    /api/users/:id      → super-admin, admin
    PUT    /api/users/:id      → super-admin, admin
    DELETE /api/users/:id      → super-admin
    PATCH  /api/users/:id/password → super-admin, admin, self

[x] buat file: src/infrastructure/repositories/prisma-user-repository.js (update)
[x] update src/main.js
```

---

### TASK-010 — activity logger middleware `/wf-01`

```
[x] buat file: src/interfaces/middlewares/activity-logger.js
    - async middleware, tidak memblokir response
    - tangkap: user_id, module, action (create/update/delete), description,
      entity_id, entity_type, ip_address, user_agent
    - tulis ke tabel activity_logs via prisma (fire and forget)

[x] buat file: src/infrastructure/repositories/prisma-activity-log-repository.js

[x] pasang activity-logger SETELAH controller method di semua route yang write
```

---

### TASK-011 — frontend: auth feature `/wf-01` `/wf-03`

```
[x] buat file: src/features/auth/services/auth-service.js
    - login(email, password) → POST /api/auth/login
    - logout() → POST /api/auth/logout
    - refreshToken() → POST /api/auth/refresh
    - getProfile() → GET /api/auth/me

[x] buat file: src/features/auth/store/auth-store.js (zustand)
    state: { user, accessToken, isAuthenticated }
    actions: setAuth(), clearAuth(), setUser()

[x] buat file: src/features/auth/hooks/use-auth.js
    - useLogin() → mutation tanstack query
    - useLogout()
    - useProfile()

[x] buat file: src/features/auth/components/LoginForm.jsx
    - form: email + password
    - react-hook-form + zod validation
    - loading state saat submit
    - error message dari api

[x] buat file: src/pages/LoginPage.jsx
    - layout full screen
    - logo Mark di tengah atas
    - LoginForm component

[x] buat file: src/shared/components/ProtectedRoute.jsx
    - cek isAuthenticated dari auth store
    - redirect ke /login jika belum auth

[x] setup axios interceptor di src/lib/axios.js:
    - inject Authorization: Bearer {token} ke setiap request
    - interceptor response: jika 401 → coba refresh token → retry request
    - jika refresh gagal → logout + redirect /login

[x] setup react-router di App.jsx:
    / → redirect ke /dashboard
    /login → LoginPage (public)
    /* → ProtectedRoute → MainLayout
```

---

### TASK-012 — frontend: layout utama `/wf-03`

```
[x] buat file: src/shared/components/layout/MainLayout.jsx
    - topbar + sidebar + content area
    - responsive: sidebar collapse di tablet

[x] buat file: src/shared/components/layout/Topbar.jsx
    - hamburger toggle sidebar
    - global search bar (ctrl+k) → placeholder sesuai design.md
    - tombol "Tambah Cepat" (orange accent) dengan dropdown 9 opsi
    - notifikasi bell (badge merah)
    - pesan badge
    - avatar + nama + role user
    - dropdown logout

[x] buat file: src/shared/components/layout/Sidebar.jsx
    - logo Mark
    - menu navigasi 13 item sesuai design.md (urutan sidebar)
    - sub-menu collapsible (CRM, Reports, Settings)
    - active state: bg blue-700 text white
    - widget target bulan ini di bagian bawah (ring chart + nilai)

[x] buat file: src/shared/components/layout/SidebarMenu.jsx
    - item menu tunggal dengan ikon lucide + label
    - support sub-menu

[x] buat file: src/shared/components/layout/TargetWidget.jsx
    - ring/donut chart progress menggunakan recharts
    - tampilkan persentase di tengah
    - nilai realisasi + target
    - link "Lihat Detail Target →"

[x] buat file: src/shared/components/GlobalSearch.jsx
    - modal overlay (ctrl+k trigger)
    - search input dengan debounce 300ms
    - hasil dikelompokkan: customer, lead, quotation, deal
    - navigasi keyboard (↑↓ enter)
    - call GET /api/search?q={query}
```

---

## sprint-2 — master data

---

### TASK-013 — backend: branch & area management `/wf-01` `/wf-05`

```
[x] buat domain entity: src/domain/entities/branch.js
[x] buat interface repo: src/domain/repositories/branch-repository.js
[x] buat use-cases:
    src/use-cases/branch/create-branch-use-case.js
    src/use-cases/branch/update-branch-use-case.js
    src/use-cases/branch/get-branch-list-use-case.js
    src/use-cases/branch/delete-branch-use-case.js
[x] buat prisma repo: src/infrastructure/repositories/prisma-branch-repository.js
[x] buat dto: src/interfaces/dtos/branch-dto.js
[x] buat controller: src/interfaces/controllers/branch-controller.js
[x] buat routes: src/interfaces/routes/branch-routes.js
    GET    /api/branches        → semua role
    POST   /api/branches        → super-admin, admin
    PUT    /api/branches/:id    → super-admin, admin
    DELETE /api/branches/:id    → super-admin
[x] update main.js
```

---

### TASK-014 — backend: products & services `/wf-01` `/wf-05`

```
[x] buat domain entity: src/domain/entities/product.js
    method:
    - isActive() → return this.status !== 'inactive'
    - getCurrentPrice() → return is_promo ? promo_price : price
    - isPromoExpired() → cek promo_end_date

[x] buat interface repo: src/domain/repositories/product-repository.js
    methods: findById, findAll(filters), create, update, delete, updateStatus

[x] buat use-cases:
    src/use-cases/product/create-product-use-case.js
    src/use-cases/product/update-product-use-case.js
    src/use-cases/product/get-product-list-use-case.js
      → filter: status, category, technology, search
      → pagination
    src/use-cases/product/get-product-detail-use-case.js
    src/use-cases/product/delete-product-use-case.js
    src/use-cases/product/toggle-product-status-use-case.js

[x] buat prisma repo: src/infrastructure/repositories/prisma-product-repository.js
[x] buat dto: src/interfaces/dtos/product-dto.js
[x] buat controller: src/interfaces/controllers/product-controller.js
[x] buat routes: src/interfaces/routes/product-routes.js
    GET    /api/products             → semua role (read)
    POST   /api/products             → super-admin, admin
    GET    /api/products/:id         → semua role
    PUT    /api/products/:id         → super-admin, admin
    DELETE /api/products/:id         → super-admin, admin
    PATCH  /api/products/:id/status  → super-admin, admin
[x] update main.js
```

---

### TASK-015 — frontend: halaman products & services `/wf-03`

```
[x] buat file: src/features/product/services/product-service.js
[x] buat file: src/features/product/hooks/use-products.js
    - useProductList(filters) → react-query dengan pagination
    - useProductDetail(id)
    - useCreateProduct()
    - useUpdateProduct()
    - useDeleteProduct()
    - useToggleProductStatus()

[x] buat file: src/features/product/components/ProductCard.jsx
    - badge best seller / promo / new di pojok kiri atas
    - ikon teknologi (router/antena svg atau lucide)
    - nama, speed down↓ up↑, harga/bulan
    - label promo merah jika is_promo
    - status badge
    - tombol: detail, buat quotation

[x] buat file: src/features/product/components/ProductTable.jsx
    - tabel dengan kolom: nama, kategori, teknologi, harga, status, aksi
    - checkbox bulk select
    - pagination
    - filter bar

[x] buat file: src/features/product/components/ProductForm.jsx
    - modal form create/edit
    - field: nama, kategori, deskripsi, speed_down, speed_up,
      harga, teknologi, area_coverage, is_best_seller, is_promo,
      promo_price, promo_end_date, status
    - react-hook-form + zod

[x] buat file: src/features/product/components/ProductStatCards.jsx
    - stat card: total produk, aktif, nonaktif, promo

[x] buat file: src/pages/ProductPage.jsx
    - stat cards → filter bar → toggle grid/table → ProductCard atau ProductTable

---

## sprint-3 — crm (customers & leads)

---

### TASK-016 — backend: customer module `/wf-01` `/wf-05`

```
[x] buat domain entity: src/domain/entities/customer.js
    method:
    - isActive()
    - getDisplayName() → return company || name
    - generateCustomerCode(sequence) → format CUS-yyyy-xxxxxx

[x] buat interface repo: src/domain/repositories/customer-repository.js
    methods: findById, findByCode, findAll(filters), create, update, delete,
    getInteractions(customerId), getServices(customerId), getInvoices(customerId)

[x] buat use-cases:
    src/use-cases/customer/create-customer-use-case.js
      → auto-generate customer_code
      → validasi phone/email unik
    src/use-cases/customer/update-customer-use-case.js
    src/use-cases/customer/get-customer-list-use-case.js
      → filter: status, sales_id, area, sector, search, type
      → pagination
    src/use-cases/customer/get-customer-detail-use-case.js
      → include: interactions, services, invoices count, tickets count
    src/use-cases/customer/delete-customer-use-case.js
    [x] src/use-cases/customer/add-interaction-use-case.js
    [x] src/use-cases/customer/get-customer-stats-use-case.js
      → total customers, new this month, active, inactive
    [x] src/use-cases/customer/import-customers-use-case.js
    [x] src/use-cases/customer/export-customers-use-case.js

[x] buat prisma repo: src/infrastructure/repositories/prisma-customer-repository.js
[x] buat dto: src/interfaces/dtos/customer-dto.js
[x] buat controller: src/interfaces/controllers/customer-controller.js
[x] buat routes: src/interfaces/routes/customer-routes.js
    GET    /api/customers
    POST   /api/customers
    GET    /api/customers/:id
    PUT    /api/customers/:id
    DELETE /api/customers/:id          → super-admin, admin
    [x] GET    /api/customers/:id/interactions
    [x] POST   /api/customers/:id/interactions
    [x] GET    /api/customers/:id/services
    [x] GET    /api/customers/:id/invoices
    [x] GET    /api/customers/:id/tickets
    [x] POST   /api/customers/import
    [x] GET    /api/customers/export
[x] update main.js
```

---

### TASK-017 — backend: lead module `/wf-01` `/wf-05`

```
[x] buat domain entity: src/domain/entities/lead.js
    method:
    - canBeConverted() → status === 'qualified' || 'penawaran'
    - isLost() → status === 'lost'
    - convertToCustomer() → return customer data shape

[x] buat interface repo: src/domain/repositories/lead-repository.js

[x] buat use-cases:
    src/use-cases/lead/create-lead-use-case.js
    [x] src/use-cases/lead/update-lead-use-case.js
    src/use-cases/lead/get-lead-list-use-case.js
      → filter: status, assigned_to, area, source, search, follow_up_date
    [x] src/use-cases/lead/get-lead-detail-use-case.js
    [x] src/use-cases/lead/delete-lead-use-case.js
    [x] src/use-cases/lead/update-lead-status-use-case.js
      → validasi status transition sesuai rules.md
    [x] src/use-cases/lead/assign-lead-use-case.js
    src/use-cases/lead/convert-lead-to-customer-use-case.js
      → buat customer baru dari data lead
      → update lead.status = 'converted' + lead.customer_id
    [x] src/use-cases/lead/import-leads-use-case.js

[x] buat prisma repo: src/infrastructure/repositories/prisma-lead-repository.js
[x] buat dto: src/interfaces/dtos/lead-dto.js
[x] buat controller: src/interfaces/controllers/lead-controller.js
[x] buat routes: src/interfaces/routes/lead-routes.js
    GET    /api/leads
    POST   /api/leads
    [x] GET    /api/leads/:id
    PUT    /api/leads/:id
    [x] DELETE /api/leads/:id
    [x] PATCH  /api/leads/:id/status
    [x] PATCH  /api/leads/:id/assign
    POST   /api/leads/:id/convert
    [x] POST   /api/leads/import
    [x] GET    /api/leads/export
[x] update main.js
```

---

### TASK-018 — frontend: halaman CRM `/wf-03`

```
[x] buat file: src/features/crm/services/customer-service.js
[x] buat file: src/features/crm/services/lead-service.js
[x] buat file: src/features/crm/hooks/use-customers.js
[x] buat file: src/features/crm/hooks/use-leads.js

[x] buat file: src/features/crm/components/CustomerTable.jsx
    - kolom: nama/perusahaan, tipe badge, status badge, sales, area,
      terakhir kontak, total tagihan, aksi
    - checkbox bulk select, three-dot menu
    - tab: semua, customers, leads

[x] buat file: src/features/crm/components/CustomerDetailPanel.jsx
    - side panel 420-480px dari kanan
    - tab: informasi, kontak, layanan aktif, riwayat, aktivitas, dokumen, catatan
    - ringkasan: total layanan, total invoice, total tagihan, outstanding

[x] buat file: src/features/crm/components/CustomerForm.jsx
    - modal form create/edit customer
    - field: nama, tipe, email, phone, website, npwp, alamat, kota, provinsi,
      area, sektor, contact person, sales, branch, status, notes
    - validasi zod

[x] buat file: src/features/crm/components/LeadTable.jsx
[x] buat file: src/features/crm/components/LeadForm.jsx
    - modal form create/edit lead
    - field: nama, perusahaan, phone, email, alamat, area, sumber, sales, status,
      follow_up_date, notes

[x] buat file: src/features/crm/components/InteractionForm.jsx
    - modal tambah interaksi (call, meeting, email, whatsapp, visit)
    - field: tipe, catatan, next_action, next_action_date

[x] buat file: src/features/crm/components/CrmStatCards.jsx
    - stat card: total customers, new this month, active, inactive, leads baru

[x] buat file: src/features/crm/components/ConvertLeadModal.jsx
    - konfirmasi konversi lead → customer
    - preview data yang akan dibuat

[x] buat file: src/pages/CustomerPage.jsx
[x] buat file: src/pages/LeadPage.jsx
```

---

## sprint-4 — pipeline (kanban board)

---

### TASK-019 — backend: deal module `/wf-01` `/wf-05`

```
[x] buat domain entity: src/domain/entities/deal.js
    method:
    - isActive() → status === 'active'
    - canMoveStage(targetStage) → validasi urutan stage
    - calculateWinProbability() → berdasarkan stage (prospek 20%, negosiasi 50%, dll)
    - isWon() / isLost()

[x] buat interface repo: src/domain/repositories/deal-repository.js
    methods: findById, findAll(filters), findByStage, create, update, delete,
    moveStage, updateProbability, getActivities(dealId), addActivity(dealId, data)

[x] buat use-cases:
    [x] src/use-cases/deal/create-deal-use-case.js
    [x] src/use-cases/deal/update-deal-use-case.js
    [x] src/use-cases/deal/get-deal-list-use-case.js
      → filter: stage, sales_id, customer_id, search, date_range
    [x] src/use-cases/deal/get-deal-kanban-use-case.js
      → return deals dikelompokkan per stage + summary per stage
    [x] src/use-cases/deal/get-deal-detail-use-case.js
    [x] src/use-cases/deal/delete-deal-use-case.js
    [x] src/use-cases/deal/move-deal-stage-use-case.js
      → validasi transisi stage
      → catat di deal_activities
    [x] src/use-cases/deal/update-deal-probability-use-case.js
    [x] src/use-cases/deal/duplicate-deal-use-case.js
    [x] src/use-cases/deal/mark-deal-won-use-case.js
    [x] src/use-cases/deal/mark-deal-lost-use-case.js
    [x] src/use-cases/deal/get-pipeline-summary-use-case.js
      → total deals, total value, per stage breakdown, win rate, avg cycle

[x] buat prisma repo: src/infrastructure/repositories/prisma-deal-repository.js
[x] buat dto: src/interfaces/dtos/deal-dto.js
[x] buat controller: src/interfaces/controllers/deal-controller.js
[x] buat routes: src/interfaces/routes/deal-routes.js
    GET    /api/deals
    GET    /api/deals/kanban          → grouped by stage
    [x] GET    /api/deals/summary         → pipeline summary stats
    POST   /api/deals
    [x] GET    /api/deals/:id
    [x] PUT    /api/deals/:id
    [x] DELETE /api/deals/:id
    PATCH  /api/deals/:id/move-stage
    [x] PATCH  /api/deals/:id/probability
    [x] POST   /api/deals/:id/duplicate
    [x] PATCH  /api/deals/:id/won
    [x] PATCH  /api/deals/:id/lost
[x] update main.js
```

---

### TASK-020 — frontend: halaman pipeline `/wf-03`

```
[x] buat file: src/features/pipeline/services/deal-service.js
[x] buat file: src/features/pipeline/hooks/use-deals.js

[x] buat file: src/features/pipeline/components/KanbanBoard.jsx
    - 5 kolom: prospek, negosiasi, penawaran, closing, instalasi
    - header kolom: nama stage + jumlah deals + total nilai
    - drag & drop menggunakan react-beautiful-dnd
    - saat drop → call PATCH /api/deals/:id/move-stage

[x] buat file: src/features/pipeline/components/KanbanCard.jsx
    - nama deal
    - nama customer
    - nilai deal (format rupiah)
    - probabilitas (badge/persentase)
    - expected closing date
    - avatar sales
    - label area

[x] buat file: src/features/pipeline/components/PipelineSidebar.jsx
    - sidebar kiri: pipeline summary
    - total deals, total value
    - breakdown per stage dengan progress bar berwarna
    - tombol "Lihat Detail Laporan"

[x] buat file: src/features/pipeline/components/DealTable.jsx
    - tabel view alternatif dari kanban
    - kolom: no, nama deal, customer, stage badge, nilai, probabilitas,
      expected closing, sales, area, status, aksi

[x] buat file: src/features/pipeline/components/DealForm.jsx
    - modal create/edit deal
    - field: nama, customer (search dropdown), lead, nilai, stage,
      probabilitas, expected_closing_date, sales, area, notes

[x] buat file: src/features/pipeline/components/PipelineStatCards.jsx
    - stat card: total deals, total value, deals won, win rate, avg sales cycle

[x] buat file: src/features/pipeline/components/PipelineFunnelChart.jsx
    - funnel chart menggunakan recharts
    - 5 stage dengan nilai per stage

[x] buat file: src/pages/PipelinePage.jsx
    - stat cards → toggle board/table → KanbanBoard atau DealTable
    - PipelineSidebar di kiri
```

---

## sprint-5 — quotation + pdf generator

---

### TASK-021 — backend: quotation module `/wf-01` `/wf-05`

```
[x] buat domain entity: src/domain/entities/quotation.js
    method:
    - isExpired() → new Date() > validUntil
    - canBeSent() → status === 'draft'
    - canBeApproved() → status === 'sent'
    - calculateTotal(items) → subtotal + tax (11%) - discount = total
    - generateQuotNumber(sequence) → format Q-yyyy-nnnn

[x] buat interface repo: src/domain/repositories/quotation-repository.js

[x] buat use-cases:
    [x] src/use-cases/quotation/create-quotation-use-case.js
      → auto-generate quot_number
      → hitung subtotal, tax, total dari items
    [x] src/use-cases/quotation/update-quotation-use-case.js
      → hanya bisa update jika status 'draft'
    [x] src/use-cases/quotation/get-quotation-list-use-case.js
    [x] src/use-cases/quotation/get-quotation-detail-use-case.js
      → include: items, customer, riwayat status
    [x] src/use-cases/quotation/delete-quotation-use-case.js
    [x] src/use-cases/quotation/send-quotation-use-case.js
      → ubah status draft → sent
      → kirim email ke customer (nodemailer)
    [x] src/use-cases/quotation/update-quotation-status-use-case.js
      → validasi transisi: sent → approved/rejected/expired
    [x] src/use-cases/quotation/duplicate-quotation-use-case.js
    [x] src/use-cases/quotation/generate-pdf-use-case.js
    [x] src/use-cases/quotation/convert-to-invoice-use-case.js
      → buat invoice baru dari quotation yang approved

[x] buat file: src/infrastructure/services/pdf-service.js
    - generateQuotationPdf(quotationData) → return buffer
    - template html → puppeteer → pdf

[x] buat file: src/infrastructure/services/mail-service.js
    - sendQuotationEmail(to, quotationData, pdfBuffer)
    - setup nodemailer transporter dari .env

[x] buat prisma repo: src/infrastructure/repositories/prisma-quotation-repository.js
[x] buat dto: src/interfaces/dtos/quotation-dto.js
[x] buat controller: src/interfaces/controllers/quotation-controller.js
[x] buat routes: src/interfaces/routes/quotation-routes.js
    GET    /api/quotations
    POST   /api/quotations
    GET    /api/quotations/:id
    PUT    /api/quotations/:id
    DELETE /api/quotations/:id
    PATCH  /api/quotations/:id/send
    PATCH  /api/quotations/:id/status
    POST   /api/quotations/:id/duplicate
    GET    /api/quotations/:id/pdf
    POST   /api/quotations/:id/send
    POST   /api/quotations/:id/convert
[x] update main.js
```

---

### TASK-022 — frontend: halaman quotation `/wf-03`

```
[x] buat file: src/features/quotation/services/quotation-service.js
[x] buat file: src/features/quotation/hooks/use-quotations.js

[x] buat file: src/features/quotation/components/QuotationTable.jsx
    - tab status: semua, draft, sent, approved, rejected, expired
    - kolom: nomor, customer, nilai, valid until, sales, status badge, aksi
    - three-dot menu: edit, send, duplicate, download pdf, hapus

[x] buat file: src/features/quotation/components/QuotationDetailPanel.jsx
    - tab: detail, item, syarat & ketentuan, riwayat, catatan, lampiran
    - progress tracker vertikal:
      draft created → sent → viewed → approved/rejected
    - ringkasan harga: subtotal, diskon, pajak 11%, total

[x] buat file: src/features/quotation/components/QuotationForm.jsx
    - multi-step atau single large form
    - step 1: pilih customer (search dropdown) + data umum
    - step 2: tambah items (produk search dropdown + qty + harga + diskon)
    - step 3: valid until + notes + syarat & ketentuan
    - live preview total (subtotal + tax + total)
    - validasi zod

[x] buat file: src/features/quotation/components/QuotationItemRow.jsx
    - satu baris item: produk, deskripsi, qty, harga satuan, diskon, total
    - tombol hapus baris

[x] buat file: src/features/quotation/components/QuotationStatCards.jsx
    - stat card: total, total value, approved, conversion rate, rata-rata nilai

[x] buat file: src/pages/QuotationPage.jsx
```

---

## sprint-6 — timeline instalasi

---

### TASK-023 — backend: installation module `/wf-01` `/wf-05`

```
[x] buat domain entity: src/domain/entities/installation.js
    method:
    - generateInstNumber(sequence) → INST-yyyy-nnnn
    - canUpdateStage(newStage) → validasi stage transition
    - isOverdue() → cek target_end_date vs now
    - getDuration() → selisih start_date dan end_date

[x] buat interface repo: src/domain/repositories/installation-repository.js

[x] buat use-cases:
    [x] src/use-cases/installation/create-installation-use-case.js
      → auto-buat installation_stages awal (4 tahapan)
    [x] src/use-cases/installation/update-installation-use-case.js
    [x] src/use-cases/installation/get-installation-list-use-case.js
      → filter: status, sales_id, technician_id, date_range, customer_id
    [x] src/use-cases/installation/get-installation-gantt-use-case.js
      → return data dalam format gantt (start, end, stage, status per item)
    [x] src/use-cases/installation/get-installation-detail-use-case.js
    [x] src/use-cases/installation/update-installation-stage-use-case.js
      → update stage_status: scheduled → on-progress → done
    [x] src/use-cases/installation/assign-technician-use-case.js
    [x] src/use-cases/installation/get-installation-stats-use-case.js

[x] buat prisma repo: src/infrastructure/repositories/prisma-installation-repository.js
[x] buat dto: src/interfaces/dtos/installation-dto.js
[x] buat controller: src/interfaces/controllers/installation-controller.js
[x] buat routes: src/interfaces/routes/installation-routes.js
    GET    /api/installations
    GET    /api/installations/gantt
    POST   /api/installations
    GET    /api/installations/:id
    PUT    /api/installations/:id
    PATCH  /api/installations/:id/update-stage
    PATCH  /api/installations/:id/assign-technician
[x] update main.js
```

---

### TASK-024 — frontend: halaman timeline instalasi `/wf-03`

```
[x] buat file: src/features/timeline/services/installation-service.js
[x] buat file: src/features/timeline/hooks/use-installations.js

[x] buat file: src/features/timeline/components/GanttChart.jsx
    - gantt chart dari recharts atau custom SVG
    - setiap row: 1 instalasi dengan bar per stage
    - warna per status: survey(biru), instalasi(orange), aktivasi(hijau), selesai(teal), tertunda(merah)
    - legenda warna di bawah
    - hover tooltip: detail instalasi

[x] buat file: src/features/timeline/components/InstallationTable.jsx
    - view alternatif tabel
    - kolom: nomor, customer, paket, sales, teknisi, mulai, target selesai, status

[x] buat file: src/features/timeline/components/InstallationDetailPanel.jsx
    - tab: detail, aktivitas, dokumen, catatan
    - informasi: nomor, sales, paket, alamat, mulai, target, durasi, status
    - progress tahapan vertikal:
      survey → desain & penawaran → instalasi → aktivasi
      dengan status & tanggal per tahapan

[x] buat file: src/features/timeline/components/InstallationForm.jsx
    - field: customer, deal, sales, teknisi, paket/layanan, alamat,
      lat/lng, mulai, target selesai, notes

[x] buat file: src/features/timeline/components/InstallationStatCards.jsx
    - stat card: total, scheduled, on-progress, selesai, tertunda

[x] buat file: src/pages/TimelinePage.jsx
    - stat cards → tab (gantt / table) → GanttChart atau InstallationTable
```

---

## sprint-7 — trouble ticket

---

### TASK-025 — backend: trouble ticket module `/wf-01` `/wf-05`

```
[x] buat domain entity: src/domain/entities/trouble-ticket.js
    method:
    - generateTicketNumber(sequence) → TT-yyyy-nnnn
    - isOverSla() → cek sla_deadline vs now
    - getSlaRemaining() → return menit tersisa
    - canClose() → status === 'resolved'
    - canReopen() → status === 'closed'

[x] buat interface repo: src/domain/repositories/trouble-ticket-repository.js

[x] buat use-cases:
    [x] src/use-cases/trouble-ticket/create-ticket-use-case.js
      → hitung sla_deadline berdasarkan prioritas:
        critical: 4 jam, high: 8 jam, medium: 24 jam, low: 48 jam
    [x] src/use-cases/trouble-ticket/update-ticket-use-case.js
    [x] src/use-cases/trouble-ticket/get-ticket-list-use-case.js
      → filter: status, priority, assigned_to, customer_id, category, date_range
    [x] src/use-cases/trouble-ticket/get-ticket-detail-use-case.js
    [x] src/use-cases/trouble-ticket/update-ticket-status-use-case.js
      → validasi transisi: open → in-progress → resolved → closed
    [x] src/use-cases/trouble-ticket/assign-ticket-use-case.js
    [x] src/use-cases/trouble-ticket/add-ticket-note-use-case.js
    [x] src/use-cases/trouble-ticket/get-ticket-stats-use-case.js
      → total, open, in-progress, resolved, closed, rata-rata resolusi

[x] buat prisma repo: src/infrastructure/repositories/prisma-trouble-ticket-repository.js
[x] buat dto: src/interfaces/dtos/trouble-ticket-dto.js
[x] buat controller: src/interfaces/controllers/trouble-ticket-controller.js
[x] buat routes: src/interfaces/routes/trouble-ticket-routes.js
    GET    /api/trouble-tickets
    POST   /api/trouble-tickets
    GET    /api/trouble-tickets/:id
    PUT    /api/trouble-tickets/:id
    PATCH  /api/trouble-tickets/:id/status
    PATCH  /api/trouble-tickets/:id/assign
    POST   /api/trouble-tickets/:id/notes
[x] update main.js
```

---

### TASK-026 — frontend: halaman trouble ticket `/wf-03`

```
[x] buat file: src/features/trouble-ticket/services/ticket-service.js
[x] buat file: src/features/trouble-ticket/hooks/use-tickets.js

[x] buat file: src/features/trouble-ticket/components/TicketTable.jsx
    - tab: semua, open, in-progress, resolved, closed
    - kolom: nomor, customer, kategori, prioritas badge, status badge,
      sla, assigned to, tanggal, aksi

[x] buat file: src/features/trouble-ticket/components/TicketDetailPanel.jsx
    - informasi tiket: nomor, tanggal, prioritas, status, sla target
    - SLA timer: ring timer countdown (sisa waktu atau melewati deadline)
    - PIC & progress: nama penanggung jawab + tim teknis + progress bar
    - quick actions: update status, tambah catatan, upload lampiran, close
    - tab: detail, aktivitas, catatan, lampiran, riwayat, sla

[x] buat file: src/features/trouble-ticket/components/SlaTimer.jsx
    - ring/donut animasi countdown
    - berubah merah jika < 20% waktu tersisa atau sudah lewat

[x] buat file: src/features/trouble-ticket/components/TicketForm.jsx
    - field: customer, kategori, sub-kategori, prioritas, sumber,
      deskripsi keluhan, assigned to, lampiran

[x] buat file: src/features/trouble-ticket/components/TicketNoteForm.jsx
    - tambah catatan internal ke tiket

[x] buat file: src/features/trouble-ticket/components/TicketStatCards.jsx
    - stat card: total, open, in-progress, resolved, closed, rata-rata resolusi

[x] buat file: src/pages/TroubleTicketPage.jsx
```

---

## sprint-8 — invoices & payments

---

### TASK-027 — backend: invoice & payment module `/wf-01` `/wf-05`

```
[x] buat domain entity: src/domain/entities/invoice.js
    method:
    - generateInvoiceNumber(sequence) → INV-yyyy-nnnn
    - calculateTotal(items) → subtotal + tax - discount = total
    - getRemainingBalance() → total - paid_amount
    - isOverdue() → status === 'unpaid' && due_date < now
    - isPaid() → status === 'paid'
    - updatePaymentStatus(paidAmount, total)
      → partial jika paidAmount < total
      → paid jika paidAmount >= total

[x] buat domain entity: src/domain/entities/payment.js
    method:
    - generatePaymentNumber(sequence) → PAY-yyyy-nnnn

[x] buat interface repo: src/domain/repositories/invoice-repository.js
[x] buat interface repo: src/domain/repositories/payment-repository.js

[x] buat use-cases:
    src/use-cases/invoice/create-invoice-use-case.js
      → bisa dibuat manual atau dari quotation (convert)
    src/use-cases/invoice/update-invoice-use-case.js
    src/use-cases/invoice/get-invoice-list-use-case.js
      → filter: status, customer_id, sales_id, date_range
    src/use-cases/invoice/get-invoice-detail-use-case.js
      → include: items, payments, customer
    src/use-cases/invoice/delete-invoice-use-case.js
    src/use-cases/invoice/record-payment-use-case.js
      → catat pembayaran (nominal, metode, tanggal, referensi)
      → update status invoice: partial atau paid
      → generate payment number
    src/use-cases/invoice/send-invoice-use-case.js
      → kirim email invoice ke customer
    src/use-cases/invoice/generate-pdf-use-case.js
    src/use-cases/invoice/get-invoice-stats-use-case.js
      → total invoice, total penagihan, total terbayar, total terhutang

[x] buat prisma repo: src/infrastructure/repositories/prisma-invoice-repository.js
[x] buat prisma repo: src/infrastructure/repositories/prisma-payment-repository.js
[x] buat dto: src/interfaces/dtos/invoice-dto.js
[x] buat controller: src/interfaces/controllers/invoice-controller.js
[x] buat routes: src/interfaces/routes/invoice-routes.js
    GET    /api/invoices
    POST   /api/invoices
    GET    /api/invoices/:id
    PUT    /api/invoices/:id
    DELETE /api/invoices/:id
    POST   /api/invoices/:id/record-payment
    PATCH  /api/invoices/:id/send
    GET    /api/invoices/:id/pdf
[x] update main.js
```

---

### TASK-028 — frontend: halaman invoices `/wf-03`

```
[x] buat file: src/features/invoice/services/invoice-service.js
[x] buat file: src/features/invoice/hooks/use-invoices.js

[x] buat file: src/features/invoice/components/InvoiceTable.jsx
    - tab: semua, draft, unpaid, partial, paid, overdue
    - kolom: nomor, customer, total, jatuh tempo, sales, status, aksi

[x] buat file: src/features/invoice/components/InvoiceDetailPanel.jsx
    - informasi: nomor, tanggal, jatuh tempo, periode layanan, sales, status
    - ringkasan: subtotal, ppn, total, terbayar, sisa tagihan
    - cap "LUNAS" watermark jika paid
    - riwayat pembayaran: list kronologis (nomor, tanggal, metode, nominal)
    - tab: detail, item, pembayaran, riwayat, catatan, lampiran

[x] buat file: src/features/invoice/components/InvoiceForm.jsx
    - mirip quotation form
    - field: customer, period, due_date, items (produk + qty + harga), notes

[x] buat file: src/features/invoice/components/RecordPaymentModal.jsx
    - modal input pembayaran
    - field: tanggal, nominal, metode (transfer/cash/qris/virtual account), referensi/nomor bukti
    - tampilkan sisa tagihan yang harus dibayar

[x] buat file: src/features/invoice/components/InvoiceStatCards.jsx
    - total invoice, total penagihan, terbayar, terhutang, rata-rata pembayaran

[x] buat file: src/pages/InvoicePage.jsx
```

---

## sprint-9 — presentation produk

---

### TASK-029 — backend: presentation module `/wf-01` `/wf-05`

```
[x] buat domain entity: src/domain/entities/presentation.js
    method:
    - generatePresNumber(sequence) → PRES-yyyy-nnnn-nnn
    - canShare() → status !== 'draft'

[x] buat interface repo: src/domain/repositories/presentation-repository.js

[~] buat use-cases:
    src/use-cases/presentation/create-presentation-use-case.js
    src/use-cases/presentation/update-presentation-use-case.js
    src/use-cases/presentation/get-presentation-list-use-case.js
    src/use-cases/presentation/get-presentation-detail-use-case.js
    src/use-cases/presentation/delete-presentation-use-case.js
    src/use-cases/presentation/generate-pdf-use-case.js
    src/use-cases/presentation/generate-share-link-use-case.js
      → buat unique share token, simpan ke database
    src/use-cases/presentation/get-presentation-templates-use-case.js

[x] buat prisma repo: src/infrastructure/repositories/prisma-presentation-repository.js
[x] buat dto: src/interfaces/dtos/presentation-dto.js
[x] buat controller: src/interfaces/controllers/presentation-controller.js
[x] buat routes: src/interfaces/routes/presentation-routes.js
    GET    /api/presentations
    POST   /api/presentations
    GET    /api/presentations/:id
    PUT    /api/presentations/:id
    DELETE /api/presentations/:id
    GET    /api/presentations/:id/pdf
    POST   /api/presentations/:id/share
    GET    /api/presentation-templates
[x] update main.js
```

---

### TASK-030 — frontend: halaman presentation `/wf-03`

```
[x] buat file: src/features/presentation/services/presentation-service.js
[x] buat file: src/features/presentation/hooks/use-presentations.js

[x] buat file: src/features/presentation/components/PresentationTable.jsx
    - tab: semua, dipresentasikan, draft, template, arsip

[x] buat file: src/features/presentation/components/PresentationPreviewPanel.jsx
    - slide thumbnail + navigasi prev/next
    - outline presentasi (daftar judul slide)
    - info: customer, sales, produk, tanggal, status
    - tombol: edit, download pdf, presentasikan, bagikan

[x] buat file: src/features/presentation/components/PresentationForm.jsx
    - field: judul, customer, produk yang dipresentasikan, tanggal, status
    - editor slide (title, content, layout per slide)

[x] buat file: src/pages/PresentationPage.jsx
```

---

## sprint-10 — dashboard & reports

---

### TASK-031 — backend: dashboard endpoint `/wf-05`

```
[x] buat use-case: src/use-cases/report/get-dashboard-stats-use-case.js
    return:
    - stat cards: total_customers, revenue_bulan_ini (% vs bulan lalu),
      deals_closing, instalasi_aktif, trouble_ticket_open
    - grafik revenue: 12 bulan terakhir vs target
    - pipeline funnel: count per stage + conversion rate
    - peta sebaran: customers dengan lat/lng + area label
    - deals by sales: top 5 sales dengan total deals dan nilai
    - aktivitas terbaru: 5 aktivitas terakhir dari activity_logs
    - lead terbaru: 3 lead terbaru
    - tugas mendatang: tasks/follow-up dari interactions

[x] buat use-case: src/use-cases/report/get-sales-report-use-case.js
    - stat cards: total deals, total revenue, rata-rata nilai, win rate
    - grafik sales over time vs target (line chart)
    - top 5 sales by value
    - sales funnel
    - sales by area (donut)
    - tabel detail per sales

[x] buat use-case: src/use-cases/report/get-pipeline-report-use-case.js
    - stat cards: total pipeline value, deals per stage, avg deal size
    - pipeline trend (line chart)
    - pipeline by salesperson (horizontal bar)
    - tabel top deals

[x] buat use-case: src/use-cases/report/get-product-performance-use-case.js
    - top 5 produk terlaris
    - revenue by product (horizontal bar)
    - distribusi teknologi (donut)
    - tabel performa lengkap

[x] buat route: src/interfaces/routes/report-routes.js
    GET /api/reports/dashboard       → semua role
    GET /api/reports/sales           → super-admin, admin, sales (own)
    GET /api/reports/pipeline        → super-admin, admin, sales
    GET /api/reports/product-performance
    GET /api/reports/conversion
    GET /api/reports/export
[x] update main.js
```

---

### TASK-032 — frontend: halaman dashboard `/wf-03`

```
[x] buat file: src/features/report/services/report-service.js
[x] buat file: src/features/report/hooks/use-dashboard.js
[x] buat file: src/features/report/hooks/use-reports.js

[x] buat file: src/features/report/components/DashboardStatCards.jsx
    - 5 stat cards: customers, revenue, deals closing, instalasi aktif, trouble ticket
    - persentase perubahan vs bulan lalu (▲ hijau / ▼ merah)

[x] buat file: src/features/report/components/RevenueChart.jsx
    - line chart recharts: revenue (biru) vs target (oranye dashed)
    - 12 bulan sumbu x
    - tooltip: nilai bulan terpilih

[x] buat file: src/features/report/components/PipelineFunnelDashboard.jsx
    - funnel chart vertikal recharts
    - 5 stage dengan warna berbeda
    - label count di dalam bar
    - conversion rate di bawah

[x] buat file: src/features/report/components/CustomerMap.jsx
    - leaflet-js map
    - cluster marker: lingkaran dengan angka
    - legenda cluster (1-10, 11-30, 31-50, >50)
    - filter dropdown area di sudut kanan atas

[x] buat file: src/features/report/components/DealsBySalesChart.jsx
    - horizontal bar chart top 5 sales
    - warna berbeda per sales
    - label nilai di ujung bar

[x] buat file: src/features/report/components/RecentActivity.jsx
    - feed kronologis
    - ikon per jenis aktivitas (quotation, deal, instalasi, dll)
    - link "Lihat Semua"

[x] buat file: src/features/report/components/RecentLeads.jsx
    - list 3 lead terbaru
    - avatar initial + nama + produk diminati + tanggal

[x] buat file: src/features/report/components/UpcomingTasks.jsx
    - daftar task/follow-up
    - checkbox selesai
    - nama customer + tanggal + assigned sales badge

[x] buat file: src/features/report/components/PipelineOverviewTable.jsx
    - tabel horizontal per stage
    - 5 kolom: PROSPEK, NEGOSIASI, PENAWARAN, CLOSING, INSTALASI
    - header kolom: nama stage + total deals + total nilai
    - preview 3 deal terbaru per stage
    - link "+ N deals lainnya"

[x] buat file: src/pages/DashboardPage.jsx
    - date range picker + filter sales di atas
    - tombol refresh data
    - layout grid: stat cards → revenue chart + funnel + activity
    - customer map (full width)
    - deals by sales + pipeline overview

[x] buat file: src/pages/ReportPage.jsx
    - sub-menu: overview, sales, pipeline, product, conversion
    - masing-masing sub-page dengan stat cards + charts + tabel
```

---

## sprint-11 — notifications & activity logs

---

### TASK-033 — backend: notification system `/wf-01` `/wf-05`

```
[ ] buat file: src/infrastructure/services/notification-service.js
    - createNotification(userId, type, title, description, entityId, entityType)
    - dipanggil dari berbagai use-case saat event penting terjadi:
      * lead baru masuk → notif ke admin/sales
      * deal pindah stage → notif ke sales
      * quotation di-approve/reject → notif ke sales
      * invoice jatuh tempo → notif ke admin
      * trouble ticket baru → notif ke teknisi
      * SLA hampir habis → notif ke assigned

[x] buat use-cases:
    src/use-cases/notification/get-notification-list-use-case.js
    src/use-cases/notification/mark-as-read-use-case.js
    src/use-cases/notification/mark-all-as-read-use-case.js
    src/use-cases/notification/delete-notification-use-case.js
    src/use-cases/notification/get-notification-stats-use-case.js

[x] buat routes: src/interfaces/routes/notification-routes.js
    GET    /api/notifications
    PATCH  /api/notifications/:id/read
    PATCH  /api/notifications/read-all
    DELETE /api/notifications/:id
[ ] update main.js

[ ] integrasikan notification-service ke use-cases yang relevan:
    - create-lead-use-case.js → notify admin
    - move-deal-stage-use-case.js → notify sales
    - send-quotation-use-case.js → notify customer contact
    - record-payment-use-case.js → notify admin
    - create-ticket-use-case.js → notify teknisi
```

---

### TASK-034 — backend: activity logs endpoint `/wf-05`

```
[x] buat use-cases:
    src/use-cases/activity-log/get-activity-log-list-use-case.js
      → filter: user_id, module, action, date_range, search
      → pagination
    src/use-cases/activity-log/get-activity-log-stats-use-case.js
      → aktivitas per modul (donut), per aksi (bar)

[x] buat routes: src/interfaces/routes/activity-log-routes.js
    GET /api/activity-logs
    GET /api/activity-logs/stats
```

---

### TASK-035 — frontend: notifications & activity logs `/wf-03`

```
[ ] buat file: src/features/notification/services/notification-service.js
[ ] buat file: src/features/notification/hooks/use-notifications.js
    - polling setiap 30 detik untuk notif baru
    - atau gunakan long polling / SSE jika tersedia

[x] buat file: src/features/notification/components/NotificationBell.jsx
    - badge merah dengan count unread di topbar

[x] buat file: src/features/notification/components/NotificationList.jsx
    - tab: semua, belum dibaca, penting, sistem, lainnya
    - item: ikon berwarna, judul, deskripsi, waktu relatif, badge tipe
    - titik biru untuk yang belum dibaca
    - tombol "tandai semua sudah dibaca"

[ ] buat file: src/features/notification/components/NotificationPanel.jsx
    - panel kanan: ringkasan + pengaturan notifikasi
    - toggle: notifikasi email, browser, suara, ringkasan harian

[ ] buat file: src/pages/NotificationPage.jsx
    - NotificationList + NotificationPanel

[ ] buat file: src/features/activity-log/services/activity-log-service.js
[ ] buat file: src/features/activity-log/hooks/use-activity-logs.js

[ ] buat file: src/features/activity-log/components/ActivityLogTable.jsx
    - filter bar: tanggal, pengguna, modul, aksi, search
    - kolom: waktu, pengguna (avatar + nama + role), modul, aksi badge,
      deskripsi, ip address

[ ] buat file: src/features/activity-log/components/ActivityLogStatPanel.jsx
    - donut chart: aktivitas per modul
    - horizontal bar: aktivitas per aksi (dibuat, diperbarui, dihapus)
    - feed aktivitas terbaru

[ ] buat file: src/pages/ActivityLogPage.jsx
    - filter bar → stat cards → tabel + panel kanan
```

---

## sprint-12 — settings, global search & finalisasi

---

### TASK-036 — backend: settings & global search `/wf-01` `/wf-05`

```
[ ] buat use-case: src/use-cases/search/global-search-use-case.js
    - terima: query string
    - search paralel ke: customers, leads, quotations, deals, invoices, trouble_tickets
    - return hasil dikelompokkan per kategori dengan limit 5 per kategori

[ ] buat route: GET /api/search?q={query}

[x] buat use-case: src/use-cases/setting/get-company-settings-use-case.js
[x] buat use-case: src/use-cases/setting/update-company-settings-use-case.js
[x] buat use-case: src/use-cases/setting/get-user-preferences-use-case.js
[x] buat use-case: src/use-cases/setting/update-user-preferences-use-case.js

[ ] buat use-case: src/use-cases/target/create-sales-target-use-case.js
[ ] buat use-case: src/use-cases/target/get-sales-target-use-case.js
    → untuk widget target bulan ini di sidebar
```

---

### TASK-037 — frontend: settings & global search `/wf-03`

```
[x] buat file: src/features/settings/services/settings-service.js
[ ] buat file: src/pages/SettingsPage.jsx
    - sub-menu: profil perusahaan, manajemen user, branch, produk, preferensi
    - form pengaturan umum perusahaan
    - manajemen target sales per bulan

[ ] update GlobalSearch.jsx (TASK-012)
    - hubungkan ke endpoint GET /api/search?q=
    - tampilkan hasil per kategori
    - navigasi keyboard berfungsi
    - debounce 300ms
```

---

### TASK-038 — shared ui components finalisasi `/wf-03`

```
[x] buat file: src/shared/components/StatCard.jsx
    - sesuai spec design.md bagian 3.1
    - ikon dalam lingkaran pastel
    - nilai utama besar, persentase ▲/▼, keterangan periode

[x] buat file: src/shared/components/StatusBadge.jsx
    - sesuai tabel badge design.md bagian 3.2
    - terima: status string → return badge dengan warna yang tepat

[x] buat file: src/shared/components/DataTable.jsx
    - reusable tabel dengan: checkbox, pagination, filter, export, column toggle
    - tiga-dot menu per baris

[x] buat file: src/shared/components/ConfirmDeleteModal.jsx
    - ikon tempat sampah merah
    - checkbox konfirmasi "saya yakin"
    - tombol batal + hapus (danger)

[x] buat file: src/shared/components/SuccessPopup.jsx
    - centang hijau animasi
    - ringkasan data tersimpan
    - tombol "Lihat Data"

[x] buat file: src/shared/components/FilterPopup.jsx
    - popup filter kombinasi (status, sales, area, tanggal, nilai)
    - tombol reset + terapkan filter
    - chip filter aktif

[x] buat file: src/shared/components/ExportModal.jsx
    - pilih format: excel, csv, pdf
    - pilih kolom (opsional)
    - tombol download

[x] buat file: src/shared/components/ImportModal.jsx
    - drag & drop file .xlsx/.csv
    - download template
    - tombol upload

[x] buat file: src/shared/components/SidePanel.jsx
    - slide-in dari kanan 420-480px
    - header dengan nomor + badge status + aksi + close
    - slot untuk konten tab

[x] buat file: src/shared/components/PageHeader.jsx
    - judul halaman + subtitle
    - slot kanan untuk tombol aksi

[x] buat file: src/shared/components/EmptyState.jsx
    - ilustrasi + pesan + optional tombol CTA

[x] buat file: src/shared/components/SkeletonLoader.jsx
    - skeleton untuk stat card, tabel, dan card
```

---

### TASK-039 — finalisasi routing & permission frontend `/wf-01`

```
[x] update App.jsx → setup semua routes:
    /login
    /dashboard
    /crm/customers
    /crm/leads
    /pipeline
    /quotation
    /presentation
    /timeline
    /trouble-ticket
    /invoice
    /products
    /reports/overview
    /reports/sales
    /reports/pipeline
    /reports/product
    /reports/conversion
    /notifications
    /activity-logs
    /settings

[x] buat file: src/shared/components/RoleGuard.jsx
    - cek role user dari auth store
    - render children jika punya akses
    - redirect atau tampilkan "access denied" jika tidak punya akses

[x] pasang RoleGuard di route yang memerlukan:
    - /settings → super-admin, admin
    - /activity-logs → super-admin, admin
    - /reports → super-admin, admin, sales (own data)
```

---

### TASK-040 — testing & bug fix `/wf-02`

```
[ ] test login semua role: super-admin, admin, sales, teknisi
[ ] test permission: pastikan role sales tidak bisa akses settings
[ ] test semua CRUD per modul (create, read, update, delete)
[ ] test status flow: lead, deal, quotation, invoice, ticket, installation
[ ] test pdf generation: quotation dan invoice
[ ] test email kirim: quotation dan invoice
[ ] test import/export: customers, leads
[ ] test pagination dan filter di semua halaman tabel
[ ] test responsive: desktop 1280px+, tablet 768px, mobile 375px
[ ] test drag & drop kanban board
[ ] test gantt chart interaktif
[ ] test global search (ctrl+k)
[ ] test notifikasi realtime / polling
[ ] test SLA timer trouble ticket
[ ] test activity log tercatat setelah setiap operasi write
[ ] cek semua loading state
[ ] cek semua error state
[ ] cek semua empty state
[ ] cek dark mode (jika diimplementasikan)
```

---

### TASK-041 — deployment preparation `/wf-08`

```
[ ] setup .env.production dengan nilai production
[ ] build frontend: npm run build
[ ] test hasil build di localhost (vite preview)
[ ] pastikan semua environment variable sudah dikonfigurasi di server
[ ] jalankan migrasi production: npx prisma migrate deploy
[ ] jalankan seed production (hanya user awal)
[ ] test login di production environment
[ ] monitor error log 30 menit pertama
[ ] buat dokumentasi deployment singkat (cara rollback, restart service)
```

---

## summary progress

```
sprint-1  [ ] setup, auth, user management        → 12 tasks (001-012)
sprint-2  [ ] master data (branch, product)        → 3 tasks  (013-015)
sprint-3  [ ] crm (customers, leads)               → 3 tasks  (016-018)
sprint-4  [ ] pipeline (kanban board)              → 2 tasks  (019-020)
sprint-5  [ ] quotation + pdf                      → 2 tasks  (021-022)
sprint-6  [ ] timeline instalasi                   → 2 tasks  (023-024)
sprint-7  [ ] trouble ticket                       → 2 tasks  (025-026)
sprint-8  [ ] invoices & payments                  → 2 tasks  (027-028)
sprint-9  [ ] presentation                         → 2 tasks  (029-030)
sprint-10 [ ] dashboard & reports                  → 2 tasks  (031-032)
sprint-11 [ ] notifications & activity logs        → 3 tasks  (033-035)
sprint-12 [ ] settings, search, finalisasi, deploy → 6 tasks  (036-041)
─────────────────────────────────────────────────────────────────
total     [ ] 41 tasks
```

---

*task.md — Mark isp sales & management system*
*versi: 1.0 | dari 0 code*
