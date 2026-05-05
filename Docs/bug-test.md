# bug-and-test-task.md — rapid-mark

> daftar lengkap bug yang perlu dicek dan test yang perlu dilakukan.
> berdasarkan seluruh fungsi, tampilan, api, dan database di aplikasi.
> gunakan legenda status dari rules.md: [ ] [ x ] [~] [!]

---

## legenda prioritas

| simbol | arti |
|---|---|
| 🔴 | critical — blocker, tidak bisa dipakai |
| 🟠 | high — sangat mengganggu user |
| 🟡 | medium — mengganggu tapi ada workaround |
| 🟢 | low — cosmetic / minor |

---

---

# BAGIAN A — BUG CHECKLIST

> cek setiap item. tandai [x] jika tidak ada bug, [!] jika ditemukan bug.
> tulis catatan di bawah item jika ada bug yang ditemukan.

---

## A-01 — AUTENTIKASI & SESI

- [ ] 🔴 login dengan email + password yang benar berhasil masuk ke dashboard
- [ ] 🔴 login dengan password salah menampilkan pesan error, tidak redirect
- [ ] 🔴 access token expired (>8 jam) otomatis redirect ke `/login`
- [ ] 🔴 refresh token bekerja — token baru di-issue tanpa harus login ulang
- [ ] 🔴 logout membersihkan token dari zustand store dan local storage
- [ ] 🟠 setelah logout, tekan tombol back browser tidak bisa kembali ke halaman protected
- [ ] 🟠 akses URL protected langsung (tanpa login) redirect ke `/login`
- [ ] 🟡 halaman login menampilkan spinner/loading saat proses login
- [ ] 🟡 tombol "Login" disabled saat sedang proses, mencegah double submit
- [ ] 🟢 field password punya toggle show/hide

---

## A-02 — TOPBAR & NAVIGASI GLOBAL

- [x] 🟠 bell notifikasi menampilkan badge angka jumlah belum dibaca
- [x] 🟠 klik bell membuka popup notifikasi terbaru
- [x] 🟠 popup notifikasi: klik item redirect ke halaman terkait
- [x] 🟠 tombol "Tambah Cepat" membuka dropdown dengan semua pilihan
- [x] 🟡 setiap item di dropdown "Tambah Cepat" membuka form yang benar
- [x] 🟡 dropdown profil menampilkan nama + role user yang login
- [x] 🟡 menu profil: link "Profil Saya" redirect ke `/profile`
- [x] 🟡 menu profil: tombol "Logout" berfungsi
- [x] 🟡 search global (Ctrl+K) membuka command palette
- [x] 🟡 search global: hasil pencarian customer/lead/quotation/deal muncul
- [x] 🟢 sidebar collapse/expand berfungsi via tombol hamburger
- [x] 🟢 menu aktif di sidebar highlight sesuai halaman yang dibuka

---

## A-03 — DASHBOARD

- [x] 🔴 halaman dashboard load dan menampilkan data (tidak blank / error)
- [x] 🟠 5 stat cards atas menampilkan angka yang benar
- [x] 🟠 stat cards menampilkan persentase perubahan dari bulan lalu
- [x] 🟠 grafik revenue (line chart) render dengan data bulanan
- [x] 🟠 pipeline funnel menampilkan jumlah deal per stage
- [x] 🟠 filter date range di atas mengubah semua data dashboard
- [x] 🟠 filter dropdown "Semua Sales" mengubah data sesuai sales dipilih
- [x] 🟡 tombol "Refresh Data" memuat ulang data terbaru
- [x] 🟡 section "Aktivitas Terbaru" menampilkan 5–10 aktivitas terbaru
- [x] 🟡 section "Lead Terbaru" menampilkan lead paling baru
- [x] 🟡 section "Tugas Mendatang" menampilkan task yang belum selesai
- [x] 🟡 pipeline overview tabel bawah menampilkan deal per stage
- [x] 🟡 peta sebaran customer render (react-leaflet tidak error)
- [x] 🟡 deals by sales (top 5) menampilkan bar chart horizontal
- [x] 🟡 sidebar kiri: Target Bulan Ini menampilkan progress % yang benar
- [x] 🟢 loading skeleton ditampilkan saat data sedang fetch
- [x] 🟢 tooltip muncul saat hover di titik grafik revenue

