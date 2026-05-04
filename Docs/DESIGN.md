# design.md — Mark ui/ux specification

> dokumen ini mendefinisikan sistem desain, komponen visual, layout, dan pola interaksi berdasarkan tampilan aktual aplikasi Mark.

---

## 1. identitas visual

### logo & branding
- nama: **Mark**
- tagline: *isp sales & management system*
- logo terdiri dari ikon segitiga/panah berwarna oranye dan teks `Mark` berwarna biru gelap
- font logo: bold sans-serif
- logo selalu muncul di pojok kiri atas sidebar

### palet warna utama

| nama | hex | penggunaan |
|---|---|---|
| primary-blue | `#1E3A8A` | topbar aktif, tombol primary, header kolom kanban |
| accent-orange | `#F97316` | tombol tambah cepat, ikon logo, highlight nilai penting |
| success-green | `#16A34A` | status aktif, approved, selesai, paid |
| warning-yellow | `#D97706` | status draft, pending, warning |
| danger-red | `#DC2626` | status rejected, overdue, hapus, prioritas tinggi |
| info-blue | `#2563EB` | status sent, in-progress, info |
| neutral-purple | `#7C3AED` | status negosiasi, partial |
| gray-100 | `#F3F4F6` | background halaman |
| gray-200 | `#E5E7EB` | border, divider |
| gray-600 | `#4B5563` | teks sekunder |
| gray-900 | `#111827` | teks utama |
| white | `#FFFFFF` | background card, sidebar, popup |

### tipografi

| elemen | font | ukuran | weight |
|---|---|---|---|
| heading halaman | inter / system-sans | 22-24px | 700 |
| subheading | inter | 14-16px | 600 |
| body text | inter | 13-14px | 400 |
| label kecil | inter | 11-12px | 500 |
| angka statistik | inter | 24-32px | 700 |
| kode (nomor invoice, dll) | mono | 13px | 500 |

---

## 2. layout sistem

### struktur halaman utama

```
┌─────────────────────────────────────────────────────┐
│                     topbar (64px)                   │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│   sidebar    │         content area                 │
│   (220px)    │         (flex-grow: 1)               │
│              │                                      │
│              │                                      │
└──────────────┴──────────────────────────────────────┘
```

### topbar
- tinggi: 64px, background white, shadow-sm
- kiri: hamburger menu icon (collapse sidebar)
- tengah: global search bar (`ctrl+k`) — placeholder: "cari customer, lead, quotation, atau deal..."
- kanan: tombol aksi utama (buat quotation / tambah deal / dll), notifikasi bell (badge merah), pesan badge, avatar + nama user + role

### sidebar (220px)
- background white
- logo Mark di atas
- menu navigasi dengan ikon + label
- sub-menu dapat di-collapse (contoh: crm memiliki customers & leads)
- item aktif: background biru gelap, teks putih
- item hover: background gray-100
- bagian bawah: widget "target bulan ini" dengan progress ring chart (persentase pencapaian)

#### urutan menu sidebar
1. dashboard
2. crm (expandable → customers, leads)
3. pipeline
4. quotation
5. presentation
6. timeline (instalasi)
7. trouble ticket
8. invoices
9. products & services
10. reports (expandable → overview, sales performance, product performance, pipeline report, conversion report)
11. notifications (badge jumlah unread)
12. activity logs
13. settings (expandable)

### widget target bulan ini (sidebar bawah)
- judul: "target bulan ini" + bulan
- ring chart dengan persentase di tengah (contoh: 85%)
- nilai realisasi (contoh: rp 850.000.000)
- teks "dari rp 1.000.000.000"
- link "lihat detail target →"

---

## 3. komponen desain

### 3.1 stat card (kartu metrik)
digunakan di bagian atas setiap halaman untuk menampilkan ringkasan data.

```
┌──────────────────────────────────┐
│  [ikon]  judul metrik             │
│          nilai utama (besar)      │
│          ▲ persentase perubahan   │
│          keterangan periode lalu  │
└──────────────────────────────────┘
```

- background: white
- border-radius: 12px
- shadow: shadow-sm
- ikon: di dalam lingkaran berwarna pastel (sesuai warna metrik)
- nilai perubahan positif: teks hijau dengan ▲
- nilai perubahan negatif: teks merah dengan ▼

contoh stat cards per halaman:
- **dashboard**: total customers, revenue, deals closing, instalasi aktif, trouble ticket
- **pipeline**: total deals, total value, deals won, win rate, rata-rata sales cycle
- **quotation**: total quotation, total value, approved, conversion rate, rata-rata nilai
- **invoices**: total invoice, total penagihan, total terbayar, total terhutang, rata-rata pembayaran
- **trouble ticket**: total, open, in-progress, resolved, closed, rata-rata resolusi

### 3.2 badge status

