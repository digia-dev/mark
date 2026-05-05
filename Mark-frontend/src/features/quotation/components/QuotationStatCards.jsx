import React from 'react';
import { FileText, CheckCircle, Clock, TrendingUp, DollarSign } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, trend, color }) => (
  <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col group hover:border-blue-900/10 transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color} shadow-sm group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="text-[10px] font-black text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
          +{trend}%
        </span>
      )}
    </div>
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</span>
    <span className="text-2xl font-black text-gray-900 leading-tight">{value}</span>
  </div>
);

const QuotationStatCards = ({ stats }) => {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <StatCard 
        label="Total Penawaran" 
        value={stats?.total || 0} 
        icon={FileText} 
        color="bg-blue-50 text-blue-900"
      />
      <StatCard 
        label="Total Nilai" 
        value={formatCurrency(stats?.totalValue || 0)} 
        icon={DollarSign} 
        color="bg-emerald-50 text-emerald-600"
        trend="12.5"
      />
      <StatCard 
        label="Disetujui" 
        value={stats?.approved || 0} 
        icon={CheckCircle} 
        color="bg-orange-50 text-orange-600"
      />
      <StatCard 
        label="Conversion Rate" 
        value={`${stats?.conversionRate || 0}%`} 
        icon={TrendingUp} 
        color="bg-purple-50 text-purple-600"
      />
      <StatCard 
        label="Rata-rata Nilai" 
        value={formatCurrency(stats?.averageValue || 0)} 
        icon={Clock} 
        color="bg-gray-50 text-gray-600"
      />
    </div>
  );
};

export default QuotationStatCards;
