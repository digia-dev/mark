---
trigger: always_on
---

# rules.md — Mark development rules

> aturan wajib yang berlaku untuk semua kontributor, semua lapisan kode, dan semua output dokumen dalam project Mark. tidak ada pengecualian tanpa diskusi dan persetujuan tim.

---

## 1. konvensi penamaan

aturan penamaan berlaku ketat dan konsisten di seluruh codebase.

### file & folder
```
kebab-case lowercase — selalu, tanpa terkecuali

✅ create-customer-use-case.js
✅ prisma-deal-repository.js
✅ quotation-detail-panel.jsx
✅ use-quotation-list.js

❌ CreateCustomerUseCase.js
❌ PrismaDealRepository.js
❌ QuotationDetailPanel.jsx
```

### tabel & kolom database (mysql)
```
snake_case lowercase

✅ trouble_tickets, quotation_items, activity_logs
✅ created_at, sales_id, password_hash, valid_until

❌ TroubleTickets, quotationItems
❌ createdAt, salesId
```

### url api endpoint
```
kebab-case lowercase

✅ /api/trouble-tickets
✅ /api/quotation-items
✅ /api/activity-logs

❌ /api/troubleTickets
❌ /api/QuotationItems
```

### react component
```
PascalCase + ekstensi .jsx

✅ QuotationForm.jsx
✅ DealCard.jsx
✅ PipelineKanban.jsx

❌ quotation-form.jsx
❌ dealcard.jsx
```

### variabel & fungsi javascript
```
camelCase

✅ const quotationId = ...
✅ const salesId = ...
✅ function handleSubmit() {}

❌ const QuotationId = ...
❌ const sales_id = ...
```

### environment variable
```
UPPER_SNAKE_CASE

✅ JWT_SECRET, DB_HOST, MAIL_PORT
❌ jwt_secret, dbHost
```

---

## 2. aturan clean architecture (backend)

### dependency rule — wajib dipatuhi
```
infrastructure → interfaces → use-cases → domain

setiap lapisan hanya boleh bergantung ke lapisan di bawahnya.
lapisan bawah tidak boleh tahu lapisan atas.
```

### domain (lapisan 1)
- **zero external dependency** — tidak boleh ada import dari library apapun
- hanya berisi: `entities/`, `repositories/` (interface/abstract), `value-objects/`
- entity hanya berisi business logic murni: validasi, kalkulasi, status transition
- tidak boleh import prisma, express, axios, atau library manapun

### use-cases (lapisan 2)
- hanya boleh import dari `domain/`
- satu file = satu use-case (single responsibility)
- menerima dependency via constructor (dependency injection)
- tidak mengetahui express, prisma, atau http sama sekali
- penamaan: `[aksi]-[entitas]-use-case.js`

### interfaces (lapisan 3)
- hanya boleh import dari `use-cases/` dan `domain/`
- controller: terima req/res, panggil use-case, kembalikan response
- dto: schema zod untuk validasi input
- controller tidak boleh instansiasi repository sendiri
- controller tidak boleh taruh business logic

### infrastructure (lapisan 4)
- boleh import library eksternal
- wajib implement interface dari `domain/repositories/`
- prisma repository, mail service, pdf service, file upload service

### composition root
- **semua** instansiasi class hanya di `src/main.js`
- tidak ada `new SomeClass()` di luar main.js
- semua dependency di-wire di satu tempat

---

## 3. aturan frontend

### pembagian tanggung jawab
| lapisan | lokasi | isi |
|---|---|---|
| page | `pages/` | rakit komponen saja, tidak ada business logic |
| logic | `features/[modul]/hooks/` | custom hook + react-query |
| api call | `features/[modul]/services/` | axios call per feature |
| shared | `shared/components/` | komponen reusable lintas feature |
| state global | `features/auth/store/` | zustand store (auth, user) |

### aturan spesifik
- komponen tidak boleh panggil axios langsung — selalu lewat service
- page tidak boleh fetch data langsung — selalu lewat hook
- business logic tidak boleh ada di komponen atau page
- hook custom selalu prefix `use-` → `use-quotation-list.js`
- state lokal ui (toggle, modal) boleh di komponen, state server lewat react-query

---

## 4. aturan database & prisma

