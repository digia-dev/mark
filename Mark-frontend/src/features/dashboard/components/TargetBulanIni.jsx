import React from 'react';
import { TrendingUp, Target } from 'lucide-react';

const TargetBulanIni = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm animate-pulse">
        <div className="h-4 bg-gray-100 rounded w-1/2 mb-6" />
        <div className="flex justify-center my-6">
          <div className="w-32 h-32 bg-gray-50 rounded-full" />
        </div>
      </div>
    );
  }

  const { target = 1000000000, achieved = 0, percentage = 0 } = data || {};

  const formatCurrency = (val) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);

  // SVG Circle calculation
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <Target size={16} className="text-orange-500" />
          Target
        </h3>
        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Mei 2025</span>
      </div>

      <div className="relative flex items-center justify-center mb-6">
        <svg className="w-40 h-40 transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-gray-100"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-out' }}
            strokeLinecap="round"
            className="text-blue-900"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-black text-gray-900 leading-none">{percentage}%</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Achieved</span>
        </div>
      </div>

      <div className="w-full space-y-3">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Target</p>
            <p className="text-sm font-bold text-gray-800 leading-none">{formatCurrency(target)}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Realisasi</p>
            <p className="text-sm font-bold text-orange-600 leading-none">{formatCurrency(achieved)}</p>
          </div>
        </div>

        <button className="w-full py-2.5 text-xs font-bold text-blue-700 hover:text-white hover:bg-blue-700 border border-blue-100 hover:border-blue-700 rounded-xl transition-all flex items-center justify-center gap-2">
          Lihat Detail Target
          <TrendingUp size={14} />
        </button>
      </div>
    </div>
  );
};

export default TargetBulanIni;
