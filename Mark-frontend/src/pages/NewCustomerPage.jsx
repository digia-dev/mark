import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import CustomerForm from '../features/crm/components/CustomerForm';
import { useCreateCustomer } from '../features/crm/hooks/use-customers';
import { toast } from 'react-hot-toast';

const NewCustomerPage = () => {
  const navigate = useNavigate();
  const { mutate: createCustomer, isLoading } = useCreateCustomer();

  const handleSubmit = (data) => {
    createCustomer(data, {
      onSuccess: () => {
        toast.success('Customer berhasil ditambahkan');
        navigate('/crm/customers');
      },
      onError: (error) => {
        toast.error(error.message || 'Gagal menambahkan customer');
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 hover:border-gray-200 transition-all shadow-sm"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Tambah Customer Baru</h1>
          <p className="text-sm font-medium text-gray-500">Silakan isi formulir di bawah untuk mendaftarkan pelanggan baru</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-blue-900/5 overflow-hidden">
        {/* We use the CustomerForm component but we need it to behave like a page section not a modal */}
        {/* Since CustomerForm is currently a fixed-inset modal, we might need to modify it or create a Page version */}
        {/* For now, I will create a Page-specific version of the form content to ensure better UI */}
        <CustomerForm 
          isOpen={true} 
          isEmbedded={true}
          onClose={() => navigate(-1)} 
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default NewCustomerPage;
