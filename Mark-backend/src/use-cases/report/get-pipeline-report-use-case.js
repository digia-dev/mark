/**
 * Get Pipeline Report Use Case
 * 
 * Mengembalikan data laporan performa pipeline (sales pipeline).
 */
class GetPipelineReportUseCase {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async execute(userId, query = {}) {
    // Mock Data untuk Laporan Pipeline
    return {
      statCards: {
        totalPipelineValue: {
          value: 850000000,
          trend: 15, // +15% dari bulan lalu
          label: 'Total Nilai Pipeline'
        },
        dealsPerStage: {
          value: 350,
          trend: 8,
          label: 'Total Deals Aktif'
        },
        averageDealSize: {
          value: 2428571,
          trend: 5,
          label: 'Rata-rata Nilai Deal'
        },
        pipelineVelocity: {
          value: 18,
          trend: -2,
          label: 'Kecepatan Pipeline (Hari)'
        }
      },
      pipelineTrend: [
        { name: 'Minggu 1', prospect: 20, negotiation: 15, proposal: 10, closing: 5 },
        { name: 'Minggu 2', prospect: 25, negotiation: 18, proposal: 12, closing: 8 },
        { name: 'Minggu 3', prospect: 22, negotiation: 20, proposal: 15, closing: 10 },
        { name: 'Minggu 4', prospect: 30, negotiation: 25, proposal: 18, closing: 12 },
      ],
      pipelineBySalesperson: [
        { name: 'Budi Santoso', prospect: 45, negotiation: 30, proposal: 20, closing: 15 },
        { name: 'Siti Aminah', prospect: 38, negotiation: 25, proposal: 18, closing: 12 },
        { name: 'Andi Wijaya', prospect: 35, negotiation: 22, proposal: 15, closing: 10 },
        { name: 'Rina Kusuma', prospect: 30, negotiation: 18, proposal: 12, closing: 8 },
        { name: 'Dodi Pratama', prospect: 25, negotiation: 15, proposal: 10, closing: 5 },
      ],
      topDeals: [
        { id: 1, customer: 'PT ABC Teknologi', value: 45000000, stage: 'closing', probability: 90, expectedCloseDate: '2025-06-15' },
        { id: 2, customer: 'CV Maju Jaya', value: 38000000, stage: 'proposal', probability: 75, expectedCloseDate: '2025-06-20' },
        { id: 3, customer: 'PT Sentosa Abadi', value: 35000000, stage: 'negotiation', probability: 50, expectedCloseDate: '2025-06-25' },
        { id: 4, customer: 'Toko Makmur', value: 28000000, stage: 'proposal', probability: 80, expectedCloseDate: '2025-06-18' },
        { id: 5, customer: 'Klinik Sehat', value: 25000000, stage: 'prospect', probability: 30, expectedCloseDate: '2025-07-05' },
      ],
      stageDistribution: [
        { stage: 'Prospek', count: 150, percentage: 43 },
        { stage: 'Negosiasi', count: 90, percentage: 26 },
        { stage: 'Penawaran', count: 65, percentage: 19 },
        { stage: 'Closing', count: 45, percentage: 13 },
      ]
    };
  }
}

module.exports = GetPipelineReportUseCase;