- setiap field baru di `schema.prisma` wajib snake_case via `@map`
- setiap tabel baru wajib memiliki kolom: `id`, `created_at`, `updated_at`
- setelah perubahan schema wajib jalankan: `npx prisma migrate dev --name [nama-deskriptif]`
- nama migrasi harus deskriptif: `add-payment-table`, `add-status-to-lead`
- tidak boleh edit file migrasi yang sudah di-commit
- soft delete menggunakan kolom `deleted_at` (nullable), bukan hapus langsung

---

## 5. aturan response api

### format sukses
```json
{
  "success": true,
  "data": { ... },
  "meta": { "total": 153, "page": 1, "limit": 10, "totalPages": 16 }
}
```

### format error
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "input tidak valid",
    "details": [{ "field": "email", "message": "email tidak valid" }]
  }
}
```

### kode error standar
| kode | http status |
|---|---|
| VALIDATION_ERROR | 400 |
| UNAUTHORIZED | 401 |
| FORBIDDEN | 403 |
| NOT_FOUND | 404 |
| CONFLICT | 409 |
| INTERNAL_ERROR | 500 |

---

## 6. aturan keamanan

- semua endpoint (kecuali `/api/auth/login`) wajib melewati `auth-middleware`
- permission di-enforce via `role-middleware` sesuai matriks di `tech-arch.md`
- password wajib di-hash dengan bcrypt (salt rounds: 12)
- access token: 8h, refresh token: 30d
- rate limit global: 100 req/15 menit per IP
- rate limit login: 10 req/15 menit per IP
- tidak boleh menyimpan credential hardcoded — selalu gunakan `.env`

---

## 7. aturan desain & ui

- warna wajib menggunakan palet sistem desain dari `design.md` — tidak boleh warna arbitrary
- komponen baru wajib menggunakan `shadcn-ui` sebagai basis jika ada padanannya
- ikon wajib dari `lucide-react` — tidak boleh mix library ikon
- semua teks numerik statistik menggunakan format rupiah: `Rp 850.000.000`
- badge status wajib sesuai tabel badge di `design.md` (warna + border-radius)
- semua tabel wajib memiliki: pagination, filter, export, column toggle
- loading state wajib ditampilkan (skeleton atau spinner) pada setiap fetch

---

## 8. aturan format nomor dokumen

| dokumen | format | contoh |
|---|---|---|
| customer code | `CUS-[yyyy]-[6digit]` | CUS-2025-001248 |
| quotation | `Q-[yyyy]-[4digit]` | Q-2025-0520 |
| presentation | `PRES-[yyyy]-[4digit]-[3digit]` | PRES-2025-0520-001 |
| installation | `INST-[yyyy]-[4digit]` | INST-2025-0513 |
| trouble ticket | `TT-[yyyy]-[4digit]` | TT-2025-0524 |
| invoice | `INV-[yyyy]-[4digit]` | INV-2025-0516 |
| payment | `PAY-[yyyy]-[4digit]` | PAY-2025-0612 |

semua nomor di-generate otomatis oleh sistem — tidak boleh input manual.

---

## 9. status flow yang valid

perubahan status hanya boleh mengikuti alur berikut. transisi di luar alur ini harus di-reject:

```
lead:       new → contacted → qualified → negosiasi → penawaran → converted / lost
deal:       prospek → negosiasi → penawaran → closing → instalasi [won / lost]
quotation:  draft → sent → approved → [converted to deal] / rejected / expired
invoice:    draft → unpaid → partial → paid / overdue / cancelled
ticket:     open → in-progress → resolved → closed
install:    scheduled → on-progress → done / tertunda / cancelled
```

---

## 10. hal yang dilarang

| larangan | alasan |
|---|---|
| huruf kapital pada nama file, folder, tabel, kolom, url api | konvensi konsistensi |
| instansiasi class di luar `main.js` | melanggar composition root |
| business logic di controller, page, atau component | melanggar clean architecture |
| import prisma langsung di use-case atau controller | melanggar dependency rule |
| panggil axios langsung di react component | harus lewat service layer |
| hardcode credential di source code | security risk |
| edit file migrasi prisma yang sudah di-commit | integritas database |
| nama kolom prisma tanpa `@map` snake_case | inkonsistensi database |
| warna arbitrary di luar palet sistem desain | inkonsistensi ui |
| ikon dari library selain lucide-react | inkonsistensi ui |

---

*rules.md — Mark - isp sales & management system*