# prompt-template.md — mark development prompt templates

---

## cara pakai

1. pilih template sesuai tipe pekerjaan
2. ganti semua [PLACEHOLDER] dengan nilai nyata
3. tambahkan bagian opsional jika dibutuhkan
4. paste ke chat

---

## 1. template — halaman baru (page + komponen + hook + service)

```
buat modul [NAMA_MODUL] untuk mark.

**yang perlu dibuat:**
- `features/[modul]/services/[nama]-service.js`
- `features/[modul]/hooks/use-[nama].js`
- `features/[modul]/components/[NamaKomponen].jsx`
- `pages/[nama]-page.jsx`

**referensi tampilan:**
[deskripsikan atau tempel screenshot layout halaman]

**data yang dibutuhkan:**
- endpoint: GET /api/[resource]
- field: [field1, field2, field3]
- filter: [filter yang ada di halaman]

**fitur yang harus ada:**
- [ ] stat cards (jumlah / ringkasan)
- [ ] tabel dengan pagination 10/halaman
- [ ] filter: status, sales, area, tanggal
- [ ] search
- [ ] export
- [ ] loading skeleton
- [ ] empty state

**aturan:**
- ikuti rules.md dan frontend.md
- data fetching via react-query, bukan useState + useEffect
- axios hanya di service, bukan di komponen
- ikon dari lucide-react
- badge status sesuai design.md
- angka rupiah pakai formatCurrency()
```

---

## 2. template — backend: use-case + controller + route

```
buat backend untuk fitur [NAMA_FITUR] di modul [NAMA_MODUL].

**yang perlu dibuat:**
1. entity: `src/domain/entities/[nama].js`
   - field: [id, field1, field2, created_at, updated_at]
   - method: [validasi atau kalkulasi yang perlu ada]

2. repository interface: `src/domain/repositories/[nama]-repository.js`
   - method: [findById, findAll, create, update, delete]

3. use-case: `src/use-cases/[modul]/[aksi]-[nama]-use-case.js`
   - input: [field yang diterima]
   - logic: [apa yang dilakukan]
   - output: [apa yang dikembalikan]

4. dto: `src/interfaces/dto/[modul]/[aksi]-[nama]-dto.js`
   - validasi zod untuk input

5. controller: `src/interfaces/controllers/[nama]-controller.js`
   - method: [create, getList, getDetail, update, delete]

6. route: `src/interfaces/routes/[nama]-routes.js`
   - [METHOD] /api/[resource]
   - middleware: auth-middleware [+ role-middleware jika perlu]

7. prisma schema: tambah model [Nama] di schema.prisma
   - field: [sesuai tabel database]

8. repository implementasi: `src/infrastructure/repositories/prisma-[nama]-repository.js`

9. wire di main.js

**aturan:**
- ikuti rules.md dan backend.md
- domain zero dependency
- use-case tidak boleh import prisma atau express
- semua new SomeClass() hanya di main.js
- response format: { success, data, meta }
- error pakai kode standar: VALIDATION_ERROR, NOT_FOUND, dll
```

---

## 3. template — popup / modal / form

```
buat komponen popup [NAMA_POPUP] untuk modul [NAMA_MODUL].

**tipe popup:** [form isi data / konfirmasi / detail / filter / pilih item]

**trigger:** [tombol apa yang membuka popup ini]

**konten popup:**
- judul: "[judul popup]"
- field form:
  - [nama_field] — tipe: [text/select/date/number] — wajib: [ya/tidak]
  - [nama_field] — tipe: [text/select/date/number] — wajib: [ya/tidak]
- tombol: [Batal] + [Simpan / Konfirmasi / nama aksi]

**behavior:**
- validasi zod sebelum submit
- loading state saat submit
- close otomatis setelah berhasil
- tampilkan error inline jika gagal

**file:** `features/[modul]/components/[NamaPopup].jsx`

**aturan:**
- gunakan shadcn Dialog atau Sheet
- form pakai react-hook-form + zod
- panggil mutation dari hook, bukan axios langsung
```

---

## 4. template — fitur dalam tabel (filter, export, column toggle, pagination)

