# database.md — Mark database schema

> dokumen ini mendefinisikan skema database lengkap untuk aplikasi Mark berdasarkan seluruh modul yang terlihat pada tampilan ui, menggunakan mysql 8.x dengan prisma orm.

---

## 1. gambaran umum

```
database: Mark_ISP
engine: mysql 8.x
orm: prisma 5.x
charset: utf8mb4
collation: utf8mb4_unicode_ci
```

### daftar tabel

| tabel | modul | keterangan |
|---|---|---|
| users | auth & settings | pengguna sistem |
| branches | settings | cabang / wilayah |
| customers | crm | pelanggan aktif |
| leads | crm | prospek / calon pelanggan |
| interactions | crm | catatan interaksi customer/lead |
| products | products & services | paket/produk internet |
| deals | pipeline | deal penjualan |
| deal_activities | pipeline | aktivitas per deal |
| quotations | quotation | penawaran harga |
| quotation_items | quotation | item penawaran |
| presentations | presentation | presentasi produk |
| presentation_slides | presentation | slide per presentasi |
| installations | timeline | jadwal instalasi |
| installation_stages | timeline | tahapan per instalasi |
| trouble_tickets | trouble ticket | tiket keluhan pelanggan |
| ticket_notes | trouble ticket | catatan per tiket |
| invoices | invoices | tagihan pelanggan |
| invoice_items | invoices | item tagihan |
| payments | invoices | riwayat pembayaran |
| customer_services | crm + invoices | layanan aktif pelanggan |
| notifications | notifications | notifikasi sistem |
| activity_logs | activity logs | audit trail |
| sales_targets | reports | target penjualan sales |

---

## 2. prisma schema lengkap

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// ============================================================
// users & branches
// ============================================================

model User {
  id            Int       @id @default(autoincrement())
  name          String    @db.VarChar(100)
  email         String    @unique @db.VarChar(150)
  password_hash String    @map("password_hash") @db.VarChar(255)
  role          String    @db.VarChar(30)
  // role: super-admin | admin | sales | teknisi
  branch_id     Int?      @map("branch_id")
  phone         String?   @db.VarChar(20)
  avatar        String?   @db.VarChar(255)
  department    String?   @db.VarChar(100)
  address       String?   @db.VarChar(255)
  is_active     Boolean   @default(true) @map("is_active")
  last_login_at DateTime? @map("last_login_at")
  created_at    DateTime  @default(now()) @map("created_at")
  updated_at    DateTime  @updatedAt @map("updated_at")

  branch              Branch?          @relation(fields: [branch_id], references: [id])
  refresh_tokens      RefreshToken[]
  activity_logs       ActivityLog[]
  notifications       Notification[]
  sales_targets       SalesTarget[]
  assigned_leads      Lead[]           @relation("LeadAssignedTo")
  assigned_deals      Deal[]           @relation("DealSales")
  assigned_tickets    TroubleTicket[]  @relation("TicketAssignedTo")
  technician_installs Installation[]   @relation("InstallationTechnician")

  @@map("users")
  @@index([email])
  @@index([role])
  @@index([branch_id])
}

model RefreshToken {
  id         Int      @id @default(autoincrement())
  user_id    Int      @map("user_id")
  token      String   @unique @db.VarChar(500)
  expires_at DateTime @map("expires_at")
  created_at DateTime @default(now()) @map("created_at")

  user User @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@map("refresh_tokens")
  @@index([user_id])
}

model Branch {
  id         Int      @id @default(autoincrement())
  name       String   @db.VarChar(100)
  address    String?  @db.VarChar(255)
  phone      String?  @db.VarChar(20)
  is_active  Boolean  @default(true) @map("is_active")
  created_at DateTime @default(now()) @map("created_at")
  updated_at DateTime @updatedAt @map("updated_at")

  users User[]

  @@map("branches")
}

// ============================================================
// crm — customers & leads
// ============================================================

