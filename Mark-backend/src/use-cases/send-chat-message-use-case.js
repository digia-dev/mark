class SendChatMessageUseCase {
  constructor({ chatRepository }) {
    this.chatRepository = chatRepository;
  }

  async execute({ conversationId, senderId, message, type = 'text', metadata = null }) {
    if (!conversationId) throw { code: 'VALIDATION_ERROR', message: 'conversationId is required' };
    if (!senderId) throw { code: 'VALIDATION_ERROR', message: 'senderId is required' };
    if (!message) throw { code: 'VALIDATION_ERROR', message: 'message is required' };

    const created = await this.chatRepository.create({
      conversation_id: conversationId,
      sender_id: senderId,
      message,
      type,
      metadata
    });

    return created;
  }
}

module.exports = SendChatMessageUseCase;
