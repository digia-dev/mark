---
description: WF-01 — membuat fitur baru digunakan saat ada requirement fitur baru yang perlu diimplementasikan dari nol.
---

tahap 1 — perencanaan
[ ] baca requirement dan identifikasi modul yang terlibat
[ ] cek /docs/design.md → apakah ada spec ui/ux untuk fitur ini?
[ ] cek /docs/tech-arch.md → identifikasi lapisan yang perlu dibuat/diubah
[ ] cek /docs/database.md → apakah butuh perubahan skema?
[ ] buat daftar file yang perlu dibuat atau diubah:
    - domain: entity baru? interface repository baru?
    - use-case: berapa use-case yang dibutuhkan?
    - interface: controller baru? endpoint baru? dto baru?
    - infrastructure: prisma repository? service baru?
    - frontend: page? komponen? hook? service?
[ ] estimasi waktu pengerjaan
[ ] komunikasikan ke tim jika menyentuh modul yang dikerjakan orang lain
tahap 2 — backend (urutan wajib: dalam ke luar)
[ ] 1. domain — buat entity jika belum ada
       └─ src/domain/entities/[nama-entity].js
[ ] 2. domain — buat interface repository
       └─ src/domain/repositories/[nama-entity]-repository.js
[ ] 3. use-case — buat satu file per aksi (create, update, list, delete, dll)
       └─ src/use-cases/[modul]/[aksi]-[entitas]-use-case.js
[ ] 4. interface — buat dto validasi (zod)
       └─ src/interfaces/dtos/[nama]-dto.js
[ ] 5. interface — buat controller method
       └─ src/interfaces/controllers/[nama]-controller.js
[ ] 6. interface — daftarkan route + middleware
       └─ src/interfaces/routes/[nama]-routes.js
[ ] 7. infrastructure — implementasi prisma repository
       └─ src/infrastructure/repositories/prisma-[nama]-repository.js
[ ] 8. wire semua dependency di composition root
       └─ src/main.js
tahap 3 — database (jika ada perubahan skema)
[ ] update schema.prisma — tambah model atau field baru
[ ] jalankan: npx prisma migrate dev --name [nama-deskriptif]
[ ] update seed.js jika perlu data awal
[ ] verifikasi migrasi berhasil di database
tahap 4 — frontend
[ ] 1. buat service (axios call)
       └─ src/features/[modul]/services/[nama]-service.js
[ ] 2. buat custom hook (react-query)
       └─ src/features/[modul]/hooks/use-[nama].js
[ ] 3. buat komponen ui
       └─ src/features/[modul]/components/[NamaKomponen].jsx
[ ] 4. buat atau update page
       └─ src/pages/[nama-page].jsx
[ ] 5. daftarkan route di react-router jika page baru
tahap 5 — verifikasi
[ ] test endpoint di postman / thunder client
[ ] test alur di browser end-to-end
[ ] cek loading state, error state, empty state
[ ] cek responsivitas (desktop, tablet, mobile)
[ ] cek permission sesuai role (super-admin, admin, sales, teknisi)
[ ] pastikan activity log tercatat untuk operasi create/update/delete