model Customer {
  id            Int      @id @default(autoincrement())
  customer_code String   @unique @map("customer_code") @db.VarChar(30)
  // format: CUS-2025-001248
  name          String   @db.VarChar(150)
  type          String   @db.VarChar(20)
  // type: personal | corporate
  email         String?  @db.VarChar(150)
  phone         String   @db.VarChar(20)
  website       String?  @db.VarChar(150)
  npwp          String?  @db.VarChar(30)
  address       String?  @db.Text
  city          String?  @db.VarChar(100)
  province      String?  @db.VarChar(100)
  postal_code   String?  @map("postal_code") @db.VarChar(10)
  lat           Decimal? @db.Decimal(10, 8)
  lng           Decimal? @db.Decimal(11, 8)
  area          String?  @db.VarChar(100)
  sector        String?  @db.VarChar(100)
  // sector: corporate | residensial | soho | pendidikan | pemerintah
  contact_person String? @map("contact_person") @db.VarChar(100)
  status        String   @default("active") @db.VarChar(20)
  // status: active | inactive | suspended
  sales_id      Int?     @map("sales_id")
  branch_id     Int?     @map("branch_id")
  since_date    DateTime? @map("since_date")
  notes         String?  @db.Text
  created_at    DateTime @default(now()) @map("created_at")
  updated_at    DateTime @updatedAt @map("updated_at")

  sales            User?              @relation("CustomerSales", fields: [sales_id], references: [id])
  interactions     Interaction[]
  deals            Deal[]
  quotations       Quotation[]
  installations    Installation[]
  trouble_tickets  TroubleTicket[]
  invoices         Invoice[]
  customer_services CustomerService[]

  @@map("customers")
  @@index([email])
  @@index([phone])
  @@index([status])
  @@index([sales_id])
  @@index([area])
  @@index([created_at])
}

model Lead {
  id             Int       @id @default(autoincrement())
  name           String    @db.VarChar(150)
  company        String?   @db.VarChar(150)
  phone          String    @db.VarChar(20)
  email          String?   @db.VarChar(150)
  address        String?   @db.Text
  area           String?   @db.VarChar(100)
  source         String?   @db.VarChar(50)
  // source: canvassing | referral | web | sosmed | telepon | email
  status         String    @default("new") @db.VarChar(30)
  // status: new | contacted | qualified | negosiasi | penawaran | lost | converted
  assigned_to    Int?      @map("assigned_to")
  notes          String?   @db.Text
  follow_up_date DateTime? @map("follow_up_date")
  lost_reason    String?   @map("lost_reason") @db.VarChar(255)
  converted_at   DateTime? @map("converted_at")
  customer_id    Int?      @map("customer_id")
  // diisi setelah lead dikonversi menjadi customer
  created_at     DateTime  @default(now()) @map("created_at")
  updated_at     DateTime  @updatedAt @map("updated_at")

  assigned_user User?         @relation("LeadAssignedTo", fields: [assigned_to], references: [id])
  interactions  Interaction[]
  deals         Deal[]
  quotations    Quotation[]

  @@map("leads")
  @@index([phone])
  @@index([email])
  @@index([status])
  @@index([assigned_to])
  @@index([follow_up_date])
  @@index([created_at])
}

model Interaction {
  id          Int      @id @default(autoincrement())
  customer_id Int?     @map("customer_id")
  lead_id     Int?     @map("lead_id")
  type        String   @db.VarChar(20)
  // type: call | meeting | email | whatsapp | visit
  notes       String   @db.Text
  next_action String?  @map("next_action") @db.VarChar(255)
  next_action_date DateTime? @map("next_action_date")
  created_by  Int      @map("created_by")
  created_at  DateTime @default(now()) @map("created_at")

  customer Customer? @relation(fields: [customer_id], references: [id], onDelete: Cascade)
  lead     Lead?     @relation(fields: [lead_id], references: [id], onDelete: Cascade)
  creator  User      @relation(fields: [created_by], references: [id])

  @@map("interactions")
  @@index([customer_id])
  @@index([lead_id])
  @@index([created_at])
}

// ============================================================
// products & services
// ============================================================

model Product {
  id            Int      @id @default(autoincrement())
  name          String   @db.VarChar(100)
  category      String   @db.VarChar(50)
  // category: internet | perangkat | instalasi | maintenance | bundling
  description   String?  @db.Text
  image_url     String?  @map("image_url") @db.VarChar(255)
  speed_down    Int?     @map("speed_down")
  // mbps
  speed_up      Int?     @map("speed_up")
  // mbps
  price         Decimal  @db.Decimal(15, 2)
  technology    String?  @db.VarChar(30)
  // technology: fiber | wireless | hybrid | copper
  area_coverage String?  @map("area_coverage") @db.VarChar(255)
  is_best_seller Boolean @default(false) @map("is_best_seller")
  is_promo      Boolean  @default(false) @map("is_promo")
  promo_price   Decimal? @map("promo_price") @db.Decimal(15, 2)
  promo_end_date DateTime? @map("promo_end_date")
  status        String   @default("active") @db.VarChar(20)
  // status: active | inactive | promo
  created_at    DateTime @default(now()) @map("created_at")
  updated_at    DateTime @updatedAt @map("updated_at")

  quotation_items   QuotationItem[]
  invoice_items     InvoiceItem[]
  customer_services CustomerService[]

  @@map("products")
  @@index([status])
  @@index([category])
  @@index([technology])
}

