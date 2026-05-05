import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Save, MessageSquare, Phone, Users, Mail, MapPin } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const interactionSchema = z.object({
  type: z.string().min(1, 'Pilih tipe interaksi'),
  notes: z.string().min(5, 'Catatan minimal 5 karakter'),
  next_action: z.string().optional(),
  next_action_date: z.string().optional()
});

const InteractionForm = ({ isOpen, onClose, onSubmit, isLoading, customerName }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(interactionSchema),
    defaultValues: { type: 'whatsapp' }
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  const interactionTypes = [
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, color: 'text-green-600 bg-green-50' },
    { id: 'call', label: 'Telepon', icon: Phone, color: 'text-blue-600 bg-blue-50' },
    { id: 'meeting', label: 'Meeting', icon: Users, color: 'text-purple-600 bg-purple-50' },
    { id: 'email', label: 'Email', icon: Mail, color: 'text-orange-600 bg-orange-50' },
    { id: 'visit', label: 'Visit', icon: MapPin, color: 'text-red-600 bg-red-50' }
  ];

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-100" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-[32px] shadow-2xl z-110 overflow-hidden border border-white">
          <div className="flex flex-col">
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <Dialog.Title className="text-2xl font-black text-gray-900">Catat Interaksi</Dialog.Title>
                <Dialog.Description className="text-sm font-medium text-gray-500">
                  Untuk: <span className="font-black text-blue-900">{customerName}</span>
                </Dialog.Description>
              </div>
              <Dialog.Close className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all shadow-sm">
                <X size={20} />
              </Dialog.Close>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit(handleFormSubmit)} className="p-8 space-y-6">
              {/* Type Selection */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tipe Interaksi</label>
                <div className="grid grid-cols-5 gap-2">
                  {interactionTypes.map(type => (
                    <label key={type.id} className="relative cursor-pointer group">
                      <input {...register('type')} type="radio" value={type.id} className="peer absolute opacity-0" />
                      <div className="flex flex-col items-center gap-2 p-3 rounded-2xl border-2 border-gray-50 bg-gray-50 peer-checked:border-blue-900 peer-checked:bg-blue-50 transition-all group-hover:bg-white">
                        <type.icon size={20} className={type.color.split(' ')[0]} />
                        <span className="text-[9px] font-black uppercase tracking-tighter text-gray-500 peer-checked:text-blue-900">{type.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Catatan Interaksi *</label>
                <textarea 
                  {...register('notes')}
                  rows={4}
                  className={`w-full px-4 py-3 bg-gray-50 border-2 ${errors.notes ? 'border-red-100' : 'border-gray-50'} rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all`}
                  placeholder="Ceritakan detail interaksi dengan pelanggan..."
                />
                {errors.notes && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.notes.message}</p>}
              </div>

              {/* Next Action */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tindakan Selanjutnya</label>
                  <input 
                    {...register('next_action')}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all"
                    placeholder="Contoh: Kirim penawaran"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Tanggal Rencana</label>
                  <input 
                    {...register('next_action_date')}
                    type="date"
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:border-blue-900/10 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex gap-4 pt-4">
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
                      Simpan Interaksi
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

export default InteractionForm;
