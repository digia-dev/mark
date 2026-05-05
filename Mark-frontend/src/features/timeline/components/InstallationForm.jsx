import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Save, Calendar, MapPin, User, Package, Info } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const installationSchema = z.object({
  customer_id: z.number({ required_error: 'Customer wajib diisi' }),
  deal_id: z.number({ required_error: 'Deal wajib diisi' }),
  product_id: z.number({ required_error: 'Layanan wajib diisi' }),
  sales_id: z.number().optional(),
  technician_id: z.number().optional(),
  address: z.string().min(5, 'Alamat minimal 5 karakter'),
  area: z.string().optional(),
  scheduled_date: z.string().min(1, 'Tgl Mulai wajib diisi'),
  target_end_date: z.string().min(1, 'Target Selesai wajib diisi'),
  notes: z.string().optional(),
});

const InstallationForm = ({ isOpen, onClose, onSubmit, isLoading, customers = [], leads = [], products = [], users = [] }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(installationSchema),
  });

  const technicians = users.filter(u => u.role === 'technician' || u.role === 'TS');

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-100" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl bg-white rounded-[32px] shadow-2xl z-110 overflow-hidden border border-white">
          <div className="flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <Dialog.Title className="text-2xl font-black text-gray-900">Atur Jadwal Instalasi</Dialog.Title>
                <Dialog.Description className="text-sm font-medium text-gray-500">
                  Input data teknis dan jadwal pengerjaan untuk proyek baru
                </Dialog.Description>
              </div>
              <Dialog.Close className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all shadow-sm">
                <X size={20} />
              </Dialog.Close>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-8 scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Side: Basic Info */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                      <User size={14} /> Relasi Proyek
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pilih Pelanggan</label>
                        <select 
                          {...register('customer_id', { valueAsNumber: true })}
                          className={`w-full px-4 py-3 bg-gray-50 border-2 ${errors.customer_id ? 'border-red-100' : 'border-gray-50'} rounded-2xl text-sm font-bold focus:outline-none focus:bg-white transition-all appearance-none`}
                        >
                          <option value="">-- Pilih Customer --</option>
                          {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        {errors.customer_id && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.customer_id.message}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pilih Layanan / Paket</label>
                        <select 
                          {...register('product_id', { valueAsNumber: true })}
                          className={`w-full px-4 py-3 bg-gray-50 border-2 ${errors.product_id ? 'border-red-100' : 'border-gray-50'} rounded-2xl text-sm font-bold focus:outline-none focus:bg-white transition-all appearance-none`}
                        >
                          <option value="">-- Pilih Layanan --</option>
                          {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-50">
                    <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                      <MapPin size={14} /> Lokasi & Alamat
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Alamat Lengkap</label>
                        <textarea 
                          {...register('address')}
                          rows={3} 
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white transition-all" 
                          placeholder="Jl. Raya Nomor 123..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Area / Wilayah</label>
                          <input {...register('area')} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assign Teknisi</label>
                          <select 
                            {...register('technician_id', { valueAsNumber: true })}
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white transition-all appearance-none"
                          >
                            <option value="">-- Auto Assign --</option>
                            {technicians.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Timeline & Notes */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                      <Calendar size={14} /> Jadwal Pengerjaan
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tanggal Mulai (Start)</label>
                        <input 
                          {...register('scheduled_date')}
                          type="date" 
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Target Selesai (End)</label>
                        <input 
                          {...register('target_end_date')}
                          type="date" 
                          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-50">
                    <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                      <Info size={14} /> Keterangan Tambahan
                    </h3>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Catatan Teknis</label>
                      <textarea 
                        {...register('notes')}
                        rows={5} 
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white transition-all" 
                        placeholder="Detail tambahan untuk tim teknisi..."
                      />
                    </div>
                  </div>
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
                      Simpan Jadwal
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

export default InstallationForm;
