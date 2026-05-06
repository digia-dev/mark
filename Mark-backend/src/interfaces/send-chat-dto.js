const { z } = require('zod');

const SendChatDto = z.object({
  conversationId: z.number().int().positive(),
  message: z.string().min(1),
  type: z.string().optional(),
  metadata: z.any().optional()
});

module.exports = SendChatDto;
