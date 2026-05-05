/**
 * Get Activity Log Stats Use Case
 */
class GetActivityLogStatsUseCase {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async execute(query = {}) {
    // Pada implementasi nyata, ini akan menghitung agregat dari database
    // Mock Data untuk Activity Log Stats
    
    return {
      byModule: [
        { name: 'CRM', value: 45 },
        { name: 'Pipeline', value: 30 },
        { name: 'Quotation', value: 15 },
        { name: 'Invoice', value: 10 }
      ],
      byAction: [
        { name: 'Create', count: 120 },
        { name: 'Update', count: 250 },
        { name: 'Delete', count: 15 },
        { name: 'Login', count: 45 }
      ],
      recentActivityCount: 430
    };
  }
}

module.exports = GetActivityLogStatsUseCase;
