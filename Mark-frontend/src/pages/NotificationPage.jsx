import React, { useState } from 'react';
import { Bell, Check, Clock, UserPlus, Briefcase, FileText, Settings, AlertCircle, ShoppingCart, Search, Filter } from 'lucide-react';
import { useNotifications, useMarkAsRead } from '../features/notification/hooks/use-notifications';

const iconConfig = {
  'lead': { icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-50' },
  'deal': { icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-50' },
  'quotation': { icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
  'installation': { icon: Settings, color: 'text-green-600', bg: 'bg-green-50' },
  'trouble-ticket': { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  'invoice': { icon: ShoppingCart, color: 'text-emerald-600', bg: 'bg-emerald-50' }
};

const NotificationPage = () => {
  const { data: notifications = [], isLoading } = useNotifications();
  const { mutate: markAsRead } = useMarkAsRead();
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = notifications.filter(n => {
     if (activeTab === 'unread') return !n.is_read;
     return true;
  });

  return (
    <div className="pb-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Semua Notifikasi</h1>
          <p className="text-sm text-gray-500 font-medium">Pusat pemberitahuan sistem dan aktivitas tim</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline px-4 py-2 bg-blue-50 rounded-xl transition-all">
             Tandai Semua Sudah Dibaca
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-6">
           {/* Filters */}
           <div className="flex gap-2 bg-gray-50 p-1.5 rounded-2xl w-fit border border-gray-100">
              <button 
                 onClick={() => setActiveTab('all')}
                 className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'all' ? 'bg-white text-blue-900 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
              >
                 Semua
              </button>
              <button 
                 onClick={() => setActiveTab('unread')}
                 className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'unread' ? 'bg-white text-blue-900 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
              >
                 Belum Dibaca
              </button>
           </div>

           {/* List */}
           <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-50">
                {isLoading ? (
                  <div className="p-8 text-center text-gray-400">Memuat...</div>
                ) : filteredNotifications.length === 0 ? (
                  <div className="p-16 flex flex-col items-center justify-center text-center">
                     <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <Bell size={32} className="text-gray-300" />
                     </div>
                     <h3 className="text-lg font-black text-gray-900 mb-1">Semua Bersih!</h3>
                     <p className="text-sm text-gray-400 font-medium">Anda tidak memiliki notifikasi baru saat ini.</p>
                  </div>
                ) : (
                  filteredNotifications.map(notif => {
                    const config = iconConfig[notif.type] || { icon: Bell, color: 'text-gray-400', bg: 'bg-gray-50' };
                    return (
                       <div 
                         key={notif.id} 
                         className={`p-6 hover:bg-gray-50 transition-all flex gap-4 ${!notif.is_read ? 'bg-blue-50/20' : ''}`}
                       >
                         <div className={`w-12 h-12 shrink-0 rounded-2xl ${config.bg} ${config.color} flex items-center justify-center shadow-sm`}>
                           <config.icon size={20} />
                         </div>
                         <div className="flex-1 min-w-0">
                           <div className="flex justify-between items-start mb-1">
                              <h4 className={`text-sm font-black truncate ${!notif.is_read ? 'text-gray-900' : 'text-gray-600'}`}>
                                {notif.title}
                              </h4>
                              <span className="text-[10px] font-bold text-gray-400 uppercase whitespace-nowrap ml-4">
                                {new Date(notif.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                              </span>
                           </div>
                           <p className="text-xs font-medium text-gray-500 leading-relaxed mb-3">
                             {notif.message}
                           </p>
                           {!notif.is_read && (
                             <button 
                               onClick={() => markAsRead(notif.id)}
                               className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline flex items-center gap-1"
                             >
                               <Check size={12} /> Tandai Dibaca
                             </button>
                           )}
                         </div>
                       </div>
                    )
                  })
                )}
              </div>
           </div>
        </div>

        <div className="xl:col-span-4">
           {/* Notification Settings Panel */}
           <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 sticky top-24">
              <h3 className="font-black text-gray-900 text-lg mb-6 tracking-tight">Pengaturan Notifikasi</h3>
              
              <div className="space-y-6">
                 {[
                   { id: 1, title: 'Email Notifications', desc: 'Terima ringkasan harian via email' },
                   { id: 2, title: 'Browser Push', desc: 'Notifikasi popup di browser' },
                   { id: 3, title: 'Sound Alert', desc: 'Suara notifikasi untuk tiket penting' }
                 ].map(setting => (
                    <div key={setting.id} className="flex items-center justify-between">
                       <div>
                          <div className="text-sm font-black text-gray-900">{setting.title}</div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase">{setting.desc}</div>
                       </div>
                       <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                          <input type="checkbox" name="toggle" id={`toggle-${setting.id}`} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked={setting.id !== 3}/>
                          <label htmlFor={`toggle-${setting.id}`} className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
