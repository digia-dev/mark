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

  const { data: ticketsData, isLoading: isLoadingTickets } = useTickets({ limit: 100 });
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
