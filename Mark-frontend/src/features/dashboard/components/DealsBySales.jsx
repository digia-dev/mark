import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

const DealsBySales = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm animate-pulse">
        <div className="h-4 bg-gray-100 rounded w-1/4 mb-6" />
        <div className="h-64 bg-gray-50 rounded" />
      </div>
    );
  }

  const chartData = data || [
    { name: 'Andi Pratama', deals: 12, revenue: 320 },
    { name: 'Budi Santoso', deals: 8, revenue: 210 },
    { name: 'Cahya Putra', deals: 7, revenue: 180 },
    { name: 'Deni Malik', deals: 5, revenue: 140 },
  ];

  const colors = ['#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm h-full">
      <h3 className="font-bold text-gray-900 mb-6">Deals by Sales</h3>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#F1F5F9" />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{fontSize: 11, fill: '#64748B', fontWeight: 600}}
              width={100}
            />
            <Tooltip 
              cursor={{fill: '#F8FAFC'}}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="deals" name="Total Deals" radius={[0, 4, 4, 0]} barSize={24}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-around border-t border-gray-50 pt-4">
        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Total Sales</p>
          <p className="text-sm font-black text-gray-900 leading-none">12 Person</p>
        </div>
        <div className="h-6 w-px bg-gray-100" />
        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Avg. Deals</p>
          <p className="text-sm font-black text-blue-900 leading-none">8.2 / Sales</p>
        </div>
      </div>
    </div>
  );
};

export default DealsBySales;
