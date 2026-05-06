const SendChatDto = require('../send-chat-dto');

class ChatController {
  constructor({ sendChatMessageUseCase, listChatMessagesUseCase }) {
    this.sendChatMessageUseCase = sendChatMessageUseCase;
    this.listChatMessagesUseCase = listChatMessagesUseCase;

    this.sendMessage = this.sendMessage.bind(this);
    this.listMessages = this.listMessages.bind(this);
  }

  async sendMessage(req, res) {
    try {
      const parsed = SendChatDto.parse(req.body);
      const senderId = req.user && req.user.id ? req.user.id : null;
      if (!senderId) return res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });

      const created = await this.sendChatMessageUseCase.execute({
        conversationId: parsed.conversationId,
        senderId,
        message: parsed.message,
        type: parsed.type,
        metadata: parsed.metadata
      });

      // emit via socket if available
      try {
        const socketService = require('../../infrastructure/services/socket-service');
        const io = socketService.getIo();
        if (io) {
          io.to(`conversation-${parsed.conversationId}`).emit('chat:new', created);
        }
      } catch (emitErr) {
        // emit failure should not block response
        console.warn('Socket emit failed', emitErr);
      }

      res.json({ success: true, data: created });
    } catch (err) {
      if (err.code === 'VALIDATION_ERROR' || err.name === 'ZodError') {
        return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: err.message || err.errors } });
      }
      console.error(err);
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
    }
  }

  async listMessages(req, res) {
    try {
      const conversationId = parseInt(req.query.conversationId, 10);
      const page = parseInt(req.query.page || '1', 10);
      const limit = parseInt(req.query.limit || '50', 10);

      const result = await this.listChatMessagesUseCase.execute({ conversationId, page, limit });
      res.json({ success: true, data: result.items, meta: result.meta });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } });
    }
  }
}

module.exports = ChatController;
