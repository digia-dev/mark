import React from 'react';
import { MoreHorizontal, Eye, Send, CheckCircle, XCircle, FileText, Download } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-gray-100 text-gray-600' },
  sent: { label: 'Sent', color: 'bg-blue-100 text-blue-600' },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-600' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-600' },
  expired: { label: 'Expired', color: 'bg-orange-100 text-orange-600' }
};

const QuotationTable = ({ quotations, meta, isLoading, onPageChange, onView, onUpdateStatus }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-50 border-b border-gray-100" />
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-16 border-b border-gray-50 flex items-center px-6 gap-4">
              <div className="h-4 bg-gray-100 rounded w-24" />
              <div className="h-4 bg-gray-100 rounded w-48" />
              <div className="h-4 bg-gray-100 rounded w-32" />
              <div className="h-6 bg-gray-100 rounded-full w-20 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">No. Penawaran</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer / Lead</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Nilai</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tgl. Dibuat</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {quotations.map((quot) => (
              <tr key={quot.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center font-black text-[10px]">
                      Q
                    </div>
                    <span className="text-sm font-black text-gray-900">{quot.quot_number}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">
                      {quot.customer?.name || quot.lead?.name || 'Unknown'}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                      {quot.customer ? 'Customer' : 'Lead'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-black text-gray-900">
                    Rp {new Intl.NumberFormat('id-ID').format(quot.total)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold text-gray-500">
                    {new Date(quot.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${statusConfig[quot.status]?.color || 'bg-gray-100 text-gray-600'}`}>
                      {statusConfig[quot.status]?.label || quot.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all shadow-sm border border-transparent hover:border-gray-100">
                      <MoreHorizontal size={18} />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 min-w-[180px] z-200 animate-in fade-in zoom-in duration-200">
                        <DropdownMenu.Item 
                          onClick={() => onView(quot)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-900 rounded-xl cursor-pointer outline-none transition-all"
                        >
                          <Eye size={16} /> Detail Penawaran
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-900 rounded-xl cursor-pointer outline-none transition-all">
                          <Download size={16} /> Download PDF
                        </DropdownMenu.Item>
                        
                        {quot.status === 'draft' && (
                          <>
                            <div className="h-px bg-gray-50 my-1 mx-2" />
                            <DropdownMenu.Item 
                              onClick={() => onUpdateStatus(quot.id, 'sent')}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-xl cursor-pointer outline-none transition-all"
                            >
                              <Send size={16} /> Kirim ke Pelanggan
                            </DropdownMenu.Item>
                          </>
                        )}

                        {quot.status === 'sent' && (
                          <>
                            <div className="h-px bg-gray-50 my-1 mx-2" />
                            <DropdownMenu.Item 
                              onClick={() => onUpdateStatus(quot.id, 'approved')}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-green-600 hover:bg-green-50 rounded-xl cursor-pointer outline-none transition-all"
                            >
                              <CheckCircle size={16} /> Setujui (Approved)
                            </DropdownMenu.Item>
                            <DropdownMenu.Item 
                              onClick={() => onUpdateStatus(quot.id, 'rejected')}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl cursor-pointer outline-none transition-all"
                            >
                              <XCircle size={16} /> Tolak (Rejected)
                            </DropdownMenu.Item>
                          </>
                        )}
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">
          Halaman {meta.page} dari {meta.total_pages || 1} ({meta.total} Total)
        </p>
        <div className="flex gap-2">
          <button 
            disabled={meta.page === 1}
            onClick={() => onPageChange(meta.page - 1)}
            className="px-4 py-2 text-xs font-black text-gray-600 bg-gray-50 rounded-xl border border-gray-100 disabled:opacity-40 hover:bg-gray-100 transition-all"
          >
            Prev
          </button>
          <button 
            disabled={meta.page >= (meta.total_pages || 1)}
            onClick={() => onPageChange(meta.page + 1)}
            className="px-4 py-2 text-xs font-black text-white bg-blue-900 rounded-xl shadow-lg shadow-blue-900/20 disabled:opacity-40 hover:bg-blue-800 transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationTable;
