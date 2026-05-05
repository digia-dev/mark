/**
 * Get Product Performance Use Case
 * 
 * Mengembalikan data laporan performa produk.
 */
class GetProductPerformanceUseCase {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async execute(userId, query = {}) {
    // Mock Data untuk Laporan Performa Produk
    return {
      statCards: {
        totalProductsSold: {
          value: 1250,
          trend: 8,
          label: 'Total Layanan Aktif'
        },
        topSellingCategory: {
          value: 'Dedicated Internet',
          trend: 0,
          label: 'Kategori Terlaris'
        },
        averageRevenuePerUser: {
          value: 1250000,
          trend: 5,
          label: 'ARPU (Rata-rata Pendapatan)'
        },
        churnRate: {
          value: 2.4,
          trend: -0.5, // Penurunan churn adalah hal baik
          label: 'Churn Rate (%)'
        }
      },
      topProducts: [
        { name: 'Dedicated Internet 100 Mbps', salesCount: 450, revenue: 135000000 },
        { name: 'Broadband Business 50 Mbps', salesCount: 380, revenue: 95000000 },
        { name: 'Dedicated Internet 50 Mbps', salesCount: 210, revenue: 42000000 },
        { name: 'VPN IP 10 Mbps', salesCount: 120, revenue: 18000000 },
        { name: 'Colocation 1U', salesCount: 90, revenue: 13500000 },
      ],
      revenueByProduct: [
        { name: 'Dedicated Internet', revenue: 215000000, percentage: 55 },
        { name: 'Broadband Business', revenue: 110000000, percentage: 28 },
        { name: 'Data Center / Colocation', revenue: 45000000, percentage: 11 },
        { name: 'Cloud Services', revenue: 25000000, percentage: 6 },
      ],
      technologyDistribution: [
        { name: 'Fiber Optic', value: 75 },
        { name: 'Wireless', value: 20 },
        { name: 'VSAT', value: 5 },
      ],
      productPerformanceTable: [
        { id: 1, name: 'Dedicated Internet 100 Mbps', category: 'Dedicated Internet', activeUsers: 450, newSignups: 45, churn: 5, revenue: 135000000, growth: 12 },
        { id: 2, name: 'Broadband Business 50 Mbps', category: 'Broadband Business', activeUsers: 380, newSignups: 52, churn: 12, revenue: 95000000, growth: 8 },
        { id: 3, name: 'Dedicated Internet 50 Mbps', category: 'Dedicated Internet', activeUsers: 210, newSignups: 15, churn: 3, revenue: 42000000, growth: 5 },
        { id: 4, name: 'VPN IP 10 Mbps', category: 'VPN IP', activeUsers: 120, newSignups: 8, churn: 2, revenue: 18000000, growth: 2 },
        { id: 5, name: 'Colocation 1U', category: 'Data Center', activeUsers: 90, newSignups: 5, churn: 1, revenue: 13500000, growth: 4 },
        { id: 6, name: 'Cloud VPS Basic', category: 'Cloud Services', activeUsers: 85, newSignups: 12, churn: 8, revenue: 8500000, growth: 15 },
        { id: 7, name: 'Broadband Business 100 Mbps', category: 'Broadband Business', activeUsers: 65, newSignups: 18, churn: 4, revenue: 26000000, growth: 25 },
      ]
    };
  }
}

module.exports = GetProductPerformanceUseCase;
