import React from 'react';
import { Bell, Check, Clock, UserPlus, Briefcase, FileText, Settings, AlertCircle, ShoppingCart } from 'lucide-react';
import { useNotifications, useMarkAsRead } from '../hooks/use-notifications';

const iconConfig = {
  'lead': { icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-50' },
  'deal': { icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-50' },
  'quotation': { icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
  'installation': { icon: Settings, color: 'text-green-600', bg: 'bg-green-50' },
  'trouble-ticket': { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  'invoice': { icon: ShoppingCart, color: 'text-emerald-600', bg: 'bg-emerald-50' }
};

const NotificationPanel = () => {
  const { data: notifications = [], isLoading } = useNotifications();
  const { mutate: markAsRead } = useMarkAsRead();

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (isLoading) {
    return <div className="p-4 text-center text-gray-400 text-sm">Loading notifications...</div>;
  }

  return (
    <div className="w-80 max-h-[480px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
      <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <div className="flex items-center gap-2">
           <h3 className="font-black text-gray-900 text-sm">Pemberitahuan</h3>
           {unreadCount > 0 && (
             <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-sm shadow-red-600/20">
               {unreadCount} Baru
             </span>
           )}
        </div>
        <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline">
          Tandai Semua Dibaca
        </button>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
        {notifications.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
             <Bell size={32} className="text-gray-200 mb-2" />
             <p className="text-xs font-bold text-gray-400">Tidak ada notifikasi baru</p>
          </div>
        ) : (
          notifications.map((notif) => {
            const config = iconConfig[notif.type] || { icon: Bell, color: 'text-gray-400', bg: 'bg-gray-50' };
            return (
              <div 
                key={notif.id} 
                className={`p-4 hover:bg-gray-50 transition-all cursor-pointer group flex gap-3 ${!notif.is_read ? 'bg-blue-50/30' : ''}`}
                onClick={() => !notif.is_read && markAsRead(notif.id)}
              >
                <div className={`w-10 h-10 shrink-0 rounded-2xl ${config.bg} ${config.color} flex items-center justify-center shadow-sm`}>
                  <config.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-xs font-black truncate ${!notif.is_read ? 'text-gray-900' : 'text-gray-500'}`}>
                    {notif.title}
                  </h4>
                  <p className="text-[11px] font-medium text-gray-400 leading-relaxed mt-0.5 line-clamp-2">
                    {notif.message}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock size={10} className="text-gray-300" />
                    <span className="text-[9px] font-bold text-gray-300 uppercase">
                       {new Date(notif.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                {!notif.is_read && (
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shadow-sm shadow-blue-600/20" />
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="p-4 bg-gray-50/50 border-t border-gray-50 text-center">
        <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-all">
          Lihat Semua Aktivitas
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;
