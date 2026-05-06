import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Plus, Bell, MessageSquare, ChevronDown, 
  Menu, LogOut, User, Settings as SettingsIcon 
} from 'lucide-react';
import useAuthStore from '../../../features/auth/store/auth-store';
import { useLogout } from '../../../features/auth/hooks/use-auth';
import { useNotifications } from '../../../features/notification/hooks/use-notifications';
import NotificationPanel from '../../../features/notification/components/NotificationPanel';
import ChatDrawer from '../ChatDrawer';
import useChat from '../../hooks/use-chat';

// Chat button component
const ChatButton = () => {
  const [open, setOpen] = useState(false);
  const { unreadCount } = useChat();
  return (
    <>
      <button aria-label="Messages" onClick={() => setOpen(true)} className="relative p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
        <MessageSquare size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </button>
      <ChatDrawer isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

const Topbar = ({ toggleSidebar, onOpenSearch }) => {
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();
  const { data: notifications = [] } = useNotifications();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isQuickOpen, setIsQuickOpen] = useState(false);
  const navigate = useNavigate();
  const searchHintRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const quickAddItems = [
    { label: 'Customer Baru', path: '/crm/customers/new' },
    { label: 'Lead Baru', path: '/crm/leads/new' },
    { label: 'Deal Baru', path: '/pipeline/new' },
    { label: 'Quotation', path: '/quotation/new' },
    { label: 'Presentation', path: '/presentation/new' },
    { label: 'Trouble Ticket', path: '/trouble-ticket/new' },
    { label: 'Invoice', path: '/invoice/new' },
    { label: 'Produk/Service', path: '/products/new' },
    { label: 'Instalasi', path: '/timeline/new' },
  ];

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handler = (e) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (typeof onOpenSearch === 'function') onOpenSearch();
        // briefly highlight hint
        if (searchHintRef.current) {
          searchHintRef.current.classList.add('ring-2', 'ring-blue-200');
          setTimeout(() => searchHintRef.current && searchHintRef.current.classList.remove('ring-2', 'ring-blue-200'), 400);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onOpenSearch]);

  // Close quick add on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!e.target.closest || !e.target.closest('.quick-add-root')) return;
      // if click inside quick-add-root, do nothing
      const inside = e.target.closest('.quick-add-root');
      if (!inside) setIsQuickOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const displayUnread = unreadCount > 9 ? '9+' : unreadCount;

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-20 relative">
      <div className="flex items-center gap-4 w-full max-w-xl">
        <button 
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors" size={18} aria-hidden />
          <input 
            type="text" 
            aria-label="Search customers, leads, quotations, deals"
            placeholder="Cari customer, lead, quotation, atau deal..." 
            onClick={onOpenSearch}
            readOnly
            className="w-full pl-10 pr-16 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          />
          <div ref={searchHintRef} className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] text-gray-400 font-mono shadow-sm" aria-hidden>
            Ctrl + K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick Add Button */}
        <div className="relative quick-add-root">
          <button 
            aria-haspopup="true"
            aria-expanded={isQuickOpen}
            onClick={() => setIsQuickOpen(prev => !prev)}
            onKeyDown={(e) => { if (e.key === 'Escape') setIsQuickOpen(false); }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-all hover:border-orange-200"
            aria-label="Tambah cepat"
            title="Tambah Cepat"
          >
            <div className="bg-orange-500 text-white rounded-full p-0.5"><Plus size={14}/></div>
            <span className="hidden lg:inline">Tambah Cepat</span>
            <ChevronDown size={14} className="ml-1 text-gray-400" />
          </button>
          
          {/* Dropdown Menu */}
          {isQuickOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-[60]" role="menu">
              {quickAddItems.map((item) => (
                <button 
                  key={item.label} 
                  onClick={() => { navigate(item.path); setIsQuickOpen(false); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  role="menuitem"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications & Messages */}
        <div className="flex items-center gap-1 border-r border-gray-200 pr-4 relative">
          <button 
            aria-label={`Notifications (${unreadCount} unread)`}
            className="relative p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {displayUnread}
              </span>
            )}
          </button>
          
          {/* Notification Popover */}
          {isNotifOpen && (
            <div className="absolute top-full mt-4 right-10 z-50">
               <NotificationPanel onClose={() => setIsNotifOpen(false)} />
            </div>
          )}

          <ChatButton />
        </div>

        {/* User Profile */}
        <div className="relative group pl-2">
          <button aria-label="User menu" className="flex items-center gap-3 p-1 hover:bg-gray-50 rounded-lg transition-all">
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 overflow-hidden">
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=1E3A8A&color=fff`} alt={user?.name || 'User'} />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-semibold text-gray-800 leading-tight">{user?.name || 'Administrator'}</span>
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{user?.role || 'Super Admin'}</span>
            </div>
            <ChevronDown size={16} className="text-gray-400 ml-1" />
          </button>

          {/* User Dropdown (kept hover behavior for now) */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 z-[60]">
            <button 
              onClick={() => navigate('/profile')}
              className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2"
            >
              <User size={16} /> Profil Saya
            </button>
            <button 
              onClick={() => navigate('/settings')}
              className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2"
            >
              <SettingsIcon size={16} /> Pengaturan Akun
            </button>
            <hr className="my-1 border-gray-100" />
            <button 
              onClick={() => logout()}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <LogOut size={16} /> Keluar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
