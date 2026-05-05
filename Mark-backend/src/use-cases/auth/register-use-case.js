const User = require('../../domain/entities/user');

class RegisterUseCase {
  constructor({ userRepository, bcryptService }) {
    this.userRepository = userRepository;
    this.bcryptService = bcryptService;
  }

  async execute(userData) {
    // 1. Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // 2. Hash password
    const passwordHash = await this.bcryptService.hash(userData.password);

    // 3. Create user data object
    const newUser = {
      name: userData.name,
      email: userData.email,
      password_hash: passwordHash,
      role: userData.role || 'sales', // Default role
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    };

    // 4. Save to repository
    return await this.userRepository.create(newUser);
  }
}

module.exports = RegisterUseCase;
