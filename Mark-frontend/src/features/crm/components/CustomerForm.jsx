import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Save, Building2, User, MapPin, Phone, Mail, Globe } from 'lucide-react';

const customerSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  type: z.enum(['personal', 'corporate']),
  email: z.string().email('Email tidak valid').optional().or(z.literal('')),
  phone: z.string().min(5, 'Nomor telepon wajib diisi'),
  website: z.string().url('URL tidak valid').optional().or(z.literal('')),
  address: z.string().optional(),
  area: z.string().optional(),
  sector: z.string().optional(),
  contact_person: z.string().optional(),
  notes: z.string().optional()
});

const CustomerForm = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      type: 'personal'
    }
  });

  const customerType = watch('type');

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ type: 'personal' });
    }
  }, [initialData, reset, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {initialData ? 'Edit Customer' : 'Tambah Customer Baru'}
            </h3>
            <p className="text-xs text-gray-500 font-medium">Lengkapi informasi customer di bawah ini</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipe Customer */}
            <div className="col-span-1 md:col-span-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Tipe Customer</label>
              <div className="flex gap-4">
                <label className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${customerType === 'personal' ? 'border-blue-900 bg-blue-50/50 text-blue-900' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}>
                  <input {...register('type')} type="radio" value="personal" className="hidden" />
                  <User size={20} />
                  <span className="font-bold text-sm">Personal</span>
                </label>
                <label className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${customerType === 'corporate' ? 'border-blue-900 bg-blue-50/50 text-blue-900' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}>
                  <input {...register('type')} type="radio" value="corporate" className="hidden" />
                  <Building2 size={20} />
                  <span className="font-bold text-sm">Corporate</span>
                </label>
              </div>
            </div>

            {/* Nama & Email */}
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-gray-500 mb-1.5 block">Nama Lengkap / Perusahaan *</label>
                <div className="relative">
                  <input 
                    {...register('name')}
                    placeholder="Contoh: Budi Santoso / PT Maju Jaya"
                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 transition-all ${errors.name ? 'border-red-300' : 'border-gray-200 focus:border-blue-900'}`}
                  />
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                {errors.name && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-500 mb-1.5 block">Email</label>
                <div className="relative">
                  <input 
                    {...register('email')}
                    placeholder="nama@email.com"
                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 transition-all ${errors.email ? 'border-red-300' : 'border-gray-200 focus:border-blue-900'}`}
                  />
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                {errors.email && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.email.message}</p>}
              </div>
            </div>

            {/* Telepon & Website */}
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-gray-500 mb-1.5 block">Nomor Telepon / WhatsApp *</label>
                <div className="relative">
                  <input 
                    {...register('phone')}
                    placeholder="0812xxxx"
                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 transition-all ${errors.phone ? 'border-red-300' : 'border-gray-200 focus:border-blue-900'}`}
                  />
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                {errors.phone && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-500 mb-1.5 block">Website</label>
                <div className="relative">
                  <input 
                    {...register('website')}
                    placeholder="https://..."
                    className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 transition-all ${errors.website ? 'border-red-300' : 'border-gray-200 focus:border-blue-900'}`}
                  />
                  <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                {errors.website && <p className="text-[10px] text-red-500 mt-1 font-medium">{errors.website.message}</p>}
              </div>
            </div>

            {/* Area & Sektor */}
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-gray-500 mb-1.5 block">Area Coverage</label>
                <div className="relative">
                  <select 
                    {...register('area')}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 appearance-none transition-all"
                  >
                    <option value="">Pilih Area</option>
                    <option value="Jakarta Pusat">Jakarta Pusat</option>
                    <option value="Jakarta Selatan">Jakarta Selatan</option>
                    <option value="Jakarta Barat">Jakarta Barat</option>
                    <option value="Tangerang">Tangerang</option>
                  </select>
                  <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-gray-500 mb-1.5 block">Sektor Bisnis</label>
                <select 
                  {...register('sector')}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 appearance-none transition-all"
                >
                  <option value="">Pilih Sektor</option>
                  <option value="Residensial">Residensial</option>
                  <option value="Corporate">Corporate</option>
                  <option value="SOHO">SOHO</option>
                  <option value="Pemerintah">Pemerintah</option>
                  <option value="Pendidikan">Pendidikan</option>
                </select>
              </div>
            </div>

            {/* Alamat */}
            <div className="col-span-1 md:col-span-2">
              <label className="text-[11px] font-bold text-gray-500 mb-1.5 block">Alamat Lengkap</label>
              <textarea 
                {...register('address')}
                rows="3"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 transition-all resize-none"
                placeholder="Masukkan alamat lengkap..."
              ></textarea>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
            >
              Batal
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="px-8 py-2.5 bg-blue-900 text-white text-sm font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {initialData ? 'Simpan Perubahan' : 'Tambah Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
