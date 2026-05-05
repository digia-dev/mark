import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TargetWidget = ({ isCollapsed }) => {
  const data = [
    { name: 'Achieved', value: 850000000 },
    { name: 'Remaining', value: 150000000 },
  ];

  const COLORS = ['#F97316', '#E5E7EB'];

  if (isCollapsed) return null;

  return (
    <div className="p-4 mx-4 mb-6 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col items-center text-center">
      <p className="text-sm font-semibold text-gray-700">Target Bulan Ini</p>
      <p className="text-xs text-gray-500 mb-1">Mei 2025</p>
      
      <div className="relative w-28 h-28">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={45}
              startAngle={90}
              endAngle={450}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-800">85%</span>
        </div>
      </div>

      <div className="mt-1">
        <p className="font-bold text-gray-800 text-sm">Rp 850.000.000</p>
        <p className="text-[10px] text-gray-500 mb-3">dari Rp 1.000.000.000</p>
      </div>
      
      <button className="w-full py-1.5 text-[11px] text-blue-600 font-medium border border-blue-50 rounded-md hover:bg-blue-50 transition-colors flex items-center justify-center gap-1 group">
        Lihat Detail Target 
        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </button>
    </div>
  );
};

export default TargetWidget;
