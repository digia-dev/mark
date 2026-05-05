/**
 * Get Company Settings Use Case
 */
class GetCompanySettingsUseCase {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async execute() {
    // Pada implementasi riil, ini akan query ke tabel Settings atau Company
    // Untuk saat ini kita kembalikan mock data struktur setting perusahaan
    return {
      companyName: 'PT Mark Data Integrasi',
      companyAddress: 'Jl. Jend. Sudirman No. 123, Jakarta Selatan',
      companyPhone: '+62 21 555 1234',
      companyEmail: 'info@markdata.co.id',
      companyWebsite: 'https://www.markdata.co.id',
      companyLogo: '/logo-full.png',
      taxRate: 11,
      currency: 'IDR',
      defaultDueDays: 14,
      timezone: 'Asia/Jakarta'
    };
  }
}

module.exports = GetCompanySettingsUseCase;
