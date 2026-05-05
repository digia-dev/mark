import React, { useState } from 'react';
import { Plus, Search, Filter, Download, LayoutGrid, List } from 'lucide-react';
import { useCustomers, useCreateCustomer, useUpdateCustomer } from '../features/crm/hooks/use-customers';

// Components
import CustomerTable from '../features/crm/components/CustomerTable';
import CustomerForm from '../features/crm/components/CustomerForm';
import CustomerStats from '../features/crm/components/CustomerStats';

const CustomerPage = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: '',
    type: ''
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const { data, isLoading } = useCustomers(params);
  const createMutation = useCreateCustomer();
  const updateMutation = useUpdateCustomer();

  const handleCreate = async (formData) => {
    try {
      await createMutation.mutateAsync(formData);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to create customer:', error);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateMutation.mutateAsync({ id: selectedCustomer.id, data: formData });
      setIsFormOpen(false);
      setSelectedCustomer(null);
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  };

  const openEditModal = (customer) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  };

  return (
    <div className="pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Manajemen Customer</h1>
          <p className="text-sm text-gray-500 font-medium">Kelola data pelanggan personal dan corporate</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
            <Download size={18} />
            Export
          </button>
          <button 
            onClick={() => {
              setSelectedCustomer(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20"
          >
            <Plus size={18} />
            Tambah Customer
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <CustomerStats customers={data?.data || []} isLoading={isLoading} />

      {/* Filters & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input 
            type="text"
            placeholder="Cari nama, kode, atau telepon..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 transition-all"
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value, page: 1 })}
          />
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-blue-900 appearance-none min-w-[140px]"
            value={params.type}
            onChange={(e) => setParams({ ...params, type: e.target.value, page: 1 })}
          >
            <option value="">Semua Tipe</option>
            <option value="personal">Personal</option>
            <option value="corporate">Corporate</option>
          </select>

          <select 
            className="flex-1 md:flex-none px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 focus:outline-none focus:border-blue-900 appearance-none min-w-[140px]"
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
            <button className="p-1.5 bg-white shadow-sm rounded-lg text-blue-900">
              <List size={18} />
            </button>
            <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
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
        onViewDetail={(customer) => console.log('View detail:', customer)}
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
    </div>
  );
};

export default CustomerPage;