---

## A-04 — CRM — CUSTOMERS & LEADS

### tabel & filter
- [ ] 🔴 halaman CRM load dan menampilkan daftar customer + lead
- [ ] 🟠 tab "Customers" hanya menampilkan data customer
- [ ] 🟠 tab "Leads" hanya menampilkan data lead
- [ ] 🟠 tab "Semua" menampilkan customer + lead
- [ ] 🟠 filter status, sales, area, tanggal bekerja dan memfilter tabel
- [ ] 🟠 search by nama/email/telepon memfilter hasil secara real-time
- [ ] 🟡 pagination berfungsi — pindah halaman menampilkan data berbeda
- [ ] 🟡 tombol "Export" menghasilkan file excel/csv yang bisa didownload
- [ ] 🟡 tombol "Import" membuka popup import dan berhasil upload file template
- [ ] 🟢 column toggle menyembunyikan/menampilkan kolom sesuai pilihan

### tambah data
- [ ] 🔴 tombol "Tambah Baru" → "Customer Baru" membuka form customer
- [ ] 🔴 form customer: validasi field wajib (nama perusahaan, tipe, email, telepon, area, sales)
- [ ] 🔴 simpan customer baru berhasil dan data muncul di tabel
- [ ] 🟠 tombol "Tambah Baru" → "Lead Baru" membuka form lead
- [ ] 🟠 form lead: validasi field wajib (nama, telepon, area, sales, status)
- [ ] 🟠 simpan lead baru berhasil dan muncul di tabel

### detail panel
- [ ] 🟠 klik baris customer membuka detail panel di kanan
- [ ] 🟠 tab "Informasi" menampilkan data lengkap customer
- [ ] 🟠 tab "Layanan Aktif" menampilkan layanan yang sedang aktif
- [ ] 🟠 tab "Riwayat" menampilkan history interaksi
- [ ] 🟠 tab "Aktivitas" menampilkan activity log terkait customer
- [ ] 🟠 tab "Dokumen" menampilkan file terlampir
- [ ] 🟡 tombol "Aksi" dropdown di detail panel menampilkan semua opsi
- [ ] 🟡 opsi "Edit" membuka form edit dengan data yang sudah terisi
- [ ] 🟡 opsi "Duplikat" membuat salinan customer/lead
- [ ] 🟡 opsi "Hapus" memunculkan konfirmasi hapus
- [ ] 🟡 konfirmasi hapus: checkbox konfirmasi wajib dicentang sebelum tombol hapus aktif
- [ ] 🟡 setelah hapus, data hilang dari tabel tanpa perlu refresh

---

## A-05 — PIPELINE

### board view
- [ ] 🔴 halaman Pipeline load menampilkan kanban board 5 kolom
- [ ] 🔴 setiap kolom menampilkan jumlah deal dan total nilai
- [ ] 🟠 drag & drop deal antar kolom berfungsi
- [ ] 🟠 setelah drag & drop, stage deal berubah di database (cek di tabel view)
- [ ] 🟠 toggle Board/Table berfungsi — tampilan berubah
- [ ] 🟡 tombol "+" di header kolom membuka form tambah deal di stage tersebut
- [ ] 🟡 klik card deal membuka popup quick view detail

### popup & form
- [ ] 🟠 tombol "Tambah Deal" (header) membuka dropdown pilihan cara tambah
- [ ] 🟠 popup "Tambah Deal Baru": validasi field wajib (nama deal, customer, produk, nilai, stage)
- [ ] 🟠 popup "Dari Lead": list lead muncul dan bisa dipilih
- [ ] 🟠 popup "Dari Quotation": list quotation approved muncul
- [ ] 🟡 popup "Ubah Tahap" (move stage): dropdown stage baru berfungsi
- [ ] 🟡 popup "Ubah Probabilitas": slider 0–100% berfungsi dan tersimpan
- [ ] 🟡 popup detail deal: tab Informasi, Aktivitas, Catatan, Dokumen, Riwayat berfungsi
- [ ] 🟡 popup "Duplikasi Deal": checkbox pilihan data yang disalin berfungsi
- [ ] 🟡 popup "Import Deal": upload file xlsx/csv berhasil dan data masuk ke pipeline

