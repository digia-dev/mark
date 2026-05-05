import React from 'react';
import { X, Filter, RotateCcw } from 'lucide-react';

const FilterPopup = ({ isOpen, onClose, onApply, onReset, title = 'Filter Data', children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300 border-l border-gray-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Filter size={20} />
            </div>
            <h2 className="text-lg font-black text-gray-900">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {children}
          </div>
        </div>
        
        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-3">
          <button
            onClick={onReset}
            className="px-4 py-3 flex items-center justify-center gap-2 text-sm font-bold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <RotateCcw size={16} /> Reset
          </button>
          <button
            onClick={() => {
              onApply();
              onClose();
            }}
            className="flex-1 py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition-all"
          >
            Terapkan Filter
          </button>
        </div>
        
      </div>
    </>
  );
};

export default FilterPopup;
