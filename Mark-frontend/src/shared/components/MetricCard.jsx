import React from 'react';

const MetricCard = ({ icon, bg, title, value, trend, trendValue, subtext, isWarning, isLoading, onClick }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm animate-pulse">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 bg-gray-100 rounded-xl mt-1 shrink-0" />
          <div className="flex-1">
            <div className="h-3 bg-gray-100 rounded w-1/2 mb-2" />
            <div className="h-6 bg-gray-100 rounded w-3/4 mb-2" />
            <div className="h-2 bg-gray-100 rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex items-start gap-4 transition-all hover:shadow-md group ${onClick ? 'cursor-pointer active:scale-95' : ''}`}
    >
      <div className={`p-3 rounded-xl ${bg} mt-1 shrink-0 transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider mb-1 truncate">{title}</p>
        <div className="flex items-end gap-2 mb-1">
          <h2 className="text-lg font-bold text-gray-800 leading-none">{value}</h2>
          {!isWarning && trend && (
            <span className={`flex items-center text-[10px] font-bold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trend === 'up' ? '▲' : '▼'} {trendValue}
            </span>
          )}
        </div>
        <p className="text-[10px] text-gray-400 truncate">{subtext}</p>
      </div>
    </div>
  );
};

export default MetricCard;
