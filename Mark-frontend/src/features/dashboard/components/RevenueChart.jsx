import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, Line 
} from 'recharts';
import { ChevronDown, MoreVertical } from 'lucide-react';

const RevenueChart = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm animate-pulse">
        <div className="h-4 bg-gray-100 rounded w-1/4 mb-6" />
        <div className="h-64 bg-gray-50 rounded" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">Grafik Revenue</h3>
        <div className="flex items-center gap-2">
          <div className="border border-gray-200 rounded px-2 py-1 flex items-center gap-2 text-[10px] font-bold text-gray-500 cursor-pointer hover:bg-gray-50 uppercase tracking-wider">
            Bulanan <ChevronDown size={12}/>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors">
            <MoreVertical size={16}/>
          </button>
        </div>
      </div>
      
      <div className="h-72 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fontSize: 11, fill: '#64748B', fontWeight: 500}}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fontSize: 11, fill: '#64748B', fontWeight: 500}}
              tickFormatter={(value) => `Rp ${value}jt`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ fontSize: '12px', fontWeight: 600 }}
            />
            <Legend verticalAlign="top" align="left" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingBottom: '20px' }} />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              name="Revenue (Juta)" 
              stroke="#1E3A8A" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line 
              type="monotone" 
              dataKey="target" 
              name="Target (Juta)" 
              stroke="#F97316" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