```
tambahkan fitur [NAMA_FITUR] ke tabel di halaman [NAMA_HALAMAN].

**fitur yang ditambahkan:**
[ ] filter popup — field: [status, sales, area, tanggal, dll]
[ ] export — format: [excel / csv / pdf]
[ ] column toggle — kolom yang bisa disembunyikan: [list kolom]
[ ] pagination — default 10/halaman, opsi: [10, 25, 50]
[ ] search inline — placeholder: "[teks placeholder]"
[ ] bulk action — aksi yang tersedia: [hapus, ubah status, export]

**file yang diubah:**
- `features/[modul]/components/[NamaTabel].jsx`
- `features/[modul]/hooks/use-[nama].js` (tambah param filter)
- `features/[modul]/services/[nama]-service.js` (kirim query param ke api)

**aturan:**
- state filter simpan di hook, bukan di komponen tabel
- query key react-query harus include semua parameter filter
- pagination pakai shared/hooks/use-pagination.js
```

---

## 5. template — detail panel / side panel

```
buat side panel detail untuk [NAMA_ENTITAS] di halaman [NAMA_HALAMAN].

**trigger:** klik baris tabel / klik tombol detail

**layout panel (kanan layar, lebar ~400px):**
- header: nomor/nama + badge status + tombol aksi (edit, download, kirim, dll)
- tab navigasi: [Detail | Item | Riwayat | Catatan | Lampiran]

**konten per tab:**
- tab Detail:
  - section kiri: [informasi customer/entitas]
  - section kanan: [ringkasan harga/status/progress]
- tab [nama tab lain]:
  - [deskripsikan konten]

**tombol aksi di header:**
- [Edit] → buka popup edit
- [Download PDF] → panggil endpoint download
- [nama aksi lain]

**file:** `features/[modul]/components/[Nama]DetailPanel.jsx`

**aturan:**
- gunakan shared/components/SidePanel.jsx sebagai wrapper
- data dari hook yang sudah ada, bukan fetch baru
- loading skeleton saat data belum ada
```

---

## 6. template — kanban board

```
buat kanban board untuk modul [NAMA_MODUL].

**kolom stage:** [Stage1 | Stage2 | Stage3 | Stage4 | Stage5]

**konten setiap card:**
- baris 1: [nama entitas] — badge status
- baris 2: [deskripsi singkat]
- baris 3: [assigned to] — [tanggal]
- baris 4: [nilai / harga]

**interaksi:**
- drag & drop antar kolom → update stage via API
- klik card → buka detail panel
- tombol + di header kolom → tambah item di stage ini
- tombol filter di atas board
- toggle board / table view

**file yang dibuat:**
- `features/[modul]/components/KanbanBoard.jsx`
- `features/[modul]/components/KanbanColumn.jsx`
- `features/[modul]/components/[Nama]Card.jsx`

**library:** @dnd-kit/core untuk drag & drop

**aturan:**
- optimistic update saat drag — update ui dulu, rollback jika api gagal
- panggil use-[modul].js untuk data dan mutation
```

---

## 7. template — gantt / timeline

```
buat komponen gantt timeline untuk modul [NAMA_MODUL].

**data per baris:**
- label kiri: [nama customer / proyek] + [nomor / id]
- kolom durasi: [X Hari]
- bar gantt: stage-stage dengan warna berbeda

**stage dan warnanya:**
- [Stage1] → warna: [warna]
- [Stage2] → warna: [warna]
- [Stage3] → warna: [warna]

**kontrol:**
- toggle: Hari | Minggu | Bulan
- tombol Today
- navigasi prev / next
- search customer

**interaksi:**
- klik bar → buka detail panel kanan
- hover bar → tooltip info

**file:** `features/[modul]/components/GanttChart.jsx`

**aturan:**
- render dengan css grid atau canvas, bukan library berat
- hanya render baris yang visible (virtual scroll jika > 100 baris)
```

---

## 8. template — halaman report / analytics

```
buat halaman report [NAMA_REPORT] untuk modul reports.

**filter atas:** date range + [dropdown filter lain] + tombol Export Report

**stat cards (baris atas):**
- [Metric1]: [deskripsi] — perubahan dari periode lalu
- [Metric2]: [deskripsi] — perubahan dari periode lalu
- [dst...]

**chart section:**
- chart kiri: [tipe chart — line/bar/donut] — judul: [nama]
  data: [apa yang digambar]
- chart kanan: [tipe chart] — judul: [nama]
  data: [apa yang digambar]

**tabel bawah:**
- judul: [nama tabel]
- kolom: [#, kolom1, kolom2, kolom3, ...]
- bisa export, ada pagination

**file yang dibuat:**
- `features/report/services/report-service.js` (tambah fungsi baru)
- `features/report/hooks/use-report.js` (tambah query baru)
- `features/report/components/[NamaChart].jsx`
- `pages/reports/[nama]-report-page.jsx`

**library chart:** recharts — LineChart / BarChart / PieChart / FunnelChart
```

