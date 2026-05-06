class ChatRepository {
  async create(chat) {
    throw new Error('Not implemented');
  }

  async findByConversation(conversationId, { limit = 50, offset = 0 } = {}) {
    throw new Error('Not implemented');
  }

  async countByConversation(conversationId) {
    throw new Error('Not implemented');
  }

  async findById(id) {
    throw new Error('Not implemented');
  }

  async update(id, attrs) {
    throw new Error('Not implemented');
  }

  async delete(id) {
    throw new Error('Not implemented');
  }
}

module.exports = ChatRepository;
