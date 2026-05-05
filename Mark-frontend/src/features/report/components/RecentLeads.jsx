import React from 'react';

const RecentLeads = ({ leads, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm animate-pulse h-full">
        <div className="h-4 bg-gray-50 rounded w-1/2 mb-8" />
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-50 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm h-full group hover:border-blue-900/20 transition-all flex flex-col">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h3 className="font-black text-gray-900 text-lg tracking-tight">Recent Leads</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">3 Potensi Pelanggan Terbaru</p>
        </div>
      </div>

      <div className="space-y-6 flex-1">
        {leads?.map((lead, i) => (
          <div key={i} className="flex items-center gap-4 group/item cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-black text-sm shadow-lg group-hover/item:scale-110 transition-all">
              {lead.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-black text-gray-900 truncate">{lead.name}</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase truncate mt-0.5">{lead.company}</p>
            </div>
            <div className="text-right">
              <div className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${lead.status === 'new' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-500'}`}>
                {lead.status}
              </div>
              <div className="text-[9px] font-bold text-gray-300 mt-1 uppercase">
                {new Date(lead.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-8 w-full py-3 bg-gray-50 text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-gray-900 hover:text-white transition-all">
        Semua Leads →
      </button>
    </div>
  );
};

export default RecentLeads;