---

## 9. template — perbaiki bug / error

```
ada bug di modul [NAMA_MODUL], lapisan [backend/frontend], file [PATH_FILE].

**error yang muncul:**
[paste pesan error lengkap di sini]

**langkah reproduksi:**
1. [langkah 1]
2. [langkah 2]
3. error muncul

**yang diharapkan:** [harusnya bagaimana]
**yang terjadi:** [yang terjadi sekarang]

**kode yang relevan:**
[paste kode yang bermasalah]

**sudah dicoba:** [apa yang sudah dicoba]
```

---

## 10. template — review kode

```
tolong review kode berikut untuk modul [NAMA_MODUL]:

[paste kode di sini]

**yang ingin dicek:**
- [ ] konvensi penamaan (file, variabel, tabel, url)
- [ ] dependency rule clean architecture
- [ ] letak business logic (tidak boleh di controller/page/component)
- [ ] format response api
- [ ] potensi bug atau edge case

**konteks:** kode ini adalah [lapisan apa] dari modul [nama modul]
```

---

## 11. template — database schema

```
buat atau update prisma schema untuk entitas [NAMA_ENTITAS].

**field yang dibutuhkan:**
| field (camelCase) | tipe prisma | keterangan |
|---|---|---|
| id | Int @id @default(autoincrement()) | |
| [fieldName] | String | wajib |
| [fieldName] | String? | opsional |
| [fieldRef]Id | Int? | FK ke tabel [lain] |
| status | String @default("[default]") | |
| createdAt | DateTime @default(now()) | |
| updatedAt | DateTime @updatedAt | |
| deletedAt | DateTime? | soft delete |

**relasi:**
- [NamaEntitas] belongs to [EntitasLain] via [fieldId]
- [NamaEntitas] has many [EntitasLain]

**index yang dibutuhkan:**
- @@index([status])
- @@index([salesId])
- @@index([customerId])
- @@index([createdAt])

**nama tabel (snake_case):** [nama_tabel]

setelah schema selesai, sertakan perintah migrasi:
`npx prisma migrate dev --name [nama-deskriptif]`

**aturan:**
- semua field wajib punya @map dengan snake_case
- tabel wajib punya @@map
- id, created_at, updated_at wajib ada di semua tabel
```

---

## 12. template — komponen reusable (shared)

```
buat komponen reusable [NAMA_KOMPONEN] untuk shared/components/.

**deskripsi:** [apa fungsi komponen ini]

**props:**
| prop | tipe | default | keterangan |
|---|---|---|---|
| [propName] | [tipe] | [default] | [keterangan] |

**variant / state yang perlu didukung:**
- [variant1]: [tampilannya seperti apa]
- [variant2]: [tampilannya seperti apa]

**contoh penggunaan:**
```jsx
<[NamaKomponen]
  [prop1]="[nilai]"
  [prop2]="[nilai]"
/>
```

**file:** `shared/components/[NamaKomponen].jsx`

**aturan:**
- tidak boleh ada data fetching di komponen ini
- hanya terima props, tidak ada state server
- gunakan tailwind untuk styling
- ikon dari lucide-react jika diperlukan
```

---

## 13. template — topbar / global action

```
buat atau update komponen [NAMA_KOMPONEN] di topbar / header global.

**komponen yang diubah:** `shared/layouts/Topbar.jsx`

**fitur yang ditambahkan / diubah:**
- [ ] tombol "Tambah Cepat" → dropdown pilih tipe data baru
- [ ] bell notifikasi → popup list notifikasi terbaru
- [ ] avatar / profil → dropdown menu profil
- [ ] search global (Ctrl+K) → command palette

**behavior:**
[deskripsikan behavior spesifik]

**state:** simpan di [zustand store / local state komponen]
```

---

## singkatan perintah cepat

kalau sudah paham konteks, boleh pakai format singkat:

```
# buat halaman baru
buat halaman [nama] — referensi gambar: [screenshot] — fitur: [list fitur]

# buat backend satu use-case
buat use-case [aksi]-[entitas] — input: [field] — logic: [deskripsi]

# tambah fitur ke halaman existing
tambahkan [fitur] ke halaman [nama] — [deskripsi singkat]

# perbaiki konvensi
perbaiki konvensi penamaan di file ini: [paste kode]

# wire di main.js
wire [NamaClass] ke main.js — dependency: [repo1, repo2]
```

---

*prompt-template.md — mark isp sales & management system*
*gunakan bersama agent.md untuk hasil terbaik*