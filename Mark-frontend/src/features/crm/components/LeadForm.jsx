import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Save, User, Building2, Phone, Mail, MapPin, Globe, Calendar, Info } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const leadSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  company: z.string().optional(),
  phone: z.string().min(10, 'Nomor telepon tidak valid'),
  email: z.string().email('Email tidak valid').optional().or(z.literal('')),
  address: z.string().optional(),
  area: z.string().optional(),
  source: z.string().optional(),
  status: z.string().default('new'),
  follow_up_date: z.string().optional(),
  notes: z.string().optional()
});

const LeadForm = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: initialData || { status: 'new' }
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    if (!initialData) reset();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-100" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-[32px] shadow-2xl z-110 overflow-hidden border border-white">
          <div className="flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <Dialog.Title className="text-2xl font-black text-gray-900">
                  {initialData ? 'Edit Lead' : 'Tambah Lead Baru'}
                </Dialog.Title>
                <Dialog.Description className="text-sm font-medium text-gray-500">
                  Lengkapi informasi calon pelanggan potensial
                </Dialog.Description>
              </div>
              <Dialog.Close className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all shadow-sm">
                <X size={20} />
              </Dialog.Close>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex-1 overflow-y-auto p-8 scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama & Perusahaan */}
                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                    <User size={14} /> Informasi Utama
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap *</label>
                      <input 
                        {...register('name')}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 ${errors.name ? 'border-red-100' : 'border-gray-50'} rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all`}
                        placeholder="Contoh: Andi Pratama"
                      />
                      {errors.name && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Perusahaan / Instansi</label>
                      <input 
                        {...register('company')}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all"
                        placeholder="Contoh: PT. Maju Jaya"
                      />
                    </div>
                  </div>
                </div>

                {/* Kontak */}
                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={14} /> Kontak & Lokasi
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nomor Telepon *</label>
                      <input 
                        {...register('phone')}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 ${errors.phone ? 'border-red-100' : 'border-gray-50'} rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all`}
                        placeholder="0812xxxxxx"
                      />
                      {errors.phone && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email</label>
                      <input 
                        {...register('email')}
                        className={`w-full px-4 py-3 bg-gray-50 border-2 ${errors.email ? 'border-red-100' : 'border-gray-50'} rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all`}
                        placeholder="email@contoh.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alamat Lengkap</label>
                  <textarea 
                    {...register('address')}
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all"
                    placeholder="Masukkan alamat lengkap..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Area</label>
                  <select 
                    {...register('area')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all appearance-none"
                  >
                    <option value="">Pilih Area</option>
                    <option value="Jakarta Pusat">Jakarta Pusat</option>
                    <option value="Jakarta Selatan">Jakarta Selatan</option>
                    <option value="Jakarta Barat">Jakarta Barat</option>
                    <option value="Jakarta Utara">Jakarta Utara</option>
                    <option value="Jakarta Timur">Jakarta Timur</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sumber Lead</label>
                  <select 
                    {...register('source')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all appearance-none"
                  >
                    <option value="">Pilih Sumber</option>
                    <option value="canvassing">Canvassing</option>
                    <option value="referral">Referral</option>
                    <option value="web">Website</option>
                    <option value="sosmed">Media Sosial</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Status</label>
                  <select 
                    {...register('status')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all appearance-none"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="negosiasi">Negosiasi</option>
                    <option value="lost">Lost</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Rencana Follow Up</label>
                  <input 
                    {...register('follow_up_date')}
                    type="date"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Ditugaskan ke (Sales)</label>
                  <select 
                    {...register('assigned_to')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all appearance-none"
                  >
                    <option value="">Pilih Sales</option>
                    {/* Placeholder for sales users */}
                    <option value="1">Sales 1</option>
                    <option value="2">Sales 2</option>
                  </select>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Catatan Tambahan</label>
                  <textarea 
                    {...register('notes')}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all"
                    placeholder="Masukkan catatan atau detail kebutuhan pelanggan..."
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-10 flex gap-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 bg-white border border-gray-100 text-gray-700 rounded-2xl text-sm font-black hover:bg-gray-50 transition-all"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="flex-2 py-4 bg-blue-900 text-white rounded-2xl text-sm font-black hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save size={18} />
                      {initialData ? 'Simpan Perubahan' : 'Tambah Lead'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LeadForm;
