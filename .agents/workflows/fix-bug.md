---
description: WF-02 — memperbaiki bug digunakan saat ada error, crash, perilaku tidak sesuai, atau output yang salah.
---

tahap 1 — identifikasi
[ ] catat pesan error lengkap (screenshot / log)
[ ] tentukan: bug di frontend, backend, atau database?
[ ] tentukan: lapisan apa yang bermasalah?
      frontend: component? hook? service?
      backend: controller? use-case? domain? infrastructure?
[ ] reproduksi bug di environment lokal
[ ] tentukan apakah ini pelanggaran clean architecture
      (misal: controller instansiasi repo langsung → pindah ke main.js)
tahap 2 — analisis root cause
[ ] lacak alur data dari frontend → api → use-case → database
[ ] cek apakah ada validasi yang terlewat (zod dto)
[ ] cek apakah status transition sudah sesuai rules.md
[ ] cek apakah permission sudah sesuai role-middleware
[ ] cek response format sudah sesuai standar api
tahap 3 — perbaikan
[ ] buat branch baru: fix/[nama-deskriptif-bug]
[ ] perbaiki di lapisan yang tepat — jangan shortcut arsitektur
[ ] jika perbaikan menyentuh database: buat migrasi baru (tidak edit migrasi lama)
[ ] tambahkan validasi agar bug tidak terulang
[ ] catat: apa penyebabnya dan bagaimana cara mencegahnya
tahap 4 — verifikasi
[ ] test bug asli sudah tidak muncul
[ ] test fitur sekitar tidak rusak (regression test)
[ ] cek di semua role yang relevan
[ ] buat pull request ke branch utama