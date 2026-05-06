import { useEffect, useState, useCallback } from 'react';
import chatService from '../utils/chat-service';

export default function useChat() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const init = useCallback(async () => {
    chatService.initSocket();
    const resp = await chatService.fetchConversations();
    setConversations(resp.data || []);

    chatService.onNewMessage((msg) => {
      // add/update conversation
      setConversations((prev) => {
        const found = prev.find(c => c.conversationId === msg.conversation_id);
        if (found) {
          return prev.map(c => c.conversationId === msg.conversation_id ? { ...c, lastMessage: msg.message, lastAt: msg.created_at } : c);
        }
        return [{ conversationId: msg.conversation_id, lastMessage: msg.message, lastAt: msg.created_at }, ...prev];
      });

      // if active conversation, append message
      setMessages((prev) => {
        if (activeConversation && activeConversation.conversationId === msg.conversation_id) {
          return [...prev, msg];
        }
        return prev;
      });
    });
  }, [activeConversation]);

  useEffect(() => {
    return () => { chatService.disconnectSocket(); };
  }, []);

  const selectConversation = async (conversation) => {
    setActiveConversation(conversation);
    await chatService.initSocket();
    chatService.joinConversation(conversation.conversationId);
    const resp = await chatService.fetchMessages({ conversationId: conversation.conversationId });
    setMessages(resp.data || []);
  };

  const sendMessage = (payload) => {
    chatService.sendMessageSocket(payload);
  };

  const unreadCount = conversations.length; // placeholder

  return { conversations, unreadCount, selectConversation, activeConversation, messages, sendMessage, init };
}
