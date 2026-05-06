import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const TargetBulanIni = ({ data = {}, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm animate-pulse">
        <div className="h-4 bg-gray-50 rounded w-1/2 mb-8" />
        <div className="h-32 bg-gray-50 rounded-2xl" />
      </div>
    );
  }

  const percentage = data?.percentage || 0;

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm group hover:border-blue-900/20 transition-all flex flex-col items-center text-center">
      <div className="w-full text-left mb-8 flex justify-between items-start">
        <div>
          <h3 className="font-black text-gray-900 text-lg tracking-tight">Sales Target</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Pencapaian Mei 2025</p>
        </div>
        <button 
          onClick={() => toast.info('Buka Manajemen Target')}
          className="text-[10px] font-black text-blue-900 uppercase tracking-widest hover:underline"
        >
          Edit
        </button>
      </div>

      <div className="relative w-48 h-48 mb-8 cursor-pointer group/chart" onClick={() => navigate('/reports')}>
        <svg className="w-full h-full transform -rotate-90 group-hover/chart:scale-105 transition-all">
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="currentColor"
            strokeWidth="16"
            fill="transparent"
            className="text-gray-50"
          />
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="currentColor"
            strokeWidth="16"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 80}
            strokeDashoffset={2 * Math.PI * 80 * (1 - percentage / 100)}
            className="text-blue-900 transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-gray-900">{percentage}%</span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Achieved</span>
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="flex justify-between items-center p-3 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer" onClick={() => navigate('/invoice')}>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Realisasi</span>
          <span className="text-sm font-black text-gray-900">Rp {(data?.achieved / 1000000).toFixed(1)}jt</span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer" onClick={() => toast.info('Detail Target Tahunan')}>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target</span>
          <span className="text-sm font-black text-gray-400">Rp {(data?.target / 1000000).toFixed(1)}jt</span>
        </div>
        <div className="pt-4 border-t border-gray-50 flex justify-between items-center p-3">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Gap</span>
          <span className="text-sm font-black text-orange-600">-Rp {((data?.target - data?.achieved) / 1000000).toFixed(1)}jt</span>
        </div>
      </div>

      <button 
        onClick={() => navigate('/reports')}
        className="mt-8 w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-2xl text-[10px] font-black text-gray-900 uppercase tracking-widest transition-all shadow-sm active:scale-95"
      >
        Detail Target & Performa
      </button>
    </div>
  );
};

export default TargetBulanIni;
