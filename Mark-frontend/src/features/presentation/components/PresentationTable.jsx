import React from 'react';
import { MoreHorizontal, Play, Calendar, MapPin, CheckCircle2, XCircle, Clock } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const statusConfig = {
  scheduled: { label: 'Scheduled', color: 'bg-blue-100 text-blue-600', icon: Clock },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-600', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-600', icon: XCircle }
};

const PresentationTable = ({ presentations, isLoading }) => {
  if (isLoading) {
    return <div className="h-64 bg-gray-50 rounded-3xl animate-pulse flex items-center justify-center text-gray-400 font-bold">Loading presentations...</div>;
  }

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100">
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">No. Presentasi & Judul</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Tgl. Sesi</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {presentations.map((pres) => (
            <tr key={pres.id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shadow-sm font-black text-[10px]">
                    <Play size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-900">{pres.title}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{pres.pres_number}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900">{pres.customer?.name}</span>
                  <span className="text-[10px] font-medium text-gray-400 flex items-center gap-1">
                    <MapPin size={10} /> {pres.location || 'Online'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5 text-center">
                <span className="text-sm font-black text-gray-900">
                  {new Date(pres.presentation_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                </span>
              </td>
              <td className="px-6 py-5">
                <div className="flex justify-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-2 ${statusConfig[pres.status]?.color}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    {statusConfig[pres.status]?.label}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5 text-right">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100">
                    <MoreHorizontal size={18} />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 min-w-[180px] z-200">
                      <DropdownMenu.Item 
                        onClick={() => console.log('Start presentation', pres.id)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-orange-50 hover:text-orange-900 rounded-xl cursor-pointer outline-none transition-all"
                      >
                        <Play size={16} /> Mulai Presentasi
                      </DropdownMenu.Item>
                      <DropdownMenu.Item 
                        onClick={() => console.log('Reschedule presentation', pres.id)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-900 rounded-xl cursor-pointer outline-none transition-all"
                      >
                        <Calendar size={16} /> Reschedule
                      </DropdownMenu.Item>
                      <div className="h-px bg-gray-50 my-1 mx-2" />
                      <DropdownMenu.Item 
                        onClick={() => console.log('Mark as completed', pres.id)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-green-600 hover:bg-green-50 rounded-xl cursor-pointer outline-none transition-all"
                      >
                        <CheckCircle2 size={16} /> Mark as Completed
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

export default PresentationTable;
