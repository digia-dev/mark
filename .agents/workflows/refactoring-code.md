---
description: WF-06 — refactoring kode digunakan saat kode perlu diperbaiki strukturnya tanpa mengubah perilaku yang terlihat dari luar.
---

kapan perlu refactor?
- ada duplikasi logika di lebih dari 2 tempat
- controller terlalu panjang (> 50 baris per method)
- use-case melakukan lebih dari satu tanggung jawab
- komponen react terlalu besar (> 200 baris)
- ada business logic yang nyasar di lapisan yang salah
- ada import yang melanggar dependency rule
alur refactoring
[ ] 1. pastikan: behavior sebelum dan sesudah harus sama persis
[ ] 2. buat branch baru: refactor/[nama-area]
[ ] 3. identifikasi semua tempat yang terpengaruh
[ ] 4. buat perubahan bertahap, bukan sekaligus
[ ] 5. setelah setiap perubahan: test bahwa behavior masih sama
[ ] 6. jangan campurkan refactor dengan penambahan fitur dalam satu commit
[ ] 7. review dengan sesama developer sebelum merge