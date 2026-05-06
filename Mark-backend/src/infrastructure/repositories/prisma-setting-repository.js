class PrismaSettingRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getCompanyProfile() {
    let profile = await this.prisma.companySetting.findFirst();
    if (!profile) {
      // Create default profile if not exists
      profile = await this.prisma.companySetting.create({
        data: {
          name: 'Mark ISP',
          email: 'info@mark-isp.net',
          phone: '021-12345678',
          address: 'Jakarta, Indonesia'
        }
      });
    }
    return profile;
  }

  async updateCompanyProfile(data) {
    const profile = await this.getCompanyProfile();
    return this.prisma.companySetting.update({
      where: { id: profile.id },
      data
    });
  }

  async getPreferences() {
    let prefs = await this.prisma.appPreference.findFirst();
    if (!prefs) {
      prefs = await this.prisma.appPreference.create({
        data: {
          theme: 'light',
          language: 'id',
          timezone: 'Asia/Jakarta'
        }
      });
    }
    return prefs;
  }

  async updatePreferences(data) {
    const prefs = await this.getPreferences();
    return this.prisma.appPreference.update({
      where: { id: prefs.id },
      data
    });
  }

  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        is_active: true,
        created_at: true
      }
    });
  }
}

module.exports = PrismaSettingRepository;
