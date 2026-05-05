/**
 * Update User Preferences Use Case
 */
class UpdateUserPreferencesUseCase {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async execute(userId, preferencesData) {
    // Pada implementasi riil, update record di tabel UserPreferences
    
    return {
      success: true,
      message: 'Preferensi pengguna berhasil disimpan',
      data: preferencesData
    };
  }
}

module.exports = UpdateUserPreferencesUseCase;
