# workflow.md — Mark development workflow

> dokumen ini mendefinisikan alur kerja pengembangan, git strategy, cara menambah fitur,
> hingga alur deployment untuk project Mark.

---

## 1. setup awal project

### 1.1 clone & install

```bash
# clone repository
git clone https://github.com/[org]/Mark.git
cd Mark

# install backend
cd Mark-backend
cp .env.example .env          # isi semua variabel
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev                   # berjalan di port 3000

# install frontend (terminal baru)
cd ../Mark-frontend
cp .env.example .env          # isi VITE_API_URL=http://localhost:3000
npm install
npm run dev                   # berjalan di port 5173
```

### 1.2 struktur monorepo

```
Mark/
├── Mark-backend/       # node-js + express + clean architecture
├── Mark-frontend/      # react-js + vite + feature-based
├── docs/
│   ├── design.md
│   ├── tech-arch.md
│   ├── database.md
│   ├── workflow.md           # ← file ini
│   └── rules.md
└── readme.md
```

---

## 2. git strategy

### 2.1 branch model

```
main          ← production-ready, hanya dari release/*
develop       ← integrasi semua fitur, staging server
feat/*        ← fitur baru (dari develop)
fix/*         ← bug fix (dari develop atau main)
refactor/*    ← refactor tanpa perubahan fitur
chore/*       ← update dependency, config, tooling
release/*     ← persiapan rilis (dari develop → main)
hotfix/*      ← emergency fix di production (dari main)
```

### 2.2 naming branch

```bash
# format: [tipe]/[sprint]-[deskripsi-singkat]

feat/sprint-3-create-customer
feat/sprint-4-kanban-pipeline
feat/sprint-5-quotation-pdf
fix/sprint-3-customer-filter-bug
refactor/sprint-2-product-repository
chore/update-prisma-5x
hotfix/invoice-calculation-error
```

### 2.3 alur git harian

```bash
# 1. mulai hari — selalu pull develop terbaru
git checkout develop
git pull origin develop

# 2. buat branch fitur baru
git checkout -b feat/sprint-4-kanban-pipeline

# 3. kerjakan fitur, commit kecil-kecil
git add .
git commit -m "feat(pipeline): add deal entity and repository interface"
git commit -m "feat(pipeline): add create-deal-use-case"
git commit -m "feat(pipeline): add deal controller and routes"
git commit -m "feat(pipeline): add kanban board component"

# 4. push dan buat pull request ke develop
git push origin feat/sprint-4-kanban-pipeline
# → buat PR di github/gitlab
```

### 2.4 format commit message

ikuti **conventional commits**:

```
[tipe]([scope]): [deskripsi singkat]

[body opsional — jelaskan kenapa, bukan apa]

[footer opsional — closes #issue-number]
```

| tipe | kapan digunakan |
|---|---|
| `feat` | menambah fitur baru |
| `fix` | memperbaiki bug |
| `refactor` | perubahan kode tanpa fitur/fix |
| `style` | perubahan formatting, tidak ada perubahan logika |
| `test` | menambah atau memperbaiki test |
| `docs` | perubahan dokumentasi |
| `chore` | update dependency, build, config |
| `perf` | peningkatan performa |

contoh commit yang benar:
```
feat(quotation): add generate-quotation-pdf-use-case

generate pdf menggunakan puppeteer dengan template html kop surat.
mendukung opsi sertakan cover, tanda tangan, syarat & ketentuan.

closes #42
```

contoh commit yang salah:
```
update file          ← terlalu umum
fix bug              ← tidak ada scope
WIP                  ← jangan commit wip ke develop
```

---

## 3. alur menambah fitur baru

ikuti urutan ini **dari dalam ke luar** (clean architecture). jangan loncat lapisan.

