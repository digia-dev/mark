require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({});

async function main() {
  console.log('🌱 mulai seeding...');

  // ──────────────────────────────────────────────
  // branch
  // ──────────────────────────────────────────────
  const branch = await prisma.branch.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'jakarta pusat',
      address: 'jl. sudirman no. 1, jakarta pusat 10220',
      phone: '021-1234567',
      is_active: true
    }
  });
  console.log('✅ branch:', branch.name);

  // ──────────────────────────────────────────────
  // users
  // ──────────────────────────────────────────────
  const adminHash = await bcrypt.hash('admin123', 12);
  const salesHash = await bcrypt.hash('sales123', 12);
  const teknisiHash = await bcrypt.hash('teknis123', 12);

  const userSeeds = [
    {
      name: 'administrator',
      email: 'admin@rapidmark.co.id',
      password_hash: adminHash,
      role: 'super-admin',
      branch_id: branch.id,
      phone: '0812-3456-7890',
      department: 'it management',
      is_active: true
    },
    {
      name: 'andi pratama',
      email: 'andi@rapidmark.co.id',
      password_hash: salesHash,
      role: 'sales',
      branch_id: branch.id,
      phone: '0813-1111-2222',
      is_active: true
    },
    {
      name: 'siti nurhaliza',
      email: 'siti@rapidmark.co.id',
      password_hash: salesHash,
      role: 'sales',
      branch_id: branch.id,
      phone: '0814-2222-3333',
      is_active: true
    },
    {
      name: 'budi santoso',
      email: 'budi@rapidmark.co.id',
      password_hash: teknisiHash,
      role: 'teknisi',
      branch_id: branch.id,
      phone: '0815-3333-4444',
      is_active: true
    }
  ];

  for (const u of userSeeds) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u
    });
  }
  console.log('✅ users:', userSeeds.length, 'akun dibuat');

  // ──────────────────────────────────────────────
  // products
  // ──────────────────────────────────────────────
  const productSeeds = [
    {
      name: 'fiber 50 mbps',
      category: 'internet',
      description: 'paket internet fiber optik 50 mbps download / 20 mbps upload',
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
      description: 'paket internet fiber optik 100 mbps download / 50 mbps upload',
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
      description: 'paket internet fiber optik 200 mbps download / 100 mbps upload',
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
      description: 'paket internet wireless 20 mbps, cocok untuk area pinggiran',
      speed_down: 20, speed_up: 10,
      price: 250000,
      technology: 'wireless',
      area_coverage: 'bogor, depok, bekasi',
      status: 'active'
    },
    {
      name: 'corporate 100 mbps dedicated',
      category: 'internet',
      description: 'internet dedicated untuk korporat, sla 99.9%, ip publik statis',
      speed_down: 100, speed_up: 100,
      price: 1250000,
      technology: 'fiber',
      area_coverage: 'jabodetabek',
      status: 'active'
    },
    {
      name: 'jasa instalasi & konfigurasi',
      category: 'instalasi',
      description: 'biaya instalasi perangkat dan konfigurasi jaringan',
      price: 500000,
      status: 'active'
    },
    {
      name: 'router mikrotik rb3011',
      category: 'perangkat',
      description: 'router mikrotik rb3011 10 port gigabit, cocok untuk jaringan skala menengah',
      price: 2750000,
      status: 'active'
    }
  ];

  for (const p of productSeeds) {
    const existing = await prisma.product.findFirst({ where: { name: p.name } });
    if (!existing) {
      await prisma.product.create({ data: p });
    }
  }
  console.log('✅ products:', productSeeds.length, 'produk dibuat');

  console.log('\n🎉 seeding selesai!');
}

main()
  .catch((e) => {
    console.error('❌ error saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });