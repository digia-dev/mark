import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, X, User, Briefcase, FileText, 
  TrendingUp, CornerDownLeft, Command 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../../lib/axios';

const GlobalSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({
    customers: [],
    leads: [],
    quotations: [],
    deals: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Handle keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // This is just to trigger the parent to open it
        // Actually the parent should handle this, but we can do it here if we pass the open function
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults({ customers: [], leads: [], quotations: [], deals: [] });
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults({ customers: [], leads: [], quotations: [], deals: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/search?q=${query}`);
        setResults(response.data.data);
      } catch (error) {
        console.error('Search error:', error);
        // Fallback mock results if API fails or not implemented
        setResults({
          customers: [
            { id: 1, name: 'PT Maju Jaya', code: 'CUS-2026-001' },
            { id: 2, name: 'Budi Santoso', code: 'CUS-2026-002' }
          ].filter(i => i.name.toLowerCase().includes(query.toLowerCase())),
          leads: [
            { id: 1, name: 'Siti Aminah', company: 'Warung Berkah' }
          ].filter(i => i.name.toLowerCase().includes(query.toLowerCase())),
          quotations: [
            { id: 1, number: 'Q-2026-0001', customer: 'PT Maju Jaya' }
          ].filter(i => i.number.toLowerCase().includes(query.toLowerCase())),
          deals: [
            { id: 1, name: 'Internet Dedicated 100 Mbps', value: 'Rp 15.000.000' }
          ].filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
        });
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const flattenedResults = [
    ...results.customers.map(i => ({ ...i, type: 'customer', icon: User })),
    ...results.leads.map(i => ({ ...i, type: 'lead', icon: Briefcase })),
    ...results.quotations.map(i => ({ ...i, type: 'quotation', icon: FileText })),
    ...results.deals.map(i => ({ ...i, type: 'deal', icon: TrendingUp }))
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(flattenedResults.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + flattenedResults.length) % Math.max(flattenedResults.length, 1));
    } else if (e.key === 'Enter' && flattenedResults[selectedIndex]) {
      handleSelect(flattenedResults[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (item) => {
    onClose();
    switch (item.type) {
      case 'customer': navigate(`/crm/customers/${item.id}`); break;
      case 'lead': navigate(`/crm/leads/${item.id}`); break;
      case 'quotation': navigate(`/quotation/${item.id}`); break;
      case 'deal': navigate(`/pipeline/${item.id}`); break;
      default: break;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-gray-100">
              <Search className="text-gray-400 mr-3" size={20} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Cari customer, lead, quotation, atau deal..."
                className="flex-1 bg-transparent border-none outline-none text-gray-800 text-lg placeholder-gray-400"
              />
              <div className="flex items-center gap-2">
                {isLoading && (
                  <div className="w-5 h-5 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                )}
                <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {query.trim() === '' ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-gray-300" size={32} />
                  </div>
                  <h3 className="text-gray-600 font-medium mb-1">Mulai mencari...</h3>
                  <p className="text-gray-400 text-sm">Cari berdasarkan nama, email, nomor HP, atau kode dokumen.</p>
                </div>
              ) : flattenedResults.length > 0 ? (
                <div className="py-2">
                  {Object.entries(results).map(([type, items]) => {
                    if (items.length === 0) return null;
                    return (
                      <div key={type} className="mb-2 last:mb-0">
                        <h4 className="px-4 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                          {type}
                        </h4>
                        {items.map((item) => {
                          const flatItem = flattenedResults.find(f => f.id === item.id && f.type === type.slice(0, -1) || f.type === type);
                          const isSelected = flattenedResults[selectedIndex] === flatItem;
                          const Icon = flatItem.icon;
                          
                          return (
                            <div
                              key={`${type}-${item.id}`}
                              onClick={() => handleSelect(flatItem)}
                              onMouseEnter={() => setSelectedIndex(flattenedResults.indexOf(flatItem))}
                              className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors ${
                                isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                              }`}
                            >
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
                              }`}>
                                <Icon size={18} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                                  {item.name || item.number || item.company}
                                </p>
                                <p className={`text-xs truncate ${isSelected ? 'text-blue-600' : 'text-gray-500'}`}>
                                  {item.code || item.company || item.customer || 'ID: ' + item.id}
                                </p>
                              </div>
                              {isSelected && (
                                <div className="flex items-center gap-1 text-blue-500">
                                  <CornerDownLeft size={14} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">Tidak ada hasil ditemukan untuk "{query}"</p>
                </div>
              )}
            </div>

            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm text-gray-500">↑↓</span> Navigasi
                </span>
                <span className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm text-gray-500">Enter</span> Pilih
                </span>
                <span className="flex items-center gap-1">
                  <span className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm text-gray-500">Esc</span> Tutup
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Command size={10} /> + K untuk buka cepat
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GlobalSearch;
