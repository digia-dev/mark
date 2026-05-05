import React, { useState } from 'react';
import { Calendar, List, Plus, Filter, Search, Download } from 'lucide-react';
import { useInstallations, useUpdateInstallationStatus } from '../features/timeline/hooks/use-installations';

// Components
import InstallationTable from '../features/timeline/components/InstallationTable';
import GanttChart from '../features/timeline/components/GanttChart';
import InstallationStatCards from '../features/timeline/components/InstallationStatCards';
import InstallationDetailPanel from '../features/timeline/components/InstallationDetailPanel';
import InstallationForm from '../features/timeline/components/InstallationForm';

const TimelinePage = () => {
  const [viewMode, setViewMode] = useState('gantt'); // 'gantt' | 'list'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedInstallation, setSelectedInstallation] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: ''
  });

  const { data, isLoading } = useInstallations(params);
  const updateStatusMutation = useUpdateInstallationStatus();

  const handleUpdateStatus = async (id, updateData) => {
    try {
      await updateStatusMutation.mutateAsync({ id, data: updateData });
    } catch (error) {
      console.error('Failed to update installation status:', error);
    }
  };

  const handleCreateInstallation = (formData) => {
    console.log('Create installation:', formData);
    setIsFormOpen(false);
  };

  // Mock stats
  const stats = {
    total: data?.meta?.total || 0,
    scheduled: 12,
    onProgress: 8,
    done: 45,
    delayed: 3
  };

  return (
    <div className="pb-8 relative overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Project Timeline</h1>
          <p className="text-sm text-gray-500 font-medium">Jadwal instalasi dan aktivasi layanan ISP</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm mr-2">
            <button 
              onClick={() => setViewMode('gantt')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all ${viewMode === 'gantt' ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Calendar size={14} />
              Gantt
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black transition-all ${viewMode === 'list' ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={14} />
              List
            </button>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} />
            Atur Jadwal Baru
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <InstallationStatCards stats={stats} />

      {/* Quick Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input 
            type="text"
            placeholder="Cari no. instalasi atau customer..."
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
            <option value="scheduled">Scheduled</option>
            <option value="on-progress">On Progress</option>
            <option value="done">Done</option>
          </select>
          <button className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'gantt' ? (
        <GanttChart installations={data?.data || []} />
      ) : (
        <InstallationTable 
          installations={data?.data || []} 
          isLoading={isLoading} 
          onUpdateStatus={handleUpdateStatus}
          onViewDetail={(inst) => setSelectedInstallation(inst)}
        />
      )}

      {/* Modals & Panels */}
      <InstallationForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleCreateInstallation}
      />

      <InstallationDetailPanel 
        isOpen={!!selectedInstallation} 
        onClose={() => setSelectedInstallation(null)} 
        installation={selectedInstallation}
      />
    </div>
  );
};

export default TimelinePage;

