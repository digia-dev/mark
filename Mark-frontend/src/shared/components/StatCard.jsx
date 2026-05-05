import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, trendLabel, color = 'blue' }) => {
  // Pastel colors map
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
    gray: 'bg-gray-50 text-gray-600',
  };

  const bgClass = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-full ${bgClass}`}>
          <Icon size={24} />
        </div>
        
        {trend !== undefined && (
          <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
            trend > 0 ? 'bg-green-50 text-green-700' : 
            trend < 0 ? 'bg-red-50 text-red-700' : 
            'bg-gray-50 text-gray-700'
          }`}>
            {trend > 0 ? '▲' : trend < 0 ? '▼' : '−'} {Math.abs(trend)}%
          </div>
        )}
      </div>
      
      <div>
        <h4 className="text-gray-500 font-medium text-sm mb-1">{title}</h4>
        <div className="text-2xl font-black text-gray-900">{value}</div>
        
        {trendLabel && (
          <p className="text-xs text-gray-400 mt-2">{trendLabel}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
