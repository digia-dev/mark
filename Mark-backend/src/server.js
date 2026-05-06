require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');
const logger = require('./infrastructure/services/logger');
const prisma = require('./infrastructure/database/prisma-client');
const socketService = require('./infrastructure/services/socket-service');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    logger.info('✅ Database connected successfully');

    const server = http.createServer(app);

    // Attach socket.io
    const io = new Server(server, {
      cors: {
        origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
        methods: ['GET', 'POST']
      }
    });

    // Save io instance for controllers to emit
    socketService.setIo(io);

    // authenticate socket connections using JWT in handshake
    const JwtService = require('./infrastructure/services/jwt-service');
    const jwtService = new JwtService();

    io.use((socket, next) => {
      try {
        const token = socket.handshake.auth && socket.handshake.auth.token
          ? socket.handshake.auth.token
          : socket.handshake.headers && socket.handshake.headers.authorization
            ? socket.handshake.headers.authorization.split(' ')[1]
            : null;
        if (!token) return next(new Error('Unauthorized'));
        const payload = jwtService.verifyAccessToken(token);
        socket.user = payload;
        return next();
      } catch (err) {
        return next(new Error('Unauthorized'));
      }
    });

    io.on('connection', (socket) => {
      logger.info('Socket connected: ' + socket.id + ' user:' + (socket.user && socket.user.id));

      socket.on('join', ({ conversationId }) => {
        if (conversationId) {
          const room = `conversation-${conversationId}`;
          socket.join(room);
          socket.emit('joined', { conversationId });
        }
      });

      socket.on('leave', ({ conversationId }) => {
        if (conversationId) {
          const room = `conversation-${conversationId}`;
          socket.leave(room);
          socket.emit('left', { conversationId });
        }
      });

      // allow client to send via socket — server will persist using prisma then emit
      socket.on('send', async (payload) => {
        try {
          const { conversationId, message, type = 'text', metadata = null } = payload || {};
          const senderId = socket.user && socket.user.id;
          if (!conversationId || !message || !senderId) return socket.emit('error', { message: 'invalid_payload' });

          const created = await prisma.chatMessage.create({
            data: {
              conversation_id: conversationId,
              sender_id: senderId,
              message,
              type,
              metadata
            }
          });

          const room = `conversation-${conversationId}`;
          io.to(room).emit('chat:new', created);
        } catch (err) {
          console.error('socket send error', err);
          socket.emit('error', { message: 'internal_error' });
        }
      });

      socket.on('disconnect', (reason) => {
        logger.info('Socket disconnected: ' + socket.id + ' reason: ' + reason);
      });
    });

    server.listen(PORT, () => {
      logger.info(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
