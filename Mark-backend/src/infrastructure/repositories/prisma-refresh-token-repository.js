const RefreshTokenRepository = require('../../domain/repositories/refresh-token-repository');

class PrismaRefreshTokenRepository extends RefreshTokenRepository {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async create(data) {
    return this.prisma.refreshToken.create({
      data
    });
  }

  async findByToken(token) {
    return this.prisma.refreshToken.findUnique({
      where: { token }
    });
  }

  async deleteByToken(token) {
    return this.prisma.refreshToken.delete({
      where: { token }
    }).catch(() => null); // Ignore error if token not found
  }

  async deleteByUserId(userId) {
    return this.prisma.refreshToken.deleteMany({
      where: { user_id: parseInt(userId) }
    });
  }
}

module.exports = PrismaRefreshTokenRepository;
