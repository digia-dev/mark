import React, { useState } from 'react';
import { Plus, Search, Filter, Play, Calendar, Monitor, Users } from 'lucide-react';
import { usePresentations } from '../features/presentation/hooks/use-presentations';

// Components
import PresentationTable from '../features/presentation/components/PresentationTable';

const PresentationPage = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: ''
  });

  const { data, isLoading } = usePresentations(params);

  return (
    <div className="pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Product Presentations</h1>
          <p className="text-sm text-gray-500 font-medium">Jadwalkan dan kelola sesi demo produk ke calon pelanggan</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">
            <Plus size={18} />
            Jadwalkan Demo
          </button>
        </div>
      </div>

      {/* Presentation Cards/Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-linear-to-br from-blue-900 to-blue-800 rounded-[32px] text-white shadow-xl shadow-blue-900/20 group hover:scale-[1.02] transition-all cursor-pointer">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
              <Monitor size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Coming Up</span>
          </div>
          <h3 className="text-lg font-black mb-1">Internet Dedicated Business</h3>
          <p className="text-sm text-white/60 font-bold mb-4">Demo produk untuk PT. Maju Jaya</p>
          <div className="flex items-center gap-2 text-xs font-black bg-white/10 w-fit px-4 py-2 rounded-xl">
             <Calendar size={14} /> Hari Ini, 14:00 WIB
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm group hover:border-orange-500/20 transition-all cursor-pointer">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
              <Users size={24} />
            </div>
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-1">Managed Service SD-WAN</h3>
          <p className="text-sm text-gray-400 font-bold mb-4">Sesi tanya jawab tim IT & Network</p>
          <div className="flex items-center gap-2 text-xs font-black text-orange-600 bg-orange-50 w-fit px-4 py-2 rounded-xl">
             <Calendar size={14} /> Besok, 10:00 WIB
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm flex flex-col items-center justify-center text-center group hover:bg-gray-50 transition-all cursor-pointer border-dashed">
          <div className="p-4 bg-gray-50 text-gray-300 rounded-full mb-4 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
            <Plus size={32} />
          </div>
          <span className="text-sm font-black text-gray-400 group-hover:text-blue-900">Buat Jadwal Baru</span>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input 
            type="text"
            placeholder="Cari no. sesi atau pelanggan..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-blue-900 transition-all font-bold"
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value, page: 1 })}
          />
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-blue-900 appearance-none min-w-[140px]"
            value={params.status}
            onChange={(e) => setParams({ ...params, status: e.target.value, page: 1 })}
          >
            <option value="">Semua Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Main Content: Table */}
      <PresentationTable 
        presentations={data?.data || []} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default PresentationPage;