### filter & statistik
- [ ] 🟠 filter pipeline: status, sales, area, nilai deal, tanggal berfungsi
- [ ] 🟡 sidebar kiri "Pipeline Summary" menampilkan total deal dan nilai per stage
- [ ] 🟡 "Lihat Detail Laporan" di sidebar membuka popup laporan pipeline

---

## A-06 — QUOTATION

### tabel
- [ ] 🔴 halaman Quotation load dan menampilkan daftar
- [ ] 🟠 tab status (Semua, Draft, Sent, Approved, Rejected, Expired) memfilter tabel
- [ ] 🟠 filter sales, area, tanggal, nilai berfungsi
- [ ] 🟡 search nomor quotation / customer berfungsi

### tambah & edit
- [ ] 🔴 tombol "Buat Quotation" membuka dropdown pilihan cara buat
- [ ] 🔴 popup "Buat Manual": form terisi lengkap dan berhasil disimpan
- [ ] 🔴 item quotation: tombol "+ Tambah Item" menambah baris baru
- [ ] 🔴 kalkulasi otomatis: subtotal, diskon, PPN 11%, total terhitung benar
- [ ] 🟠 "Dari Template": pilih template → form terisi data template
- [ ] 🟠 "Duplikat Quotation": data quotation lama tersalin ke draft baru
- [ ] 🟠 edit quotation yang sudah "Sent" tidak bisa dilakukan (status readonly)
- [ ] 🟡 validasi: tidak bisa simpan jika tidak ada minimal 1 item

### aksi per quotation
- [ ] 🔴 tombol "Download PDF" menghasilkan file PDF yang bisa didownload
- [ ] 🔴 preview PDF di popup menampilkan dokumen dengan benar
- [ ] 🟠 popup "Kirim Email": form email (kepada, subjek, pesan) berfungsi dan email terkirim
- [ ] 🟠 setelah kirim email, status quotation berubah dari "Draft" ke "Sent"
- [ ] 🟠 popup "Ubah Status": dropdown status muncul dan perubahan tersimpan
- [ ] 🟠 tombol "Buat Invoice dari Quotation": popup muncul dan invoice berhasil dibuat
- [ ] 🟡 menu "Hapus" di row action menampilkan konfirmasi sebelum hapus

### detail panel
- [ ] 🟠 klik "Detail" di baris tabel membuka side panel detail quotation
- [ ] 🟠 tab "Detail": informasi customer dan ringkasan harga tampil benar
- [ ] 🟠 tab "Item": daftar produk/layanan + harga tampil benar
- [ ] 🟡 tab "Syarat & Ketentuan": konten tampil
- [ ] 🟡 tab "Riwayat": timeline status perubahan tampil
- [ ] 🟡 tab "Catatan": catatan internal tampil
- [ ] 🟡 tab "Lampiran": file lampiran bisa diunduh

---

## A-07 — PRESENTATION

- [ ] 🔴 halaman Presentation load dan menampilkan daftar
- [ ] 🟠 tab status (Semua, Dipresentasikan, Draft, Template, Arsip) memfilter
- [ ] 🟠 tombol "Buat Presentasi" dropdown: Manual, Dari Template, Dari Quotation berfungsi
- [ ] 🟠 popup "Buat dari Template": grid template tampil, tombol "Pilih" berfungsi
- [ ] 🟠 detail kanan: preview slide pertama tampil
- [ ] 🟡 outline presentation (daftar slide) tampil di panel detail
- [ ] 🟡 navigasi slide (panah prev/next) di preview berfungsi
- [ ] 🟡 tombol "Download PDF" menghasilkan PDF presentasi
- [ ] 🟡 tombol "Presentasikan" mengubah status ke "Dipresentasikan"

---

## A-08 — TIMELINE (INSTALASI)