| status | warna background | warna teks |
|---|---|---|
| aktif / active | green-100 | green-700 |
| sent | blue-100 | blue-700 |
| approved | green-100 | green-700 |
| draft | gray-100 | gray-700 |
| rejected | red-100 | red-700 |
| expired | orange-100 | orange-700 |
| paid | green-100 | green-700 |
| unpaid | red-100 | red-700 |
| partial | purple-100 | purple-700 |
| overdue | red-100 | red-700 |
| open | orange-100 | orange-700 |
| in-progress | blue-100 | blue-700 |
| resolved | green-100 | green-700 |
| closed | gray-100 | gray-700 |
| prospek | blue-100 | blue-700 |
| negosiasi | purple-100 | purple-700 |
| penawaran | orange-100 | orange-700 |
| closing | green-100 | green-700 |
| instalasi | teal-100 | teal-700 |
| on-progress | green-100 | green-700 |
| best seller | blue-600 | white |
| promo | orange-600 | white |
| new | green-600 | white |

border-radius badge: 9999px (full rounded), padding: 2px 10px, font-size: 11-12px, font-weight: 500

### 3.3 tabel data
- header: background gray-50, teks gray-600, font-weight 600
- baris: background white, hover → gray-50
- border: border-bottom gray-100
- checkbox di kolom pertama untuk bulk select
- kolom aksi: icon "⋮" (three dot) di kanan baris, memunculkan dropdown konteks
- pagination di bawah: "menampilkan 1-10 dari N data", navigasi halaman, pilih items/halaman (10, 25, 50)
- tab filter di atas tabel: semua, draft, sent, approved, dll (dengan jumlah)
- toolbar di atas: search inline, tombol filter, tombol export, toggle tampilan (list/grid)

### 3.4 tombol

| tipe | style |
|---|---|
| primary | bg blue-700, teks white, hover blue-800 |
| secondary | bg white, border gray-300, teks gray-700 |
| danger | bg red-600, teks white |
| ghost | bg transparent, teks blue-700, hover bg blue-50 |
| icon-only | p-2, border-radius 8px, hover bg gray-100 |

tombol dengan dropdown ditandai dengan chevron ▾ di sisi kanan.

### 3.5 tombol tambah cepat (global)
- posisi: topbar, tengah-kanan
- style: background orange (accent), teks white, ada dropdown
- dropdown berisi shortcut ke: customer baru, lead baru, deal baru, quotation, presentation, trouble ticket, invoice, produk/service, instalasi

### 3.6 form popup / modal
- overlay: background rgba(0,0,0,0.4)
- modal: background white, border-radius 12px, max-width 480-600px
- header: judul + tombol × (close)
- footer: tombol batal (secondary) + tombol simpan (primary)
- field wajib ditandai dengan `*` merah
- dropdown dengan search untuk field customer, produk, sales, dll
- validasi inline (pesan error di bawah field)

### 3.7 detail panel (side panel)
digunakan di halaman quotation, invoices, trouble ticket untuk menampilkan detail di sisi kanan tanpa berpindah halaman.

- lebar: 420-480px
- muncul di sisi kanan content area
- header: nomor dokumen + badge status + tombol aksi (edit, download pdf, kirim, dll) + tombol × close
- body: tab navigasi (detail, item, riwayat, catatan, lampiran, dll)
- setiap tab menampilkan konten yang relevan

### 3.8 kanban board (pipeline)
- setiap kolom mewakili satu stage pipeline
- header kolom: nama stage + jumlah deal + total nilai + tombol + (tambah) + tombol ⋮
- warna garis bawah header unik per stage: biru, ungu, oranye, hijau, teal
- kartu deal: nama deal, nama customer, produk/layanan, sales (avatar), area, nilai, tanggal, badge status jika ada
- drag & drop antar kolom
- di bawah kartu: "x deals lainnya" jika melebihi tampilan

### 3.9 gantt chart (timeline instalasi)
- baris: satu baris per instalasi (nama customer + kode)
- kolom: tanggal (per hari)
- bar berwarna per tahapan: survey (biru), desain & penawaran (ungu), instalasi (oranye), aktivasi (hijau)
- bar yang belum selesai: warna lebih pudar/transparan
- bar tertunda: warna merah dengan label "tertunda"
- header atas: navigasi bulan, toggle hari/minggu/bulan, tombol today
- klik bar: membuka side panel detail instalasi

### 3.10 notification bell
- ikon lonceng di topbar
- badge merah dengan jumlah unread
- klik: dropdown notifikasi terbaru (max 5 item)
- link "lihat semua notifikasi →"

---

## 4. pola halaman per modul

