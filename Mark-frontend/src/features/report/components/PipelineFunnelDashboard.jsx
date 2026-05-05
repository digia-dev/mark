import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LabelList } from 'recharts';

const PipelineFunnelDashboard = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm animate-pulse h-full">
        <div className="h-4 bg-gray-50 rounded w-1/2 mb-8" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-10 bg-gray-50/50 rounded-xl" style={{ width: `${100 - i * 15}%`, margin: '0 auto' }} />
          ))}
        </div>
      </div>
    );
  }

  // Colors for different stages
  const colors = ['#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'];

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm h-full flex flex-col group hover:border-blue-900/20 transition-all">
      <div className="mb-8">
        <h3 className="font-black text-gray-900 text-lg tracking-tight">Pipeline Funnel</h3>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Konversi Leads ke Closing</p>
      </div>

      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="stage" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 10, fontStyle: 'bold', fill: '#64748B', fontWeight: 900 }}
              width={100}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="count" radius={[0, 12, 12, 0]} barSize={32}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
              <LabelList dataKey="count" position="right" style={{ fontSize: 11, fontWeight: 900, fill: '#1E3A8A' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100/50">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Total Leads</span>
          <span className="text-xl font-black text-gray-900">{data.reduce((acc, curr) => acc + curr.count, 0)}</span>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100/50">
          <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-1">Win Rate</span>
          <span className="text-xl font-black text-blue-900">24.8%</span>
        </div>
      </div>
    </div>
  );
};

export default PipelineFunnelDashboard;
