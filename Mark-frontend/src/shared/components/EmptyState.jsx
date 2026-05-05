import React from 'react';
import { SearchX, FolderOpen } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon = FolderOpen, 
  title = 'Tidak Ada Data', 
  message = 'Belum ada data yang dapat ditampilkan untuk saat ini.',
  actionLabel,
  onAction,
  illustration = 'search' // 'search' or 'folder'
}) => {
  const ResolvedIcon = illustration === 'search' ? SearchX : Icon;

  return (
    <div className="bg-white border border-gray-100 border-dashed rounded-[24px] p-12 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <ResolvedIcon size={32} className="text-gray-400" />
      </div>
      
      <h3 className="text-lg font-black text-gray-900 mb-2">{title}</h3>
      <p className="text-sm font-medium text-gray-500 max-w-md mb-8">
        {message}
      </p>
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="py-3 px-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition-all active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
