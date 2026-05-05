import React from 'react';
import { Check, CheckCircle2, User, FileText, AlertCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

const NotificationList = ({ notifications = [], onMarkAsRead, onMarkAllAsRead }) => {
  const getIconForType = (type) => {
    switch (type) {
      case 'lead_assigned': return <User size={16} className="text-blue-600" />;
      case 'deal_stage_changed': return <TrendingUp size={16} className="text-purple-600" />;
      case 'quotation_approved': return <CheckCircle2 size={16} className="text-green-600" />;
      case 'invoice_overdue': return <AlertCircle size={16} className="text-red-600" />;
      case 'ticket_assigned': return <FileText size={16} className="text-orange-600" />;
      default: return <Bell size={16} className="text-gray-600" />;
    }
  };

  const getBgForType = (type) => {
    switch (type) {
      case 'lead_assigned': return 'bg-blue-100';
      case 'deal_stage_changed': return 'bg-purple-100';
      case 'quotation_approved': return 'bg-green-100';
      case 'invoice_overdue': return 'bg-red-100';
      case 'ticket_assigned': return 'bg-orange-100';
      default: return 'bg-gray-100';
    }
  };

  if (!notifications.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-gray-300" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Semua Selesai!</h3>
        <p className="text-sm font-medium text-gray-500 max-w-sm">
          Anda tidak memiliki notifikasi baru. Pantau terus halaman ini untuk pembaruan.
        </p>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
          Daftar Notifikasi
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-[10px]">
              {unreadCount} Baru
            </span>
          )}
        </h3>
        {unreadCount > 0 && (
          <button 
            onClick={onMarkAllAsRead}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
          >
            <Check size={14} /> Tandai semua dibaca
          </button>
        )}
      </div>

      <div className="divide-y divide-gray-50">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 flex gap-4 transition-colors hover:bg-gray-50 group cursor-pointer ${
              !notification.is_read ? 'bg-blue-50/30' : ''
            }`}
            onClick={() => onMarkAsRead(notification.id)}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getBgForType(notification.type)}`}>
              {getIconForType(notification.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2 mb-1">
                <p className={`text-sm truncate ${!notification.is_read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                  {notification.title}
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Clock size={10} />
                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: idLocale })}
                  </span>
                  {!notification.is_read && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                  )}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-500 line-clamp-2 leading-relaxed">
                {notification.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
