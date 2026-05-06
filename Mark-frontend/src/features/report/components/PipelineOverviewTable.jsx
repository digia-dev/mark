import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, ExternalLink } from 'lucide-react';

const PipelineOverviewTable = ({ data = {}, isLoading }) => {
  const navigate = useNavigate();
  const stages = [
    { key: 'prospek', label: 'PROSPEK', color: 'border-blue-900', bg: 'bg-blue-900' },
    { key: 'negosiasi', label: 'NEGOSIASI', color: 'border-blue-600', bg: 'bg-blue-600' },
    { key: 'penawaran', label: 'PENAWARAN', color: 'border-blue-400', bg: 'bg-blue-400' },
    { key: 'closing', label: 'CLOSING', color: 'border-green-600', bg: 'bg-green-600' },
    { key: 'instalasi', label: 'INSTALASI', color: 'border-orange-500', bg: 'bg-orange-500' }
  ];

  if (isLoading) {
    return <div className="h-96 bg-gray-50 rounded-[32px] animate-pulse" />;
  }

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm group hover:border-blue-900/10 transition-all">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h3 className="font-black text-gray-900 text-lg tracking-tight">Pipeline Overview</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Detail Transaksi Per Tahapan Pipeline</p>
        </div>
        <button 
          onClick={() => navigate('/pipeline')}
          className="p-2.5 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all"
        >
          <ExternalLink size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {stages.map((stage) => {
          const stageData = data[stage.key] || { deals: [], total: 0 };
          const deals = stageData.deals || [];
          const totalValue = stageData.total || 0;
          
          return (
            <div key={stage.key} className="flex flex-col">
              <div className={`mb-6 pb-4 border-b-2 ${stage.color}`}>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{stage.label}</span>
                  <span className="text-[10px] font-black text-gray-400">{deals.length} DEALS</span>
                </div>
                <div className="text-sm font-black text-gray-900 mt-2">Rp {(totalValue / 1000000).toFixed(1)}jt</div>
              </div>

              <div className="space-y-3">
                {deals.slice(0, 3).map((deal) => (
                  <div 
                    key={deal.id} 
                    onClick={() => navigate(`/pipeline?id=${deal.id}`)}
                    className="p-3 rounded-2xl bg-gray-50 border border-transparent hover:border-gray-100 hover:bg-white transition-all cursor-pointer group/item shadow-sm hover:shadow-md active:scale-95"
                  >
                    <div className="text-[10px] font-black text-gray-900 truncate mb-1">{deal.name}</div>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-gray-400 uppercase">Rp {(deal.value / 1000000).toFixed(1)}jt</span>
                      <ExternalLink size={10} className="text-gray-300 group-hover/item:text-blue-900" />
                    </div>
                  </div>
                ))}
                
                {deals.length > 3 && (
                  <button 
                    onClick={() => navigate('/pipeline')}
                    className="w-full py-2 text-[9px] font-black text-blue-900 uppercase tracking-widest hover:bg-blue-50 rounded-xl transition-all mt-2"
                  >
                    + {deals.length - 3} Deals Lainnya
                  </button>
                )}

                {deals.length === 0 && (
                  <div className="py-4 text-center">
                    <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Kosong</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineOverviewTable;
