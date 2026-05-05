const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing and seeding data for dashboard...');

  // 0. Clear existing data to avoid conflicts
  await prisma.activityLog.deleteMany();
  await prisma.interaction.deleteMany();
  await prisma.deal.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.customer.deleteMany();

  // 1. Ensure we have sales users
  const sales = await prisma.user.findMany({ where: { role: 'sales' } });
  if (sales.length === 0) {
    console.log('No sales users found. Please run main seed first.');
    return;
  }

  const salesId = sales[0].id;

  // 2. Add Customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        customer_code: 'CUS-2025-0001',
        name: 'PT. Digital Solusi',
        type: 'corporate',
        email: 'info@digitalsolusi.com',
        phone: '021-5551234',
        area: 'Jakarta Selatan',
        lat: -6.2297,
        lng: 106.8295,
        sales_id: salesId,
        status: 'active'
      }
    }),
    prisma.customer.create({
      data: {
        customer_code: 'CUS-2025-0002',
        name: 'Bapak Heru Pratama',
        type: 'personal',
        email: 'heru@gmail.com',
        phone: '08123456789',
        area: 'Tangerang',
        lat: -6.1702,
        lng: 106.6403,
        sales_id: salesId,
        status: 'active'
      }
    })
  ]);

  // 3. Add Leads
  await Promise.all([
    prisma.lead.create({
      data: {
        name: 'Siska Amanda',
        company: 'Cafe Kopi Senja',
        phone: '0856778899',
        email: 'siska@senja.com',
        status: 'new',
        assigned_to: salesId,
        area: 'Jakarta Barat'
      }
    }),
    prisma.lead.create({
      data: {
        name: 'Budi Santoso',
        company: 'Bengkel Maju',
        phone: '0811223344',
        status: 'contacted',
        assigned_to: salesId,
        area: 'Jakarta Timur'
      }
    })
  ]);

  // 4. Add Interactions (Tasks)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  await Promise.all([
    prisma.interaction.create({
      data: {
        customer_id: customers[0].id,
        type: 'call',
        notes: 'Follow up proposal dedicated internet',
        next_action: 'Kirim revisi penawaran',
        next_action_date: tomorrow,
        created_by: salesId
      }
    }),
    prisma.interaction.create({
      data: {
        customer_id: customers[1].id,
        type: 'visit',
        notes: 'Survey lokasi rumah',
        next_action: 'Demo perangkat ONT',
        next_action_date: nextWeek,
        created_by: salesId
      }
    })
  ]);

  // 5. Add Activity Logs
  await Promise.all([
    prisma.activityLog.create({
      data: {
        user_id: salesId,
        action: 'dibuat',
        module: 'customer',
        entity_type: 'Customer',
        entity_id: customers[0].id,
        description: 'Menambahkan customer baru: PT. Digital Solusi'
      }
    }),
    prisma.activityLog.create({
      data: {
        user_id: salesId,
        action: 'login',
        module: 'user',
        entity_type: 'User',
        entity_id: salesId,
        description: 'User sales login ke sistem'
      }
    })
  ]);

  // 6. Add Deals
  await prisma.deal.create({
    data: {
      name: 'Internet Dedicated 50Mbps - PT. Digital Solusi',
      customer_id: customers[0].id,
      sales_id: salesId,
      stage: 'negosiasi',
      value: 15000000,
      probability: 60,
      expected_close: nextWeek,
      area: 'Jakarta Selatan'
    }
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
