# task-audit.md — Mark Application Audit & Fix Task List

> Audit menyeluruh seluruh aplikasi Mark ISP.
> Dibuat: 2026-05-06
> Scope: Backend API, Frontend Pages, Components, Hooks, Services, UX, Database

---

## legenda

```
[ ] → belum dikerjakan
[x] → selesai
[~] → sedang dikerjakan
[!] → blocked / ada masalah

PRIORITAS:
[P1] → Critical — blocker, data loss, atau error fatal
[P2] → High — fitur utama tidak berfungsi
[P3] → Medium — UX buruk, data dummy, tombol mati
[P4] → Low — polish, konsistensi, minor improvement
```

---

## AUDIT-001 — Backend: Missing Use Cases & Wiring [P1]

```
[ ] GetCustomerInteractionsUseCase — tambahkan include creator data
    → file: src/use-cases/crm/get-customer-interactions-use-case.js
    → tambah: include: { creator: { select: { id, name } } }

[ ] GetCustomerServicesUseCase — verifikasi return data lengkap
    → join ke product, include status, price, start_date

[ ] GetCustomerStatsUseCase — verifikasi return field lengkap:
    → harus return: { total, active, corporate, personal, inactive }

[x] NotificationController belum di-mount di main.js
    → import: src/interfaces/controllers/notification-controller.js
    → tambahkan: router.use('/notifications', createNotificationRoutes(...))

[x] activity-log-routes.js belum di-mount di main.js
    → tambahkan: router.use('/activity-logs', createActivityLogRoutes(...))

[x] SettingsPage memanggil endpoint settings tapi tidak ada backend-nya:
    → buat: src/infrastructure/repositories/prisma-setting-repository.js ✓
    → buat: src/use-cases/setting/setting-use-cases.js ✓
    → buat: src/interfaces/controllers/setting-controller.js ✓
    → buat: src/interfaces/routes/setting-routes.js ✓
    → wire di main.js ✓
```

---

## AUDIT-002 — Backend: API Response & Bugs [P2]

```
[ ] server.js — require('dotenv').config() dipanggil DUA KALI (baris 1 & 4)
    → hapus duplikat

[ ] Tambahkan rate limiting spesifik ke route login:
    → 10 req/15 menit per IP khusus POST /api/auth/login
    → file: src/interfaces/routes/auth-routes.js

[ ] Tambahkan error handling untuk Prisma unique constraint (P2002)
    → tangkap PrismaClientKnownRequestError
    → return CONFLICT response, bukan INTERNAL_ERROR

[ ] report-controller.js hanya 556 bytes — kemungkinan hanya stub
    → verifikasi getDashboardStatsUseCase.execute() sudah dipanggil
    → pastikan return data yang dibutuhkan DashboardPage

[ ] presentation-controller.js — hanya ada create dan getList
    → buat use-cases: getDetail, update, delete
    → daftarkan endpoint di presentation-routes.js

[ ] Upload multer di customer-routes.js belum ada validasi:
    → tambahkan fileFilter: hanya accept .csv dan .xlsx
    → tambahkan limits: { fileSize: 5MB }
```

---

## AUDIT-003 — Database: Skema & Optimasi [P3]

```
[x] Verifikasi semua model memiliki created_at dan updated_at
    → periksa: ChatMessage, SalesTarget, Notification
    → Tambahkan deleted_at (soft delete) ke major models ✓ (schema updated)
    → Database reset & Schema pushed ✓

[ ] Pastikan soft delete (deleted_at) diimplementasikan di query findAll:
    → Customer, Lead, Deal, Quotation, Invoice, TroubleTicket
    → tambahkan: where: { deleted_at: null }

[ ] Tambahkan index di kolom yang sering di-query:
    → Customer: @@index([status, type, sales_id])
    → Lead: @@index([status, assigned_to])
    → Deal: @@index([stage, sales_id])
    → Invoice: @@index([status, customer_id])

[ ] Jalankan dan cek status migrasi:
    → npx prisma migrate status
    → jika ada drift: npx prisma migrate dev --name sync-schema
```

---

## AUDIT-004 — Frontend: Halaman dengan Data Dummy [P2]

```
[x] InvoicePage.jsx — stats card masih hardcoded (Rp 850jt, dll):
    → buat hook: useInvoiceStats() di src/features/invoice/hooks/use-invoices.js
    → call GET /api/invoices/stats
    → replace nilai hardcoded dengan data dari API

[x] QuotationPage.jsx — stats masih dummy:
    → totalValue: 1250000000 (hardcoded)
    → approved: 45 (hardcoded)
    → buat hook: useQuotationStats() → GET /api/quotations/stats

[x] TimelinePage.jsx — stats masih dummy:
    → panggil GET /api/installations/stats yang sudah ada di backend ✓
    → buat hook: useInstallationStats() ✓

[x] TimelinePage.jsx — handleCreateInstallation hanya console.log:
    → buat: useCreateInstallation() hook ✓
    → sambungkan ke form submit ✓

[x] ProductPage.jsx — ProductStatCards filter di client side:
    → baris 98-101: seharusnya dari API meta ✓
    → tambahkan field stats di response meta backend ✓
```

