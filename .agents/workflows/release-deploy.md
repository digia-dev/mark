---
description: WF-08 — release & deployment digunakan saat kode siap dipush ke staging atau production.
---

pre-release checklist
[ ] semua fitur yang dijanjikan di sprint sudah selesai dan di-merge
[ ] tidak ada bug kritis yang diketahui
[ ] .env sudah dikonfigurasi sesuai environment target
[ ] migrasi database sudah siap dijalankan
[ ] seed data sudah diverifikasi (jika ada yang baru)
alur deployment
[ ] 1. push ke branch staging
[ ] 2. jalankan migrasi di staging: npx prisma migrate deploy
[ ] 3. test manual di staging:
       - test login semua role (super-admin, admin, sales, teknisi)
       - test fitur utama setiap modul
       - cek activity log tercatat
       - cek notifikasi berfungsi
[ ] 4. jika staging oke, push ke production
[ ] 5. jalankan migrasi di production: npx prisma migrate deploy
[ ] 6. monitor error log 30 menit pertama setelah deployment
[ ] 7. siapkan rollback plan jika ada masalah kritis