- [ ] 🔴 halaman Timeline load menampilkan gantt chart
- [ ] 🟠 gantt chart: setiap baris customer menampilkan bar tahapan yang benar
- [ ] 🟠 warna bar berbeda per tahapan (survey, desain, instalasi, aktivasi, selesai)
- [ ] 🟠 toggle Hari/Minggu/Bulan mengubah skala sumbu X gantt
- [ ] 🟠 tombol "Today" scroll ke posisi tanggal hari ini
- [ ] 🟠 navigasi prev/next menggeser periode timeline
- [ ] 🟠 klik bar gantt membuka detail panel instalasi di kanan
- [ ] 🟡 tab view (Table View) menampilkan data instalasi dalam bentuk tabel
- [ ] 🟡 stat cards atas (Total, Proses, Selesai, Tertunda) menampilkan angka benar
- [ ] 🟡 filter status, sales, area, tanggal berfungsi
- [ ] 🟡 tombol "Buat Instalasi Baru": dropdown pilihan cara buat berfungsi
- [ ] 🟡 sidebar kiri: Progress Instalasi Bulan Ini (donut chart + %) benar
- [ ] 🟡 keterangan status di bawah gantt menampilkan semua stage dan warnanya
- [ ] 🟢 search customer di kolom kiri gantt memfilter baris

### detail panel instalasi
- [ ] 🟠 tab "Detail": nomor instalasi, sales, paket, alamat, tanggal tampil benar
- [ ] 🟠 "Progress Tahapan": daftar tahap dengan status (Selesai/Proses/Menunggu) benar
- [ ] 🟡 tab "Aktivitas", "Dokumen", "Catatan" berfungsi
- [ ] 🟡 tombol "Edit" membuka form edit instalasi
- [ ] 🟡 tombol "Lihat Detail" redirect ke halaman detail instalasi

---

## A-09 — TROUBLE TICKET

- [ ] 🔴 halaman Trouble Ticket load dan menampilkan daftar tiket
- [ ] 🟠 tab status (Semua, Open, In Progress, Resolved, Closed) memfilter
- [ ] 🟠 kolom SLA menampilkan countdown / keterangan lewat jika sudah melewati target
- [ ] 🟠 badge SLA merah jika sudah lewat, hijau jika masih dalam waktu
- [ ] 🟠 filter status, sales, area, tanggal berfungsi
- [ ] 🟡 tombol "Buat Trouble Ticket": form muncul dan berhasil disimpan
- [ ] 🟡 kolom Prioritas: badge Tinggi/Sedang/Rendah warna berbeda

### detail panel tiket
- [ ] 🔴 klik tiket membuka detail panel kanan
- [ ] 🟠 Informasi SLA: lingkaran timer + durasi tersisa tampil dan update
- [ ] 🟠 "Quick Action": tombol "Update Status" berfungsi
- [ ] 🟡 tombol "Tambah Catatan" berhasil menyimpan catatan
- [ ] 🟡 tombol "Upload Lampiran" berhasil upload file
- [ ] 🟡 tombol "Close Ticket" mengubah status ke "Closed"
- [ ] 🟡 tab SLA: informasi target resolusi, durasi berlaku, durasi tersisa tampil
- [ ] 🟡 progress bar pengerjaan (%) tampil dan benar

---

## A-10 — INVOICES

- [ ] 🔴 halaman Invoices load menampilkan daftar invoice
- [ ] 🟠 tab status (Semua, Draft, Unpaid, Partial, Paid, Overdue, Cancelled) memfilter
- [ ] 🟠 kolom "Sisa Tagihan" menampilkan nilai merah jika ada tunggakan
- [ ] 🟠 klik baris invoice membuka side panel detail kanan
- [ ] 🟡 sidebar kiri: Ringkasan Invoice Bulan Ini menampilkan angka benar
- [ ] 🟡 tombol "Buat Invoice" membuka form + berfungsi simpan

### detail panel invoice
- [ ] 🟠 tab "Detail": informasi invoice + ringkasan pembayaran tampil benar
- [ ] 🟠 tab "Pembayaran": riwayat pembayaran dengan metode + nominal tampil
- [ ] 🟠 status "LUNAS" tampil jelas jika invoice sudah dibayar penuh
- [ ] 🟡 tombol "Download PDF" menghasilkan PDF invoice
- [ ] 🟡 tombol "Kirim Invoice" membuka form email + terkirim

