import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, ArrowUp, ArrowDown, Layout, Type, Image as ImageIcon, Save, X } from 'lucide-react';

const PresentationForm = ({ onSubmit, onCancel, customers = [], products = [], isSubmitting = false }) => {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      customer_id: '',
      product_id: '',
      presentation_date: new Date().toISOString().split('T')[0],
      status: 'draft',
      theme: 'default',
      slides: [
        { title: 'Judul Presentasi', content: 'Sub-judul atau deskripsi', layout: 'title' }
      ]
    }
  });

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: "slides"
  });

  const watchSlides = watch("slides");

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm p-6 max-w-4xl mx-auto">
      <div className="mb-6 border-b border-gray-100 pb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-gray-900">Editor Presentasi</h2>
          <p className="text-sm font-semibold text-gray-500 mt-1">Buat presentasi penawaran untuk pelanggan</p>
        </div>
        <button onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* General Information */}
        <div>
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-4">Informasi Umum</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Judul Presentasi</label>
              <input
                type="text"
                {...register('title', { required: 'Judul harus diisi' })}
                className={`w-full px-4 py-2 bg-gray-50 border ${errors.title ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-blue-900 focus:ring-blue-900/20'} rounded-xl focus:bg-white focus:ring-2 transition-all font-medium text-gray-900`}
                placeholder="Contoh: Penawaran Internet Dedicated PT ABC"
              />
              {errors.title && <span className="text-xs font-bold text-red-500">{errors.title.message}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Pelanggan</label>
              <select
                {...register('customer_id', { required: 'Pilih pelanggan' })}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 transition-all font-medium text-gray-900 appearance-none"
              >
                <option value="">Pilih Pelanggan...</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Produk Fokus</label>
              <select
                {...register('product_id')}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 transition-all font-medium text-gray-900 appearance-none"
              >
                <option value="">Tidak ada fokus produk khusus</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Tanggal Presentasi</label>
              <input
                type="date"
                {...register('presentation_date')}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 transition-all font-medium text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Tema Visual</label>
              <select
                {...register('theme')}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 transition-all font-medium text-gray-900 appearance-none"
              >
                <option value="default">Default Mark (Blue)</option>
                <option value="dark">Dark Mode</option>
                <option value="minimal">Minimalist</option>
                <option value="vibrant">Vibrant Colors</option>
              </select>
            </div>
          </div>
        </div>

        {/* Slide Editor */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest">Editor Slide</h3>
            <button
              type="button"
              onClick={() => append({ title: '', content: '', layout: 'standard' })}
              className="px-3 py-1.5 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1"
            >
              <Plus size={14} /> Tambah Slide
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="bg-gray-50/50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                
                {/* Slide Toolbar */}
                <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b border-gray-200">
                  <span className="text-xs font-black text-gray-600">Slide {index + 1}</span>
                  
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                      <button type="button" onClick={() => swap(index, index - 1)} disabled={index === 0} className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded disabled:opacity-30">
                        <ArrowUp size={14} />
                      </button>
                      <button type="button" onClick={() => swap(index, index + 1)} disabled={index === fields.length - 1} className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded disabled:opacity-30">
                        <ArrowDown size={14} />
                      </button>
                    </div>

                    <select
                      {...register(`slides.${index}.layout`)}
                      className="text-xs py-1 px-2 pr-6 bg-white border border-gray-300 rounded focus:border-blue-900 focus:ring-1 focus:ring-blue-900 font-medium"
                    >
                      <option value="title">Title Layout</option>
                      <option value="standard">Standard Layout</option>
                      <option value="image">Image + Text</option>
                      <option value="quote">Quote Layout</option>
                    </select>

                    <button type="button" onClick={() => remove(index)} disabled={fields.length === 1} className="p-1 ml-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded disabled:opacity-30">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Slide Content Edit */}
                <div className="p-4 space-y-4 bg-white">
                  <div>
                    <input
                      type="text"
                      {...register(`slides.${index}.title`)}
                      className="w-full text-lg font-black text-gray-900 placeholder:text-gray-300 border-0 border-b border-transparent hover:border-gray-200 focus:border-blue-900 focus:ring-0 px-0 py-2 transition-colors"
                      placeholder="Judul Slide"
                    />
                  </div>
                  <div>
                    <textarea
                      {...register(`slides.${index}.content`)}
                      rows={watchSlides[index]?.layout === 'title' ? 2 : 4}
                      className={`w-full text-sm text-gray-600 placeholder:text-gray-300 border border-gray-200 rounded-xl focus:border-blue-900 focus:ring-1 focus:ring-blue-900 p-3 transition-colors resize-none ${watchSlides[index]?.layout === 'title' ? 'text-center font-medium text-lg' : ''}`}
                      placeholder={watchSlides[index]?.layout === 'title' ? 'Sub-judul atau deskripsi singkat' : 'Isi konten slide...'}
                    />
                  </div>
                  
                  {watchSlides[index]?.layout === 'image' && (
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 hover:bg-gray-50 hover:border-blue-300 transition-colors cursor-pointer">
                      <ImageIcon size={24} className="mb-2" />
                      <p className="text-xs font-semibold">Klik untuk unggah gambar</p>
                      <p className="text-[10px]">JPG, PNG, GIF up to 5MB</p>
                      <input type="hidden" {...register(`slides.${index}.imageUrl`)} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <select
              {...register('status')}
              className="px-3 py-2 text-sm font-bold bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-900 focus:ring-1 focus:ring-blue-900 appearance-none text-gray-700"
            >
              <option value="draft">Simpan sebagai Draft</option>
              <option value="published">Siap Dipresentasikan</option>
            </select>
          </div>
          
          <div className="flex gap-3">
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
              ) : (
                <Save size={16} />
              )}
              Simpan Presentasi
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default PresentationForm;
