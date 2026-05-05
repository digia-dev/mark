import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import QuotationForm from '../features/quotation/components/QuotationForm';
import { useCreateQuotation } from '../features/quotation/hooks/use-quotations';
import { toast } from 'react-hot-toast';

const NewQuotationPage = () => {
  const navigate = useNavigate();
  const { mutate: createQuotation, isLoading } = useCreateQuotation();

  const handleSubmit = (data) => {
    createQuotation(data, {
      onSuccess: () => {
        toast.success('Quotation berhasil ditambahkan');
        navigate('/quotation');
      },
      onError: (error) => {
        toast.error(error.message || 'Gagal menambahkan quotation');
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
          <h1 className="text-2xl font-black text-gray-900">Buat Quotation Baru</h1>
          <p className="text-sm font-medium text-gray-500">Buat penawaran harga resmi untuk calon pelanggan</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden p-8">
         <QuotationForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onCancel={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default NewQuotationPage;
