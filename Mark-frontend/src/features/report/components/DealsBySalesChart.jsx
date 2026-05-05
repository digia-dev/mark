import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const DealsBySalesChart = ({ data = [], isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm animate-pulse h-full">
        <div className="h-4 bg-gray-50 rounded w-1/3 mb-8" />
        <div className="space-y-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-12 bg-gray-50 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const colors = ['#1E3A8A', '#0F172A', '#334155', '#475569', '#64748B'];

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm h-full group hover:border-blue-900/20 transition-all">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-black text-gray-900 text-lg tracking-tight">Top Performance Sales</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Berdasarkan Total Deals Won</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ left: 40 }}
          >
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 900, fill: '#64748B' }}
              width={100}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="deals" radius={[0, 10, 10, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-4">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100 group/item">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px] font-black">
                {item.name.charAt(0)}
              </div>
              <span className="text-xs font-black text-gray-900">{item.name}</span>
            </div>
            <div className="text-right">
              <div className="text-xs font-black text-gray-900">{item.deals} Deals</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Rp {new Intl.NumberFormat('id-ID').format(item.revenue / 1000000)}jt</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsBySalesChart;