model CustomerService {
  id          Int      @id @default(autoincrement())
  customer_id Int      @map("customer_id")
  product_id  Int      @map("product_id")
  status      String   @default("active") @db.VarChar(20)
  // status: active | inactive | suspended
  start_date  DateTime @map("start_date")
  end_date    DateTime? @map("end_date")
  price       Decimal  @db.Decimal(15, 2)
  // harga khusus untuk customer ini
  notes       String?  @db.Text
  created_at  DateTime @default(now()) @map("created_at")
  updated_at  DateTime @updatedAt @map("updated_at")

  customer Customer @relation(fields: [customer_id], references: [id], onDelete: Cascade)
  product  Product  @relation(fields: [product_id], references: [id])

  @@map("customer_services")
  @@index([customer_id])
  @@index([status])
}

// ============================================================
// pipeline — deals
// ============================================================

model Deal {
  id             Int      @id @default(autoincrement())
  lead_id        Int?     @map("lead_id")
  customer_id    Int?     @map("customer_id")
  sales_id       Int      @map("sales_id")
  product_id     Int?     @map("product_id")
  name           String   @db.VarChar(200)
  // contoh: "internet dedicated 100 mbps - pt maju jaya"
  stage          String   @db.VarChar(30)
  // stage: prospek | negosiasi | penawaran | closing | instalasi
  value          Decimal  @db.Decimal(15, 2)
  probability    Int      @default(0)
  // 0 - 100
  source         String?  @db.VarChar(50)
  area           String?  @db.VarChar(100)
  expected_close DateTime @map("expected_close")
  status         String   @default("active") @db.VarChar(20)
  // status: active | won | lost | on-progress
  won_at         DateTime? @map("won_at")
  lost_at        DateTime? @map("lost_at")
  lost_reason    String?   @map("lost_reason") @db.VarChar(255)
  notes          String?  @db.Text
  last_activity_at DateTime? @map("last_activity_at")
  created_at     DateTime @default(now()) @map("created_at")
  updated_at     DateTime @updatedAt @map("updated_at")

  lead       Lead?           @relation(fields: [lead_id], references: [id])
  customer   Customer?       @relation(fields: [customer_id], references: [id])
  sales      User            @relation("DealSales", fields: [sales_id], references: [id])
  activities DealActivity[]
  quotations Quotation[]

  @@map("deals")
  @@index([stage])
  @@index([sales_id])
  @@index([status])
  @@index([expected_close])
  @@index([created_at])
  @@index([last_activity_at])
}

model DealActivity {
  id          Int      @id @default(autoincrement())
  deal_id     Int      @map("deal_id")
  type        String   @db.VarChar(30)
  // type: stage-change | note | email | call | meeting | probability-change
  description String   @db.Text
  from_value  String?  @map("from_value") @db.VarChar(100)
  to_value    String?  @map("to_value") @db.VarChar(100)
  created_by  Int      @map("created_by")
  created_at  DateTime @default(now()) @map("created_at")

  deal Deal @relation(fields: [deal_id], references: [id], onDelete: Cascade)

  @@map("deal_activities")
  @@index([deal_id])
}

// ============================================================
// quotation
// ============================================================

model Quotation {
  id          Int      @id @default(autoincrement())
  quot_number String   @unique @map("quot_number") @db.VarChar(30)
  // format: Q-2025-0520
  customer_id Int?     @map("customer_id")
  lead_id     Int?     @map("lead_id")
  deal_id     Int?     @map("deal_id")
  sales_id    Int      @map("sales_id")
  area        String?  @db.VarChar(100)
  status      String   @default("draft") @db.VarChar(20)
  // status: draft | sent | approved | rejected | expired
  valid_until DateTime @map("valid_until")
  subtotal    Decimal  @db.Decimal(15, 2)
  discount    Decimal  @default(0) @db.Decimal(15, 2)
  tax_rate    Decimal  @default(0.11) @map("tax_rate") @db.Decimal(5, 4)
  tax         Decimal  @db.Decimal(15, 2)
  total       Decimal  @db.Decimal(15, 2)
  currency    String   @default("IDR") @db.VarChar(10)
  notes       String?  @db.Text
  terms       String?  @db.Text
  version     Int      @default(1)
  parent_id   Int?     @map("parent_id")
  // untuk versioning: referensi ke versi sebelumnya
  sent_at     DateTime? @map("sent_at")
  approved_at DateTime? @map("approved_at")
  rejected_at DateTime? @map("rejected_at")
  pdf_url     String?   @map("pdf_url") @db.VarChar(255)
  created_by  Int       @map("created_by")
  created_at  DateTime  @default(now()) @map("created_at")
  updated_at  DateTime  @updatedAt @map("updated_at")

  customer Customer?       @relation(fields: [customer_id], references: [id])
  lead     Lead?           @relation(fields: [lead_id], references: [id])
  deal     Deal?           @relation(fields: [deal_id], references: [id])
  items    QuotationItem[]
  invoices Invoice[]

  @@map("quotations")
  @@index([quot_number])
  @@index([customer_id])
  @@index([sales_id])
  @@index([status])
  @@index([valid_until])
  @@index([created_at])
}

