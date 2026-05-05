class LoginUseCase {
  constructor({ userRepository, refreshTokenRepository, jwtService, bcryptService }) {
    this.userRepository = userRepository;
    this.refreshTokenRepository = refreshTokenRepository;
    this.jwtService = jwtService;
    this.bcryptService = bcryptService;
  }

  async execute({ email, password }) {
    // 1. Validasi user ada
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('EMAIL_NOT_FOUND');
    }

    // 2. Validasi user is_active
    if (!user.is_active) {
      throw new Error('USER_INACTIVE');
    }

    // 3. Verify bcrypt password
    const isPasswordValid = await this.bcryptService.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error('INVALID_PASSWORD');
    }

    // 4. Issue access token (jwt, 8h) + refresh token (jwt, 30d)
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      branch_id: user.branch_id
    };

    const accessToken = this.jwtService.generateAccessToken(payload);
    const refreshToken = this.jwtService.generateRefreshToken(payload);

    // 5. Simpan refresh token ke database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    await this.refreshTokenRepository.create({
      user_id: user.id,
      token: refreshToken,
      expires_at: expiresAt
    });

    // 6. Return data (tanpa password_hash)
    const { password_hash, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken
    };
  }
}

module.exports = LoginUseCase;