```
┌─────────────────────────────────────────────────────────────────┐
│  alur implementasi fitur baru (backend)                         │
│                                                                 │
│  1. domain          → entity + repository interface             │
│       ↓                                                         │
│  2. use-case        → satu file per aksi                        │
│       ↓                                                         │
│  3. dto             → zod schema untuk validasi input           │
│       ↓                                                         │
│  4. controller      → memanggil use-case, return response       │
│       ↓                                                         │
│  5. route           → definisikan endpoint + middleware         │
│       ↓                                                         │
│  6. prisma schema   → tambah/update tabel jika perlu            │
│       ↓                                                         │
│  7. repository      → implementasi konkret prisma               │
│       ↓                                                         │
│  8. main.js         → wire semua dependency                     │
└─────────────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────────────┐
│  alur implementasi fitur baru (frontend)                        │
│                                                                 │
│  1. service         → fungsi axios per endpoint                 │
│       ↓                                                         │
│  2. hook            → react-query wrapping service              │
│       ↓                                                         │
│  3. komponen        → ui yang menggunakan hook                  │
│       ↓                                                         │
│  4. page            → merakit komponen                          │
│       ↓                                                         │
│  5. router          → daftarkan route baru                      │
└─────────────────────────────────────────────────────────────────┘
```

### contoh: menambah fitur "create customer"

**step 1 — domain entity**
```bash
# buat file
touch src/domain/entities/customer.js
touch src/domain/repositories/customer-repository.js
```

**step 2 — use-case**
```bash
mkdir -p src/use-cases/customer
touch src/use-cases/customer/create-customer-use-case.js
touch src/use-cases/customer/get-customer-list-use-case.js
touch src/use-cases/customer/get-customer-detail-use-case.js
touch src/use-cases/customer/update-customer-use-case.js
touch src/use-cases/customer/delete-customer-use-case.js
```

**step 3 — dto**
```bash
mkdir -p src/interfaces/dto/customer
touch src/interfaces/dto/customer/create-customer-dto.js
touch src/interfaces/dto/customer/update-customer-dto.js
```

**step 4-5 — controller + route**
```bash
touch src/interfaces/controllers/customer-controller.js
touch src/interfaces/routes/customer-routes.js
```

**step 6 — prisma (jika ada perubahan skema)**
```bash
# edit prisma/schema.prisma
# lalu jalankan migrasi
npx prisma migrate dev --name add-customer-table
```

**step 7 — repository**
```bash
touch src/infrastructure/repositories/prisma-customer-repository.js
```

**step 8 — wire di main.js**
```javascript
// tambahkan di src/main.js
const PrismaCustomerRepository = require('./infrastructure/repositories/prisma-customer-repository')
const CreateCustomerUseCase = require('./use-cases/customer/create-customer-use-case')
const CustomerController = require('./interfaces/controllers/customer-controller')

const customerRepository = new PrismaCustomerRepository(prisma)
const createCustomerUseCase = new CreateCustomerUseCase({ customerRepository })
const customerController = new CustomerController({ createCustomerUseCase })
```

**step 9 — frontend**
```bash
mkdir -p src/features/crm/{components,hooks,services}
touch src/features/crm/services/customer-service.js
touch src/features/crm/hooks/use-customers.js
touch src/features/crm/components/CustomerForm.jsx
touch src/features/crm/components/CustomerTable.jsx
touch src/pages/crm/crm-page.jsx
```

---

## 4. alur kerja per sprint

### struktur sprint (2 minggu)

```
minggu 1:
  hari 1-2  → planning & breakdown task
  hari 3-7  → implementasi backend (domain → use-case → interface → infra)
  hari 7    → backend test + review

minggu 2:
  hari 8-11 → implementasi frontend
  hari 12   → integrasi frontend ↔ backend
  hari 13   → testing & bug fix
  hari 14   → code review + merge ke develop + demo
```

### checklist sebelum merge ke develop