model QuotationItem {
  id           Int     @id @default(autoincrement())
  quotation_id Int     @map("quotation_id")
  product_id   Int?    @map("product_id")
  description  String  @db.VarChar(255)
  notes        String? @db.Text
  qty          Int
  unit         String  @default("unit") @db.VarChar(20)
  unit_price   Decimal @map("unit_price") @db.Decimal(15, 2)
  discount     Decimal @default(0) @db.Decimal(15, 2)
  total        Decimal @db.Decimal(15, 2)
  sort_order   Int     @default(0) @map("sort_order")

  quotation Quotation @relation(fields: [quotation_id], references: [id], onDelete: Cascade)
  product   Product?  @relation(fields: [product_id], references: [id])

  @@map("quotation_items")
  @@index([quotation_id])
}

// ============================================================
// presentation
// ============================================================

model Presentation {
  id           Int      @id @default(autoincrement())
  pres_number  String   @unique @map("pres_number") @db.VarChar(30)
  // format: PRES-2025-0520-001
  title        String   @db.VarChar(200)
  customer_id  Int?     @map("customer_id")
  lead_id      Int?     @map("lead_id")
  product_id   Int?     @map("product_id")
  sales_id     Int      @map("sales_id")
  template     String   @db.VarChar(50)
  // template: internet-dedicated | internet-corporate | hotspot | network-solution | vpn | company-profile
  status       String   @default("draft") @db.VarChar(20)
  // status: draft | dipresentasikan | arsip
  cover_url    String?  @map("cover_url") @db.VarChar(255)
  share_token  String?  @map("share_token") @db.VarChar(100)
  presented_to String?  @map("presented_to") @db.VarChar(100)
  duration_min Int?     @map("duration_min")
  // durasi presentasi dalam menit
  location     String?  @db.VarChar(255)
  presented_at DateTime? @map("presented_at")
  pdf_url      String?  @map("pdf_url") @db.VarChar(255)
  notes        String?  @db.Text
  created_by   Int      @map("created_by")
  created_at   DateTime @default(now()) @map("created_at")
  updated_at   DateTime @updatedAt @map("updated_at")

  slides PresentationSlide[]

  @@map("presentations")
  @@index([sales_id])
  @@index([status])
  @@index([customer_id])
  @@index([created_at])
}

model PresentationSlide {
  id              Int    @id @default(autoincrement())
  presentation_id Int    @map("presentation_id")
  sort_order      Int    @map("sort_order")
  title           String @db.VarChar(200)
  layout          String @db.VarChar(50)
  content_json    Json   @map("content_json")
  // konten slide disimpan sebagai json: {heading, body, image_url, bullets, table, dll}

  presentation Presentation @relation(fields: [presentation_id], references: [id], onDelete: Cascade)

  @@map("presentation_slides")
  @@index([presentation_id])
}

// ============================================================
// timeline — installations
// ============================================================

model Installation {
  id             Int      @id @default(autoincrement())
  inst_number    String   @unique @map("inst_number") @db.VarChar(30)
  // format: INST-2025-0513
  customer_id    Int      @map("customer_id")
  deal_id        Int?     @map("deal_id")
  product_id     Int?     @map("product_id")
  sales_id       Int      @map("sales_id")
  technician_id  Int?     @map("technician_id")
  address        String?  @db.Text
  area           String?  @db.VarChar(100)
  scheduled_date DateTime @map("scheduled_date")
  start_date     DateTime? @map("start_date")
  target_end_date DateTime @map("target_end_date")
  actual_end_date DateTime? @map("actual_end_date")
  duration_days  Int?     @map("duration_days")
  status         String   @default("scheduled") @db.VarChar(30)
  // status: scheduled | on-progress | done | cancelled | tertunda
  current_stage  String   @default("survey") @map("current_stage") @db.VarChar(30)
  // stage: survey | desain-penawaran | instalasi | aktivasi | aktif
  notes          String?  @db.Text
  created_by     Int      @map("created_by")
  created_at     DateTime @default(now()) @map("created_at")
  updated_at     DateTime @updatedAt @map("updated_at")

  customer   Customer           @relation(fields: [customer_id], references: [id])
  technician User?              @relation("InstallationTechnician", fields: [technician_id], references: [id])
  stages     InstallationStage[]

  @@map("installations")
  @@index([customer_id])
  @@index([status])
  @@index([scheduled_date])
  @@index([technician_id])
  @@index([created_at])
}

