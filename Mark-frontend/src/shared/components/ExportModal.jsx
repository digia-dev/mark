import React, { useState } from 'react';
import { Download, X, FileText, Table, File } from 'lucide-react';

const ExportModal = ({ isOpen, onClose, onExport, title = 'Export Data', availableColumns = [] }) => {
  const [format, setFormat] = useState('excel');
  const [selectedColumns, setSelectedColumns] = useState(
    availableColumns.reduce((acc, col) => ({ ...acc, [col.id]: true }), {})
  );

  if (!isOpen) return null;

  const handleToggleColumn = (colId) => {
    setSelectedColumns(prev => ({
      ...prev,
      [colId]: !prev[colId]
    }));
  };

  const handleExport = () => {
    const columnsToExport = Object.keys(selectedColumns).filter(key => selectedColumns[key]);
    onExport(format, columnsToExport);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Download size={20} />
            </div>
            <h2 className="text-lg font-black text-gray-900">{title}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-xl">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {/* Format Selection */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-3">Format File</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setFormat('excel')}
                className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                  format === 'excel' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <Table size={24} className={format === 'excel' ? 'text-blue-500' : ''} />
                <span className="text-xs font-bold">Excel (.xlsx)</span>
              </button>
              <button
                onClick={() => setFormat('csv')}
                className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                  format === 'csv' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <FileText size={24} className={format === 'csv' ? 'text-blue-500' : ''} />
                <span className="text-xs font-bold">CSV</span>
              </button>
              <button
                onClick={() => setFormat('pdf')}
                className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                  format === 'pdf' 
                    ? 'border-red-500 bg-red-50 text-red-700' 
                    : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <File size={24} className={format === 'pdf' ? 'text-red-500' : ''} />
                <span className="text-xs font-bold">PDF</span>
              </button>
            </div>
          </div>
          
          {/* Columns Selection */}
          {availableColumns.length > 0 && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Pilih Kolom (Opsional)</label>
              <div className="bg-gray-50 p-4 rounded-xl max-h-48 overflow-y-auto space-y-2 border border-gray-100">
                {availableColumns.map(col => (
                  <label key={col.id} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={selectedColumns[col.id] || false}
                      onChange={() => handleToggleColumn(col.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">{col.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleExport}
            className="flex-1 py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition-all flex justify-center items-center gap-2"
          >
            <Download size={18} /> Download
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ExportModal;
