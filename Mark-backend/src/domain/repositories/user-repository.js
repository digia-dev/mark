class UserRepository {
  async findById(id) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }

  async findByEmail(email) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }

  async findAll(filters) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }

  async create(data) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }

  async update(id, data) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }

  async delete(id) {
    throw new Error('METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = UserRepository;
