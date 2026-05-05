import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Calendar, FileText, User } from 'lucide-react';

const InvoiceForm = ({ onSubmit, onCancel, customers = [], products = [], isSubmitting = false }) => {
  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      customer_id: '',
      due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      period_start: new Date().toISOString().split('T')[0],
      period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: '',
      items: [{ product_id: '', quantity: 1, unit_price: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const watchItems = watch("items");

  const calculateSubtotal = () => {
    return watchItems.reduce((sum, item) => sum + (Number(item.quantity) * Number(item.unit_price)), 0);
  };

  const handleProductSelect = (index, productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setValue(`items.${index}.unit_price`, product.price);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.11; // 11% VAT
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6">
      <div className="mb-6 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-black text-gray-900">Buat Invoice Baru</h2>
        <p className="text-sm font-semibold text-gray-500 mt-1">Lengkapi informasi untuk membuat invoice penagihan</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
              <User size={14} /> Pelanggan
            </label>
            <select
              {...register('customer_id', { required: 'Pilih pelanggan' })}
              className={`w-full px-4 py-2 bg-gray-50 border ${errors.customer_id ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-blue-900 focus:ring-blue-900/20'} rounded-xl focus:bg-white focus:ring-2 transition-all font-medium text-gray-900 appearance-none`}
            >
              <option value="">Pilih Pelanggan...</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.customer_id && <span className="text-xs font-bold text-red-500">{errors.customer_id.message}</span>}
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
              <Calendar size={14} /> Jatuh Tempo
            </label>
            <input
              type="date"
              {...register('due_date', { required: 'Pilih tanggal jatuh tempo' })}
              className={`w-full px-4 py-2 bg-gray-50 border ${errors.due_date ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-blue-900 focus:ring-blue-900/20'} rounded-xl focus:bg-white focus:ring-2 transition-all font-medium text-gray-900`}
            />
            {errors.due_date && <span className="text-xs font-bold text-red-500">{errors.due_date.message}</span>}
          </div>

          {/* Period Start */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Periode Mulai</label>
            <input
              type="date"
              {...register('period_start', { required: 'Pilih tanggal mulai periode' })}
              className={`w-full px-4 py-2 bg-gray-50 border ${errors.period_start ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-blue-900 focus:ring-blue-900/20'} rounded-xl focus:bg-white focus:ring-2 transition-all font-medium text-gray-900`}
            />
          </div>

          {/* Period End */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Periode Selesai</label>
            <input
              type="date"
              {...register('period_end', { required: 'Pilih tanggal selesai periode' })}
              className={`w-full px-4 py-2 bg-gray-50 border ${errors.period_end ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-blue-900 focus:ring-blue-900/20'} rounded-xl focus:bg-white focus:ring-2 transition-all font-medium text-gray-900`}
            />
          </div>
        </div>

        {/* Items Section */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <FileText size={16} /> Item Tagihan
            </h3>
            <button
              type="button"
              onClick={() => append({ product_id: '', quantity: 1, unit_price: 0 })}
              className="px-3 py-1.5 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1"
            >
              <Plus size={14} /> Tambah Item
            </button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-3 items-start bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Produk</label>
                  <select
                    {...register(`items.${index}.product_id`, { required: true })}
                    onChange={(e) => {
                      register(`items.${index}.product_id`).onChange(e);
                      handleProductSelect(index, e.target.value);
                    }}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:border-blue-900 focus:ring-1 focus:ring-blue-900/20 transition-all font-medium"
                  >
                    <option value="">Pilih Produk...</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="w-24 space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Qty</label>
                  <input
                    type="number"
                    min="1"
                    {...register(`items.${index}.quantity`, { required: true, min: 1 })}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:border-blue-900 focus:ring-1 focus:ring-blue-900/20 transition-all font-medium text-center"
                  />
                </div>

                <div className="w-40 space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Harga Satuan</label>
                  <input
                    type="number"
                    min="0"
                    {...register(`items.${index}.unit_price`, { required: true, min: 0 })}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:border-blue-900 focus:ring-1 focus:ring-blue-900/20 transition-all font-medium"
                  />
                </div>

                <div className="w-40 space-y-1">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total</label>
                  <div className="px-3 py-2 text-sm font-bold text-gray-900 bg-gray-100 rounded-lg border border-transparent">
                    {formatCurrency((watchItems[index]?.quantity || 0) * (watchItems[index]?.unit_price || 0))}
                  </div>
                </div>

                <div className="pt-5">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-sm space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                <span>PPN (11%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                <span className="text-base font-bold text-gray-900 uppercase tracking-widest">Total Tagihan</span>
                <span className="text-xl font-black text-blue-900">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2 pt-4 border-t border-gray-100">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Catatan Tambahan</label>
          <textarea
            {...register('notes')}
            rows={3}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 focus:border-blue-900 focus:ring-blue-900/20 rounded-xl focus:bg-white focus:ring-2 transition-all font-medium text-gray-900 resize-none"
            placeholder="Tambahkan catatan untuk pelanggan jika ada..."
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 bg-white border border-gray-200 rounded-xl transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-colors shadow-sm shadow-blue-900/20 disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : null}
            Simpan Invoice
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;
