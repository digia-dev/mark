/**
 * Get Sales Report Use Case
 * 
 * Mengembalikan data laporan performa sales (penjualan).
 */
class GetSalesReportUseCase {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async execute(userId, query = {}) {
    // Pada implementasi nyata, ini akan mengambil data dari repository/database
    // menggunakan this.prisma dan memfilter berdasarkan userId jika role = sales
    
    // Mock Data untuk Laporan Sales
    return {
      statCards: {
        totalDeals: {
          value: 124,
          trend: 12, // +12% dari bulan lalu
          label: 'Total Deals'
        },
        totalRevenue: {
          value: 450000000,
          trend: 8,
          label: 'Total Penagihan'
        },
        averageDealSize: {
          value: 3629000,
          trend: -2,
          label: 'Rata-rata Nilai Deal'
        },
        winRate: {
          value: 68,
          trend: 5,
          label: 'Win Rate (%)'
        }
      },
      salesOverTime: [
        { name: 'Jan', revenue: 35000000, target: 40000000 },
        { name: 'Feb', revenue: 42000000, target: 40000000 },
        { name: 'Mar', revenue: 38000000, target: 45000000 },
        { name: 'Apr', revenue: 52000000, target: 45000000 },
        { name: 'Mei', revenue: 48000000, target: 50000000 },
        { name: 'Jun', revenue: 55000000, target: 50000000 },
      ],
      topSales: [
        { name: 'Budi Santoso', value: 125000000, deals: 32 },
        { name: 'Siti Aminah', value: 98000000, deals: 28 },
        { name: 'Andi Wijaya', value: 85000000, deals: 24 },
        { name: 'Rina Kusuma', value: 72000000, deals: 21 },
        { name: 'Dodi Pratama', value: 65000000, deals: 19 },
      ],
      salesFunnel: [
        { stage: 'Prospek', count: 150, value: 300000000 },
        { stage: 'Negosiasi', count: 90, value: 180000000 },
        { stage: 'Penawaran', count: 65, value: 130000000 },
        { stage: 'Closing', count: 45, value: 90000000 },
      ],
      salesByArea: [
        { name: 'Jakarta Selatan', value: 35 },
        { name: 'Jakarta Pusat', value: 25 },
        { name: 'Tangerang', value: 20 },
        { name: 'Bekasi', value: 15 },
        { name: 'Lainnya', value: 5 },
      ],
      salesDetails: [
        { id: 1, name: 'Budi Santoso', dealsWon: 32, dealsLost: 12, winRate: 72, revenue: 125000000, avgDealSize: 3906250 },
        { id: 2, name: 'Siti Aminah', dealsWon: 28, dealsLost: 15, winRate: 65, revenue: 98000000, avgDealSize: 3500000 },
        { id: 3, name: 'Andi Wijaya', dealsWon: 24, dealsLost: 10, winRate: 70, revenue: 85000000, avgDealSize: 3541666 },
        { id: 4, name: 'Rina Kusuma', dealsWon: 21, dealsLost: 14, winRate: 60, revenue: 72000000, avgDealSize: 3428571 },
        { id: 5, name: 'Dodi Pratama', dealsWon: 19, dealsLost: 8, winRate: 70, revenue: 65000000, avgDealSize: 3421052 },
      ]
    };
  }
}

module.exports = GetSalesReportUseCase;
