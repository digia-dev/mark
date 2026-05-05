import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, title, message, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={32} className="text-red-500" />
          </div>
          
          <h3 className="text-xl font-black text-gray-900 mb-2">
            {title || 'Konfirmasi Hapus'}
          </h3>
          
          <p className="text-sm font-medium text-gray-500 mb-6">
            {message || `Apakah Anda yakin ingin menghapus ${itemName ? `"${itemName}"` : 'data ini'}? Tindakan ini tidak dapat dibatalkan dan data akan hilang permanen.`}
          </p>
          
          <div className="flex bg-red-50/50 p-3 rounded-xl border border-red-100 mb-6 text-left items-start gap-3">
            <input 
              type="checkbox" 
              id="confirm-delete" 
              className="mt-1 rounded border-red-300 text-red-600 focus:ring-red-500" 
            />
            <label htmlFor="confirm-delete" className="text-xs font-bold text-red-800 cursor-pointer select-none">
              Saya mengerti konsekuensinya dan ingin melanjutkan proses penghapusan data ini.
            </label>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 px-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-sm shadow-red-600/20 transition-all active:scale-[0.98]"
            >
              Ya, Hapus Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
