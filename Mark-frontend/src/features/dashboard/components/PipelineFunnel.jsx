import React from 'react';
import { ChevronDown } from 'lucide-react';

const FunnelLayer = ({ label, count, width, color }) => (
  <div className="flex items-center w-full group cursor-pointer">
    <div className="w-20 text-right pr-3 text-[10px]">
      <p className="font-bold text-gray-700 leading-tight">{label}</p>
      <p className="text-gray-400 font-medium">({count})</p>
    </div>
    <div className="flex-1 flex justify-center">
      <div 
        className={`h-9 ${color} text-white flex items-center justify-center text-[11px] font-bold transition-all group-hover:brightness-110 shadow-sm`} 
        style={{ 
          width, 
          clipPath: 'polygon(0 0, 100% 0, 92% 100%, 8% 100%)' 
        }}
      >
        {count}
      </div>
    </div>
  </div>
);

const PipelineFunnel = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm animate-pulse flex flex-col">
        <div className="h-4 bg-gray-100 rounded w-1/2 mb-8" />
        <div className="flex-1 space-y-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-9 bg-gray-50 rounded w-full" />
          ))}
        </div>
      </div>
    );
  }

  const funnelData = data || [
    { label: 'Prospek', count: 0, width: '100%', color: 'bg-blue-900' },
    { label: 'Negosiasi', count: 0, width: '85%', color: 'bg-blue-700' },
    { label: 'Penawaran', count: 0, width: '70%', color: 'bg-orange-500' },
    { label: 'Closing', count: 0, width: '55%', color: 'bg-green-600' },
    { label: 'Instalasi', count: 0, width: '40%', color: 'bg-red-500' },
  ];

  // Dynamic mapping if data is coming from API
  const colors = ['bg-blue-900', 'bg-blue-700', 'bg-orange-500', 'bg-green-600', 'bg-red-500'];
  const widths = ['100%', '85%', '70%', '55%', '40%'];

  const normalizedData = Array.isArray(data) ? data.map((item, index) => ({
    label: item.stage || item.label,
    count: item.count,
    width: widths[index] || '40%',
    color: colors[index] || 'bg-gray-400'
  })) : funnelData;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900">Pipeline Funnel</h3>
        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 cursor-pointer hover:text-blue-600 uppercase tracking-wider transition-colors">
          Semua Pipeline <ChevronDown size={12}/>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center gap-1.5 py-4">
        {normalizedData.map((layer, index) => (
          <FunnelLayer 
            key={index}
            label={layer.label}
            count={layer.count}
            width={layer.width}
            color={layer.color}
          />
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-sm font-bold">
        <span className="text-gray-400 text-[11px] uppercase tracking-wider">Conversion Rate</span>
        <span className="text-blue-900 font-black">8,41%</span>
      </div>
    </div>
  );
};

export default PipelineFunnel;
