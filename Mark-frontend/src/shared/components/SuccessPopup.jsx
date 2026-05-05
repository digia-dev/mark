import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

const SuccessPopup = ({ isOpen, onClose, title, message, actionText, onAction }) => {
  // Auto-close after 5 seconds if not interacting
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-xl flex items-start gap-4 max-w-sm border border-gray-800">
        
        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.5)]">
            <Check size={18} className="text-white stroke-[3px]" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0 pr-2 pt-0.5">
          <h4 className="text-sm font-bold text-white mb-1">{title || 'Berhasil!'}</h4>
          <p className="text-xs font-medium text-gray-400 line-clamp-2 leading-relaxed">
            {message || 'Data telah berhasil disimpan ke sistem.'}
          </p>
          
          {actionText && onAction && (
            <button 
              onClick={onAction}
              className="mt-3 text-xs font-bold text-green-400 hover:text-green-300 transition-colors"
            >
              {actionText}
            </button>
          )}
        </div>
        
        <button 
          onClick={onClose}
          className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
