import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Save, Plus, Trash2, Package, User, Calculator, FileText, Info } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

const quotationSchema = z.object({
  customer_id: z.number().optional(),
  lead_id: z.number().optional(),
  deal_id: z.number().optional(),
  area: z.string().optional(),
  discount: z.number().min(0).default(0),
  tax_rate: z.number().min(0).default(0.11),
  notes: z.string().optional(),
  terms: z.string().optional(),
  items: z.array(z.object({
    product_id: z.number().optional(),
    name: z.string().min(1, 'Nama item wajib diisi'),
    description: z.string().optional(),
    quantity: z.number().min(1, 'Min 1'),
    price: z.number().min(0, 'Min 0'),
  })).min(1, 'Minimal 1 item')
});

const QuotationForm = ({ isOpen, onClose, onSubmit, isLoading, customers = [], leads = [], products = [] }) => {
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(quotationSchema),
    defaultValues: {
      items: [{ name: '', quantity: 1, price: 0 }],
      discount: 0,
      tax_rate: 0.11
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const items = watch('items');
  const discount = watch('discount') || 0;
  const taxRate = watch('tax_rate') || 0.11;

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity || 0), 0);
  const tax = (subtotal - discount) * taxRate;
  const total = subtotal - discount + tax;

  const handleProductSelect = (index, productId) => {
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
      setValue(`items.${index}.product_id`, product.id);
      setValue(`items.${index}.name`, product.name);
      setValue(`items.${index}.description`, product.description);
      setValue(`items.${index}.price`, product.price);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-100" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-[32px] shadow-2xl z-110 overflow-hidden border border-white">
          <div className="flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <Dialog.Title className="text-2xl font-black text-gray-900">Buat Penawaran (Quotation)</Dialog.Title>
                <Dialog.Description className="text-sm font-medium text-gray-500">
                  Buat surat penawaran harga untuk pelanggan atau prospek
                </Dialog.Description>
              </div>
              <Dialog.Close className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all shadow-sm">
                <X size={20} />
              </Dialog.Close>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-8 scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Left Column: Client Info */}
                <div className="md:col-span-1 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                      <User size={14} /> Informasi Pelanggan
                    </h3>
                    <div className="space-y-3">
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
                      <div className="text-center text-[10px] font-black text-gray-300">ATAU</div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pilih Lead</label>
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

                  <div className="space-y-4 pt-4 border-t border-gray-50">
                    <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                      <FileText size={14} /> Detail Tambahan
                    </h3>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Area Penawaran</label>
                        <input {...register('area')} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Catatan</label>
                        <textarea {...register('notes')} rows={3} className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Items & Totals */}
                <div className="md:col-span-2 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
                      <Package size={14} /> Daftar Item & Produk
                    </h3>
                    <button 
                      type="button"
                      onClick={() => append({ name: '', quantity: 1, price: 0 })}
                      className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg uppercase tracking-widest hover:bg-blue-100 transition-all flex items-center gap-1"
                    >
                      <Plus size={12} /> Tambah Item
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                    {fields.map((field, index) => (
                      <div key={field.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4 relative group">
                        <button 
                          type="button" 
                          onClick={() => remove(index)}
                          className="absolute -top-2 -right-2 w-7 h-7 bg-white text-red-500 rounded-full flex items-center justify-center shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="md:col-span-2 space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Pilih Produk (Opsional)</label>
                            <select 
                              onChange={(e) => handleProductSelect(index, e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-900 transition-all"
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
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-900" 
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Harga Satuan</label>
                            <input 
                              {...register(`items.${index}.price`, { valueAsNumber: true })}
                              type="number" 
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-900" 
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nama / Deskripsi Item</label>
                          <input 
                            {...register(`items.${index}.name`)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:border-blue-900" 
                            placeholder="Deskripsi produk atau layanan..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals Section */}
                  <div className="bg-blue-900/5 p-6 rounded-[32px] border border-blue-900/10 space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                      <span>Subtotal</span>
                      <span className="text-gray-900">Rp {new Intl.NumberFormat('id-ID').format(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Diskon Global</label>
                        <input 
                          {...register('discount', { valueAsNumber: true })}
                          type="number" 
                          className="w-32 px-3 py-1.5 bg-white border border-gray-100 rounded-xl text-xs font-black focus:outline-none focus:border-blue-900" 
                        />
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pajak (11%)</div>
                        <div className="text-xs font-bold text-gray-900">Rp {new Intl.NumberFormat('id-ID').format(tax)}</div>
                      </div>
                    </div>
                    <div className="h-px bg-blue-900/10 my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-black text-blue-900 uppercase tracking-widest">Total Penawaran</span>
                      <span className="text-xl font-black text-blue-900">Rp {new Intl.NumberFormat('id-ID').format(total)}</span>
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
                      Simpan Penawaran
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

export default QuotationForm;
