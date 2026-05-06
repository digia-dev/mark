import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Briefcase, Settings, UserPlus, 
  CheckCircle2, Clock, AlertCircle, ShoppingCart 
} from 'lucide-react';

const iconConfig = {
  'lead': { icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-50', path: '/crm/leads' },
  'deal': { icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-50', path: '/pipeline' },
  'quotation': { icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50', path: '/quotation' },
  'installation': { icon: Settings, color: 'text-green-600', bg: 'bg-green-50', path: '/timeline' },
  'trouble-ticket': { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', path: '/trouble-ticket' },
  'invoice': { icon: ShoppingCart, color: 'text-emerald-600', bg: 'bg-emerald-50', path: '/invoice' }
};

const RecentActivity = ({ activities, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm animate-pulse h-full">
        <div className="h-4 bg-gray-50 rounded w-1/3 mb-8" />
        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-2xl" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-50 rounded w-3/4" />
                <div className="h-2 bg-gray-50 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm h-full flex flex-col group hover:border-blue-900/20 transition-all">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-black text-gray-900 text-lg tracking-tight">Recent Activity</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Log Aktivitas Sistem Terbaru</p>
        </div>
        <button 
          onClick={() => navigate('/activity-logs')}
          className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline"
        >
          Lihat Semua
        </button>
      </div>

      <div className="flex-1 space-y-6">
        {activities.map((activity, i) => {
          const config = iconConfig[activity.module] || { icon: Clock, color: 'text-gray-600', bg: 'bg-gray-50', path: '/activity-logs' };
          return (
            <div key={i} className="flex gap-4 group/item">
              <div 
                onClick={() => navigate(config.path)}
                className={`w-10 h-10 shrink-0 rounded-2xl ${config.bg} ${config.color} flex items-center justify-center shadow-sm group-hover/item:scale-110 transition-all cursor-pointer active:scale-95`}
              >
                <config.icon size={18} />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-gray-900 leading-relaxed">
                  <span className="font-black">{activity.user}</span> {activity.action} {activity.module}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                    {new Date(activity.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                  </span>
                  <div className="w-1 h-1 rounded-full bg-gray-200" />
                  <span 
                    onClick={() => navigate(config.path)}
                    className="text-[10px] font-black text-blue-900 uppercase tracking-tight group-hover/item:underline cursor-pointer"
                  >
                    Detail
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
