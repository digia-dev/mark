import React, { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { useLeads, useCreateLead, useUpdateLead, useConvertLead } from '../features/crm/hooks/use-leads';

// Components
import LeadTable from '../features/crm/components/LeadTable';
import LeadForm from '../features/crm/components/LeadForm';
import ConvertLeadModal from '../features/crm/components/ConvertLeadModal';

const LeadPage = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: '',
    source: ''
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const { data, isLoading } = useLeads(params);
  const createMutation = useCreateLead();
  const updateMutation = useUpdateLead();
  const convertMutation = useConvertLead();

  const handleCreate = async (formData) => {
    try {
      await createMutation.mutateAsync(formData);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to create lead:', error);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateMutation.mutateAsync({ id: selectedLead.id, data: formData });
      setIsFormOpen(false);
      setSelectedLead(null);
    } catch (error) {
      console.error('Failed to update lead:', error);
    }
  };

  const handleConvert = async (formData) => {
    try {
      await convertMutation.mutateAsync({ id: selectedLead.id, data: formData });
      setIsConvertOpen(false);
      setSelectedLead(null);
    } catch (error) {
      console.error('Failed to convert lead:', error);
    }
  };

  return (
    <div className="pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Manajemen Leads</h1>
          <p className="text-sm text-gray-500 font-medium">Lacak dan konversi calon pelanggan potensial</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => { setSelectedLead(null); setIsFormOpen(true); }}
            className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} />
            Tambah Lead Baru
          </button>
        </div>
      </div>
      
      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input 
            type="text"
            placeholder="Cari lead..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 transition-all"
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value, page: 1 })}
          />
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-blue-900 appearance-none min-w-[140px]"
            value={params.status}
            onChange={(e) => setParams({ ...params, status: e.target.value, page: 1 })}
          >
            <option value="">Semua Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="negosiasi">Negosiasi</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Main Content: Table */}
      <LeadTable 
        leads={data?.data || []}
        meta={data?.meta || {}}
        isLoading={isLoading}
        onPageChange={(page) => setParams({ ...params, page })}
        onConvert={(lead) => { setSelectedLead(lead); setIsConvertOpen(true); }}
        onEdit={(lead) => { setSelectedLead(lead); setIsFormOpen(true); }}
      />

      {/* Modals */}
      <LeadForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={selectedLead ? handleUpdate : handleCreate}
        initialData={selectedLead}
        isLoading={createMutation.isLoading || updateMutation.isLoading}
      />

      <ConvertLeadModal 
        isOpen={isConvertOpen}
        onClose={() => setIsConvertOpen(false)}
        lead={selectedLead}
        onConvert={handleConvert}
        isLoading={convertMutation.isLoading}
      />
    </div>
  );
};

export default LeadPage;
