import React from 'react';
import { 
  MoreVertical, Edit2, Eye, MapPin, 
  Phone, Mail, Building2, User as UserIcon,
  ChevronRight, ChevronLeft, Trash2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const CustomerTable = ({ 
  customers = [], 
  isLoading, 
  meta = {}, 
  onPageChange,
  onEdit,
  onViewDetail,
  onDelete
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm animate-pulse">
        <div className="h-12 bg-gray-50 border-b border-gray-200" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 border-b border-gray-100 flex items-center px-6 gap-4">
            <div className="w-10 h-10 bg-gray-50 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-50 rounded w-1/4" />
              <div className="h-3 bg-gray-50 rounded w-1/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-100';
      case 'inactive': return 'bg-gray-50 text-gray-600 border-gray-100';
      case 'suspended': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Kontak</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Area & Sektor</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Sales</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((customer) => (
              <tr 
                key={customer.id} 
                onClick={() => onViewDetail(customer)}
                className="hover:bg-gray-50/50 transition-colors group cursor-pointer active:bg-gray-100"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${customer.type === 'corporate' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                      {customer.type === 'corporate' ? <Building2 size={20} /> : <UserIcon size={20} />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-900 transition-colors">
                        {customer.name}
                      </p>
                      <p className="text-[11px] text-gray-400 font-medium">{customer.customer_code}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Phone size={12} className="text-gray-400" />
                      {customer.phone}
                    </div>
                    {customer.email && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Mail size={12} className="text-gray-400" />
                        {customer.email}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
                      <MapPin size={12} className="text-gray-400" />
                      {customer.area || '-'}
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{customer.sector || '-'}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(customer.status)}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                  {customer.sales?.name || '-'}
                </td>
                <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onViewDetail(customer)}
                      className="p-1.5 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg transition-all active:scale-90"
                      title="Lihat Detail"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={() => onEdit(customer)}
                      className="p-1.5 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg transition-all active:scale-90"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(customer)}
                      className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-all active:scale-90"
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button 
                      onClick={() => toast.info(`Menu aksi lainnya untuk ${customer.name}`)}
                      className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-900 rounded-lg transition-all"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                      <Building2 size={32} className="text-gray-200" />
                    </div>
                    <p className="text-sm text-gray-900 font-black tracking-tight">Belum ada data customer</p>
                    <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">Gunakan tombol "Tambah Customer" untuk memulai</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta.total_pages > 1 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-500 font-medium">
            Menampilkan <span className="font-black text-gray-900">{(meta.page - 1) * meta.limit + 1}</span> - <span className="font-black text-gray-900">{Math.min(meta.page * meta.limit, meta.total)}</span> dari <span className="font-black text-gray-900">{meta.total}</span> data
          </p>
          <div className="flex items-center gap-2">
            <button 
              disabled={meta.page === 1}
              onClick={() => onPageChange(meta.page - 1)}
              className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-1">
              {[...Array(meta.total_pages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => onPageChange(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${meta.page === i + 1 ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20 active:scale-90' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 active:scale-95 shadow-sm'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              disabled={meta.page === meta.total_pages}
              onClick={() => onPageChange(meta.page + 1)}
              className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-all active:scale-95 shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
