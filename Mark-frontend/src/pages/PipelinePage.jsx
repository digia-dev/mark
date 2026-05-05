import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Download, LayoutGrid, List, 
  ChevronDown, Calendar, Settings, Info 
} from 'lucide-react';
import { DragDropContext } from 'react-beautiful-dnd';
import { 
  useDealsKanban, 
  useDealsList, 
  useMoveDealStage, 
  useCreateDeal 
} from '../features/pipeline/hooks/use-deals';

// Components
import KanbanColumn from '../features/pipeline/components/KanbanColumn';
import DealTable from '../features/pipeline/components/DealTable';
import PipelineStatCards from '../features/pipeline/components/PipelineStatCards';
import DealForm from '../features/pipeline/components/DealForm';

const COLUMNS = [
  { id: 'prospek', label: 'Prospek' },
  { id: 'negosiasi', label: 'Negosiasi' },
  { id: 'penawaran', label: 'Penawaran' },
  { id: 'closing', label: 'Closing' },
  { id: 'instalasi', label: 'Instalasi' }
];

const PipelinePage = () => {
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [params, setParams] = useState({
    salesId: '',
    area: '',
    product: '',
    search: '',
    dateRange: '01 Mei 2025 - 31 Mei 2025'
  });

  // Data Fetching
  const { data: pipelineData, isLoading } = useDealsKanban(params);
  const { data: dealsListData } = useDealsList(params);
  const moveDealMutation = useMoveDealStage();
  const createDealMutation = useCreateDeal();

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    try {
      await moveDealMutation.mutateAsync({
        id: parseInt(draggableId),
        data: { stage: destination.droppableId }
      });
    } catch (error) {
      console.error('Failed to move deal:', error);
    }
  };

  const handleCreateDeal = async (formData) => {
    try {
      await createDealMutation.mutateAsync(formData);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to create deal:', error);
    }
  };

  // Organize deals by stage for kanban
  const dealsByStage = pipelineData?.data || {};

  return (
    <div className="pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Sales Pipeline</h1>
          <p className="text-sm text-gray-500 font-medium">Kelola dan pantau perjalanan deal Anda</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm mr-2">
            <button 
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all ${viewMode === 'kanban' ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid size={14} />
              Board
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all ${viewMode === 'table' ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={14} />
              Table
            </button>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} />
            Tambah Deal
          </button>
        </div>
      </div>

      {/* Pipeline Summary Cards */}
      <PipelineStatCards stats={pipelineData?.meta?.stats} />

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input 
            type="text"
            placeholder="Cari deal atau customer..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:border-blue-900 transition-all font-bold"
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value })}
          />
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-100 transition-all">
            <Calendar size={14} />
            {params.dateRange}
            <ChevronDown size={14} />
          </button>
          <button className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-all">
            <Filter size={20} />
          </button>
          <button className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-all">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'kanban' ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-4 min-h-[calc(100vh-280px)]">
            {COLUMNS.map(column => (
              <KanbanColumn 
                key={column.id} 
                stage={column.id} 
                data={dealsByStage[column.id] || { deals: [], count: 0, total_value: 0 }} 
              />
            ))}
          </div>
        </DragDropContext>
      ) : (
        <DealTable data={dealsListData?.data || []} />
      )}

      {/* Modals */}
      <DealForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleCreateDeal} 
      />
      
      {/* Bottom Tips */}
      <div className="mt-4 flex items-center gap-2 text-[11px] font-bold text-gray-400 bg-white/50 w-fit px-3 py-1.5 rounded-lg border border-gray-100">
         <Info size={14} className="text-blue-500" />
         <span>Tips: Drag & drop deal untuk memindahkan stage pipeline</span>
      </div>
    </div>
  );
};

export default PipelinePage;
