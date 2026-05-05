import React from 'react';
import { useForm } from 'react-hook-form';
import { X, UserCheck, AlertCircle, Building2, User } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const ConvertLeadModal = ({ isOpen, onClose, lead, onConvert, isLoading }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { type: 'personal' }
  });

  if (!lead) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-100" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[32px] shadow-2xl z-110 overflow-hidden border border-white p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserCheck size={32} />
            </div>
            <Dialog.Title className="text-2xl font-black text-gray-900 mb-2">Konversi Lead</Dialog.Title>
            <Dialog.Description className="text-sm font-medium text-gray-500">
              Ubah lead <span className="font-black text-blue-900">"{lead.name}"</span> menjadi customer tetap.
            </Dialog.Description>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 mb-8 space-y-3">
             <div className="flex items-center gap-3">
                <AlertCircle size={16} className="text-orange-500" />
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Penting</p>
             </div>
             <p className="text-xs font-medium text-gray-600 leading-relaxed">
                Tindakan ini akan membuat data customer baru dan memindahkan status lead ini menjadi <span className="font-bold">"Converted"</span>.
             </p>
          </div>

          <form onSubmit={handleSubmit(onConvert)} className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-900 uppercase tracking-widest ml-1">Pilih Tipe Customer</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all has-checked:border-blue-900 has-checked:bg-blue-50/50 border-gray-50 bg-gray-50">
                   <input {...register('type')} type="radio" value="personal" className="absolute opacity-0" />
                   <User size={20} className="text-gray-400 peer-checked:text-blue-900" />
                   <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 peer-checked:text-blue-900">Personal</span>
                </label>
                <label className="relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 cursor-pointer transition-all has-checked:border-blue-900 has-checked:bg-blue-50/50 border-gray-50 bg-gray-50">
                   <input {...register('type')} type="radio" value="corporate" className="absolute opacity-0" />
                   <Building2 size={20} className="text-gray-400 peer-checked:text-blue-900" />
                   <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 peer-checked:text-blue-900">Corporate</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
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
                  <>Konfirmasi</>
                )}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConvertLeadModal;
