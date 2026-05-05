import React from 'react';
import { MoreVertical, Eye, Edit2, Trash2, Copy, Trophy, XCircle } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const DealTable = ({ data }) => {
  const getStageColor = (stage) => {
    switch (stage) {
      case 'prospek': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'negosiasi': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'penawaran': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'closing': return 'bg-green-50 text-green-700 border-green-100';
      case 'instalasi': return 'bg-cyan-50 text-cyan-700 border-cyan-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100">
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">No</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Deal</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stage</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nilai</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Prob (%)</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Expected Close</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((deal, index) => (
            <tr key={deal.id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-4 text-xs font-bold text-gray-500">{index + 1}</td>
              <td className="px-6 py-4">
                <p className="text-xs font-black text-gray-900 group-hover:text-blue-900 transition-colors">{deal.name}</p>
                <p className="text-[10px] font-bold text-gray-400 mt-0.5">{deal.area}</p>
              </td>
              <td className="px-6 py-4">
                <p className="text-xs font-bold text-gray-700">{deal.customer?.name || deal.lead?.name}</p>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border ${getStageColor(deal.stage)}`}>
                  {deal.stage}
                </span>
              </td>
              <td className="px-6 py-4 text-xs font-black text-gray-900">
                {formatCurrency(deal.value)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                   <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${deal.probability > 70 ? 'bg-green-500' : deal.probability > 40 ? 'bg-orange-500' : 'bg-blue-500'}`}
                        style={{ width: `${deal.probability}%` }}
                      />
                   </div>
                   <span className="text-[10px] font-bold text-gray-600">{deal.probability}%</span>
                </div>
              </td>
              <td className="px-6 py-4 text-xs font-bold text-gray-500">
                {deal.expected_closing_date ? new Date(deal.expected_closing_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
              </td>
              <td className="px-6 py-4 text-center">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all focus:outline-none shadow-sm hover:shadow-md">
                    <MoreVertical size={16} />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="min-w-[180px] bg-white rounded-2xl p-2 shadow-2xl border border-gray-100 z-120 animate-in fade-in zoom-in duration-200">
                      <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-900 rounded-xl cursor-pointer outline-none">
                        <Eye size={14} /> Detail Deal
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-900 rounded-xl cursor-pointer outline-none">
                        <Edit2 size={14} /> Edit Data
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-900 rounded-xl cursor-pointer outline-none">
                        <Copy size={14} /> Duplikat
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className="h-px bg-gray-50 my-1" />
                      <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-green-600 hover:bg-green-50 rounded-xl cursor-pointer outline-none">
                        <Trophy size={14} /> Mark as Won
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-orange-600 hover:bg-orange-50 rounded-xl cursor-pointer outline-none">
                        <XCircle size={14} /> Mark as Lost
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator className="h-px bg-gray-50 my-1" />
                      <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl cursor-pointer outline-none">
                        <Trash2 size={14} /> Hapus Deal
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DealTable;
