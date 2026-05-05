import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Save, Briefcase, User, CreditCard, Calendar, Activity, MapPin, Info } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const dealSchema = z.object({
  name: z.string().min(3, 'Nama deal minimal 3 karakter'),
  customer_id: z.number().optional(),
  lead_id: z.number().optional(),
  amount: z.number().min(0, 'Nilai deal tidak boleh negatif'),
  stage: z.string().default('prospek'),
  probability: z.number().min(0).max(100).default(20),
  expected_closing_date: z.string().optional(),
  area: z.string().optional(),
  notes: z.string().optional()
});

const DealForm = ({ isOpen, onClose, onSubmit, initialData, isLoading, customers = [], leads = [] }) => {
  const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm({
    resolver: zodResolver(dealSchema),
    defaultValues: initialData || { stage: 'prospek', probability: 20, amount: 0 }
  });

  const selectedStage = watch('stage');

  // Auto-set probability based on stage
  React.useEffect(() => {
    if (!initialData) {
      const probabilities = {
        'prospek': 20,
        'negosiasi': 50,
        'penawaran': 70,
        'closing': 90,
        'instalasi': 100
      };
      if (probabilities[selectedStage]) {
        setValue('probability', probabilities[selectedStage]);
      }
    }
  }, [selectedStage, setValue, initialData]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
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
                  {initialData ? 'Edit Deal' : 'Buat Deal Baru'}
                </Dialog.Title>
                <Dialog.Description className="text-sm font-medium text-gray-500">
                  Lacak peluang penjualan dalam pipeline
                </Dialog.Description>
              </div>
              <Dialog.Close className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all shadow-sm">
                <X size={20} />
              </Dialog.Close>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex-1 overflow-y-auto p-8 scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informasi Deal */}
                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                    <Briefcase size={14} /> Informasi Deal
                  </h3>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama Deal *</label>
                    <input 
                      {...register('name')}
                      className={`w-full px-4 py-3 bg-gray-50 border-2 ${errors.name ? 'border-red-100' : 'border-gray-50'} rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all`}
                      placeholder="Contoh: Pengadaan WiFi Kantor Cabang"
                    />
                    {errors.name && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.name.message}</p>}
                  </div>
                </div>

                {/* Relasi */}
                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                    <User size={14} /> Relasi Pelanggan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pilih Customer</label>
                      <select 
                        {...register('customer_id', { valueAsNumber: true })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all appearance-none"
                      >
                        <option value="">-- Pilih Customer --</option>
                        {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Atau dari Lead</label>
                      <select 
                        {...register('lead_id', { valueAsNumber: true })}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all appearance-none"
                      >
                        <option value="">-- Pilih Lead --</option>
                        {leads.map(l => <option key={l.id} value={l.id}>{l.name} ({l.company})</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Nilai & Tahapan */}
                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                    <Activity size={14} /> Nilai & Tahapan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nilai Deal (IDR) *</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">Rp</span>
                        <input 
                          {...register('amount', { valueAsNumber: true })}
                          type="number"
                          className={`w-full pl-10 pr-4 py-3 bg-gray-50 border-2 ${errors.amount ? 'border-red-100' : 'border-gray-50'} rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all`}
                          placeholder="0"
                        />
                      </div>
                      {errors.amount && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.amount.message}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pipeline Stage</label>
                      <select 
                        {...register('stage')}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all appearance-none"
                      >
                        <option value="prospek">Prospek</option>
                        <option value="negosiasi">Negosiasi</option>
                        <option value="penawaran">Penawaran</option>
                        <option value="closing">Closing</option>
                        <option value="instalasi">Instalasi</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Probabilitas (%)</label>
                  <input 
                    {...register('probability', { valueAsNumber: true })}
                    type="number"
                    max={100}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Estimasi Closing</label>
                  <input 
                    {...register('expected_closing_date')}
                    type="date"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all"
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
                  </select>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Catatan Kebutuhan</label>
                  <textarea 
                    {...register('notes')}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all"
                    placeholder="Masukkan detail teknis atau permintaan khusus..."
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
                      {initialData ? 'Simpan Perubahan' : 'Buat Deal'}
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

export default DealForm;
