import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Save, User, AlertTriangle, MessageSquare, Paperclip } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const ticketSchema = z.object({
  customer_id: z.number({ required_error: 'Customer wajib diisi' }),
  category: z.enum(['technical', 'billing', 'sales', 'general', 'other'], { required_error: 'Kategori wajib diisi' }),
  priority: z.enum(['low', 'medium', 'high', 'critical'], { required_error: 'Prioritas wajib diisi' }),
  title: z.string().min(5, 'Judul keluhan minimal 5 karakter'),
  description: z.string().min(10, 'Detail keluhan minimal 10 karakter'),
  assigned_to: z.number().optional(),
});

const TicketForm = ({ isOpen, onClose, onSubmit, isLoading, customers = [], users = [] }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      category: 'technical',
      priority: 'medium'
    }
  });

  const technicians = users.filter(u => u.role === 'technician' || u.role === 'TS');

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-100" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-[32px] shadow-2xl z-110 overflow-hidden border border-white">
          <div className="flex flex-col h-full max-h-[90vh]">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <Dialog.Title className="text-2xl font-black text-gray-900">Buat Trouble Ticket</Dialog.Title>
                <Dialog.Description className="text-sm font-medium text-gray-500">
                  Catat laporan keluhan atau permintaan pelanggan
                </Dialog.Description>
              </div>
              <Dialog.Close className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all shadow-sm">
                <X size={20} />
              </Dialog.Close>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-8 scrollbar-hide space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2 border-b border-gray-100 pb-2">
                  <User size={14} /> Informasi Pelanggan & Kategori
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pelanggan</label>
                    <select 
                      {...register('customer_id', { valueAsNumber: true })}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white transition-all appearance-none"
                    >
                      <option value="">-- Pilih Customer --</option>
                      {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    {errors.customer_id && <span className="text-xs text-red-500">{errors.customer_id.message}</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Kategori Keluhan</label>
                      <select 
                        {...register('category')}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white transition-all appearance-none"
                      >
                        <option value="technical">Technical / Network</option>
                        <option value="billing">Billing / Payment</option>
                        <option value="sales">Sales / Upgrades</option>
                        <option value="general">General Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Prioritas (SLA)</label>
                      <select 
                        {...register('priority')}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white transition-all appearance-none"
                      >
                        <option value="low">Low (48 Jam)</option>
                        <option value="medium">Medium (24 Jam)</option>
                        <option value="high">High (8 Jam)</option>
                        <option value="critical">Critical (4 Jam)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2 border-b border-gray-100 pb-2">
                  <AlertTriangle size={14} /> Detail Keluhan
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Judul Singkat</label>
                    <input 
                      {...register('title')}
                      placeholder="Contoh: Koneksi terputus sejak pagi"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white transition-all"
                    />
                    {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Deskripsi Lengkap</label>
                    <textarea 
                      {...register('description')}
                      rows={4}
                      placeholder="Jelaskan detail masalah yang dialami pelanggan..."
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white transition-all resize-none"
                    />
                    {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2 border-b border-gray-100 pb-2">
                  <User size={14} /> Penugasan
                </h3>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Assign Ke (Opsional)</label>
                  <select 
                    {...register('assigned_to', { valueAsNumber: true })}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white transition-all appearance-none"
                  >
                    <option value="">-- Biarkan Kosong (Unassigned) --</option>
                    {technicians.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
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
                      Simpan Tiket
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

export default TicketForm;