### dashboard
**layout:** header stat cards (5 kolom) → baris kedua: grafik revenue (kiri besar) + pipeline funnel (kanan) + aktivitas terbaru (kolom kanan) → baris ketiga: peta sebaran customer (kiri besar) + deals by sales (kanan) → pipeline overview (tabel per stage) + lead terbaru + tugas mendatang

**komponen khusus:**
- grafik revenue: line chart, dua garis (revenue aktual vs target), tooltip interaktif
- pipeline funnel: funnel chart vertikal, tiap stage beda warna, conversion rate di bawah
- peta sebaran customer: leaflet-js map, cluster marker (lingkaran dengan angka), legenda cluster
- deals by sales: horizontal bar chart top 5 sales
- widget aktivitas terbaru: feed kronologis dengan ikon per jenis aktivitas
- pipeline overview: tabel horizontal per stage dengan preview deal terbaru

### crm — customers & leads
**layout:** header stat cards (4 kolom) → tab (semua data, customers, leads) → tabel dengan side panel detail

**fitur khusus:**
- tab tabel menggabungkan customer dan lead dalam satu list
- kolom: nama/perusahaan, tipe (customer/lead), status, sales, area, terakhir kontak, aksi
- side panel detail: tab informasi, kontak, layanan aktif, riwayat, aktivitas, dokumen, catatan
- ringkasan customer: total layanan, total invoice, total tagihan, outstanding

### pipeline
**layout:** stat cards → toggle board/table → kanban board atau tabel

**fitur khusus:**
- sidebar kiri: pipeline summary (total deals, total value, breakdown per stage dengan progress bar)
- kanban board: 5 kolom (prospek, negosiasi, penawaran, closing, instalasi)
- table view: tabel dengan kolom nomor, nama deal, customer, stage badge, nilai, probabilitas, expected closing, sales, area, status, aksi
- popup lihat detail laporan di sidebar kiri

### quotation
**layout:** stat cards → tab status → tabel atau board → side panel detail

**tab view detail:**
- detail: informasi customer + ringkasan harga + ringkasan item + progress tracker
- item: tabel item penawaran (produk/layanan, deskripsi, qty, harga satuan, total)
- syarat & ketentuan: teks syarat
- riwayat: timeline perubahan status
- catatan: internal notes
- lampiran: file pdf yang digenerate

**progress tracker (timeline vertikal):**
- draft created → sent to customer → viewed by customer → approved/rejected → converted to deal

### presentation
**layout:** tab (semua, dipresentasikan, draft, template, arsip) → tabel dengan preview panel kanan

**preview panel:**
- slide thumbnail + navigasi prev/next
- outline presentasi (daftar judul slide)
- informasi singkat: customer, sales, produk, tanggal, status, dibuat, diupdate
- tombol: edit, download pdf, presentasikan, bagikan

### timeline instalasi
**layout:** stat cards → tab (gantt timeline, table view) → gantt chart + side panel

**keterangan status (legenda warna di bawah gantt):**
- survey, desain & penawaran, instalasi, aktivasi, selesai, tertunda, dibatalkan

**side panel detail instalasi:**
- tab: detail, aktivitas, dokumen, catatan
- informasi instalasi: nomor, sales, paket/layanan, alamat, mulai, target selesai, durasi, status
- progress tahapan: list vertical (survey, desain & penawaran, instalasi, aktivasi) dengan status & tanggal per tahapan

### trouble ticket
**layout:** stat cards → tab status → tabel + side panel

**side panel detail tiket:**
- informasi tiket: nomor, tanggal, prioritas, status, sla target, sales, area, kategori, sub-kategori, sumber, deskripsi keluhan
- informasi sla: ring timer (sisa waktu / waktu lewat), target resolusi, durasi berlaku, durasi tersisa
- pic & progress: nama penanggung jawab + tim teknis + progress bar
- quick action: tombol update status, tambah catatan, upload lampiran, close ticket
- tab: detail, aktivitas, catatan, lampiran, riwayat, sla

### invoices
**layout:** stat cards → tab status → tabel + side panel detail

**side panel:**
- informasi invoice: nomor, tanggal, jatuh tempo, periode layanan, sales, status
- ringkasan pembayaran: subtotal, ppn, total tagihan, terbayar, sisa tagihan, cap "lunas" jika sudah bayar
- riwayat pembayaran: list kronologis pembayaran (nomor pembayaran, tanggal, metode, nominal)
- tab: detail, item, pembayaran, riwayat, catatan, lampiran

### products & services
**layout:** stat cards (total produk, aktif, nonaktif) → filter bar → grid kartu produk (default) / tabel

**kartu produk:**
- badge best seller / promo / new di pojok kiri atas
- ikon teknologi (router/antena)
- nama produk, kecepatan down↓ up↑, harga/bulan
- jika promo: label promo merah dengan teks "hemat x% s/d tanggal"
- metadata: teknologi, area coverage
- status badge (active / nonaktif)
- tombol: detail, buat quotation