model InstallationStage {
  id              Int      @id @default(autoincrement())
  installation_id Int      @map("installation_id")
  stage_name      String   @map("stage_name") @db.VarChar(50)
  // survey | desain-penawaran | instalasi | aktivasi
  status          String   @default("menunggu") @db.VarChar(20)
  // status: menunggu | proses | selesai | tertunda
  started_at      DateTime? @map("started_at")
  completed_at    DateTime? @map("completed_at")
  notes           String?  @db.Text
  sort_order      Int      @map("sort_order")
  created_at      DateTime @default(now()) @map("created_at")
  updated_at      DateTime @updatedAt @map("updated_at")

  installation Installation @relation(fields: [installation_id], references: [id], onDelete: Cascade)

  @@map("installation_stages")
  @@index([installation_id])
}

// ============================================================
// trouble ticket
// ============================================================

model TroubleTicket {
  id           Int      @id @default(autoincrement())
  ticket_number String  @unique @map("ticket_number") @db.VarChar(30)
  // format: TT-2025-0524
  customer_id  Int      @map("customer_id")
  service_id   Int?     @map("service_id")
  // layanan yang bermasalah
  title        String   @db.VarChar(255)
  description  String   @db.Text
  category     String?  @db.VarChar(50)
  // gangguan-koneksi | gangguan-perangkat | billing | layanan | lainnya
  sub_category String?  @map("sub_category") @db.VarChar(50)
  source       String?  @db.VarChar(30)
  // telepon | email | whatsapp | web | on-site
  priority     String   @default("medium") @db.VarChar(10)
  // low | medium | high | critical
  status       String   @default("open") @db.VarChar(20)
  // open | in-progress | resolved | closed
  pic_id       Int?     @map("pic_id")
  // penanggung jawab
  assigned_to  Int?     @map("assigned_to")
  // teknisi yang ditugaskan
  sales_id     Int?     @map("sales_id")
  area         String?  @db.VarChar(100)
  sla_target   DateTime? @map("sla_target")
  resolved_at  DateTime? @map("resolved_at")
  closed_at    DateTime? @map("closed_at")
  resolution   String?  @db.Text
  progress     Int      @default(0)
  // 0 - 100 persen
  created_at   DateTime @default(now()) @map("created_at")
  updated_at   DateTime @updatedAt @map("updated_at")

  customer     Customer       @relation(fields: [customer_id], references: [id])
  assigned_user User?         @relation("TicketAssignedTo", fields: [assigned_to], references: [id])
  notes        TicketNote[]

  @@map("trouble_tickets")
  @@index([customer_id])
  @@index([status])
  @@index([priority])
  @@index([assigned_to])
  @@index([sla_target])
  @@index([created_at])
}

model TicketNote {
  id        Int      @id @default(autoincrement())
  ticket_id Int      @map("ticket_id")
  type      String   @default("note") @db.VarChar(20)
  // note | status-change | attachment
  content   String   @db.Text
  file_url  String?  @map("file_url") @db.VarChar(255)
  created_by Int     @map("created_by")
  created_at DateTime @default(now()) @map("created_at")

  ticket TroubleTicket @relation(fields: [ticket_id], references: [id], onDelete: Cascade)

  @@map("ticket_notes")
  @@index([ticket_id])
}

// ============================================================
// invoices & payments
// ============================================================

