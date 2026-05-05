import React from 'react';
import { FileText, Activity, Calendar, DollarSign } from 'lucide-react';

const ActivityItem = ({ icon, bg, text, time }) => (
  <div className="flex gap-4 items-start border-l-2 border-gray-50 ml-3 pl-6 relative pb-6 last:pb-0">
    <div className={`absolute -left-[15px] top-0 w-7 h-7 rounded-full ${bg} flex items-center justify-center shrink-0 shadow-sm border-2 border-white ring-4 ring-white`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-700 leading-relaxed font-medium">
        {typeof text === 'string' ? text : text}
      </p>
      <p className="text-[10px] text-gray-400 mt-1.5 font-bold uppercase tracking-wider">{time}</p>
    </div>
  </div>
);

const ActivityFeed = ({ activities, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm animate-pulse">
        <div className="h-4 bg-gray-100 rounded w-1/3 mb-8" />
        <div className="space-y-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex gap-4">
              <div className="w-7 h-7 bg-gray-50 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-50 rounded w-full" />
                <div className="h-2 bg-gray-50 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getIcon = (action, module) => {
    if (module === 'quotation') return <FileText size={14} className="text-blue-600" />;
    if (module === 'deal') return <Activity size={14} className="text-green-600" />;
    if (module === 'installation') return <Calendar size={14} className="text-purple-600" />;
    if (module === 'invoice') return <DollarSign size={14} className="text-orange-600" />;
    return <Activity size={14} className="text-gray-600" />;
  };

  const getBg = (module) => {
    if (module === 'quotation') return 'bg-blue-50';
    if (module === 'deal') return 'bg-green-50';
    if (module === 'installation') return 'bg-purple-50';
    if (module === 'invoice') return 'bg-orange-50';
    return 'bg-gray-50';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900">Aktivitas Terbaru</h3>
        <a href="#" className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest">Lihat Semua</a>
      </div>
      
      <div className="mt-2">
        {activities?.length > 0 ? activities.map((activity) => (
          <ActivityItem 
            key={activity.id}
            icon={getIcon(activity.action, activity.module)} 
            bg={getBg(activity.module)}
            text={<><b>{activity.user}</b> {activity.action.toLowerCase()} {activity.module}</>}
            time={new Date(activity.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date(activity.time).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
          />
        )) : (
          <div className="text-center py-10">
            <p className="text-sm text-gray-400">Tidak ada aktivitas terbaru</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
