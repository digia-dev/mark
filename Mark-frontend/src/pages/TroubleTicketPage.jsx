import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TicketStatCards from '../features/trouble-ticket/components/TicketStatCards';
import TicketTable from '../features/trouble-ticket/components/TicketTable';
import TicketDetailPanel from '../features/trouble-ticket/components/TicketDetailPanel';
import TicketForm from '../features/trouble-ticket/components/TicketForm';
import { 
  useTickets, 
  useTicketStats, 
  useCreateTicket, 
  useUpdateTicketStatus, 
  useAssignTicket, 
  useAddTicketNote,
  useTicketDetail
} from '../features/trouble-ticket/hooks/use-tickets';
import { useCustomers } from '../features/crm/hooks/use-customers';
import { useUsers } from '../features/user/hooks/use-users';

const TroubleTicketPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    category: '',
    page: 1,
    limit: 10
  });

  const { data: ticketsData, isLoading: isLoadingTickets } = useTickets(filters);
  const { data: statsData } = useTicketStats();
  const { data: customersData } = useCustomers({ limit: 100 });
  const { data: usersData } = useUsers();
  
  const { data: selectedTicket } = useTicketDetail(selectedTicketId);

  const createMutation = useCreateTicket();
  const updateStatusMutation = useUpdateTicketStatus();
  const assignMutation = useAssignTicket();
  const addNoteMutation = useAddTicketNote();

  const handleCreateSubmit = (data) => {
    createMutation.mutate(data, {
      onSuccess: () => setIsFormOpen(false)
    });
  };

  const handleUpdateStatus = (id, status) => {
    updateStatusMutation.mutate({ id, data: { status } });
  };

  const handleAssign = (id, userId) => {
    assignMutation.mutate({ id, userId });
  };

  const handleAddNote = (id, data) => {
    addNoteMutation.mutate({ id, data });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/30">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Trouble Ticket</h1>
          <p className="text-sm font-medium text-gray-500">
            Kelola laporan keluhan pelanggan dan pantau SLA penyelesaian.
          </p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 hover:scale-105"
        >
          <Plus size={18} />
          Buat Tiket Baru
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input 
            type="text"
            placeholder="Cari nomor tiket atau customer..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-[24px] text-sm font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <div className="flex gap-2">
          <select 
            className="px-6 py-4 bg-white border border-gray-100 rounded-[24px] text-sm font-bold shadow-sm focus:outline-none transition-all appearance-none min-w-[140px]"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
          >
            <option value="">Semua Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <select 
            className="px-6 py-4 bg-white border border-gray-100 rounded-[24px] text-sm font-bold shadow-sm focus:outline-none transition-all appearance-none min-w-[140px]"
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value, page: 1 })}
          >
            <option value="">Semua Prioritas</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <TicketStatCards stats={statsData} />

      {/* Content */}
      <div className="flex-1">
        <TicketTable 
          tickets={ticketsData?.data || []} 
          isLoading={isLoadingTickets}
          onViewDetail={setSelectedTicketId}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>

      {/* Modals & Panels */}
      <TicketForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleCreateSubmit}
        isLoading={createMutation.isLoading}
        customers={customersData?.data || []}
        users={usersData?.data || []}
      />

      {selectedTicketId && (
        <TicketDetailPanel 
          ticket={selectedTicket}
          onClose={() => setSelectedTicketId(null)}
          onUpdateStatus={handleUpdateStatus}
          onAssign={handleAssign}
          onAddNote={handleAddNote}
          users={usersData?.data || []}
        />
      )}

    </div>
  );
};

export default TroubleTicketPage;