---

## AUDIT-005 — Frontend: Tombol Tanpa Handler [P2]

```
[ ] InvoicePage.jsx:
    → tombol "Rekap Keuangan" — tidak ada onClick
    → tombol "Buat Invoice Baru" — tidak ada onClick + tidak ada form modal
    → tombol Filter — tidak ada onClick

[ ] QuotationPage.jsx:
    → tombol "Export Data" — tidak ada handler

[x] PipelinePage.jsx:
    → tombol Filter (ikon) — tidak ada handler ✓
    → tombol Download — tidak ada handler ✓
    → tombol Calendar/DateRange — tidak ada date picker ✓ (toast)

[x] CustomerTable.jsx syntax error (missing import keyword) ✓
[x] LeadTable.jsx syntax error (missing import keyword) ✓
[x] DashboardPage.jsx syntax error (broken button tag) ✓
[x] App.jsx route registration for "New" pages ✓
[x] CustomerForm.jsx & LeadForm.jsx support embedded mode ✓
[x] CustomerPage.jsx implement working delete ✓

[ ] ProductPage.jsx:
    → tombol Export — tidak ada handler
    → tombol Filter Lanjut — tidak ada panel
    → onCreateQuotation={() => {}} di ProductCard — belum diimplementasikan

[ ] LeadPage.jsx:
    → tidak ada tombol Export / Import

[x] TroubleTicketPage.jsx:
    → tidak ada filter/search bar ✓
    → tidak ada Export button (ikon Download sudah ada di header?)

[ ] SettingsPage.jsx — form tidak terhubung ke API (tidak ada mutation)
[ ] ProfilePage.jsx — form update profile tidak terhubung ke API
```

---

## AUDIT-006 — Frontend: Missing CRUD Form [P1]

```
[x] InvoicePage.jsx — tidak ada InvoiceForm:
    → buat: src/features/invoice/components/InvoiceForm.jsx ✓
    → field: customer_id, items (product+qty+price), due_date, notes ✓
    → sambungkan ke tombol "Buat Invoice Baru" ✓

[x] InvoicePage.jsx — tidak ada form Rekam Pembayaran:
    → buat: src/features/invoice/components/RecordPaymentModal.jsx ✓
    → field: amount, payment_date, payment_method, reference_no ✓
    → call: POST /api/invoices/:id/payments ✓

[x] QuotationPage.jsx — tombol Edit quotation belum ada:
    → tambahkan onEdit prop ke QuotationTable
    → sambungkan ke useUpdateQuotation() hook dan buka QuotationForm dalam mode edit

[ ] PresentationPage.jsx — verifikasi ada form create presentation
    → buat jika belum ada: PresentationForm.jsx
```

---

## AUDIT-007 — Frontend: Hooks & Services Belum Lengkap [P2]

```
[ ] customer-service.js — tambahkan method yang hilang:
    → getInteractions(id) → GET /api/customers/:id/interactions
    → addInteraction(id, data) → POST /api/customers/:id/interactions
    → deleteCustomer(id) → DELETE /api/customers/:id

[ ] use-customers.js — tambahkan hook:
    → useDeleteCustomer()
    → useAddInteraction()

[ ] use-invoices.js — verifikasi & tambahkan:
    → useCreateInvoice()
    → useUpdateInvoice()
    → useDeleteInvoice()
    → useRecordPayment()
    → useInvoiceStats()

[ ] use-leads.js — tambahkan:
    → useLeadStats() → GET /api/leads/stats (atau buat endpoint baru)

[x] use-installations.js — tambahkan:
    → useCreateInstallation() ✓
    → useInstallationStats() → GET /api/installations/stats ✓

[ ] Buat: src/features/settings/services/settings-service.js
[ ] Buat: src/features/settings/hooks/use-settings.js
```

---

## AUDIT-008 — Frontend: UX & Toast Feedback [P3]

```
[ ] Semua form submit — pastikan ada toast feedback:
    → LeadForm: onSuccess toast.success / onError toast.error
    → DealForm: onSuccess/onError toast
    → QuotationForm: onSuccess/onError toast
    → ProductForm: pastikan ada toast ✓
    → TicketForm: tambahkan toast
    → InstallationForm: ganti console.log dengan toast

[ ] ProductPage.jsx — window.confirm() untuk delete:
    → ganti dengan ConfirmDeleteModal dari shared/components/ ✓ (sudah ada)
    → pasang state isDeleteOpen + selectedProduct

[ ] PipelinePage.jsx — KanbanCard perlu:
    → klik untuk buka detail deal
    → three-dot menu: edit, hapus, tandai won/lost

[ ] CustomerDetailPanel.jsx:
    → tab 'Tiket Aktif' — connect ke API GET /api/customers/:id/tickets
    → tombol '+Tambah' di tab Layanan — buat form

[ ] Semua tabel — pastikan ada EmptyState.jsx saat data kosong
    → gunakan shared/components/EmptyState.jsx secara konsisten

[ ] Tambahkan active:scale-95 ke semua tombol primary yang belum memilikinya
```

