---
description: WF-05 — membuat endpoint api baru digunakan saat frontend membutuhkan data dari endpoint yang belum ada. alur pembuatan endpoint
---

[ ] 1. tentukan: endpoint untuk modul apa? CRUD atau aksi spesifik?
[ ] 2. tentukan path sesuai konvensi kebab-case:
       GET    /api/[modul]              → list
       POST   /api/[modul]              → create
       GET    /api/[modul]/:id          → detail
       PUT    /api/[modul]/:id          → update penuh
       PATCH  /api/[modul]/:id/[aksi]   → aksi spesifik
       DELETE /api/[modul]/:id          → delete

[ ] 3. buat dto zod untuk validasi input
       src/interfaces/dtos/[nama]-dto.js

[ ] 4. buat use-case (jika belum ada)
       src/use-cases/[modul]/[aksi]-use-case.js

[ ] 5. tambah method di controller
       src/interfaces/controllers/[nama]-controller.js

[ ] 6. daftarkan route dengan middleware yang tepat
       src/interfaces/routes/[nama]-routes.js
       → auth-middleware (wajib)
       → role-middleware (sesuai permission matrix)
       → validate-request (pakai dto yang baru dibuat)

[ ] 7. wire di main.js jika ada class baru

[ ] 8. dokumentasikan di swagger (opsional tapi dianjurkan)

[ ] 9. test dengan postman:
       - test happy path (input valid, semua role yang boleh akses)
       - test error path (input invalid, role tidak punya akses)
       - cek format response sesuai standar