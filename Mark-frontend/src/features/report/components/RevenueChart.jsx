import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, Line, LineChart 
} from 'recharts';
import { ChevronDown, MoreVertical } from 'lucide-react';

const RevenueChart = ({ data = [], isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm animate-pulse">
        <div className="h-4 bg-gray-50 rounded w-1/4 mb-6" />
        <div className="h-64 bg-gray-50/50 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm group hover:border-blue-900/20 transition-all">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-black text-gray-900 text-lg tracking-tight">Revenue Analytics</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Performa Pendapatan vs Target</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 flex items-center gap-2 text-[10px] font-black text-gray-500 cursor-pointer hover:bg-white transition-all uppercase tracking-widest">
            12 Bulan Terakhir <ChevronDown size={14}/>
          </div>
          <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-all">
            <MoreVertical size={18}/>
          </button>
        </div>
      </div>
      
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fontSize: 10, fill: '#94A3B8', fontWeight: 800, textAnchor: 'middle'}}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fontSize: 10, fill: '#94A3B8', fontWeight: 800}}
              tickFormatter={(value) => `Rp ${value}jt`}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '24px', 
                border: '1px solid #F1F5F9', 
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                padding: '16px'
              }}
              itemStyle={{ fontSize: '12px', fontWeight: 900 }}
              labelStyle={{ fontSize: '10px', fontWeight: 900, color: '#94A3B8', marginBottom: '8px', textTransform: 'uppercase' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              name="Revenue Realisasi" 
              stroke="#1E3A8A" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              activeDot={{ r: 8, strokeWidth: 0, fill: '#1E3A8A' }}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              name="Target Pendapatan" 
              stroke="#F97316" 
              strokeWidth={3}
              strokeDasharray="8 8"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Average Growth</span>
            <span className="text-sm font-black text-green-600">+12.4%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Target Achievement</span>
            <span className="text-sm font-black text-blue-900">94.2%</span>
          </div>
        </div>
        <button className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline">
          Detail Laporan Keuangan →
        </button>
      </div>
    </div>
  );
};

export default RevenueChart;
