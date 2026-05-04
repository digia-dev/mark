---
description: WF-03 — membuat komponen ui baru digunakan saat perlu membuat komponen visual baru, baik shared maupun feature-specific.
---

tahap 1 — tentukan kategori komponen
shared component   → dipakai lintas 2+ fitur → masuk shared/components/
feature component  → hanya untuk 1 fitur    → masuk features/[modul]/components/
tahap 2 — desain komponen
[ ] cek design.md → apakah ada spec untuk komponen ini?
[ ] identifikasi: warna apa yang dipakai? (harus dari palet design.md)
[ ] identifikasi: apakah ada badge status? (pakai spec badge dari design.md)
[ ] identifikasi: apakah ada tabel? (wajib ada pagination, filter, export, column toggle)
[ ] identifikasi: apakah ada form? (pakai react-hook-form + zod)
[ ] identifikasi: apakah ada chart? (pakai recharts)
[ ] identifikasi: apakah ada peta? (pakai leaflet-js)
tahap 3 — implementasi
[ ] buat file: [NamaKomponen].jsx (PascalCase)
[ ] gunakan shadcn-ui sebagai basis jika ada padanannya
[ ] gunakan ikon dari lucide-react saja
[ ] pisahkan logika data ke hook — komponen hanya render
[ ] tambahkan loading state (skeleton)
[ ] tambahkan error state (tampilkan pesan yang ramah)
[ ] tambahkan empty state (jika data kosong)
[ ] pastikan responsif: desktop ≥1280px, tablet 768-1279px, mobile <768px
tahap 4 — integrasi
[ ] import dan gunakan di page atau parent component
[ ] test semua state: loading, error, data, empty
[ ] test interaksi: click, hover, form submit, modal open/close
[ ] test di viewport berbeda
