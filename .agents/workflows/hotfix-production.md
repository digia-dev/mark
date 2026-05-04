---
description: WF-10 — hotfix production digunakan saat ada bug kritis yang harus diperbaiki secepatnya di production.
---

definisi hotfix
bug yang memenuhi salah satu kriteria:

sistem tidak bisa diakses (down)
data corrupt atau hilang
celah keamanan aktif
proses utama tidak bisa dijalankan (tidak bisa login, tidak bisa buat invoice, dll)

alur hotfix
[ ] 1. buat branch dari production: hotfix/[deskripsi-singkat]
[ ] 2. perbaiki dengan scope seminimal mungkin — hanya fix bug, tidak ada penambahan fitur
[ ] 3. test di lokal bahwa bug sudah tidak muncul
[ ] 4. push ke staging dan verifikasi cepat
[ ] 5. merge ke production tanpa menunggu siklus sprint normal
[ ] 6. merge kembali ke branch develop agar hotfix tidak hilang di sprint berikutnya
[ ] 7. catat: apa bugnya, apa penyebabnya, bagaimana solusinya, bagaimana mencegahnya
[ ] 8. buat tiket untuk mengerjakan solusi jangka panjang jika hotfix hanya solusi sementara

quick reference — urutan implementasi fitur
BACKEND (dalam ke luar):
domain entity → interface repository → use-case → dto → controller → route → prisma repository → wire di main.js

FRONTEND (dalam ke luar):
service (axios) → custom hook (react-query) → komponen ui → page → react-router

DATABASE (saat ada perubahan):
update schema.prisma → migrate dev → update domain interface → update prisma repository → update use-case