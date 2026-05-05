import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SidePanel = ({ isOpen, onClose, title, subtitle, children, footer, width = 'w-[480px]' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-90"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 h-screen ${width} bg-white shadow-2xl z-100 flex flex-col border-l border-gray-100`}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 shrink-0">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h2 className="text-xl font-black text-gray-900">{title}</h2>
                  {subtitle && <p className="text-sm font-medium text-gray-400">{subtitle}</p>}
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-all hover:text-gray-900"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidePanel;
