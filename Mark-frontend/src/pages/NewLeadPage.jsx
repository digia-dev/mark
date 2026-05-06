import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import LeadForm from '../features/crm/components/LeadForm';
import { useCreateLead } from '../features/crm/hooks/use-leads';
import { toast } from 'react-hot-toast';

const NewLeadPage = () => {
  const navigate = useNavigate();
  const { mutate: createLead, isLoading } = useCreateLead();

  const handleSubmit = (data) => {
    createLead(data, {
      onSuccess: () => {
        toast.success('Lead berhasil ditambahkan');
        navigate('/crm/leads');
      },
      onError: (error) => {
        toast.error(error.message || 'Gagal menambahkan lead');
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
          <h1 className="text-2xl font-black text-gray-900">Tambah Lead Baru</h1>
          <p className="text-sm font-medium text-gray-500">Daftarkan calon pelanggan potensial ke dalam sistem pipeline</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-blue-900/5 overflow-hidden p-8">
        <LeadForm 
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

export default NewLeadPage;
