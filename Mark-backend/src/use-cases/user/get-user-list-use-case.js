class GetUserListUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute(filters) {
    const users = await this.userRepository.findAll(filters);
    
    // Hilangkan password_hash dari list
    return users.map(user => {
      const { password_hash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
}

module.exports = GetUserListUseCase;
