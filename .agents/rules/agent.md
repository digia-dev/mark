---
trigger: always_on
---

---
trigger: always_on
---

# agent.md — mark development agent

> instruksi perilaku untuk AI saat bekerja di project mark.
> baca sekali, berlaku sepanjang sesi. tidak perlu tanya konteks berulang.

proyek: **mark** — platform sales & manajemen isp
monorepo: mark-backend/` (node.js) + `mark-frontend/` (react)

---

## 1. deteksi konteks otomatis

sebelum menjawab apapun, deteksi ini dulu. **jangan tanya user** kecuali benar-benar ambigu.

### domain
| sinyal | domain |
|---|---|
| controller, use-case, repository, entity, prisma, dto, main.js | **backend** |
| component, hook, page, zustand, react-query, jsx, tailwind, shadcn | **frontend** |
| nama modul bisnis tanpa layer ("fitur quotation", "buat customer") | **keduanya** — mulai backend |
| `require()` / `module.exports` | **backend** |
| `import` / `export default` / `.jsx` | **frontend** |
| git, branch, commit, sprint, deploy | **workflow** |

### lapisan
```
backend:   entity/domain → use-case → controller/route → repository/prisma → main.js
frontend:  store/zustand → service/axios → hook/react-query → component → page
```

### modul bisnis
```
customer, lead, crm          → crm
deal, pipeline, kanban       → pipeline
quotation, penawaran         → quotation
instalasi, gantt, teknisi    → timeline
tiket, ticket, sla           → trouble-ticket
invoice, faktur, payment     → invoice
produk, paket, bandwidth     → product
dashboard, report, statistik → report
login, auth, token           → auth
```

---

## 2. dokumen yang dibaca sesuai konteks

baca hanya yang relevan di folder Mark/docs/ dan Mark/.agents, langsung ke seksi yang dibutuhkan:

| konteks | dokumen | seksi penting |
|---|---|---|
| backend | backend.md + rules.md | backend.md §2 (folder), §3-4 (pola), §8 (prisma) |
| frontend | frontend.md + rules.md | frontend.md §1 (folder), §4-6 (pola), §8-9 (axios, warna) |
| workflow | workflow.md | §2 (git), §3 (alur fitur) |
| response api | rules.md | §5 |
| pertanyaan umum | agent.md saja | — |
| workflow | analisa yang dibutuhkan saja | — |
---

## 3. profil kebiasaan user

pelajari dari beberapa pesan pertama, simpan sebagai konteks sesi:

| sinyal | adaptasi |
|---|---|
| bahasa indonesia | gunakan indonesia sepanjang sesi |
| langsung paste kode | user teknikal — langsung solusi, skip penjelasan |
| banyak pertanyaan konseptual | jelaskan reasoning dulu |
| "buatkan saja" / "langsung saja" | output cepat, minim pertanyaan |
| feedback iteratif | kolaboratif, tawarkan pilihan |
| sebut sprint / deadline | prioritaskan output siap pakai |
| paste error message | fokus debugging, jelaskan root cause |
| typo / shortcut dalam pesan | boleh respond informal |

---

## 4. aturan wajib — selalu berlaku

### konvensi penamaan
```
file & folder    → kebab-case lowercase
tabel & kolom    → snake_case + @map di prisma
url api          → kebab-case  (/api/trouble-tickets)
react component  → PascalCase.jsx
variabel js      → camelCase
env variable     → UPPER_SNAKE_CASE
```

### clean architecture (backend)
```
domain     → zero dependency. tidak boleh import apapun dari luar.
use-case   → hanya import dari domain. satu file = satu use-case.
interfaces → hanya import dari use-cases & domain. controller = no business logic.
infra      → boleh import library. wajib implement interface dari domain.
main.js    → satu-satunya tempat new SomeClass(). tidak ada pengecualian.
```

### frontend
```
page    → hanya rakit komponen. tidak ada fetch langsung. tidak ada business logic.
hook    → semua data fetching via react-query. simpan di hooks/.
service → semua axios call. komponen tidak boleh panggil axios langsung.
zustand → hanya untuk auth state (user, token, isAuthenticated).
```

### task workflow
```
sebelum coding → cek task.md, baca checklist sub-task yang relevan
tandai status  → [~] mulai · [x] selesai+tested · [!] blocked
commit format  → [tipe]: TASK-[nnn] [deskripsi]
```

### larangan keras
```
❌ huruf kapital di nama file, folder, tabel, kolom, url
❌ new SomeClass() di luar main.js
❌ business logic di controller, page, atau component
❌ import prisma di use-case atau controller
❌ axios langsung di react component
❌ hardcode credential
❌ edit file migrasi yang sudah di-commit
❌ warna arbitrary (#hex) di luar tailwind config
❌ library ikon selain lucide-react
```

---

## 5. alur kerja per tipe permintaan

**kode baru:** deteksi lapisan → baca dokumen relevan → cek pattern di percakapan → tulis kode → tawarkan langkah selanjutnya

**debug/error:** tanya satu hal paling kritis jika kurang info → identifikasi lapisan error → cek pelanggaran arsitektur → solusi minimal → cara mencegah

**review kode:** cek penamaan → cek dependency rule → cek letak business logic → cek format response → feedback spesifik + contoh perbaikan

**fitur baru:** identifikasi modul & lapisan → daftarkan file yang perlu dibuat → tanya "mau mulai dari mana?" → ikuti alur dari dalam ke luar

---

## 6. langkah selanjutnya — selalu tawarkan setelah output

pilih satu atau dua yang paling logis:
```
setelah domain entity    → interface repository atau use-case (create)
setelah use-case         → dto zod, controller, route, wire di main.js
setelah controller+route → test endpoint, prisma repository, atau mulai frontend
setelah frontend service → custom hook (react-query), lalu komponen
setelah komponen         → integrasikan ke page, tambah loading & error state
setelah skema database   → jalankan migrasi, update seed
setelah satu modul full  → rekomendasikan sprint berikutnya
```

---

## 7. sprint & modul

| sprint | modul |
|---|---|
| 1 | setup, auth, manajemen user |
| 2 | master data (paket, produk, area) |
| 3 | crm — customers & leads |
| 4 | pipeline — kanban board |
| 5 | quotation + pdf generator |
| 6 | timeline instalasi |
| 7 | trouble ticket |
| 8 | invoices & payments |
| 9 | presentation produk |
| 10 | dashboard & reports |
| 11 | notifications & activity logs |
| 12 | testing, bug fix, deployment |

---

## 8. referensi cepat

### format response api
```json
{ "success": true, "data": {}, "meta": { "total": 0, "page": 1 } }
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "..." } }
```

### nomor dokumen (auto-generate, tidak boleh manual)
```
CUS-[yyyy]-[6digit]           customer    CUS-2025-001248
Q-[yyyy]-[4digit]             quotation   Q-2025-0520
PRES-[yyyy]-[4digit]-[3digit] presentasi  PRES-2025-0520-001
INST-[yyyy]-[4digit]          instalasi   INST-2025-0513
TT-[yyyy]-[4digit]            ticket      TT-2025-0524
INV-[yyyy]-[4digit]           invoice     INV-2025-0516
PAY-[yyyy]-[4digit]           payment     PAY-2025-0612
```

### status flow (transisi di luar alur ini di-reject)
```
lead:      new → contacted → qualified → negosiasi → penawaran → converted/lost
deal:      prospek → negosiasi → penawaran → closing → instalasi [won/lost]
quotation: draft → sent → approved → [deal] / rejected / expired
invoice:   draft → unpaid → partial → paid / overdue / cancelled
ticket:    open → in-progress → resolved → closed
install:   scheduled → on-progress → done / tertunda / cancelled
```

### modul → file terlibat
| modul | entity | controller | feature |
|---|---|---|---|
| auth | user.js | auth-controller | features/auth/ |
| crm | customer.js, lead.js | customer-controller, lead-controller | features/crm/ |
| pipeline | deal.js | deal-controller | features/pipeline/ |
| quotation | quotation.js | quotation-controller | features/quotation/ |
| timeline | installation.js | installation-controller | features/timeline/ |
| trouble-ticket | trouble-ticket.js | trouble-ticket-controller | features/trouble-ticket/ |
| invoice | invoice.js | invoice-controller | features/invoice/ |
| product | product.js | product-controller | features/product/ |
| report | — | report-controller | features/report/ |

---

## 9. jangan lakukan ini

- buat daftar pertanyaan panjang — pilih satu yang paling kritis
- abaikan aturan arsitektur meski user minta shortcut
- baca semua dokumen sekaligus — baca hanya yang relevan
- ulangi penjelasan yang sudah diberikan sebelumnya
- tulis `console.log` di output kecuali sedang debug
- hardcode nilai yang seharusnya dari env atau konstanta