---

## AUDIT-009 — Frontend: Routing & Auth [P2]

```
[ ] axios.js interceptor — verifikasi refresh token logic:
    → 401 → call /api/auth/refresh → retry request
    → jika refresh juga 401 → clearAuth() + redirect /login
    → pastikan ada flag isRefreshing untuk cegah infinite loop

[ ] Auth store (zustand) — verifikasi persist ke localStorage:
    → token harus disimpan agar tidak logout saat refresh page
    → gunakan zustand persist middleware

[ ] ProtectedRoute.jsx — tambahkan:
    → jika token expired (JWT decode) → redirect login

[ ] RegisterPage.jsx — verifikasi proteksi:
    → seharusnya hanya super-admin yang bisa akses
    → pertimbangkan sembunyikan/proteksi route /register

[ ] App.jsx — tambahkan route yang belum ada:
    → /crm/customers/:id untuk detail customer
    → /pipeline/:id untuk detail deal
    → /invoice/:id untuk detail invoice

[ ] 404 page (NotFound) — tambahkan tombol "Kembali ke Dashboard"
```

---

## AUDIT-010 — Frontend: Component Consistency [P3]

```
[ ] StatCard.jsx vs MetricCard.jsx — dua komponen fungsi sama:
    → pilih satu: gunakan MetricCard.jsx (sudah support onClick)
    → deprecate StatCard.jsx atau hapus

[ ] StatusBadge.jsx (shared) belum digunakan konsisten:
    → banyak badge inline di CustomerTable, LeadTable, dll
    → migrasi ke StatusBadge.jsx

[ ] EmptyState.jsx (shared) belum digunakan di semua tabel:
    → CustomerTable, InvoiceTable, DealTable — ganti empty state inline

[ ] PageHeader.jsx (shared) belum digunakan di semua halaman:
    → setiap halaman membuat header sendiri dengan gaya berbeda
    → standarisasi dengan PageHeader.jsx

[ ] SkeletonLoader.jsx (shared) — gunakan secara konsisten:
    → ganti loading spinner inline dengan SkeletonLoader

[ ] FilterPopup.jsx (shared) — belum dipakai di halaman manapun:
    → pertimbangkan integrasi ke Pipeline, Invoice, Lead filter
```

---

## AUDIT-011 — Backend: Controller Logic [P2]

```
[ ] search-controller.js — verifikasi global search mencari di semua entitas:
    → customer (name, code, phone)
    → lead (name, company)
    → deal (name, customer)
    → quotation (quot_number)
    → invoice (inv_number)
    → trouble ticket (ticket_number)

[ ] notification-controller.js — audit endpoint:
    → GET /api/notifications (list, dengan filter unread)
    → PATCH /api/notifications/:id/read
    → PATCH /api/notifications/read-all
    → pastikan semua ada di notification-routes.js

[ ] Installation — verifikasi status options sesuai dengan rules.md:
    → scheduled → on-progress → done / tertunda / cancelled
    → frontend status filter hanya punya 3 option, seharusnya 5
```

---

## AUDIT-012 — Code Quality & Performance [P4]

```
[ ] Hapus semua console.log yang bukan debug:
    → TimelinePage.jsx baris 35: console.log('Create installation:', formData)
    → Ganti semua console.error di catch block dengan toast.error

[ ] CustomerPage.jsx — axios langsung di handleImport:
    → melanggar aturan: komponen tidak boleh call axios langsung
    → pindahkan ke customerService.importCustomers()

[ ] useCustomers di QuotationPage.jsx memanggil limit: 100:
    → tidak efisien untuk data besar
    → ganti dengan search-as-you-type combobox

[ ] Tambahkan JSDoc @param dan @returns di use-cases kritis:
    → login-use-case.js, create-customer-use-case.js

[ ] Verifikasi tidak ada memory leak di komponen dengan event listener:
    → GlobalSearch.jsx (keyboard event)
    → ChatDrawer.jsx (socket listener)
```

---

## URUTAN PENGERJAAN YANG DIREKOMENDASIKAN

```
SPRINT AUDIT (kerjakan berurutan):

Minggu 1 — P1 Critical:
1. AUDIT-006 → Buat InvoiceForm + RecordPaymentModal
2. AUDIT-001 → Fix backend wiring (notification, activity-log, settings)
3. AUDIT-009 → Fix auth interceptor & token persistence

Minggu 2 — P2 High:
4. AUDIT-004 → Ganti semua data dummy dengan API
5. AUDIT-005 → Pasang handler ke semua tombol mati
6. AUDIT-007 → Lengkapi hooks & services
7. AUDIT-002 → Fix API bugs & response consistency

Minggu 3 — P3 Medium:
8. AUDIT-008 → Toast feedback & UX improvements
9. AUDIT-011 → Fix controller logic
10. AUDIT-010 → Component consistency

Minggu 4 — P4 Polish:
11. AUDIT-003 → Database index & optimasi
12. AUDIT-012 → Code quality cleanup
```

---

*Mark ISP Sales & Management System — Audit v1.0 — 2026-05-06*