---

## A-11 — PRODUCTS & SERVICES

- [ ] 🔴 halaman Products load menampilkan grid produk
- [ ] 🟠 toggle Grid/Tabel berfungsi
- [ ] 🟠 filter Teknologi, Status, Area memfilter produk
- [ ] 🟠 search nama paket memfilter hasil
- [ ] 🟡 badge label (BEST SELLER, PROMO, NEW) tampil sesuai data produk
- [ ] 🟡 produk nonaktif tampil dengan tombol "Buat Quotation" disabled / abu-abu
- [ ] 🟡 tombol "Detail" membuka halaman / panel detail produk
- [ ] 🟡 tombol "Buat Quotation" di kartu produk membuka form quotation dengan produk sudah terisi
- [ ] 🟡 pagination grid berfungsi
- [ ] 🟢 stat cards atas (Total Produk, Aktif, Nonaktif) menampilkan angka benar

---

## A-12 — REPORTS & ANALYTICS

### overview
- [ ] 🔴 halaman Reports Overview load dan menampilkan data
- [ ] 🟠 5 stat cards atas menampilkan angka benar
- [ ] 🟠 section "Product Performance": kartu per produk dengan data terjual + revenue
- [ ] 🟠 chart "Top 5 Produk Terlaris" render dengan data benar
- [ ] 🟠 chart "Revenue by Product" (horizontal bar) render benar
- [ ] 🟡 "Distribusi Produk Berdasarkan Teknologi" donut chart render benar
- [ ] 🟡 tabel "Ringkasan Performa Produk" tampil lengkap dengan kolom Trend
- [ ] 🟡 filter date range + dropdown sales mengubah semua data

### sales performance
- [ ] 🟠 halaman "Sales Performance" load tanpa error
- [ ] 🟠 chart "Sales Over Time" (line chart vs target) render benar
- [ ] 🟠 tabel "Sales by Salesperson (Top 5)" dengan kolom deals + conversion rate
- [ ] 🟡 funnel "Sales Funnel" + conversion rate per stage tampil benar
- [ ] 🟡 "Sales by Area" donut chart render
- [ ] 🟡 "Sales Target Achievement" gauge tampil dengan persentase benar
- [ ] 🟡 tabel detail semua sales tampil di bawah

### pipeline report
- [ ] 🟠 halaman "Pipeline Report" load tanpa error
- [ ] 🟠 pipeline overview: 6 stage (termasuk Trouble Ticket) tampil dengan nilai
- [ ] 🟠 chart "Pipeline by Stage" donut render
- [ ] 🟡 chart "Pipeline Trend" line render
- [ ] 🟡 chart "Pipeline by Salesperson" bar horizontal render
- [ ] 🟡 tabel "Top Pipeline Deals" tampil 5 deal teratas

### ekspor laporan
- [ ] 🟠 tombol "Export Report" di semua halaman report berfungsi menghasilkan file

---

## A-13 — NOTIFICATIONS

- [ ] 🔴 halaman Notifications load menampilkan daftar notifikasi
- [ ] 🟠 tab (Semua, Belum Dibaca, Penting, Sistem, Lainnya) memfilter
- [ ] 🟠 notifikasi belum dibaca punya dot biru
- [ ] 🟠 tombol "Tandai Semua Dibaca" menghapus semua dot + update counter bell topbar
- [ ] 🟡 klik item notifikasi menandai sebagai dibaca
- [ ] 🟡 klik item notifikasi redirect ke halaman terkait (misal: klik notif quotation → ke quotation detail)
- [ ] 🟡 sidebar kanan: Ringkasan Notifikasi menampilkan angka per kategori
- [ ] 🟡 sidebar kanan: Pengaturan Notifikasi — toggle email/browser/suara/harian tersimpan

---

## A-14 — ACTIVITY LOGS

