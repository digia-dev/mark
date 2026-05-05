import React, { useState } from 'react';
import { Plus, Search, Filter, Download, MessageSquare, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { useTickets, useUpdateTicketStatus } from '../features/trouble-ticket/hooks/use-tickets';

// Components
import TicketTable from '../features/trouble-ticket/components/TicketTable';

const TicketPage = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: '',
    priority: ''
  });

  const { data, isLoading } = useTickets(params);
  const updateStatusMutation = useUpdateTicketStatus();

  const handleUpdateStatus = async (id, updateData) => {
    try {
      await updateStatusMutation.mutateAsync({ id, data: updateData });
    } catch (error) {
      console.error('Failed to update ticket status:', error);
    }
  };

  const stats = [
    { label: 'Total Tiket', value: data?.meta?.total || 0, color: 'text-gray-900', bg: 'bg-gray-50', icon: MessageSquare },
    { label: 'Open', value: data?.data?.filter(t => t.status === 'open').length || 0, color: 'text-red-600', bg: 'bg-red-50', icon: AlertCircle },
    { label: 'In Progress', value: data?.data?.filter(t => t.status === 'in-progress').length || 0, color: 'text-orange-600', bg: 'bg-orange-50', icon: Clock },
    { label: 'Resolved', value: data?.data?.filter(t => t.status === 'resolved').length || 0, color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle2 },
  ];

  return (
    <div className="pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Trouble Tickets</h1>
          <p className="text-sm text-gray-500 font-medium">Pusat bantuan dan pelacakan gangguan layanan pelanggan</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
            <Download size={18} />
            Export
          </button>
          <button className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">
            <Plus size={18} />
            Buka Tiket Baru
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className={`p-6 rounded-[32px] border border-gray-100 ${stat.bg} shadow-sm group hover:scale-[1.02] transition-all`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-white shadow-sm ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-gray-900">{stat.value}</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input 
            type="text"
            placeholder="Cari no. tiket, judul, atau pelanggan..."
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
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select 
            className="flex-1 md:flex-none px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-blue-900 appearance-none min-w-[140px]"
            value={params.priority}
            onChange={(e) => setParams({ ...params, priority: e.target.value, page: 1 })}
          >
            <option value="">Semua Prioritas</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Main Content: Table */}
      <TicketTable 
        tickets={data?.data || []} 
        isLoading={isLoading} 
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default TicketPage;
