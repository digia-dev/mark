import React from 'react';
import { Package, CheckCircle2, XCircle, Tag } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 ${bgColor} ${color} rounded-full flex items-center justify-center`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const ProductStatCards = ({ stats }) => {
  const defaultStats = {
    total: 0,
    active: 0,
    inactive: 0,
    promo: 0,
    ...stats
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Total Produk" 
        value={defaultStats.total} 
        icon={Package} 
        color="text-blue-600" 
        bgColor="bg-blue-50" 
      />
      <StatCard 
        title="Produk Aktif" 
        value={defaultStats.active} 
        icon={CheckCircle2} 
        color="text-green-600" 
        bgColor="bg-green-50" 
      />
      <StatCard 
        title="Produk Nonaktif" 
        value={defaultStats.inactive} 
        icon={XCircle} 
        color="text-red-600" 
        bgColor="bg-red-50" 
      />
      <StatCard 
        title="Produk Promo" 
        value={defaultStats.promo} 
        icon={Tag} 
        color="text-orange-600" 
        bgColor="bg-orange-50" 
      />
    </div>
  );
};

export default ProductStatCards;
