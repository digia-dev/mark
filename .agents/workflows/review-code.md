---
description: WF-07 — review & merge kode digunakan saat pull request siap untuk di-review sebelum masuk ke branch utama. checklist reviewer
---

[ ] kode sudah mengikuti konvensi penamaan (rules.md)
[ ] tidak ada pelanggaran clean architecture
[ ] tidak ada hardcoded credential atau api key
[ ] response api mengikuti format standar
[ ] permission sudah di-enforce via role-middleware
[ ] tidak ada console.log yang tertinggal
[ ] komponen ui menggunakan palet warna yang benar
[ ] tidak ada warna arbitrary atau ikon dari library asing
[ ] loading, error, dan empty state sudah ditangani
[ ] tidak ada pelanggaran status flow (rules.md bagian 9)
checklist sebelum merge
[ ] branch sudah rebase ke branch terbaru
[ ] tidak ada conflict
[ ] minimal 1 reviewer sudah approve
[ ] semua comment reviewer sudah ditanggapi
[ ] tidak ada file migrasi lama yang diedit