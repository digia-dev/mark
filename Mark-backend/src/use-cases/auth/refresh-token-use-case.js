class RefreshTokenUseCase {
  constructor({ refreshTokenRepository, userRepository, jwtService }) {
    this.refreshTokenRepository = refreshTokenRepository;
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  async execute({ refreshToken }) {
    if (!refreshToken) {
      throw new Error('REFRESH_TOKEN_REQUIRED');
    }

    // 1. Verify refresh token (structure & signature)
    let payload;
    try {
      payload = this.jwtService.verifyRefreshToken(refreshToken);
    } catch (err) {
      throw new Error('INVALID_REFRESH_TOKEN');
    }

    // 2. Cek token masih ada di database (tidak di-blacklist/revoked)
    const storedToken = await this.refreshTokenRepository.findByToken(refreshToken);
    if (!storedToken) {
      throw new Error('REFRESH_TOKEN_NOT_FOUND');
    }

    // 3. Cek apakah token sudah expired di database
    if (new Date() > new Date(storedToken.expires_at)) {
      await this.refreshTokenRepository.deleteByToken(refreshToken);
      throw new Error('REFRESH_TOKEN_EXPIRED');
    }

    // 4. Ambil data user terbaru
    const user = await this.userRepository.findById(payload.id);
    if (!user || !user.is_active) {
      throw new Error('USER_NOT_FOUND_OR_INACTIVE');
    }

    // 5. Issue access token baru
    const newPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      branch_id: user.branch_id
    };

    const accessToken = this.jwtService.generateAccessToken(newPayload);

    return { accessToken };
  }
}

module.exports = RefreshTokenUseCase;
