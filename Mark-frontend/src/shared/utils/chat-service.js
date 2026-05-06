import axios from '../../lib/axios';

let socket = null;
let onNewMessageCb = null;

async function initSocket() {
  if (socket) return socket;

  // prefer window.io (CDN) if available
  if (typeof window !== 'undefined' && window.io) {
    socket = window.io(import.meta.env.VITE_WS_URL || (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:3000'));
  } else {
    try {
      const mod = await import('socket.io-client');
      const io = mod.io || mod.default || mod;
      socket = io(import.meta.env.VITE_WS_URL || (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:3000'), {
        auth: { token: typeof window !== 'undefined' ? window.localStorage.getItem('token') : null }
      });
    } catch (err) {
      // socket.io-client not installed — fail silently
      socket = null;
      return null;
    }
  }

  if (!socket) return null;

  socket.on('connect', () => {});
  socket.on('chat:new', (msg) => {
    if (typeof onNewMessageCb === 'function') onNewMessageCb(msg);
  });

  return socket;
}

function disconnectSocket() {
  if (socket && typeof socket.disconnect === 'function') socket.disconnect();
  socket = null;
}

function onNewMessage(cb) {
  onNewMessageCb = cb;
}

async function fetchConversations() {
  const resp = await axios.get('/chats/conversations');
  return resp.data || { data: [] };
}

async function fetchMessages({ conversationId, page = 1, perPage = 50 } = {}) {
  const resp = await axios.get(`/chats/${conversationId}/messages`, { params: { page, perPage } });
  return resp.data || { data: [] };
}

async function joinConversation(conversationId) {
  const s = socket || await initSocket();
  if (s && typeof s.emit === 'function') s.emit('join', { conversationId });
}

async function leaveConversation(conversationId) {
  const s = socket;
  if (s && typeof s.emit === 'function') s.emit('leave', { conversationId });
}

function sendMessageSocket(payload) {
  const s = socket;
  if (s && typeof s.emit === 'function') {
    s.emit('send', payload);
    return Promise.resolve();
  }
  // fallback to REST
  return axios.post('/chats/messages', payload).then(r => r.data);
}

async function sendMessageRest(payload) {
  const resp = await axios.post('/chats/messages', payload);
  return resp.data;
}

export default {
  initSocket,
  disconnectSocket,
  onNewMessage,
  fetchConversations,
  fetchMessages,
  joinConversation,
  leaveConversation,
  sendMessageSocket,
  sendMessageRest
};