### reports
sub-menu: overview, sales performance, product performance, pipeline report, conversion report

**overview:**
- stat cards → product performance cards (5 produk teratas) → grafik: top 5 terlaris (bar), revenue by product (horizontal bar), distribusi teknologi (donut) → tabel ringkasan performa produk

**sales performance:**
- stat cards → grafik sales over time (line chart vs target) → sales by salesperson top 5 (tabel) → sales funnel (funnel chart) + sales by area (donut) + sales target achievement (gauge/ring) → tabel sales performance detail

**pipeline report:**
- stat cards → pipeline overview (funnel horizontal dengan nilai per stage) → grafik: pipeline by stage (donut), pipeline trend (line chart), pipeline by salesperson (horizontal bar) → tabel top pipeline deals

### notifications
**layout:** tab (semua, belum dibaca, penting, sistem, lainnya) + badge jumlah → list notifikasi → panel kanan (ringkasan + pengaturan)

**item notifikasi:**
- ikon berwarna per jenis (lead, deal, quotation, instalasi, trouble ticket, invoice)
- judul notifikasi (bold)
- deskripsi detail
- waktu relatif (x menit/jam/hari yang lalu)
- badge tipe (baru, penting, update, sistem)
- titik biru untuk yang belum dibaca

**panel kanan:**
- ringkasan: total, belum dibaca, penting, sistem
- pengaturan notifikasi: toggle notifikasi email, browser, suara, ringkasan harian
- notifikasi terbaru (feed kecil)

### activity logs
**layout:** filter bar (tanggal, pengguna, modul, aksi, search) → stat cards → tabel log → panel kanan (chart aktivitas per modul, per aksi, aktivitas terbaru)

**tabel log:**
- kolom: waktu, pengguna (avatar + nama + role), modul, aksi (badge), deskripsi, ip address, aksi (⋮)

**chart panel kanan:**
- donut chart aktivitas per modul (lead, quotation, deal, customer, lainnya)
- horizontal bar aktivitas per aksi (dibuat, diperbarui, diubah, dihapus)
- feed aktivitas terbaru

---

## 5. pola interaksi umum

### global search (ctrl+k)
- muncul sebagai overlay/modal
- search real-time dengan debounce 300ms
- hasil dikelompokkan per kategori (customer, lead, quotation, deal, dll)
- navigasi dengan keyboard (↑↓ enter)

### tambah data baru
dua entry point:
1. tombol "tambah cepat" di topbar → dropdown 9 opsi
2. tombol aksi di topbar halaman yang relevan (contoh: "buat quotation ▾") → dropdown opsi cara membuat (manual, dari template, dari lead, dll)

### filter data
- tombol "filter" di toolbar tabel membuka popup filter
- filter dapat dikombinasi: status, sales, area, tanggal, nilai min-maks, dll
- tombol "reset" menghapus semua filter
- tombol "terapkan filter" menerapkan
- filter aktif ditampilkan sebagai chip/badge di bawah toolbar

### export data
- tombol "export" di toolbar
- popup pilih format: excel (.xlsx), csv (.csv), pdf (.pdf)
- pilih kolom (opsional)
- tombol download

### import data
- popup drag & drop file
- format didukung: .xlsx, .csv, maks 5mb
- instruksi: download template → isi data → upload file
- tombol download template

### pengaturan kolom tabel
- ikon gear ⚙ di sisi kanan toolbar
- popup checklist kolom mana yang ditampilkan
- drag handle untuk mengatur urutan kolom
- tombol "reset ke default"

### konfirmasi hapus
- popup konfirmasi dengan ikon tempat sampah merah
- teks "yakin ingin menghapus data ini?"
- info data yang akan dihapus (nama, tipe, tanggal, id)
- checkbox "saya yakin ingin menghapus data ini"
- tombol batal (secondary) + hapus (danger/red)

### feedback aksi berhasil
- popup success dengan centang hijau animasi
- judul "berhasil!"
- ringkasan data yang disimpan
- tombol "lihat data" → navigasi ke halaman detail

---

## 6. responsivitas

- **desktop (≥ 1280px)**: layout penuh dengan sidebar expanded, side panel aktif
- **tablet (768–1279px)**: sidebar collapsed (icon-only), side panel sebagai overlay
- **mobile (< 768px)**: bottom navigation, konten full-width, popup fullscreen

breakpoint utama: 768px (tablet), 1024px (laptop), 1280px (desktop wide)

---

## 7. dark mode (opsional)

- toggle di pengaturan preferensi profil
- semua warna menggunakan css variables sehingga mudah diganti
- background: gray-900, card: gray-800, teks: gray-100
- warna aksen tetap sama

---

*design.md — Mark - ISP Management System*
*versi: 1.0 | referensi: screenshot ui aktual*
