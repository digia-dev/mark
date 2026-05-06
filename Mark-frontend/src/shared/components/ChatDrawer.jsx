import React, { useEffect, useState } from 'react';
import { X, Send, MessageSquare, Phone, Video } from 'lucide-react';
import useChat from '../hooks/use-chat';

const ChatDrawer = ({ isOpen = false, onClose = () => {} }) => {
  const { conversations, unreadCount, selectConversation, activeConversation, messages, sendMessage, init } = useChat();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) init();
  }, [isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || !activeConversation) return;
    
    try {
      sendMessage({ conversationId: activeConversation.conversationId, message: message.trim() });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isOpen}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Chat drawer"
        className={`fixed right-0 top-0 h-full w-[360px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <MessageSquare size={18} />
            <div>
              <h3 className="text-lg font-semibold">Chat</h3>
              <div className="text-xs text-gray-400">{unreadCount} pesan belum dibaca</div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close chat" className="p-2 hover:bg-gray-100 rounded">
            <X size={18} />
          </button>
        </div>

        <div className="flex h-[calc(100%-120px)]">
          {/* Left: conversation list */}
          <div className="w-40 border-r overflow-y-auto">
            <div className="p-3">
              <input placeholder="Cari pesan atau kontak..." className="w-full px-2 py-2 text-sm border rounded" />
            </div>
            <div className="space-y-2 p-2">
              {conversations.map((c) => (
                <button key={c.conversationId} onClick={() => selectConversation(c)} className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 ${activeConversation?.conversationId === c.conversationId ? 'bg-blue-50' : ''}`}>
                  <div className="flex justify-between">
                    <div className="text-sm font-medium text-gray-800">Kontak {c.conversationId}</div>
                    <div className="text-xs text-gray-400">{new Date(c.lastAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </div>
                  <div className="text-xs text-gray-500 truncate">{c.lastMessage}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: messages */}
          <div className="flex-1 flex flex-col">
            <div className="p-3 border-b flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">{activeConversation ? `Percakapan ${activeConversation.conversationId}` : 'Pilih percakapan'}</div>
                <div className="text-xs text-gray-400">{activeConversation ? `Terakhir: ${new Date(activeConversation.lastAt).toLocaleString()}` : ''}</div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => console.log('Call initiated')}
                  className="p-2 rounded hover:bg-gray-50"
                >
                  <Phone size={16} />
                </button>
                <button 
                  onClick={() => console.log('Video initiated')}
                  className="p-2 rounded hover:bg-gray-50"
                >
                  <Video size={16} />
                </button>
              </div>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-3 bg-gray-50">
              {messages.map((m) => (
                <div key={m.id} className={`max-w-[80%] ${m.sender_id === (window?.__USER__?.id || null) ? 'ml-auto text-white bg-blue-600' : 'text-gray-800 bg-white'} rounded-xl px-3 py-2 shadow-sm` }>
                  <div className="text-sm">{m.message}</div>
                  <div className="text-xs text-gray-400 mt-1 text-right">{new Date(m.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-3 border-t flex items-center gap-2">
              <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tulis pesan..." className="flex-1 px-3 py-2 border rounded-lg outline-none" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg"><Send size={16} /></button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ChatDrawer;