model Invoice {
  id            Int      @id @default(autoincrement())
  inv_number    String   @unique @map("inv_number") @db.VarChar(30)
  // format: INV-2025-0516
  customer_id   Int      @map("customer_id")
  quotation_id  Int?     @map("quotation_id")
  sales_id      Int      @map("sales_id")
  type          String   @default("penagihan") @db.VarChar(30)
  // penagihan | proforma | kredit
  period_start  DateTime? @map("period_start")
  period_end    DateTime? @map("period_end")
  invoice_date  DateTime @map("invoice_date")
  due_date      DateTime @map("due_date")
  subtotal      Decimal  @db.Decimal(15, 2)
  discount      Decimal  @default(0) @db.Decimal(15, 2)
  tax_rate      Decimal  @default(0.11) @map("tax_rate") @db.Decimal(5, 4)
  tax           Decimal  @db.Decimal(15, 2)
  total         Decimal  @db.Decimal(15, 2)
  paid_amount   Decimal  @default(0) @map("paid_amount") @db.Decimal(15, 2)
  remaining     Decimal  @db.Decimal(15, 2)
  status        String   @default("draft") @db.VarChar(20)
  // draft | unpaid | partial | paid | overdue | cancelled
  notes         String?  @db.Text
  pdf_url       String?  @map("pdf_url") @db.VarChar(255)
  sent_at       DateTime? @map("sent_at")
  paid_at       DateTime? @map("paid_at")
  created_by    Int      @map("created_by")
  created_at    DateTime @default(now()) @map("created_at")
  updated_at    DateTime @updatedAt @map("updated_at")

  customer   Customer      @relation(fields: [customer_id], references: [id])
  quotation  Quotation?    @relation(fields: [quotation_id], references: [id])
  items      InvoiceItem[]
  payments   Payment[]

  @@map("invoices")
  @@index([inv_number])
  @@index([customer_id])
  @@index([sales_id])
  @@index([status])
  @@index([due_date])
  @@index([created_at])
}

model InvoiceItem {
  id          Int     @id @default(autoincrement())
  invoice_id  Int     @map("invoice_id")
  product_id  Int?    @map("product_id")
  description String  @db.VarChar(255)
  qty         Int
  unit        String  @default("unit") @db.VarChar(20)
  unit_price  Decimal @map("unit_price") @db.Decimal(15, 2)
  total       Decimal @db.Decimal(15, 2)
  sort_order  Int     @default(0) @map("sort_order")

  invoice Invoice  @relation(fields: [invoice_id], references: [id], onDelete: Cascade)
  product Product? @relation(fields: [product_id], references: [id])

  @@map("invoice_items")
  @@index([invoice_id])
}

model Payment {
  id             Int      @id @default(autoincrement())
  pay_number     String   @unique @map("pay_number") @db.VarChar(30)
  // format: PAY-2025-0612
  invoice_id     Int      @map("invoice_id")
  amount         Decimal  @db.Decimal(15, 2)
  method         String   @db.VarChar(50)
  // transfer-bank | tunai | kartu-kredit | qris | virtual-account
  bank_name      String?  @map("bank_name") @db.VarChar(50)
  account_number String?  @map("account_number") @db.VarChar(50)
  reference      String?  @db.VarChar(100)
  // nomor referensi / bukti transfer
  notes          String?  @db.Text
  paid_by        String?  @map("paid_by") @db.VarChar(100)
  paid_at        DateTime @map("paid_at")
  created_by     Int      @map("created_by")
  created_at     DateTime @default(now()) @map("created_at")

  invoice Invoice @relation(fields: [invoice_id], references: [id])

  @@map("payments")
  @@index([invoice_id])
  @@index([paid_at])
}

// ============================================================
// notifications
// ============================================================

model Notification {
  id           Int      @id @default(autoincrement())
  user_id      Int      @map("user_id")
  title        String   @db.VarChar(200)
  message      String   @db.Text
  type         String   @db.VarChar(30)
  // lead | deal | quotation | installation | trouble-ticket | invoice | system
  priority     String   @default("normal") @db.VarChar(10)
  // normal | penting
  entity_type  String?  @map("entity_type") @db.VarChar(50)
  entity_id    Int?     @map("entity_id")
  // referensi ke data terkait (customer_id, deal_id, dll)
  action_url   String?  @map("action_url") @db.VarChar(255)
  is_read      Boolean  @default(false) @map("is_read")
  read_at      DateTime? @map("read_at")
  created_at   DateTime @default(now()) @map("created_at")

  user User @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@map("notifications")
  @@index([user_id])
  @@index([is_read])
  @@index([type])
  @@index([created_at])
}

// ============================================================
// activity logs (audit trail)
// ============================================================

model ActivityLog {
  id          Int      @id @default(autoincrement())
  user_id     Int      @map("user_id")
  action      String   @db.VarChar(30)
  // dibuat | diperbarui | diubah | dihapus | dikirim | disetujui | ditolak | login | logout
  module      String   @db.VarChar(30)
  // lead | quotation | deal | customer | invoice | installation | trouble-ticket | produk | user | pipeline
  entity_type String   @map("entity_type") @db.VarChar(50)
  entity_id   Int      @map("entity_id")
  description String   @db.Text
  // deskripsi human-readable dari aktivitas
  old_values  Json?    @map("old_values")
  new_values  Json?    @map("new_values")
  ip_address  String?  @map("ip_address") @db.VarChar(45)
  user_agent  String?  @map("user_agent") @db.VarChar(500)
  created_at  DateTime @default(now()) @map("created_at")

  user User @relation(fields: [user_id], references: [id])

  @@map("activity_logs")
  @@index([user_id])
  @@index([module])
  @@index([action])
  @@index([entity_type, entity_id])
  @@index([created_at])
}