```
backend:
  [ ] semua use-case sudah di-wire di main.js
  [ ] tidak ada import prisma di luar infrastructure/
  [ ] tidak ada business logic di controller
  [ ] semua endpoint sudah ada di routes/index.js
  [ ] dto validasi sudah dibuat untuk semua input
  [ ] migrasi database sudah berjalan tanpa error
  [ ] tidak ada console.log yang tertinggal

frontend:
  [ ] tidak ada panggilan axios langsung di komponen
  [ ] business logic ada di hooks/, bukan di komponen
  [ ] page hanya merakit komponen, tidak ada useState untuk data fetching
  [ ] loading state dan error state sudah ditangani
  [ ] tidak ada hardcoded string yang seharusnya dari constants/

umum:
  [ ] semua nama file/folder/variabel sesuai konvensi
  [ ] tidak ada huruf kapital di nama file, folder, tabel, url
  [ ] tidak ada kode yang di-comment out
  [ ] tidak ada file .env yang ikut di-commit
```

---

## 5. alur database change

setiap kali ada perubahan skema database, ikuti prosedur ini:

```bash
# 1. edit prisma/schema.prisma

# 2. buat migrasi dengan nama yang deskriptif
npx prisma migrate dev --name [deskripsi-perubahan]
# contoh:
npx prisma migrate dev --name add-sla-fields-to-trouble-tickets
npx prisma migrate dev --name add-payment-method-to-payments

# 3. regenerate prisma client
npx prisma generate

# 4. update seed jika ada data awal yang perlu disesuaikan
# edit prisma/seed.js
npx prisma db seed

# 5. commit semua perubahan sekaligus
git add prisma/
git commit -m "chore(db): add sla fields to trouble_tickets"
```

**penting:** jangan edit file migrasi yang sudah di-commit. jika ada kesalahan,
buat migrasi baru untuk memperbaikinya.

---

## 6. alur testing

### 6.1 struktur test

```
Mark-backend/
├── src/
└── tests/
    ├── unit/
    │   ├── domain/
    │   │   └── quotation.test.js         # test entity & value-object
    │   └── use-cases/
    │       └── create-quotation.test.js  # test use-case dengan mock repo
    ├── integration/
    │   └── quotation.api.test.js         # test endpoint dengan database test
    └── setup.js
```

### 6.2 cara test use-case (unit test)

```javascript
// tests/unit/use-cases/create-customer.test.js
const CreateCustomerUseCase = require('../../../src/use-cases/customer/create-customer-use-case')

describe('create-customer-use-case', () => {
  let useCase
  let mockCustomerRepository

  beforeEach(() => {
    // mock repository — jangan pakai database sungguhan
    mockCustomerRepository = {
      findByEmail: jest.fn(),
      create: jest.fn()
    }
    useCase = new CreateCustomerUseCase({
      customerRepository: mockCustomerRepository
    })
  })

  it('harus berhasil membuat customer baru', async () => {
    mockCustomerRepository.findByEmail.mockResolvedValue(null)
    mockCustomerRepository.create.mockResolvedValue({ id: 1, name: 'pt maju jaya' })

    const result = await useCase.execute({
      name: 'pt maju jaya',
      type: 'corporate',
      phone: '0812-3456-7890',
      email: 'info@majujaya.co.id',
      salesId: 1
    })

    expect(result.name).toBe('pt maju jaya')
    expect(mockCustomerRepository.create).toHaveBeenCalledTimes(1)
  })

  it('harus throw error jika email sudah terdaftar', async () => {
    mockCustomerRepository.findByEmail.mockResolvedValue({ id: 99 })

    await expect(useCase.execute({
      name: 'pt lain',
      email: 'info@majujaya.co.id'
    })).rejects.toThrow('email sudah terdaftar')
  })
})
```

### 6.3 jalankan test

```bash
# semua test
npm test

# unit test saja
npm run test:unit

# integration test saja
npm run test:integration

# watch mode (development)
npm run test:watch

# coverage report
npm run test:coverage
```

---

## 7. code review checklist

sebelum approve pull request, reviewer memastikan:

### arsitektur
- [ ] tidak ada pelanggaran dependency rule (domain ← use-case ← interface ← infra)
- [ ] tidak ada instansiasi class di luar main.js
- [ ] use-case tidak import express, prisma, atau library eksternal lainnya

