class RefreshTokenRepository {
  async create(data) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }

  async findByToken(token) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }

  async deleteByToken(token) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }

  async deleteByUserId(userId) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = RefreshTokenRepository;