// ============================================================
// sales targets (untuk dashboard & reports)
// ============================================================

model SalesTarget {
  id        Int     @id @default(autoincrement())
  user_id   Int     @map("user_id")
  month     Int
  // 1 - 12
  year      Int
  target    Decimal @db.Decimal(15, 2)
  achieved  Decimal @default(0) @db.Decimal(15, 2)
  notes     String? @db.Text

  user User @relation(fields: [user_id], references: [id])

  @@unique([user_id, month, year])
  @@map("sales_targets")
  @@index([user_id])
  @@index([year, month])
}
```

---

## 3. relasi antar tabel (erd ringkas)

```
users ─────────────────┬──── branches
  │                    │
  ├── refresh_tokens   │
  ├── activity_logs    │
  ├── notifications    │
  ├── sales_targets    │
  │                    │
customers ─────────────┘
  │
  ├── interactions
  ├── customer_services ── products
  ├── deals ──────────────── deal_activities
  ├── quotations ─────────── quotation_items ── products
  ├── presentations ──────── presentation_slides
  ├── installations ──────── installation_stages
  ├── trouble_tickets ─────── ticket_notes
  └── invoices ────────────── invoice_items ── products
                          └── payments

leads
  ├── interactions
  ├── deals
  └── quotations
```

---

## 4. konvensi & aturan database

### penamaan
- semua nama tabel: `snake_case` jamak (contoh: `trouble_tickets`, `quotation_items`)
- semua nama kolom: `snake_case` (contoh: `created_at`, `sales_id`, `pdf_url`)
- primary key: selalu `id` bertipe `int autoincrement`
- foreign key: nama tabel referensi + `_id` (contoh: `customer_id`, `sales_id`)
- timestamps: semua tabel memiliki `created_at`, tabel yang bisa diupdate memiliki `updated_at`
- soft delete: tidak digunakan, hapus permanen dengan konfirmasi

### indexing
index wajib dibuat pada kolom:
- semua foreign key (`customer_id`, `sales_id`, dll)
- kolom yang digunakan dalam filter (`status`, `priority`, `role`, `area`)
- kolom pencarian (`email`, `phone`, `quot_number`, `inv_number`, `ticket_number`)
- kolom sorting dan range query (`created_at`, `due_date`, `follow_up_date`, `scheduled_date`)

### tipe data
| data | tipe mysql | catatan |
|---|---|---|
| id | int unsigned auto_increment | primary key |
| uang/harga | decimal(15,2) | hindari float untuk nilai uang |
| koordinat lat | decimal(10,8) | presisi gps |
| koordinat lng | decimal(11,8) | presisi gps |
| persentase pajak | decimal(5,4) | contoh: 0.1100 = 11% |
| teks pendek | varchar(n) | tentukan panjang maksimal |
| teks panjang | text | untuk notes, description |
| json kompleks | json | untuk content_json, stages_json |
| tanggal waktu | datetime | semua timestamp |
| boolean | tinyint(1) | prisma otomatis mapping |

---

## 5. seed data awal

### user seed

```javascript
// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  // branch
  const branch = await prisma.branch.create({
    data: { name: 'jakarta pusat', address: 'jl. sudirman no. 1', phone: '021-1234567' }
  })

  // users
  const users = await prisma.user.createMany({
    data: [
      {
        name: 'administrator',
        email: 'admin@rapidmark.co.id',
        password_hash: await bcrypt.hash('admin123', 12),
        role: 'super-admin',
        branch_id: branch.id,
        phone: '0812-3456-7890',
        department: 'it management'
      },
      {
        name: 'andi pratama',
        email: 'andi@rapidmark.co.id',
        password_hash: await bcrypt.hash('sales123', 12),
        role: 'sales',
        branch_id: branch.id,
        phone: '0813-1111-2222'
      },
      {
        name: 'siti nurhaliza',
        email: 'siti@rapidmark.co.id',
        password_hash: await bcrypt.hash('sales123', 12),
        role: 'sales',
        branch_id: branch.id,
        phone: '0814-2222-3333'
      },
      {
        name: 'budi santoso',
        email: 'budi@rapidmark.co.id',
        password_hash: await bcrypt.hash('teknis123', 12),
        role: 'teknisi',
        branch_id: branch.id,
        phone: '0815-3333-4444'
      }
    ]
  })

  // products
  await prisma.product.createMany({
    data: [
      {
        name: 'fiber 50 mbps',
        category: 'internet',
        speed_down: 50, speed_up: 20,
        price: 350000,
        technology: 'fiber',
        area_coverage: 'jakarta, depok, bekasi',
        is_best_seller: true,
        status: 'active'
      },
      {
        name: 'fiber 100 mbps',
        category: 'internet',
        speed_down: 100, speed_up: 50,
        price: 450000,
        technology: 'fiber',
        area_coverage: 'jakarta, depok, bekasi',
        is_promo: true,
        promo_price: 382500,
        status: 'promo'
      },
      {
        name: 'fiber 200 mbps',
        category: 'internet',
        speed_down: 200, speed_up: 100,
        price: 700000,
        technology: 'fiber',
        area_coverage: 'jakarta, tangerang, bekasi',
        is_best_seller: true,
        status: 'active'
      },
      {
        name: 'wireless 20 mbps',
        category: 'internet',
        speed_down: 20, speed_up: 10,
        price: 250000,
        technology: 'wireless',
        area_coverage: 'bogor, depok, bekasi',
        status: 'active'
      },
      {
        name: 'corporate 100 mbps',
        category: 'internet',
        speed_down: 100, speed_up: 50,
        price: 1250000,
        technology: 'fiber',
        area_coverage: 'jabodetabek',
        status: 'active'
      },
      {
        name: 'instalasi & konfigurasi',
        category: 'instalasi',
        price: 500000,
        status: 'active'
      },
      {
        name: 'router mikrotik rb3011',
        category: 'perangkat',
        price: 2750000,
        status: 'active'
      }
    ]
  })

  console.log('seed selesai')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

