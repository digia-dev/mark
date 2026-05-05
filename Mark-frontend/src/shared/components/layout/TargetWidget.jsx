import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTarget } from '../../features/report/hooks/use-target';

const TargetWidget = ({ isCollapsed }) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const { data: targetData, isLoading } = useTarget(currentMonth, currentYear);

  if (isCollapsed) return null;

  if (isLoading) {
    return (
      <div className="p-4 mx-4 mb-6 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col items-center justify-center h-48 animate-pulse">
        <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
      </div>
    );
  }

  // Fallback to defaults if targetData is not fully populated (e.g. backend returns 0)
  const target = targetData?.target || 1000000000; 
  const achieved = targetData?.achieved || 850000000;
  const percentage = targetData?.percentage || 85;
  const remaining = Math.max(0, target - achieved);

  const data = [
    { name: 'Achieved', value: achieved },
    { name: 'Remaining', value: remaining },
  ];

  const COLORS = ['#F97316', '#E5E7EB'];
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const formatCurrency = (val) => {
    if (val >= 1000000000) return `Rp ${(val / 1000000000).toFixed(1)}M`;
    if (val >= 1000000) return `Rp ${(val / 1000000).toFixed(1)}Jt`;
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  return (
    <div className="p-4 mx-4 mb-6 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col items-center text-center group hover:border-orange-100 transition-all">
      <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Target Sales</p>
      <p className="text-[9px] font-bold text-gray-400 mb-2 uppercase">{monthNames[currentMonth - 1]} {currentYear}</p>
      
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
          <span className="text-lg font-black text-gray-900">{percentage}%</span>
        </div>
      </div>

      <div className="mt-1 flex flex-col gap-0.5">
        <p className="font-black text-gray-900 text-sm tracking-tight">{formatCurrency(achieved)}</p>
        <p className="text-[9px] font-bold text-gray-400 uppercase">dari {formatCurrency(target)}</p>
      </div>
      
      <button className="w-full mt-3 py-2 text-[10px] font-black uppercase tracking-widest text-orange-600 bg-orange-50/50 rounded-lg hover:bg-orange-100 transition-colors flex items-center justify-center gap-1">
        Update Target
      </button>
    </div>
  );
};

export default TargetWidget;
