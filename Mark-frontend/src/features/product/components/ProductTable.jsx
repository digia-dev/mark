import React from 'react';
import { MoreVertical, Wifi, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductTable = ({ 
  products, 
  meta, 
  isLoading,
  onPageChange, 
  onDetail, 
  onEdit, 
  onDelete,
  onToggleStatus 
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm animate-pulse">
        <div className="h-12 bg-gray-50 border-b border-gray-100" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 border-b border-gray-50 px-6" />
        ))}
      </div>
    );
  }
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[11px] font-medium rounded-full">Aktif</span>;
      case 'promo':
        return <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[11px] font-medium rounded-full">Promo</span>;
      case 'inactive':
        return <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-medium rounded-full">Nonaktif</span>;
      default:
        return null;
    }
  };

  const formatCurrency = (val) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Produk</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Kategori</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Teknologi</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Harga</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                      {product.technology === 'fiber' ? <Wifi size={18} /> : <Cpu size={18} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </p>
                      <p className="text-[11px] text-gray-400">{product.speed_down}/{product.speed_up} Mbps</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{product.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 capitalize">{product.technology}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-sm font-bold text-gray-900">{formatCurrency(product.price)}</p>
                  {product.is_promo && (
                    <p className="text-[10px] text-orange-600 font-medium">{formatCurrency(product.promo_price)} (Promo)</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(product.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <div className="relative group/menu">
                      <button className="p-1 hover:bg-gray-100 rounded text-gray-400">
                        <MoreVertical size={18} />
                      </button>
                      <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-100 rounded-lg shadow-xl py-1 invisible group-hover/menu:visible opacity-0 group-hover/menu:opacity-100 transition-all z-20">
                        <button onClick={() => onDetail(product)} className="w-full text-left px-4 py-2 text-xs text-gray-600 hover:bg-gray-50">Lihat Detail</button>
                        <button onClick={() => onEdit(product)} className="w-full text-left px-4 py-2 text-xs text-gray-600 hover:bg-gray-50">Edit Produk</button>
                        <button onClick={() => onToggleStatus(product)} className="w-full text-left px-4 py-2 text-xs text-gray-600 hover:bg-gray-50">Ubah Status</button>
                        <hr className="my-1 border-gray-50" />
                        <button onClick={() => onDelete(product)} className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50">Hapus Produk</button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Menampilkan <span className="font-semibold text-gray-900">{(meta.page - 1) * meta.limit + 1}</span> hingga <span className="font-semibold text-gray-900">{Math.min(meta.page * meta.limit, meta.total)}</span> dari <span className="font-semibold text-gray-900">{meta.total}</span> data
        </p>
        <div className="flex items-center gap-1">
          <button 
            disabled={meta.page === 1}
            onClick={() => onPageChange(meta.page - 1)}
            className="p-1.5 border border-gray-200 rounded-lg bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>
          {[...Array(meta.totalPages)].map((_, i) => (
            <button 
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`min-w-[32px] h-8 flex items-center justify-center rounded-lg text-xs font-semibold border transition-all ${
                meta.page === i + 1 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button 
            disabled={meta.page === meta.totalPages}
            onClick={() => onPageChange(meta.page + 1)}
            className="p-1.5 border border-gray-200 rounded-lg bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
