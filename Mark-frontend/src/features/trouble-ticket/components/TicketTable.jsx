import React from 'react';
import { MoreHorizontal, AlertCircle, Clock, CheckCircle2, MessageSquare, User, Flag } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const priorityConfig = {
  critical: { label: 'Critical', color: 'bg-red-600 text-white', icon: AlertCircle },
  high: { label: 'High', color: 'bg-orange-100 text-orange-600', icon: Flag },
  medium: { label: 'Medium', color: 'bg-blue-100 text-blue-600', icon: Flag },
  low: { label: 'Low', color: 'bg-gray-100 text-gray-600', icon: Flag }
};

const statusConfig = {
  open: { label: 'Open', color: 'bg-red-50 text-red-600 border-red-100' },
  'in-progress': { label: 'In Progress', color: 'bg-orange-50 text-orange-600 border-orange-100' },
  resolved: { label: 'Resolved', color: 'bg-green-50 text-green-600 border-green-100' },
  closed: { label: 'Closed', color: 'bg-gray-50 text-gray-500 border-gray-100' }
};

const TicketTable = ({ tickets, isLoading, onUpdateStatus }) => {
  if (isLoading) {
    return <div className="h-64 bg-gray-50 rounded-3xl animate-pulse flex items-center justify-center text-gray-400 font-bold">Loading tickets...</div>;
  }

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100">
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">No. Tiket & Judul</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Pelanggan</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Prioritas</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-10 rounded-full ${ticket.priority === 'critical' ? 'bg-red-600' : 'bg-transparent'}`} />
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{ticket.ticket_number}</span>
                    <span className="text-sm font-black text-gray-900 line-clamp-1">{ticket.title}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900">{ticket.customer?.name}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight flex items-center gap-1">
                    <User size={10} /> {ticket.assignedUser?.name || 'Unassigned'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex justify-center">
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 ${priorityConfig[ticket.priority]?.color}`}>
                    {ticket.priority === 'critical' && <AlertCircle size={10} />}
                    {priorityConfig[ticket.priority]?.label}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex justify-center">
                  <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${statusConfig[ticket.status]?.color}`}>
                    {statusConfig[ticket.status]?.label}
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
                      <DropdownMenu.Item className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-900 rounded-xl cursor-pointer outline-none transition-all">
                        <MessageSquare size={16} /> Balas Tiket
                      </DropdownMenu.Item>
                      <DropdownMenu.Item 
                        onClick={() => onUpdateStatus(ticket.id, { status: 'in-progress' })}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-orange-600 hover:bg-orange-50 rounded-xl cursor-pointer outline-none transition-all"
                      >
                        <Clock size={16} /> Kerjakan (In Progress)
                      </DropdownMenu.Item>
                      <DropdownMenu.Item 
                        onClick={() => onUpdateStatus(ticket.id, { status: 'resolved' })}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-green-600 hover:bg-green-50 rounded-xl cursor-pointer outline-none transition-all ${ticket.status === 'resolved' ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        <CheckCircle2 size={16} /> Selesaikan (Resolved)
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

export default TicketTable;
