import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Lock, Unlock } from 'lucide-react';

const noteSchema = z.object({
  content: z.string().min(2, 'Catatan minimal 2 karakter'),
  is_internal: z.boolean().default(true),
});

const TicketNoteForm = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: { is_internal: true }
  });

  const isInternal = watch('is_internal');

  const submitForm = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col gap-3">
      <textarea
        {...register('content')}
        placeholder="Ketik catatan aktivitas atau solusi di sini..."
        className="w-full bg-white border border-gray-200 rounded-xl p-3 text-sm min-h-[100px] focus:outline-none focus:border-blue-500 resize-none"
      />
      {errors.content && <span className="text-red-500 text-xs">{errors.content.message}</span>}
      
      <div className="flex justify-between items-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            {...register('is_internal')} 
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
          />
          <span className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
            {isInternal ? <Lock size={14} className="text-orange-500"/> : <Unlock size={14} className="text-green-500"/>}
            Catatan Internal
          </span>
        </label>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-800 disabled:opacity-50 transition-all shadow-md shadow-blue-900/20"
        >
          {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <Send size={14} />}
          Kirim Catatan
        </button>
      </div>
    </form>
  );
};

export default TicketNoteForm;
