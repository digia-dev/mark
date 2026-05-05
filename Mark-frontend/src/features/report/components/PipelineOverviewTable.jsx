import React from 'react';
import { MoreHorizontal, ExternalLink } from 'lucide-react';

const PipelineOverviewTable = ({ data = [], isLoading }) => {
  const stages = [
    { key: 'prospek', label: 'PROSPEK', color: 'border-blue-900', bg: 'bg-blue-900' },
    { key: 'negosiasi', label: 'NEGOSIASI', color: 'border-blue-600', bg: 'bg-blue-600' },
    { key: 'penawaran', label: 'PENAWARAN', color: 'border-blue-400', bg: 'bg-blue-400' },
    { key: 'closing', label: 'CLOSING', color: 'border-green-600', bg: 'bg-green-600' },
    { key: 'instalasi', label: 'INSTALASI', color: 'border-orange-500', bg: 'bg-orange-500' }
  ];

  // Mock data mapping for overview
  const getDealsForStage = (stageKey) => {
    // In real app, this data would come from the API grouped by stage
    return [
      { id: 1, name: 'PT. Maju Jaya', value: 15000000 },
      { id: 2, name: 'Bapak Ahmad', value: 2500000 },
      { id: 3, name: 'Corporate X', value: 85000000 }
    ];
  };

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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {stages.map((stage) => {
          const deals = getDealsForStage(stage.key);
          const totalValue = deals.reduce((acc, d) => acc + d.value, 0);
          
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
                {deals.map((deal) => (
                  <div key={deal.id} className="p-3 rounded-2xl bg-gray-50 border border-transparent hover:border-gray-100 hover:bg-white transition-all cursor-pointer group/item shadow-sm hover:shadow-md">
                    <div className="text-[10px] font-black text-gray-900 truncate mb-1">{deal.name}</div>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-gray-400 uppercase">Rp {(deal.value / 1000000).toFixed(1)}jt</span>
                      <ExternalLink size={10} className="text-gray-300 group-hover/item:text-blue-900" />
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-2 text-[9px] font-black text-blue-900 uppercase tracking-widest hover:bg-blue-50 rounded-xl transition-all mt-2">
                  + 12 Deals Lainnya
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineOverviewTable;
