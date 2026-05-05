import React from 'react';
import { User, Building2, ChevronRight } from 'lucide-react';

const LeadTerbaru = ({ leads, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm animate-pulse">
        <div className="h-4 bg-gray-100 rounded w-1/3 mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-50 rounded w-full" />
                <div className="h-2 bg-gray-50 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <User size={16} className="text-blue-600" />
          Lead Terbaru
        </h3>
        <a href="#" className="text-[11px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest">Semua</a>
      </div>

      <div className="space-y-4">
        {leads?.length > 0 ? leads.map((lead) => (
          <div key={lead.id} className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Building2 size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors">{lead.name}</p>
              <p className="text-[11px] text-gray-400 truncate">{lead.company || 'Personal'}</p>
            </div>
            <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
          </div>
        )) : (
          <div className="text-center py-6">
            <p className="text-xs text-gray-400 font-medium">Belum ada lead baru</p>
          </div>
        )}
      </div>

      <button className="w-full mt-6 py-2 bg-gray-50 text-[11px] font-bold text-gray-500 rounded-lg hover:bg-gray-100 transition-all uppercase tracking-widest">
        Lihat Pipeline Leads
      </button>
    </div>
  );
};

export default LeadTerbaru;
