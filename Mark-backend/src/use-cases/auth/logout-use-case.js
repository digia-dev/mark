class LogoutUseCase {
  constructor({ refreshTokenRepository }) {
    this.refreshTokenRepository = refreshTokenRepository;
  }

  async execute({ refreshToken }) {
    if (!refreshToken) {
      throw new Error('REFRESH_TOKEN_REQUIRED');
    }

    // Hapus refresh token dari database
    await this.refreshTokenRepository.deleteByToken(refreshToken);

    return { success: true };
  }
}

module.exports = LogoutUseCase;