### kode quality
- [ ] nama file/folder/variabel/tabel menggunakan konvensi yang benar
- [ ] tidak ada logic duplikat yang bisa di-reuse
- [ ] error handling ada di setiap async function
- [ ] tidak ada magic number (gunakan konstanta)

### keamanan
- [ ] input sudah divalidasi dengan zod dto
- [ ] tidak ada data sensitif yang di-log
- [ ] authorization dicek sebelum aksi destructive
- [ ] tidak ada sql injection (prisma sudah mencegah, tapi raw query harus diperiksa)

### database
- [ ] semua nama tabel dan kolom snake_case
- [ ] ada index pada foreign key dan kolom yang sering difilter
- [ ] migrasi bisa di-rollback (tidak destruktif)

---

## 8. deployment workflow

### 8.1 environment

| environment | branch | server | url |
|---|---|---|---|
| development | feat/* | lokal | localhost:5173 |
| staging | develop | vps staging | staging.rapidmark.co.id |
| production | main | vps production | app.rapidmark.co.id |

### 8.2 alur rilis ke staging

```bash
# setelah sprint selesai dan semua PR merged ke develop
git checkout develop
git pull origin develop

# jalankan test
npm test

# push → CI/CD otomatis deploy ke staging
git push origin develop

# verifikasi di staging.rapidmark.co.id
```

### 8.3 alur rilis ke production

```bash
# 1. buat branch release dari develop
git checkout develop
git checkout -b release/v1.2.0

# 2. update versi di package.json
npm version minor   # atau patch / major

# 3. update changelog jika ada
# edit CHANGELOG.md

# 4. commit
git commit -am "chore: release v1.2.0"

# 5. merge ke main
git checkout main
git merge release/v1.2.0 --no-ff
git tag v1.2.0
git push origin main --tags

# 6. merge balik ke develop
git checkout develop
git merge release/v1.2.0 --no-ff
git push origin develop

# 7. hapus branch release
git branch -d release/v1.2.0
```

### 8.4 hotfix di production

```bash
# 1. buat branch hotfix dari main
git checkout main
git checkout -b hotfix/invoice-calculation-error

# 2. fix bug
# ... edit kode ...
git commit -m "fix(invoice): correct tax calculation for discount items"

# 3. merge ke main
git checkout main
git merge hotfix/invoice-calculation-error --no-ff
git tag v1.2.1
git push origin main --tags

# 4. merge ke develop juga
git checkout develop
git merge hotfix/invoice-calculation-error --no-ff
git push origin develop

# 5. hapus branch hotfix
git branch -d hotfix/invoice-calculation-error
```

---

## 9. environment variables management

```bash
# file yang ada di repo (boleh di-commit)
.env.example          # template semua variabel tanpa value

# file yang tidak boleh di-commit (ada di .gitignore)
.env                  # local development
.env.staging          # staging (disimpan di vault/secrets manager)
.env.production       # production (disimpan di vault/secrets manager)
```

aturan:
- **jangan pernah commit file `.env`** — selalu ada di `.gitignore`
- update `.env.example` setiap kali menambah variabel baru
- untuk staging & production, gunakan secrets manager (github secrets, doppler, vault)

---

## 10. troubleshooting umum

### prisma migration error

```bash
# jika migration gagal
npx prisma migrate reset       # reset semua (hati-hati: hapus data)
npx prisma db push             # sync schema tanpa migration (dev only)

# lihat status migration
npx prisma migrate status
```

### port sudah dipakai

```bash
# cari proses yang memakai port
lsof -i :3000
lsof -i :5173

# kill proses
kill -9 [PID]
```

### node_modules rusak

```bash
rm -rf node_modules package-lock.json
npm install
```

### prisma client tidak update setelah ubah schema

```bash
npx prisma generate
```

---

*workflow.md — Mark isp sales & management system*
*versi: 1.0*