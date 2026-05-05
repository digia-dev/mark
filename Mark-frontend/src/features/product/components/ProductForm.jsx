import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Save, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const productSchema = z.object({
  name: z.string().min(3, 'Nama produk minimal 3 karakter').max(100),
  category: z.string().min(1, 'Pilih kategori'),
  description: z.string().max(1000).optional(),
  speed_down: z.number().int().positive('Kecepatan harus positif').nullable(),
  speed_up: z.number().int().positive('Kecepatan harus positif').nullable(),
  price: z.number().min(0, 'Harga tidak boleh negatif'),
  technology: z.string().min(1, 'Pilih teknologi'),
  area_coverage: z.string().optional().nullable(),
  is_best_seller: z.boolean().default(false),
  is_promo: z.boolean().default(false),
  promo_price: z.number().optional().nullable(),
  promo_end_date: z.string().optional().nullable(),
  status: z.enum(['active', 'inactive', 'promo']).default('active'),
});

const ProductForm = ({ isOpen, onClose, onSubmit, initialData = null, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      status: 'active',
      is_promo: false,
      is_best_seller: false,
      technology: 'fiber',
      category: 'internet'
    },
  });

  const isPromo = watch('is_promo');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <h2 className="text-lg font-bold text-gray-900">
              {initialData ? 'Edit Produk' : 'Tambah Produk Baru'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Informasi Dasar</h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Produk *</label>
                  <input
                    {...register('name')}
                    className={`w-full px-4 py-2 bg-gray-50 border ${errors.name ? 'border-red-300 focus:ring-red-500/10' : 'border-gray-200 focus:ring-blue-500/10'} rounded-lg text-sm focus:outline-none focus:ring-4 focus:border-blue-500 transition-all`}
                    placeholder="Contoh: Internet Dedicated 100 Mbps"
                  />
                  {errors.name && <p className="mt-1 text-[10px] text-red-600 font-medium">{errors.name.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Kategori *</label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                >
                  <option value="internet">Internet</option>
                  <option value="perangkat">Perangkat</option>
                  <option value="instalasi">Instalasi</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="bundling">Bundling</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Teknologi *</label>
                <select
                  {...register('technology')}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                >
                  <option value="fiber">Fiber Optic</option>
                  <option value="wireless">Wireless</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="copper">Copper</option>
                </select>
              </div>

              {/* Speeds */}
              <div className="space-y-4 md:col-span-2 mt-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Spesifikasi Layanan</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Download (Mbps)</label>
                    <input
                      type="number"
                      {...register('speed_down', { valueAsNumber: true })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Upload (Mbps)</label>
                    <input
                      type="number"
                      {...register('speed_up', { valueAsNumber: true })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4 md:col-span-2 mt-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Harga & Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Harga Normal (Rp) *</label>
                    <input
                      type="number"
                      {...register('price', { valueAsNumber: true })}
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" {...register('is_promo')} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <label className="text-sm font-medium text-gray-700">Produk Promo</label>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input type="checkbox" {...register('is_best_seller')} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <label className="text-sm font-medium text-gray-700">Best Seller</label>
                  </div>

                  {isPromo && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="col-span-2 grid grid-cols-2 gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100"
                    >
                      <div>
                        <label className="block text-xs font-semibold text-orange-800 mb-1">Harga Promo (Rp)</label>
                        <input
                          type="number"
                          {...register('promo_price', { valueAsNumber: true })}
                          className="w-full px-4 py-2 bg-white border border-orange-200 rounded-lg text-sm font-bold text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-orange-800 mb-1">Berlaku S/D</label>
                        <input
                          type="date"
                          {...register('promo_end_date')}
                          className="w-full px-4 py-2 bg-white border border-orange-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                        />
                      </div>
                    </motion.div>
                  )}

                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Status Produk</label>
                    <div className="flex gap-4 mt-2">
                      {['active', 'inactive', 'promo'].map((s) => (
                        <label key={s} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" value={s} {...register('status')} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                          <span className="text-sm text-gray-600 capitalize">{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Coverage & Description */}
              <div className="space-y-4 md:col-span-2 mt-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Lainnya</h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Area Coverage</label>
                  <input
                    {...register('area_coverage')}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                    placeholder="Contoh: Nasional, Jabodetabek, Jawa Barat"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none"
                    placeholder="Tulis deskripsi produk di sini..."
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-end gap-3 bg-white sticky bottom-0 z-10 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-lg transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-700 text-white text-sm font-bold rounded-lg shadow-lg shadow-blue-700/20 hover:bg-blue-800 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {initialData ? 'Simpan Perubahan' : 'Tambah Produk'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductForm;
