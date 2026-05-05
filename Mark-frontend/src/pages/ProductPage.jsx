import React, { useState } from 'react';
import { 
  Plus, Search, Filter, LayoutGrid, List, 
  Download, ChevronDown 
} from 'lucide-react';
import { 
  useProductList, 
  useCreateProduct, 
  useUpdateProduct, 
  useDeleteProduct,
  useToggleProductStatus 
} from '../features/product/hooks/use-products';
import ProductStatCards from '../features/product/components/ProductStatCards';
import ProductCard from '../features/product/components/ProductCard';
import ProductTable from '../features/product/components/ProductTable';
import ProductForm from '../features/product/components/ProductForm';

const ProductPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    category: '',
    status: '',
    technology: ''
  });

  const { data: productsData, isLoading } = useProductList(filters);
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();
  const toggleStatusMutation = useToggleProductStatus();

  const handleCreate = (data) => {
    createMutation.mutate(data, {
      onSuccess: () => setIsFormOpen(false)
    });
  };

  const handleUpdate = (data) => {
    updateMutation.mutate({ id: editingProduct.id, data }, {
      onSuccess: () => {
        setIsFormOpen(false);
        setEditingProduct(null);
      }
    });
  };

  const handleDelete = (product) => {
    if (window.confirm(`Yakin ingin menghapus produk ${product.name}?`)) {
      deleteMutation.mutate(product.id);
    }
  };

  const handleToggleStatus = (product) => {
    const nextStatus = product.status === 'active' ? 'inactive' : 'active';
    toggleStatusMutation.mutate({ id: product.id, status: nextStatus });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products & Services</h1>
          <p className="text-sm text-gray-500">Manajemen paket internet, perangkat, dan layanan Mark.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all">
            <Download size={18} />
            Export
          </button>
          <button 
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-700/20 hover:bg-blue-800 transition-all"
          >
            <Plus size={18} />
            Tambah Produk
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <ProductStatCards 
        stats={productsData?.meta ? {
          total: productsData.meta.total,
          active: productsData.data.filter(p => p.status === 'active').length, // This is mock, should come from API
          inactive: productsData.data.filter(p => p.status === 'inactive').length,
          promo: productsData.data.filter(p => p.status === 'promo').length
        } : {}}
      />

      {/* Toolbar Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Cari produk..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
              className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64 transition-all"
            />
          </div>
          <div className="h-8 w-px bg-gray-100 mx-1" />
          <select 
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none"
          >
            <option value="">Semua Kategori</option>
            <option value="internet">Internet</option>
            <option value="perangkat">Perangkat</option>
            <option value="instalasi">Instalasi</option>
          </select>
          <select 
            value={filters.technology}
            onChange={(e) => setFilters({ ...filters, technology: e.target.value, page: 1 })}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none"
          >
            <option value="">Semua Teknologi</option>
            <option value="fiber">Fiber Optic</option>
            <option value="wireless">Wireless</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
            <Filter size={18} />
            Filter Lanjut
          </button>
        </div>

        <div className="flex items-center gap-2 self-end">
          <div className="flex items-center bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content View */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
          <p className="text-gray-500 animate-pulse font-medium">Memuat data produk...</p>
        </div>
      ) : productsData?.data?.length > 0 ? (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {productsData.data.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onDetail={handleEdit}
                  onCreateQuotation={() => {}} // TODO
                />
              ))}
            </div>
          ) : (
            <ProductTable 
              products={productsData.data} 
              meta={productsData.meta}
              onPageChange={(page) => setFilters({ ...filters, page })}
              onDetail={handleEdit}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          )}
        </>
      ) : (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-20 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-gray-300" size={32} />
          </div>
          <h3 className="text-gray-900 font-bold text-lg mb-1">Produk Tidak Ditemukan</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Coba ganti filter pencarian atau buat produk baru untuk ditampilkan di sini.
          </p>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="px-6 py-2 bg-blue-700 text-white rounded-lg text-sm font-bold hover:bg-blue-800 transition-all"
          >
            Tambah Produk Sekarang
          </button>
        </div>
      )}

      {/* Form Modal */}
      <ProductForm 
        isOpen={isFormOpen} 
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }} 
        onSubmit={editingProduct ? handleUpdate : handleCreate}
        initialData={editingProduct}
        isLoading={createMutation.isLoading || updateMutation.isLoading}
      />
    </div>
  );
};

export default ProductPage;
