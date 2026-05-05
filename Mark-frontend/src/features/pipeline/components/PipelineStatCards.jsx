import React from 'react';
import { Target, TrendingUp, Users, DollarSign, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, trend, isPositive, color }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 ${color.bg} ${color.text} rounded-2xl flex items-center justify-center`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{title}</p>
      <h3 className="text-xl font-black text-gray-900 leading-none mb-1.5">{value}</h3>
      <div className="flex items-center gap-1.5">
        <span className={`text-[10px] font-bold flex items-center gap-0.5 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </span>
        <span className="text-[10px] font-medium text-gray-400">vs bulan lalu</span>
      </div>
    </div>
  </div>
);

const PipelineStatCards = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <StatCard 
        icon={Users} 
        title="Total Deals" 
        value={stats.totalDeals.value} 
        trend={stats.totalDeals.trend}
        isPositive={stats.totalDeals.isPositive}
        color={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
      />
      <StatCard 
        icon={DollarSign} 
        title="Total Value" 
        value={`Rp ${new Intl.NumberFormat('id-ID').format(stats.totalValue.value)}`} 
        trend={stats.totalValue.trend}
        isPositive={stats.totalValue.isPositive}
        color={{ bg: 'bg-orange-50', text: 'text-orange-600' }}
      />
      <StatCard 
        icon={Target} 
        title="Deals Won" 
        value={stats.dealsWon.value} 
        trend={stats.dealsWon.trend}
        isPositive={stats.dealsWon.isPositive}
        color={{ bg: 'bg-green-50', text: 'text-green-600' }}
      />
      <StatCard 
        icon={TrendingUp} 
        title="Win Rate" 
        value={stats.winRate.value} 
        trend={stats.winRate.trend}
        isPositive={stats.winRate.isPositive}
        color={{ bg: 'bg-purple-50', text: 'text-purple-600' }}
      />
      <StatCard 
        icon={Clock} 
        title="Rata-rata Sales Cycle" 
        value={stats.avgCycle.value} 
        trend={stats.avgCycle.trend}
        isPositive={stats.avgCycle.isPositive}
        color={{ bg: 'bg-cyan-50', text: 'text-cyan-600' }}
      />
    </div>
  );
};

export default PipelineStatCards;
