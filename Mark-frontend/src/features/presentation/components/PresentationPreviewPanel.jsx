import React, { useState } from 'react';
import { X, Calendar, User, FileText, Download, Share2, Play, Edit, ChevronLeft, ChevronRight, Layout, Monitor } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const PresentationPreviewPanel = ({ presentation, onClose, onEdit, onPresent, onShare, onDownload }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  if (!presentation) return null;

  const slides = presentation.content?.slides || [];
  const currentSlide = slides[currentSlideIndex];

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return format(new Date(dateString), 'dd MMM yyyy', { locale: id });
  };

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-green-700 bg-green-100 rounded-full border border-green-200">Dipublikasikan</span>;
      case 'archived':
        return <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-gray-700 bg-gray-100 rounded-full border border-gray-200">Arsip</span>;
      case 'draft':
      default:
        return <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-orange-700 bg-orange-100 rounded-full border border-orange-200">Draft</span>;
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[700px] bg-gray-50 shadow-2xl z-40 transform transition-transform flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-100 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 -ml-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
            <X size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-gray-900 truncate max-w-[300px]">{presentation.title || 'Untitled Presentation'}</h2>
              {getStatusBadge(presentation.status)}
            </div>
            <p className="text-xs font-semibold text-gray-500 flex items-center gap-1 mt-0.5">
              {presentation.presentation_number || 'PRES-XXXX-XXXX'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(presentation)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="Edit Presentasi">
            <Edit size={18} />
          </button>
          <button onClick={() => onDownload(presentation)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="Unduh PDF">
            <Download size={18} />
          </button>
          <button onClick={() => onShare(presentation)} disabled={presentation.status === 'draft'} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors disabled:opacity-50" title="Bagikan Tautan">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Main Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-sm">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Pelanggan</span>
            <p className="text-sm font-medium text-gray-900 flex items-center gap-2 truncate">
              <User size={14} className="text-gray-400 shrink-0" /> {presentation.customer?.name || '-'}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Dibuat Oleh</span>
            <p className="text-sm font-medium text-gray-900 flex items-center gap-2 truncate">
              <User size={14} className="text-gray-400 shrink-0" /> {presentation.author?.name || '-'}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Tanggal Buat</span>
            <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
              <Calendar size={14} className="text-gray-400 shrink-0" /> {formatDate(presentation.created_at)}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Total Slide</span>
            <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
              <Layout size={14} className="text-gray-400 shrink-0" /> {slides.length} Slide
            </p>
          </div>
        </div>

        {/* Presentation Slide View */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          {/* Main Slide Area */}
          <div className="aspect-video bg-gray-100 relative group flex flex-col">
            {slides.length > 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white m-2 shadow-sm border border-gray-200">
                <h3 className="text-3xl font-black text-blue-900 mb-4">{currentSlide?.title || 'No Title'}</h3>
                <p className="text-gray-600 max-w-lg">{currentSlide?.content || 'No Content'}</p>
                {currentSlide?.layout === 'image' && currentSlide?.imageUrl && (
                  <img src={currentSlide.imageUrl} alt="Slide Content" className="mt-6 max-h-48 object-contain rounded-lg" />
                )}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-400 font-medium">Tidak ada slide dalam presentasi ini.</p>
              </div>
            )}

            {/* Navigation Overlay */}
            {slides.length > 1 && (
              <>
                <button 
                  onClick={prevSlide}
                  disabled={currentSlideIndex === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity hover:bg-white"
                >
                  <ChevronLeft size={24} className="text-gray-700" />
                </button>
                <button 
                  onClick={nextSlide}
                  disabled={currentSlideIndex === slides.length - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity hover:bg-white"
                >
                  <ChevronRight size={24} className="text-gray-700" />
                </button>
              </>
            )}

            {/* Slide Counter Overlay */}
            {slides.length > 0 && (
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                <span className="text-xs font-bold text-white tracking-widest">{currentSlideIndex + 1} / {slides.length}</span>
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
            <div className="flex gap-2">
              <button 
                onClick={() => onPresent(presentation)}
                disabled={slides.length === 0}
                className="px-4 py-2 bg-blue-900 text-white text-sm font-bold rounded-xl hover:bg-blue-800 transition-colors shadow-sm shadow-blue-900/20 flex items-center gap-2 disabled:opacity-50 disabled:shadow-none"
              >
                <Monitor size={16} /> Presentasikan Sekarang
              </button>
            </div>
            
            <div className="text-xs font-semibold text-gray-500 flex items-center gap-2">
              <FileText size={14} /> Tema: {presentation.content?.theme || 'Default'}
            </div>
          </div>
        </div>

        {/* Outline / Slide List */}
        <div>
          <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-3">Outline Presentasi</h3>
          <div className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-50 overflow-hidden shadow-sm">
            {slides.length > 0 ? slides.map((slide, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-full flex items-center gap-4 p-3 text-left transition-colors hover:bg-gray-50 ${currentSlideIndex === idx ? 'bg-blue-50/50' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${currentSlideIndex === idx ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                  {idx + 1}
                </div>
                <div className="flex-1 truncate">
                  <p className={`text-sm font-bold truncate ${currentSlideIndex === idx ? 'text-blue-900' : 'text-gray-700'}`}>{slide.title || 'Untitled Slide'}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{slide.layout || 'standard'} layout</p>
                </div>
              </button>
            )) : (
              <div className="p-6 text-center text-sm text-gray-500">Belum ada outline.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PresentationPreviewPanel;
