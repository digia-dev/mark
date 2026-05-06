class PrismaChatRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async create({ conversation_id, sender_id, message, type = 'text', metadata = null }) {
    const data = await this.prisma.chatMessage.create({
      data: {
        conversation_id,
        sender_id,
        message,
        type,
        metadata
      }
    });
    return data;
  }

  async findByConversation(conversationId, { limit = 50, offset = 0 } = {}) {
    const items = await this.prisma.chatMessage.findMany({
      where: { conversation_id: conversationId },
      orderBy: { created_at: 'asc' },
      skip: offset,
      take: limit
    });
    return items;
  }

  async countByConversation(conversationId) {
    const total = await this.prisma.chatMessage.count({ where: { conversation_id: conversationId } });
    return total;
  }

  async findById(id) {
    return this.prisma.chatMessage.findUnique({ where: { id } });
  }

  async update(id, attrs) {
    return this.prisma.chatMessage.update({ where: { id }, data: attrs });
  }

  async delete(id) {
    return this.prisma.chatMessage.delete({ where: { id } });
  }
}

module.exports = PrismaChatRepository;
