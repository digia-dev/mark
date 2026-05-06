class ChatMessage {
  constructor({ id, conversationId, senderId, message, type = 'text', metadata = null, createdAt = null, updatedAt = null }) {
    this.id = id;
    this.conversationId = conversationId;
    this.senderId = senderId;
    this.message = message;
    this.type = type;
    this.metadata = metadata;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  validate() {
    if (!this.conversationId) throw new Error('conversationId is required');
    if (!this.senderId) throw new Error('senderId is required');
    if (!this.message) throw new Error('message is required');
  }
}

module.exports = ChatMessage;
