import React, { useState } from 'react';
import { Plus, Search, Filter, Download, LayoutGrid, List, ChevronDown, Calendar, Settings, Info } from 'lucide-react';
import { useDealsKanban, useMoveDealStage, useCreateDeal } from '../features/pipeline/hooks/use-deals';
import { useCustomers } from '../features/crm/hooks/use-customers';
import { useLeads } from '../features/crm/hooks/use-leads';

// Components
import KanbanBoard from '../features/pipeline/components/KanbanBoard';
import PipelineStatCards from '../features/pipeline/components/PipelineStatCards';
import PipelineSidebar from '../features/pipeline/components/PipelineSidebar';
import DealForm from '../features/pipeline/components/DealForm';
import DealTable from '../features/pipeline/components/DealTable';

const PipelinePage = () => {
  const [view, setView] = useState('board'); // 'board' or 'table'
  const [params, setParams] = useState({
    salesId: '',
    area: '',
    product: '',
    search: '',
    dateRange: '01 Mei 2025 - 31 Mei 2025'
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);

  const { data: pipelineData, isLoading } = useDealsKanban(params);
  const { data: dealsListData } = useDealsList(params);
  const { data: customersData } = useCustomers({ limit: 100 });
  const { data: leadsData } = useLeads({ limit: 100 });
  
  const createMutation = useCreateDeal();
  const moveStageMutation = useMoveDealStage();

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    moveStageMutation.mutate({
      id: draggableId,
      data: { targetStage: destination.droppableId }
    });
  };

  const handleCreateDeal = async (formData) => {
    try {
      await createMutation.mutateAsync(formData);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to create deal:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Pipeline</h1>
          <p className="text-sm text-gray-500 font-medium">Kelola pipeline penjualan dari prospek hingga instalasi</p>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="flex items-center gap-2 mr-4">
              <select className="bg-white border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold text-gray-600 focus:outline-none shadow-sm">
                <option>Semua Sales</option>
              </select>
              <select className="bg-white border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold text-gray-600 focus:outline-none shadow-sm">
                <option>Semua Area</option>
              </select>
              <select className="bg-white border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold text-gray-600 focus:outline-none shadow-sm">
                <option>Semua Produk</option>
              </select>
              <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl px-3 py-2 text-xs font-bold text-gray-600 shadow-sm cursor-pointer">
                <Calendar size={14} className="text-gray-400" />
                <span>01 Mei 2025 - 31 Mei 2025</span>
              </div>
              <button className="p-2 bg-white border border-gray-100 rounded-xl text-gray-600 shadow-sm hover:bg-gray-50">
                <Filter size={16} />
              </button>
              <button className="p-2 bg-white border border-gray-100 rounded-xl text-gray-600 shadow-sm hover:bg-gray-50">
                <Settings size={16} />
              </button>
           </div>

          <button 
            onClick={() => { setSelectedDeal(null); setIsFormOpen(true); }}
            className="bg-blue-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
          >
            <Plus size={18} />
            Tambah Deal
            <ChevronDown size={14} className="opacity-60" />
          </button>
        </div>
      </div>

      {/* Page Content with Sub-Sidebar */}
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left Sidebar inside page */}
        <PipelineSidebar 
          totalDeals={pipelineData?.totalDeals || 184}
          totalValue={pipelineData?.totalValue || 2450000000}
          summary={pipelineData?.summary}
        />

        {/* Main Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Stat Cards */}
          <PipelineStatCards stats={pipelineData?.stats} />

          {/* Kanban Controls (Board/Table Toggle) */}
          <div className="flex justify-end items-center mb-4 gap-4">
             <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                <button 
                  onClick={() => setView('board')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${view === 'board' ? 'bg-orange-50 text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <LayoutGrid size={14} />
                  Board
                </button>
                <button 
                  onClick={() => setView('table')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${view === 'table' ? 'bg-orange-50 text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List size={14} />
                  Table
                </button>
             </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-h-0 overflow-auto">
            {isLoading ? (
              <div className="flex gap-4 h-full animate-pulse">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex-1 bg-gray-50 rounded-2xl border border-gray-100" />
                ))}
              </div>
            ) : view === 'board' ? (
              <KanbanBoard data={pipelineData?.grouped || {}} onDragEnd={handleDragEnd} />
            ) : (
              <DealTable data={dealsListData?.data || []} />
            )}
          </div>

          {/* Bottom Tips */}
          <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-gray-400 bg-white/50 w-fit px-3 py-1.5 rounded-lg border border-gray-100">
             <Info size={14} className="text-blue-500" />
             <span>Tips: Drag & drop deal untuk memindahkan stage pipeline</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DealForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateDeal}
        initialData={selectedDeal}
        isLoading={createMutation.isLoading}
        customers={customersData?.data || []}
        leads={leadsData?.data || []}
      />
    </div>
  );
};

export default PipelinePage;