- [ ] 🔴 halaman Activity Logs load menampilkan log aktivitas
- [ ] 🟠 tabel menampilkan: waktu, pengguna, modul, aksi (badge), deskripsi, IP address
- [ ] 🟠 filter pengguna, modul, aksi, tanggal, search berfungsi
- [ ] 🟡 stat cards atas (Total Aktivitas, Pengguna Aktif, Aktivitas Hari Ini, dll) benar
- [ ] 🟡 donut chart "Aktivitas Berdasarkan Modul" render benar
- [ ] 🟡 bar chart "Aktivitas Berdasarkan Aksi" render benar
- [ ] 🟡 section "Aktivitas Terbaru" di sidebar kanan tampil realtime
- [ ] 🟢 tombol "Export" menghasilkan file log

---

## A-15 — PROFIL & PENGATURAN

- [ ] 🟠 halaman "Profil Saya" menampilkan foto, nama, email, role, info akun
- [ ] 🟠 tombol "Edit Profil" membuka form edit dan berhasil simpan
- [ ] 🟡 statistik pengguna (deals, tasks, login) tampil benar
- [ ] 🟡 "Pengaturan Preferensi": toggle bahasa, zona waktu, notifikasi berfungsi
- [ ] 🟡 upload foto profil berfungsi dan foto berubah di topbar
- [ ] 🟢 link "Bantuan & Support" membuka halaman bantuan

---

## A-16 — KEAMANAN & PERMISSION

- [ ] 🔴 user role "sales" tidak bisa mengakses halaman Settings
- [ ] 🔴 user role "sales" tidak bisa membuat/mengedit invoice
- [ ] 🔴 user role "teknisi" tidak bisa membuat customer/lead
- [ ] 🔴 user role "teknisi" tidak bisa membuat quotation/deal
- [ ] 🟠 user role "sales" di laporan hanya melihat data miliknya sendiri
- [ ] 🟠 endpoint mutasi tanpa token mengembalikan 401 UNAUTHORIZED
- [ ] 🟠 endpoint admin dengan token sales mengembalikan 403 FORBIDDEN
- [ ] 🟡 rate limit login: lebih dari 10 request/15 menit mendapat 429 Too Many Requests
- [ ] 🟡 rate limit global: lebih dari 100 request/15 menit mendapat 429

---

## A-17 — API & DATABASE

- [ ] 🔴 semua endpoint GET /api/[resource] mengembalikan format `{ success, data, meta }`
- [ ] 🔴 endpoint list mengembalikan `meta.total`, `meta.page`, `meta.limit`, `meta.totalPages`
- [ ] 🔴 input tidak valid mengembalikan 400 VALIDATION_ERROR dengan `details` per field
- [ ] 🔴 data tidak ditemukan mengembalikan 404 NOT_FOUND
- [ ] 🟠 nomor dokumen auto-generate mengikuti format yang benar (CUS-, Q-, TT-, dll)
- [ ] 🟠 soft delete: data yang dihapus tidak muncul di list (ada `deleted_at`)
- [ ] 🟠 activity log tercatat setiap operasi POST/PUT/PATCH/DELETE yang berhasil
- [ ] 🟡 PDF generate tidak timeout untuk quotation dengan banyak item
- [ ] 🟡 export excel tidak error untuk list dengan ratusan baris
- [ ] 🟡 file upload: reject file selain format yang didukung dengan pesan error jelas

---

## A-18 — STATUS FLOW (TRANSISI YANG HARUS DI-REJECT)

- [ ] 🔴 quotation "Approved" tidak bisa di-ubah kembali ke "Draft"
- [ ] 🔴 quotation "Rejected" tidak bisa di-ubah ke "Sent"
- [ ] 🔴 invoice "Paid" tidak bisa di-ubah ke "Unpaid"
- [ ] 🟠 deal "Won/Lost" tidak bisa dipindahkan ke stage lain via drag & drop
- [ ] 🟠 trouble ticket "Closed" tidak bisa di-ubah ke "Open" tanpa role yang tepat
- [ ] 🟠 lead yang sudah "Converted" tidak bisa di-ubah status-nya
- [ ] 🟡 instalasi "Done" tidak bisa dikembalikan ke "On-Progress"

---

