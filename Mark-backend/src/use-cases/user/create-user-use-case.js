class CreateUserUseCase {
  constructor({ userRepository, bcryptService }) {
    this.userRepository = userRepository;
    this.bcryptService = bcryptService;
  }

  async execute(userData) {
    // 1. Validasi email unik
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('EMAIL_ALREADY_EXISTS');
    }

    // 2. Hash password
    const hashedPassword = await this.bcryptService.hash(userData.password || 'password123');

    // 3. Simpan user baru
    const { password, ...dataToSave } = userData;
    return this.userRepository.create({
      ...dataToSave,
      password_hash: hashedPassword
    });
  }
}

module.exports = CreateUserUseCase;
