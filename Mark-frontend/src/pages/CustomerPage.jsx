import React, { useState } from 'react';
import { Plus, Search, Filter, Download, LayoutGrid, List, Upload } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import axios from '../lib/axios';
import { useCustomers, useCreateCustomer, useUpdateCustomer, useDeleteCustomer } from '../features/crm/hooks/use-customers';

// Components
import CustomerTable from '../features/crm/components/CustomerTable';
import CustomerForm from '../features/crm/components/CustomerForm';
import CustomerStats from '../features/crm/components/CustomerStats';
import CustomerDetailPanel from '../features/crm/components/CustomerDetailPanel';
import ExportModal from '../shared/components/ExportModal';
import ImportModal from '../shared/components/ImportModal';
import ConfirmDeleteModal from '../shared/components/ConfirmDeleteModal';

import { toast } from 'react-hot-toast';

const CustomerPage = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: '',
    type: ''
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeCustomerId, setActiveCustomerId] = useState(null);

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const queryClient = useQueryClient();
  
  const { data, isLoading } = useCustomers(params);
  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();
  const deleteMutation = useDeleteCustomer();

  const handleStatsFilter = (newFilters) => {
    setParams({ ...params, ...newFilters, page: 1 });
  };

  const handleCreate = async (formData) => {
    try {
      await createMutation.mutateAsync(formData);
      setIsFormOpen(false);
      toast.success('Customer berhasil ditambahkan');
    } catch (error) {
      console.error('Failed to create customer:', error);
      toast.error('Gagal menambahkan customer');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateMutation.mutateAsync({ id: selectedCustomer.id, data: formData });
      setIsFormOpen(false);
      setSelectedCustomer(null);
      toast.success('Data customer berhasil diperbarui');
    } catch (error) {
      console.error('Failed to update customer:', error);
      toast.error('Gagal memperbarui data customer');
    }
  };

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDeleteModal = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(selectedCustomer.id);
      toast.success(`Customer ${selectedCustomer.name} berhasil dihapus`);
      setIsDeleteOpen(false);
      setSelectedCustomer(null);
    } catch (error) {
      toast.error('Gagal menghapus customer');
    }
  };

  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  };

  const customersList = data?.data || [];

  const availableColumns = [
    { id: 'customer_code', label: 'Kode' },
    { id: 'name', label: 'Nama' },
    { id: 'phone', label: 'Telepon' },
    { id: 'email', label: 'Email' },
    { id: 'area', label: 'Area' },
    { id: 'sector', label: 'Sektor' },
    { id: 'status', label: 'Status' },
    { id: 'sales', label: 'Sales' }
  ];

  const handleExport = (format, columns) => {
    const cols = (columns && columns.length) ? columns : availableColumns.map(c => c.id);
    const headers = availableColumns.filter(c => cols.includes(c.id)).map(c => c.label);

    const rows = customersList.map(c => {
      return availableColumns.filter(col => cols.includes(col.id)).map(col => {
        if (col.id === 'sales') return c.sales?.name || '';
        return (c[col.id] !== undefined && c[col.id] !== null) ? c[col.id] : '';
      });
    });

    const csv = [headers.join(','), ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const ext = format === 'csv' ? 'csv' : (format === 'excel' ? 'csv' : 'csv');
    a.download = `customers.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    setIsExportOpen(false);
  };

  const handleDownloadTemplate = () => {
    const headers = availableColumns.map(c => c.label);
    const csv = headers.join(',');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers-template.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('/customers/import', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Import berhasil');
      queryClient.invalidateQueries(['customers']);
    } catch (err) {
      console.error('Import error:', err);
      alert('Import gagal');
    } finally {
      setIsImportOpen(false);
    }
  };

  return (
    <div className="pb-8 text-gray-900">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1 tracking-tight">Manajemen Customer</h1>
          <p className="text-sm text-gray-500 font-medium">Kelola data pelanggan personal dan corporate</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => setIsExportOpen(true)} className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95">
            <Download size={18} />
            Export
          </button>
          <button onClick={() => setIsImportOpen(true)} className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95">
            <Upload size={18} />
            Import
          </button>
          <button 
            onClick={() => {
              setSelectedCustomer(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
          >
            <Plus size={18} />
            Tambah Customer
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <CustomerStats onFilter={handleStatsFilter} isLoading={isLoading} />

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input 
            type="text"
            placeholder="Cari nama, kode, atau telepon..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 transition-all font-medium"
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value, page: 1 })}
          />
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-blue-900 appearance-none min-w-[140px] cursor-pointer hover:bg-gray-100 transition-colors"
            value={params.type}
            onChange={(e) => setParams({ ...params, type: e.target.value, page: 1 })}
          >
            <option value="">Semua Tipe</option>
            <option value="personal">Personal</option>
            <option value="corporate">Corporate</option>
          </select>

          <select 
            className="flex-1 md:flex-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-blue-900 appearance-none min-w-[140px] cursor-pointer hover:bg-gray-100 transition-colors"
            value={params.status}
            onChange={(e) => setParams({ ...params, status: e.target.value, page: 1 })}
          >
            <option value="">Semua Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>

          <div className="h-10 w-px bg-gray-100 mx-1 hidden md:block" />

          <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-900' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={18} />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-900' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Table */}
      <CustomerTable 
        customers={data?.data || []}
        meta={data?.meta || {}}
        isLoading={isLoading}
        onPageChange={(page) => setParams({ ...params, page })}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
        onViewDetail={(customer) => {
          setActiveCustomerId(customer.id);
          setIsDetailOpen(true);
        }}
      />

      {/* Detail Panel */}
      <CustomerDetailPanel 
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        customerId={activeCustomerId}
        onEdit={openEditModal}
      />

      {/* Modal Form */}
      <CustomerForm 
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCustomer(null);
        }}
        onSubmit={selectedCustomer ? handleUpdate : handleCreate}
        initialData={selectedCustomer}
        isLoading={createMutation.isLoading || updateMutation.isLoading}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Customer"
        itemName={selectedCustomer?.name}
      />

      {/* Export / Import Modals */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        onExport={handleExport}
        title="Export Customers"
        availableColumns={availableColumns}
      />

      <ImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImport={handleImport}
        title="Import Customers"
        onDownloadTemplate={handleDownloadTemplate}
      />

    </div>
  );
};

export default CustomerPage;