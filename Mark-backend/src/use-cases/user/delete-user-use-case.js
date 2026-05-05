class DeleteUserUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    return this.userRepository.delete(id);
  }
}

module.exports = DeleteUserUseCase;
