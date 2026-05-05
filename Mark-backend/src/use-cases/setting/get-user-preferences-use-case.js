/**
 * Get User Preferences Use Case
 */
class GetUserPreferencesUseCase {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async execute(userId) {
    // Pada implementasi riil, query ke tabel UserPreferences
    return {
      theme: 'light',
      language: 'id',
      emailNotifications: true,
      browserNotifications: true,
      soundEnabled: true,
      dailySummary: false,
      sidebarCollapsed: false
    };
  }
}

module.exports = GetUserPreferencesUseCase;
