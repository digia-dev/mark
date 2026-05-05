import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ProductForm from '../features/product/components/ProductForm';
import { useCreateProduct } from '../features/product/hooks/use-products';
import { toast } from 'react-hot-toast';

const NewProductPage = () => {
  const navigate = useNavigate();
  const { mutate: createProduct, isLoading } = useCreateProduct();

  const handleSubmit = (data) => {
    createProduct(data, {
      onSuccess: () => {
        toast.success('Produk berhasil ditambahkan');
        navigate('/products');
      },
      onError: (error) => {
        toast.error(error.message || 'Gagal menambahkan produk');
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
          <h1 className="text-2xl font-black text-gray-900">Tambah Produk Baru</h1>
          <p className="text-sm font-medium text-gray-500">Daftarkan paket bandwidth atau layanan baru ke dalam katalog</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden">
        <ProductForm 
          isOpen={true} 
          onClose={() => navigate(-1)} 
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default NewProductPage;
