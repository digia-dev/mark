import React, { useState, useRef } from 'react';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';

const ImportModal = ({ isOpen, onClose, onImport, title = 'Import Data', onDownloadTemplate }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (selectedFile) => {
    if (selectedFile && (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.csv'))) {
      setFile(selectedFile);
    } else {
      alert('Mohon pilih file CSV atau Excel (.xlsx)');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Upload size={20} />
            </div>
            <h2 className="text-lg font-black text-gray-900">{title}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-xl">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-4">
            Upload file Excel (.xlsx) atau CSV untuk mengimpor data secara massal.
            Pastikan format kolom sesuai dengan template.
          </p>
          
          {onDownloadTemplate && (
            <button 
              onClick={onDownloadTemplate}
              className="mb-6 w-full py-2 px-4 bg-gray-50 border border-gray-200 text-blue-600 font-bold text-sm rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Download size={16} /> Download Template File
            </button>
          )}

          {/* Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all ${
              isDragging 
                ? 'border-blue-500 bg-blue-50' 
                : file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:bg-gray-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef}
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
            
            {file ? (
              <>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{file.name}</h4>
                <p className="text-xs text-gray-500 mb-4">{(file.size / 1024).toFixed(2)} KB</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="text-xs font-bold text-red-500 hover:text-red-700"
                >
                  Ganti File
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <FileText size={32} className="text-gray-400" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Tarik & lepas file ke sini</h4>
                <p className="text-xs text-gray-500 mb-4">atau klik untuk memilih file</p>
                <button 
                  onClick={handleUploadClick}
                  className="py-2 px-6 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Pilih File
                </button>
              </>
            )}
          </div>
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
            disabled={!file}
            onClick={() => {
              if (file) onImport(file);
            }}
            className="flex-1 py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            <Upload size={18} /> Upload Data
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ImportModal;
