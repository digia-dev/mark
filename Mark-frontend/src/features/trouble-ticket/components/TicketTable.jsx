import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, AlertCircle, Clock, CheckCircle2, AlertTriangle, Eye, Edit2, Play, CheckSquare } from 'lucide-react';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import SlaTimer from './SlaTimer';

const STATUS_TABS = [
  { id: 'all', label: 'Semua Tiket' },
  { id: 'open', label: 'Open' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'closed', label: 'Closed' }
];

const TicketTable = ({ tickets = [], onViewDetail, onUpdateStatus, isLoading }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = tickets.filter(t => {
    const matchTab = activeTab === 'all' || t.status === activeTab;
    const matchSearch = t.ticket_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       t.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       t.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTab && matchSearch;
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'critical': return <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200">Critical</span>;
      case 'high': return <span className="px-2 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200">High</span>;
      case 'medium': return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold border border-yellow-200">Medium</span>;
      case 'low': return <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">Low</span>;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open': return <span className="flex items-center gap-1 text-red-600 font-bold text-sm"><AlertCircle size={14}/> Open</span>;
      case 'in-progress': return <span className="flex items-center gap-1 text-blue-600 font-bold text-sm"><Play size={14} className="fill-current"/> In Progress</span>;
      case 'resolved': return <span className="flex items-center gap-1 text-emerald-600 font-bold text-sm"><CheckCircle2 size={14}/> Resolved</span>;
      case 'closed': return <span className="flex items-center gap-1 text-gray-500 font-bold text-sm"><CheckSquare size={14}/> Closed</span>;
      default: return <span>{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      
      {/* Tabs & Toolbar */}
      <div className="border-b border-gray-100 p-2">
        <div className="flex gap-2 p-1 bg-gray-50 rounded-2xl w-fit">
          {STATUS_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-blue-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 flex gap-4 bg-gray-50/50 items-center justify-between">
        <div className="relative w-72">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nomor, customer, judul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto scrollbar-hide">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 sticky top-0 backdrop-blur-sm z-10">
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 w-16">No</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 w-32">Tiket</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Customer & Keluhan</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 w-32">Prioritas</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 w-40">SLA Timer</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 w-40">Status</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 w-40">Assigned To</th>
              <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 w-24 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan="8" className="p-4"><div className="h-10 bg-gray-100 rounded-xl"></div></td>
                </tr>
              ))
            ) : filteredTickets.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-12 text-center text-gray-400">
                  <div className="flex flex-col items-center justify-center">
                    <AlertTriangle size={32} className="mb-2 text-gray-300" />
                    <p className="text-sm font-medium">Tidak ada tiket ditemukan</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTickets.map((ticket, index) => (
                <tr key={ticket.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="p-4 text-sm font-bold text-gray-400">{index + 1}</td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{ticket.ticket_number}</div>
                    <div className="text-xs text-gray-400">{format(new Date(ticket.created_at), 'dd MMM yyyy', { locale: idLocale })}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900 mb-1">{ticket.customer?.name}</div>
                    <div className="text-sm text-gray-600 line-clamp-1">{ticket.title}</div>
                    <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{ticket.category}</div>
                  </td>
                  <td className="p-4">
                    {getPriorityBadge(ticket.priority)}
                  </td>
                  <td className="p-4">
                    <SlaTimer deadline={ticket.sla_deadline} status={ticket.status} />
                  </td>
                  <td className="p-4">
                    {getStatusBadge(ticket.status)}
                  </td>
                  <td className="p-4">
                    {ticket.assigned_user ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                          {ticket.assigned_user.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{ticket.assigned_user.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm italic text-gray-400">Unassigned</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => onViewDetail(ticket.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
        <span className="text-sm font-medium text-gray-500">
          Menampilkan {filteredTickets.length} dari {tickets.length} tiket
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">Prev</button>
          <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default TicketTable;
