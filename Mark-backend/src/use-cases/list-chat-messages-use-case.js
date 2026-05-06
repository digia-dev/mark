class ListChatMessagesUseCase {
  constructor({ chatRepository }) {
    this.chatRepository = chatRepository;
  }

  async execute({ conversationId, page = 1, limit = 50 }) {
    if (!conversationId) throw { code: 'VALIDATION_ERROR', message: 'conversationId is required' };
    const offset = (page - 1) * limit;
    const items = await this.chatRepository.findByConversation(conversationId, { limit, offset });
    const total = await this.chatRepository.countByConversation(conversationId);

    return {
      items,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    };
  }
}

module.exports = ListChatMessagesUseCase;
