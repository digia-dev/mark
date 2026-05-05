class UpdateUserUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute(id, userData) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    // Jika email diubah, cek keunikan
    if (userData.email && userData.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('EMAIL_ALREADY_EXISTS');
      }
    }

    return this.userRepository.update(id, userData);
  }
}

module.exports = UpdateUserUseCase;
