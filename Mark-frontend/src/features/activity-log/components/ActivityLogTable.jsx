import React, { useState } from 'react';
import { Search, Filter, Calendar, Download, RefreshCw, FileText, Settings, UserPlus, Briefcase, AlertCircle, ShoppingCart } from 'lucide-react';
import { useActivityLogs } from '../hooks/use-activity-logs';

const iconConfig = {
  'lead': { icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-50' },
  'deal': { icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-50' },
  'quotation': { icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
  'installation': { icon: Settings, color: 'text-green-600', bg: 'bg-green-50' },
  'trouble-ticket': { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  'invoice': { icon: ShoppingCart, color: 'text-emerald-600', bg: 'bg-emerald-50' }
};

const ActivityLogTable = () => {
  const [params, setParams] = useState({ page: 1, limit: 10, search: '', module: 'all' });
  const { data, isLoading } = useActivityLogs(params);
  
  const logs = data?.logs || [
     { id: 1, time: new Date().toISOString(), user: 'Andi Pratama', role: 'Sales', module: 'lead', action: 'Create', description: 'Membuat lead baru: PT Maju Jaya', ip: '192.168.1.10' },
     { id: 2, time: new Date(Date.now() - 3600000).toISOString(), user: 'Siska', role: 'Admin', module: 'invoice', action: 'Update', description: 'Update status tagihan INV-2025-001 menjadi Paid', ip: '192.168.1.15' },
     { id: 3, time: new Date(Date.now() - 7200000).toISOString(), user: 'Bambang', role: 'Teknisi', module: 'trouble-ticket', action: 'Update', description: 'Menutup tiket TT-2025-005', ip: '10.0.0.5' },
  ]; // Fallback to mock data for layout purposes if endpoint returns empty/error during dev

  const handleSearch = (e) => {
     if (e.key === 'Enter') {
        setParams(prev => ({ ...prev, search: e.target.value, page: 1 }));
     }
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full group hover:border-blue-900/10 transition-all">
      {/* Table Toolbar */}
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white z-10">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Cari aktivitas, user, atau deskripsi..." 
            onKeyDown={handleSearch}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-900/20 focus:bg-white transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
           <select 
             value={params.module}
             onChange={(e) => setParams(prev => ({ ...prev, module: e.target.value, page: 1 }))}
             className="bg-white border border-gray-200 text-gray-700 text-sm font-black uppercase tracking-widest rounded-xl px-4 py-3 outline-none focus:border-blue-900 hover:bg-gray-50 transition-all"
           >
              <option value="all">Semua Modul</option>
              <option value="lead">Lead</option>
              <option value="deal">Deal</option>
              <option value="quotation">Quotation</option>
              <option value="invoice">Invoice</option>
              <option value="trouble-ticket">Trouble Ticket</option>
           </select>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
            <Filter size={18} />
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-blue-900 transition-all shadow-md">
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] uppercase tracking-widest font-black text-gray-500 border-b border-gray-100">
              <th className="p-6 font-black whitespace-nowrap">Waktu</th>
              <th className="p-6 font-black">Pengguna</th>
              <th className="p-6 font-black">Modul</th>
              <th className="p-6 font-black">Aksi & Deskripsi</th>
              <th className="p-6 font-black text-right">IP Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="p-6"><div className="h-4 bg-gray-100 rounded w-24"></div></td>
                  <td className="p-6"><div className="h-10 w-32 bg-gray-100 rounded-xl"></div></td>
                  <td className="p-6"><div className="h-8 bg-gray-100 rounded-lg w-20"></div></td>
                  <td className="p-6"><div className="h-4 bg-gray-100 rounded w-64"></div></td>
                  <td className="p-6"><div className="h-4 bg-gray-100 rounded w-20 ml-auto"></div></td>
                </tr>
              ))
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-12 text-center text-gray-500 font-medium">
                  Tidak ada data log aktivitas ditemukan
                </td>
              </tr>
            ) : (
              logs.map((log) => {
                 const modConfig = iconConfig[log.module] || { icon: Settings, color: 'text-gray-600', bg: 'bg-gray-100' };
                 return (
                  <tr key={log.id} className="hover:bg-blue-50/30 transition-colors group cursor-default">
                    <td className="p-6 whitespace-nowrap">
                       <div className="text-xs font-black text-gray-900">
                         {new Date(log.time).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                       </div>
                       <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                         {new Date(log.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                       </div>
                    </td>
                    <td className="p-6">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-900 to-blue-800 text-white flex items-center justify-center font-black text-sm shadow-md">
                           {log.user.charAt(0)}
                         </div>
                         <div>
                            <div className="text-sm font-black text-gray-900">{log.user}</div>
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{log.role || 'User'}</div>
                         </div>
                       </div>
                    </td>
                    <td className="p-6">
                       <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${modConfig.bg} ${modConfig.color} border border-transparent group-hover:border-current/10 transition-all`}>
                          <modConfig.icon size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{log.module}</span>
                       </div>
                    </td>
                    <td className="p-6">
                       <div className="flex flex-col gap-1">
                          <span className={`text-[10px] font-black uppercase tracking-widest w-fit px-2 py-0.5 rounded-lg border ${
                             log.action.toLowerCase() === 'create' || log.action.toLowerCase() === 'dibuat' ? 'bg-green-50 text-green-700 border-green-200' :
                             log.action.toLowerCase() === 'delete' || log.action.toLowerCase() === 'dihapus' ? 'bg-red-50 text-red-700 border-red-200' :
                             'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                             {log.action}
                          </span>
                          <span className="text-xs font-bold text-gray-700 line-clamp-2 mt-1">{log.description}</span>
                       </div>
                    </td>
                    <td className="p-6 text-right">
                       <span className="text-[10px] font-mono font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">{log.ip || '127.0.0.1'}</span>
                    </td>
                  </tr>
                 );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 mt-auto">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Menampilkan 1-10 dari {data?.meta?.total || 100} Logs
        </span>
        <div className="flex gap-2">
          <button 
            disabled={params.page === 1}
            onClick={() => setParams(prev => ({ ...prev, page: prev.page - 1 }))}
            className="px-4 py-2 border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white disabled:opacity-50 transition-all text-gray-600"
          >
            Sebelumnnya
          </button>
          <button 
            onClick={() => setParams(prev => ({ ...prev, page: prev.page + 1 }))}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 hover:text-blue-900 transition-all shadow-sm"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogTable;
