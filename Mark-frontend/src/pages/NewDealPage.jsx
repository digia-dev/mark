import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import DealForm from '../features/pipeline/components/DealForm';
import { useCreateDeal } from '../features/pipeline/hooks/use-deals';
import { toast } from 'react-hot-toast';

const NewDealPage = () => {
  const navigate = useNavigate();
  const { mutate: createDeal, isLoading } = useCreateDeal();

  const handleSubmit = (data) => {
    createDeal(data, {
      onSuccess: () => {
        toast.success('Deal berhasil ditambahkan');
        navigate('/pipeline');
      },
      onError: (error) => {
        toast.error(error.message || 'Gagal menambahkan deal');
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
          <h1 className="text-2xl font-black text-gray-900">Tambah Deal Baru</h1>
          <p className="text-sm font-medium text-gray-500">Buat peluang bisnis baru dalam pipeline penjualan</p>
        </div>
      </div>

      <DealForm 
        isOpen={true} 
        onClose={() => navigate(-1)} 
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default NewDealPage;
