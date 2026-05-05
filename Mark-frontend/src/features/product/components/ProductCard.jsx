import React from 'react';
import { 
  Wifi, Cpu, MapPin, TrendingUp, 
  ChevronRight, MoreVertical 
} from 'lucide-react';

const ProductCard = ({ product, onDetail, onCreateQuotation }) => {
  const {
    name, category, speed_down, speed_up, 
    price, technology, is_best_seller, is_promo,
    promo_price, promo_end_date, status, area_coverage
  } = product;

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(price);

  const formattedPromoPrice = promo_price ? new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(promo_price) : null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all group relative">
      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
        {is_best_seller && (
          <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded uppercase tracking-wider">
            Best Seller
          </span>
        )}
        {is_promo && (
          <span className="px-2 py-0.5 bg-orange-600 text-white text-[10px] font-bold rounded uppercase tracking-wider">
            Promo
          </span>
        )}
        {status === 'active' && !is_best_seller && !is_promo && (
          <span className="px-2 py-0.5 bg-green-600 text-white text-[10px] font-bold rounded uppercase tracking-wider">
            New
          </span>
        )}
      </div>

      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1 hover:bg-gray-100 rounded text-gray-400">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
          {technology === 'fiber' ? <Wifi size={24} /> : <Cpu size={24} />}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{category}</p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-none mb-1">Download</span>
            <span className="text-xl font-bold text-gray-800 flex items-center gap-1">
              {speed_down} <span className="text-xs font-medium text-gray-500">Mbps</span>
            </span>
          </div>
          <div className="h-8 w-px bg-gray-100" />
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-none mb-1">Upload</span>
            <span className="text-xl font-bold text-gray-800 flex items-center gap-1">
              {speed_up} <span className="text-xs font-medium text-gray-500">Mbps</span>
            </span>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <TrendingUp size={14} className="text-blue-500" />
            <span>Teknologi: <span className="font-semibold text-gray-700 capitalize">{technology}</span></span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin size={14} className="text-orange-500" />
            <span className="truncate">Coverage: <span className="font-semibold text-gray-700">{area_coverage || 'Nasional'}</span></span>
          </div>
        </div>

        <div className="flex flex-col mb-6">
          {is_promo && formattedPromoPrice ? (
            <>
              <span className="text-xs text-gray-400 line-through mb-1">{formattedPrice}</span>
              <span className="text-2xl font-bold text-orange-600 flex items-baseline gap-1">
                {formattedPromoPrice}
                <span className="text-xs font-medium text-gray-500">/ bln</span>
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-gray-900 flex items-baseline gap-1">
              {formattedPrice}
              <span className="text-xs font-medium text-gray-500">/ bln</span>
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => onDetail(product)}
            className="flex-1 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors border border-gray-100"
          >
            Detail
          </button>
          <button 
            onClick={() => onCreateQuotation(product)}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors flex items-center gap-1"
          >
            Quotation <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {is_promo && promo_end_date && (
        <div className="px-6 py-2 bg-orange-50 border-t border-orange-100">
          <p className="text-[10px] text-orange-700 font-medium text-center">
            Hemat s/d {new Date(promo_end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
