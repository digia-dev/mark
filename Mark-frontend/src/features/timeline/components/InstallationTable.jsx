import React from 'react';
import { Calendar, User, MapPin, Clock, MoreVertical, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const statusConfig = {
  scheduled: { label: 'Scheduled', color: 'bg-blue-100 text-blue-600', icon: Calendar },
  'on-progress': { label: 'On Progress', color: 'bg-orange-100 text-orange-600', icon: Clock },
  done: { label: 'Done', color: 'bg-green-100 text-green-600', icon: CheckCircle2 },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-600', icon: XCircle },
  tertunda: { label: 'Tertunda', color: 'bg-gray-100 text-gray-600', icon: AlertCircle }
};

const InstallationTable = ({ installations, isLoading, onUpdateStatus }) => {
  if (isLoading) {
    return <div className="h-64 bg-gray-50 rounded-3xl animate-pulse flex items-center justify-center text-gray-400 font-bold">Loading installations...</div>;
  }

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100">
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Detail Instalasi</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer & Alamat</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Jadwal</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {installations.map((inst) => (
            <tr key={inst.id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20 font-black text-xs">
                    {inst.inst_number.split('-')[2]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-900">{inst.inst_number}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight flex items-center gap-1">
                      <User size={10} /> {inst.technician?.name || 'Belum ditunjuk'}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900">{inst.customer?.name}</span>
                  <span className="text-[10px] font-medium text-gray-400 line-clamp-1 flex items-center gap-1">
                    <MapPin size={10} /> {inst.address || inst.area}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-black text-gray-900">
                    {new Date(inst.scheduled_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">
                    {new Date(inst.scheduled_date).getFullYear()}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex justify-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-2 ${statusConfig[inst.status]?.color}`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    {statusConfig[inst.status]?.label}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5 text-right">
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100">
                    <MoreVertical size={18} />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 min-w-[180px] z-200">
                      <DropdownMenu.Item 
                        onClick={() => onUpdateStatus(inst.id, { status: 'on-progress', current_stage: 'instalasi' })}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-orange-600 hover:bg-orange-50 rounded-xl cursor-pointer outline-none"
                      >
                        Mulai Instalasi
                      </DropdownMenu.Item>
                      <DropdownMenu.Item 
                        onClick={() => onUpdateStatus(inst.id, { status: 'done', current_stage: 'aktif' })}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-green-600 hover:bg-green-50 rounded-xl cursor-pointer outline-none"
                      >
                        Selesai & Aktivasi
                      </DropdownMenu.Item>
                      <DropdownMenu.Item 
                        onClick={() => onUpdateStatus(inst.id, { status: 'tertunda' })}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-xl cursor-pointer outline-none"
                      >
                        Tunda Pekerjaan
                      </DropdownMenu.Item>
                      <DropdownMenu.Item 
                        onClick={() => onUpdateStatus(inst.id, { status: 'cancelled' })}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl cursor-pointer outline-none"
                      >
                        Batalkan Jadwal
                      </DropdownMenu.Item>
                      <div className="h-px bg-gray-50 my-1 mx-2" />
                      <DropdownMenu.Item 
                        onClick={() => onViewDetail(inst)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-xl cursor-pointer outline-none"
                      >
                        Lihat Detail
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

export default InstallationTable;
