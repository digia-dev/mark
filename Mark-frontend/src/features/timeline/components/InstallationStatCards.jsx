import React from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, List } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col group hover:border-blue-900/10 transition-all">
    <div className={`p-3 rounded-2xl ${color} w-fit mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
      <Icon size={24} />
    </div>
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</span>
    <span className="text-2xl font-black text-gray-900 leading-tight">{value}</span>
  </div>
);

const InstallationStatCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <StatCard 
        label="Total Proyek" 
        value={stats?.total || 0} 
        icon={List} 
        color="bg-gray-50 text-gray-900"
      />
      <StatCard 
        label="Scheduled" 
        value={stats?.scheduled || 0} 
        icon={Calendar} 
        color="bg-blue-50 text-blue-600"
      />
      <StatCard 
        label="On Progress" 
        value={stats?.onProgress || 0} 
        icon={Clock} 
        color="bg-orange-50 text-orange-600"
      />
      <StatCard 
        label="Selesai" 
        value={stats?.done || 0} 
        icon={CheckCircle2} 
        color="bg-emerald-50 text-emerald-600"
      />
      <StatCard 
        label="Tertunda" 
        value={stats?.delayed || 0} 
        icon={AlertCircle} 
        color="bg-red-50 text-red-600"
      />
    </div>
  );
};

export default InstallationStatCards;
