import React, { useState } from 'react';
import { Plus, Search, FileText, Download, Filter, Calendar } from 'lucide-react';
import { useQuotations, useCreateQuotation, useUpdateQuotationStatus } from '../features/quotation/hooks/use-quotations';
import { useCustomers } from '../features/crm/hooks/use-customers';
import { useLeads } from '../features/crm/hooks/use-leads';
import { useProductList } from '../features/product/hooks/use-products';

// Components
import QuotationTable from '../features/quotation/components/QuotationTable';
import QuotationForm from '../features/quotation/components/QuotationForm';
import QuotationStatCards from '../features/quotation/components/QuotationStatCards';
import QuotationDetailPanel from '../features/quotation/components/QuotationDetailPanel';

const QuotationPage = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: '',
    area: ''
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  
  const { data, isLoading } = useQuotations(params);
  const { data: customersData } = useCustomers({ limit: 100 });
  const { data: leadsData } = useLeads({ limit: 100 });
  const { data: productsData } = useProductList({ limit: 100 });

  const createMutation = useCreateQuotation();
  const updateStatusMutation = useUpdateQuotationStatus();

  const handleCreate = async (formData) => {
    try {
      await createMutation.mutateAsync(formData);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to create quotation:', error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status });
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Penawaran (Quotation)</h1>
          <p className="text-sm text-gray-500 font-medium">Kelola surat penawaran harga dan negosiasi produk</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
            <Download size={18} />
            Export Data
          </button>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} />
            Buat Penawaran
          </button>
        </div>
      </div>
      
      {/* Statistics Section */}
      {!isLoading && (
        <QuotationStatCards stats={{
          total: data?.meta?.total || 0,
          totalValue: 1250000000, // Dummy for now, ideally from meta
          approved: 45,
          conversionRate: 68,
          averageValue: 25000000
        }} />
      )}

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input 
            type="text"
            placeholder="Cari no. penawaran atau pelanggan..."
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
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="expired">Expired</option>
          </select>

          <div className="h-10 w-px bg-gray-100 mx-1 hidden md:block" />

          <button className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-400 hover:text-gray-900 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Main Content: Table */}
      <QuotationTable 
        quotations={data?.data || []}
        meta={data?.meta || {}}
        isLoading={isLoading}
        onPageChange={(page) => setParams({ ...params, page })}
        onView={(quot) => {
          setSelectedQuotation(quot);
          setIsDetailOpen(true);
        }}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Form Modal */}
      <QuotationForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreate}
        isLoading={createMutation.isLoading}
        customers={customersData?.data || []}
        leads={leadsData?.data || []}
        products={productsData?.data || []}
      />

      {/* Detail Panel */}
      <QuotationDetailPanel 
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        quotation={selectedQuotation}
      />
    </div>
  );
};

export default QuotationPage;
