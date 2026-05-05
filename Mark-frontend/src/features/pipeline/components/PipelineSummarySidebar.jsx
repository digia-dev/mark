import React from 'react';
import { ChevronRight } from 'lucide-react';

const PipelineSummarySidebar = ({ totalDeals, totalValue, summary }) => {
  const getStageColor = (stage) => {
    switch (stage) {
      case 'prospek': return 'bg-blue-600';
      case 'negosiasi': return 'bg-orange-500';
      case 'penawaran': return 'bg-purple-600';
      case 'closing': return 'bg-green-600';
      case 'instalasi': return 'bg-cyan-600';
      default: return 'bg-gray-400';
    }
  };

  const getStageLabel = (stage) => {
    switch (stage) {
      case 'prospek': return 'Prospek';
      case 'negosiasi': return 'Negosiasi';
      case 'penawaran': return 'Penawaran';
      case 'closing': return 'Closing';
      case 'instalasi': return 'Instalasi';
      default: return stage;
    }
  };

  return (
    <div className="w-64 shrink-0 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm h-fit">
      <div className="mb-6">
        <h3 className="text-sm font-black text-gray-900 mb-1">Pipeline Summary</h3>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mei 2025</p>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Deals</p>
          <p className="text-2xl font-black text-gray-900 leading-none">{totalDeals}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Value</p>
          <p className="text-lg font-black text-gray-900 leading-none">
            Rp {new Intl.NumberFormat('id-ID').format(totalValue)}
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {summary?.map((item) => (
          <div key={item.stage}>
            <div className="flex justify-between items-center text-[11px] font-bold mb-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${getStageColor(item.stage)}`} />
                <span className="text-gray-600 capitalize">{getStageLabel(item.stage)}</span>
              </div>
              <span className="text-gray-900">{item.count} ({Math.round(item.percentage)}%)</span>
            </div>
            <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getStageColor(item.stage)} rounded-full`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl border border-gray-100 transition-all group">
        Lihat Detail Laporan
        <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};

export default PipelineSummarySidebar;
