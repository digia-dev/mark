---
description: WF-04 — perubahan skema database digunakan saat perlu menambah tabel baru, kolom baru, atau relasi baru.
---

aturan wajib sebelum mulai
⚠️  TIDAK BOLEH edit file migrasi yang sudah di-commit
⚠️  TIDAK BOLEH hapus kolom yang masih dipakai
⚠️  SETIAP perubahan harus melalui migrasi baru
alur perubahan
[ ] 1. update schema.prisma
       - nama model: PascalCase
       - nama field: camelCase di prisma, @map("snake_case") di database
       - wajib ada: id, createdAt (@map("created_at")), updatedAt (@map("updated_at"))
       - soft delete: tambah deletedAt (@map("deleted_at")) yang nullable

[ ] 2. jalankan migrasi
       npx prisma migrate dev --name [nama-deskriptif]
       contoh nama: add-payment-table, add-status-field-to-lead, add-area-to-customer

[ ] 3. update interface repository di domain
       - tambahkan method baru yang dibutuhkan
       - src/domain/repositories/[nama]-repository.js

[ ] 4. update prisma repository di infrastructure
       - implementasikan method baru
       - src/infrastructure/repositories/prisma-[nama]-repository.js

[ ] 5. update use-case yang terpengaruh

[ ] 6. update seed.js jika ada data awal yang perlu ditambah

[ ] 7. verifikasi: jalankan npx prisma studio dan cek tabel/relasi