import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import InvoiceForm from '../features/invoice/components/InvoiceForm';
import { useCreateInvoice } from '../features/invoice/hooks/use-invoices';
import { useCustomers } from '../features/crm/hooks/use-customers';
import { useProductList } from '../features/product/hooks/use-products';
import { toast } from 'react-hot-toast';

const NewInvoicePage = () => {
  const navigate = useNavigate();
  const { mutate: createInvoice, isLoading: isSubmitting } = useCreateInvoice();
  
  const { data: customersData, isLoading: isLoadingCustomers } = useCustomers({ limit: 100 });
  const { data: productsData, isLoading: isLoadingProducts } = useProductList({ limit: 100 });

  const customers = customersData?.data || [];
  const products = productsData?.data || [];

  const handleSubmit = (data) => {
    createInvoice(data, {
      onSuccess: () => {
        toast.success('Invoice berhasil dibuat');
        navigate('/invoice');
      },
      onError: (error) => {
        toast.error(error.message || 'Gagal membuat invoice');
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 hover:border-gray-200 transition-all shadow-sm"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Buat Invoice Baru</h1>
          <p className="text-sm font-medium text-gray-500">Terbitkan faktur tagihan untuk layanan atau produk pelanggan</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden">
        <InvoiceForm 
          onCancel={() => navigate(-1)} 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          customers={customers}
          products={products}
        />
      </div>
    </div>
  );
};

export default NewInvoicePage;