---

## 6. query contoh penting

### dashboard stats

```sql
-- total customers aktif
select count(*) as total_customers
from customers
where status = 'active';

-- revenue bulan ini (dari invoice paid)
select sum(total) as revenue
from invoices
where status = 'paid'
  and month(paid_at) = month(now())
  and year(paid_at) = year(now());

-- deals closing bulan ini
select count(*) as deals_closing
from deals
where status = 'won'
  and month(won_at) = month(now())
  and year(won_at) = year(now());

-- trouble ticket belum selesai
select count(*) as open_tickets
from trouble_tickets
where status in ('open', 'in-progress');
```

### pipeline kanban

```sql
-- deals per stage dengan total nilai
select
  stage,
  count(*) as total_deals,
  sum(value) as total_value
from deals
where status = 'active'
group by stage
order by field(stage, 'prospek', 'negosiasi', 'penawaran', 'closing', 'instalasi');
```

### laporan sales performance

```sql
-- performa per sales dengan target
select
  u.name as sales_name,
  u.id as sales_id,
  count(distinct l.id) as total_leads,
  count(distinct d.id) as total_deals,
  count(distinct case when d.status = 'won' then d.id end) as won_deals,
  sum(case when d.status = 'won' then d.value else 0 end) as total_sales,
  st.target as target,
  round(sum(case when d.status = 'won' then d.value else 0 end) / st.target * 100, 1) as achievement
from users u
left join leads l on l.assigned_to = u.id
  and month(l.created_at) = month(now())
left join deals d on d.sales_id = u.id
  and month(d.created_at) = month(now())
left join sales_targets st on st.user_id = u.id
  and st.month = month(now())
  and st.year = year(now())
where u.role = 'sales'
  and u.is_active = true
group by u.id, u.name, st.target
order by total_sales desc;
```

### quotation dengan item

```sql
select
  q.quot_number,
  c.name as customer_name,
  q.status,
  q.total,
  q.valid_until,
  json_arrayagg(
    json_object(
      'description', qi.description,
      'qty', qi.qty,
      'unit_price', qi.unit_price,
      'total', qi.total
    )
  ) as items
from quotations q
join customers c on c.id = q.customer_id
join quotation_items qi on qi.quotation_id = q.id
where q.id = ?
group by q.id;
```

---

## 7. migrasi database

urutan menjalankan:

```bash
# 1. buat database
mysql -u root -p -e "create database rapid_mark character set utf8mb4 collate utf8mb4_unicode_ci;"

# 2. generate prisma client
npx prisma generate

# 3. jalankan migrasi
npx prisma migrate dev --name init

# 4. jalankan seed data
npx prisma db seed

# 5. verifikasi
npx prisma studio
```

---

*database.md — Mark isp sales & management system*
*versi: 1.0 | referensi: screenshot ui aktual (19 halaman)*
