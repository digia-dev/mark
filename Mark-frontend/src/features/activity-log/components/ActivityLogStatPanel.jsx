import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Activity, ShieldCheck, Server } from 'lucide-react';

const ActivityLogStatPanel = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm animate-pulse h-full flex flex-col gap-8">
        <div className="h-4 bg-gray-50 rounded w-1/2" />
        <div className="h-48 bg-gray-50 rounded-full w-48 mx-auto" />
        <div className="h-40 bg-gray-50 rounded-2xl w-full" />
      </div>
    );
  }

  const moduleColors = {
    'Lead': '#2563EB',
    'Deal': '#F97316',
    'Quotation': '#9333EA',
    'Invoice': '#10B981',
    'Trouble-ticket': '#EF4444',
    'Installation': '#059669',
    'Auth': '#6366F1'
  };

  const moduleData = stats?.byModule?.map(m => ({
    name: m.name,
    value: m.value,
    color: moduleColors[m.name] || '#94A3B8'
  })) || [];

  const actionData = stats?.byAction?.map(a => ({
    action: a.name,
    count: a.count
  })) || [];

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm h-full group hover:border-blue-900/10 transition-all flex flex-col">
      <div className="mb-8">
        <h3 className="font-black text-gray-900 text-lg tracking-tight">Security & Audit Stats</h3>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Ringkasan Aktivitas Sistem</p>
      </div>

      <div className="flex-1 flex flex-col gap-10">
         {/* System Health Indicators */}
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
               <ShieldCheck size={20} className="text-green-600 mb-2" />
               <span className="text-[10px] font-black text-green-600 uppercase tracking-widest block mb-1">System Status</span>
               <span className="text-sm font-black text-green-900">Secure</span>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
               <Server size={20} className="text-blue-600 mb-2" />
               <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Server Load</span>
               <span className="text-sm font-black text-blue-900">Normal</span>
            </div>
         </div>

         {/* Module Distribution */}
         <div>
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Aktivitas per Modul</h4>
            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moduleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {moduleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                     itemStyle={{ fontSize: '12px', fontWeight: 900 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-2xl font-black text-gray-900">{stats?.recentActivityCount || 0}</span>
                 <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Logs</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
               {moduleData.map(mod => (
                  <div key={mod.name} className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded border border-gray-100">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: mod.color }} />
                     <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{mod.name}</span>
                  </div>
               ))}
            </div>
         </div>

         {/* Action Distribution */}
         <div>
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Frekuensi Aksi</h4>
            <div className="h-40">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={actionData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                   <XAxis dataKey="action" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 900, fill: '#94A3B8'}} />
                   <YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 900, fill: '#94A3B8'}} />
                   <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                   <Bar dataKey="count" fill="#1E3A8A" radius={[4, 4, 0, 0]} barSize={20} />
                 </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ActivityLogStatPanel;
