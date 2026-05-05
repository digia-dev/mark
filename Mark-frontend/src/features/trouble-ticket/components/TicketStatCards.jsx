import React from 'react';
import { Ticket, CheckCircle2, AlertCircle, Clock, CheckSquare } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col group hover:border-blue-900/10 transition-all">
    <div className={`p-3 rounded-2xl ${color} w-fit mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
      <Icon size={24} />
    </div>
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</span>
    <span className="text-2xl font-black text-gray-900 leading-tight">{value}</span>
  </div>
);

const TicketStatCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
      <StatCard 
        label="Total Tiket" 
        value={stats?.total || 0} 
        icon={Ticket} 
        color="bg-gray-50 text-gray-900"
      />
      <StatCard 
        label="Open" 
        value={stats?.by_status?.open || 0} 
        icon={AlertCircle} 
        color="bg-red-50 text-red-600"
      />
      <StatCard 
        label="In Progress" 
        value={stats?.by_status?.['in-progress'] || 0} 
        icon={Clock} 
        color="bg-blue-50 text-blue-600"
      />
      <StatCard 
        label="Resolved" 
        value={stats?.by_status?.resolved || 0} 
        icon={CheckCircle2} 
        color="bg-emerald-50 text-emerald-600"
      />
      <StatCard 
        label="Closed" 
        value={stats?.by_status?.closed || 0} 
        icon={CheckSquare} 
        color="bg-gray-100 text-gray-500"
      />
      <StatCard 
        label="Avg. Resolusi" 
        value={`${stats?.avg_resolution_minutes || 0}m`} 
        icon={Clock} 
        color="bg-purple-50 text-purple-600"
      />
    </div>
  );
};

export default TicketStatCards;
