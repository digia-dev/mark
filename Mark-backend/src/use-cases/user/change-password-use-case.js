class ChangePasswordUseCase {
  constructor({ userRepository, bcryptService }) {
    this.userRepository = userRepository;
    this.bcryptService = bcryptService;
  }

  async execute(id, { oldPassword, newPassword }) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    // Jika ganti password sendiri, validasi password lama (opsional tergantung flow admin)
    if (oldPassword) {
      const isPasswordValid = await this.bcryptService.compare(oldPassword, user.password_hash);
      if (!isPasswordValid) {
        throw new Error('INVALID_OLD_PASSWORD');
      }
    }

    const hashedPassword = await this.bcryptService.hash(newPassword);
    return this.userRepository.update(id, { password_hash: hashedPassword });
  }
}

module.exports = ChangePasswordUseCase;
