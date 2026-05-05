import React from 'react';
import { Trash2 } from 'lucide-react';

const QuotationItemRow = ({ index, register, remove, products, onProductSelect, errors }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4 relative group animate-in fade-in slide-in-from-top-1 duration-200">
      <button 
        type="button" 
        onClick={() => remove(index)}
        className="absolute -top-2 -right-2 w-7 h-7 bg-white text-red-500 rounded-full flex items-center justify-center shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 z-10"
      >
        <Trash2 size={14} />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pilih Produk (Opsional)</label>
          <select 
            onChange={(e) => onProductSelect(index, e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-900 transition-all shadow-sm"
          >
            <option value="">-- Pilih Produk --</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Jumlah</label>
          <input 
            {...register(`items.${index}.quantity`, { valueAsNumber: true })}
            type="number" 
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-900 shadow-sm" 
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Harga Satuan</label>
          <input 
            {...register(`items.${index}.price`, { valueAsNumber: true })}
            type="number" 
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-900 shadow-sm" 
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama / Deskripsi Item</label>
        <input 
          {...register(`items.${index}.name`)}
          className={`w-full px-3 py-2 bg-white border ${errors?.items?.[index]?.name ? 'border-red-300' : 'border-gray-200'} rounded-xl text-xs font-bold focus:outline-none focus:border-blue-900 shadow-sm`} 
          placeholder="Deskripsi produk atau layanan..."
        />
        {errors?.items?.[index]?.name && (
          <p className="text-[9px] font-bold text-red-500 ml-1">{errors.items[index].name.message}</p>
        )}
      </div>
    </div>
  );
};

export default QuotationItemRow;