## A-19 — UI & FORMAT

- [ ] 🟠 semua angka rupiah menggunakan format "Rp 850.000.000" (titik sebagai pemisah ribuan)
- [ ] 🟠 semua tanggal menggunakan format "20 Mei 2025" atau "20 Mei 2025, 14:30"
- [ ] 🟠 semua badge status menggunakan warna yang sesuai tabel di frontend.md
- [ ] 🟡 loading skeleton tampil di setiap section saat data sedang di-fetch
- [ ] 🟡 empty state tampil (bukan halaman kosong) saat tidak ada data
- [ ] 🟡 error state tampil dengan pesan yang jelas jika fetch gagal
- [ ] 🟡 semua form menampilkan pesan error inline per field yang tidak valid
- [ ] 🟢 semua ikon dari lucide-react (tidak ada ikon dari library lain)
- [ ] 🟢 tidak ada warna arbitrary (#hex) di elemen UI

---

---

# BAGIAN B — TEST TASK

> test skenario end-to-end yang harus dijalankan manual.
> tandai [x] jika lulus, [!] jika gagal + tulis catatan.

---

## B-01 — SKENARIO: SIKLUS PENJUALAN PENUH

> test alur dari lead baru sampai invoice terbayar.

- [ ] B-01-1 tambah lead baru → pastikan muncul di CRM tab Leads dengan status "New"
- [ ] B-01-2 ubah status lead → "Qualified" → pastikan berubah
- [ ] B-01-3 buat deal dari lead → deal muncul di Pipeline stage "Prospek"
- [ ] B-01-4 pindahkan deal ke "Negosiasi" via drag & drop → stage berubah
- [ ] B-01-5 buat quotation dari deal → Q-[tahun]-[xxxx] ter-generate otomatis
- [ ] B-01-6 tambah 3 item ke quotation → subtotal, PPN, total terhitung benar
- [ ] B-01-7 kirim quotation via email → status berubah ke "Sent"
- [ ] B-01-8 ubah status quotation ke "Approved" → deal otomatis pindah ke "Closing"
- [ ] B-01-9 buat invoice dari quotation approved → INV-[tahun]-[xxxx] ter-generate
- [ ] B-01-10 catat pembayaran invoice → status berubah ke "Paid" atau "Partial"
- [ ] B-01-11 cek activity log → semua aksi di atas tercatat dengan benar

---

## B-02 — SKENARIO: INSTALASI SETELAH DEAL WON

- [ ] B-02-1 ubah deal ke stage "Instalasi" (Won) → status deal = "Won"
- [ ] B-02-2 buat instalasi baru dari deal → INST-[tahun]-[xxxx] ter-generate
- [ ] B-02-3 instalasi muncul di halaman Timeline dengan bar "Survey"
- [ ] B-02-4 update tahapan ke "Desain & Penawaran" → bar gantt bergeser
- [ ] B-02-5 update ke "Instalasi" → bar berubah warna
- [ ] B-02-6 update ke "Aktivasi" → progress 100%
- [ ] B-02-7 update ke "Selesai" → status instalasi = Done, bar gantt = full

---

## B-03 — SKENARIO: TROUBLE TICKET SLA

- [ ] B-03-1 buat trouble ticket dengan prioritas "Tinggi" → TT-[tahun]-[xxxx] ter-generate
- [ ] B-03-2 SLA timer mulai berjalan (target = sesuai kategori prioritas)
- [ ] B-03-3 update status ke "In Progress" → badge berubah
- [ ] B-03-4 tambah catatan ke tiket → catatan muncul di tab Catatan
- [ ] B-03-5 timer SLA menunjukkan waktu tersisa yang benar (berkurang)
- [ ] B-03-6 resolve tiket → status "Resolved", SLA timer berhenti
- [ ] B-03-7 close tiket → status "Closed", tiket tidak muncul di tab "Open"

---

## B-04 — SKENARIO: ROLE-BASED ACCESS

- [ ] B-04-1 login sebagai sales → menu Reports tidak tampil atau data terbatas
- [ ] B-04-2 login sebagai sales → halaman Invoice tidak bisa diakses
- [ ] B-04-3 login sebagai sales → halaman Settings tidak bisa diakses
- [ ] B-04-4 login sebagai sales → hanya melihat data miliknya di tabel CRM
- [ ] B-04-5 login sebagai teknisi → tidak bisa buat customer baru (tombol disabled / 403)
- [ ] B-04-6 login sebagai teknisi → bisa update status instalasi
- [ ] B-04-7 login sebagai admin → bisa akses semua menu
- [ ] B-04-8 login sebagai admin → bisa delete customer (sales tidak bisa)

---

## B-05 — SKENARIO: GENERATE DOKUMEN

- [ ] B-05-1 download PDF quotation → file terbuka dengan layout yang benar
- [ ] B-05-2 PDF quotation berisi: logo, nomor, tanggal, customer, item, subtotal, PPN, total
- [ ] B-05-3 download PDF invoice → file terbuka dengan layout yang benar
- [ ] B-05-4 download PDF presentasi → semua slide terrender dengan benar
- [ ] B-05-5 export excel dari tabel quotation → file xlsx bisa dibuka di excel
- [ ] B-05-6 export excel dari tabel invoice → semua kolom tersedia di file
- [ ] B-05-7 kirim email quotation → email diterima dengan PDF terlampir

---

## B-06 — SKENARIO: FILTER & PAGINATION

- [ ] B-06-1 filter tabel CRM by sales → hanya tampil data sales tersebut
- [ ] B-06-2 filter tabel CRM by area → hanya tampil data area tersebut
- [ ] B-06-3 kombinasi filter sales + area + tanggal → hasil yang benar
- [ ] B-06-4 reset filter → semua data tampil kembali
- [ ] B-06-5 pindah ke halaman 2 pagination → data beda dengan halaman 1
- [ ] B-06-6 ubah limit ke 25/halaman → 25 baris tampil
- [ ] B-06-7 search + filter aktif + pindah halaman → filter tetap aktif

---

## B-07 — SKENARIO: IMPORT DATA

- [ ] B-07-1 download template import customer → file template bisa didownload
- [ ] B-07-2 isi template dengan data valid → upload berhasil, data masuk ke CRM
- [ ] B-07-3 upload file dengan format salah (bukan .xlsx/.csv) → error message jelas
- [ ] B-07-4 upload file dengan data invalid (email salah format) → baris error ditampilkan
- [ ] B-07-5 import deal dari file → deal muncul di pipeline stage yang benar

---

## B-08 — SKENARIO: NOTIFIKASI

- [ ] B-08-1 buat lead baru → notifikasi "Lead baru ditambahkan" muncul di bell topbar
- [ ] B-08-2 deal pindah stage → notifikasi muncul
- [ ] B-08-3 invoice jatuh tempo hari ini → notifikasi "Invoice sudah jatuh tempo" muncul
- [ ] B-08-4 trouble ticket prioritas tinggi dibuat → notifikasi "Penting" muncul
- [ ] B-08-5 klik "Tandai Semua Dibaca" → counter bell kembali ke 0
- [ ] B-08-6 klik notifikasi individual → redirect ke halaman yang benar

---

## B-09 — SKENARIO: EDGE CASE & ERROR HANDLING

- [ ] B-09-1 buat quotation tanpa item → tombol Simpan disabled atau error jelas
- [ ] B-09-2 buat deal dengan nilai negatif → error validasi muncul
- [ ] B-09-3 hapus customer yang punya deal aktif → peringatan muncul atau ditolak
- [ ] B-09-4 akses URL yang tidak ada (/halaman-tidak-ada) → halaman 404 tampil
- [ ] B-09-5 server API down → halaman menampilkan error state yang friendly, bukan blank
- [ ] B-09-6 token expired saat sedang mengisi form panjang → redirect login tanpa kehilangan data (atau ada warning)
- [ ] B-09-7 upload file > 5MB → pesan error ukuran file muncul
- [ ] B-09-8 dua user edit data sama bersamaan → tidak ada data yang korup (last write wins atau conflict warning)

---

*bug-test.md — mark isp sales & management system*
*total: A-19 bagian bug checklist + B-09 skenario test*