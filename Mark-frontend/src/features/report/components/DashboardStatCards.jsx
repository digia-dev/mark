import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, Briefcase, Activity, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

const DashboardStatCards = ({ data = {}, isLoading }) => {
  const navigate = useNavigate();
  const stats = [
    { 
      label: 'Total Customers', 
      value: data?.totalCustomers?.value || 0, 
      trend: data?.totalCustomers?.trend || '0%', 
      isUp: data?.totalCustomers?.isUp, 
      icon: Users, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      path: '/crm/customers'
    },
    { 
      label: 'Revenue (Monthly)', 
      value: `Rp ${((data?.revenue?.value || 0) / 1000000).toFixed(1)}jt`, 
      trend: data?.revenue?.trend || '0%', 
      isUp: data?.revenue?.isUp, 
      icon: DollarSign, 
      color: 'text-orange-600', 
      bg: 'bg-orange-50',
      path: '/invoice'
    },
    { 
      label: 'Deals Closing', 
      value: data?.deals?.value || 0, 
      trend: data?.deals?.trend || '0%', 
      isUp: data?.deals?.isUp, 
      icon: Briefcase, 
      color: 'text-green-600', 
      bg: 'bg-green-50',
      path: '/pipeline'
    },
    { 
      label: 'Active Installs', 
      value: data?.activeInstallations?.value || 0, 
      trend: data?.activeInstallations?.trend || '0%', 
      isUp: data?.activeInstallations?.isUp, 
      icon: Activity, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50',
      path: '/timeline'
    },
    { 
      label: 'Trouble Tickets', 
      value: data?.activeTickets?.value || 0, 
      trend: data?.activeTickets?.trend || '0%', 
      isUp: data?.activeTickets?.isUp, 
      icon: AlertTriangle, 
      color: 'text-red-600', 
      bg: 'bg-red-50',
      path: '/trouble-ticket'
    },
  ];


  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-32 bg-gray-50 rounded-[32px] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          onClick={() => navigate(stat.path)}
          className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm group hover:scale-[1.02] transition-all hover:border-blue-900/10 cursor-pointer active:scale-95"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} shadow-sm group-hover:scale-110 transition-all`}>
              <stat.icon size={20} />
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${stat.isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {stat.isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {stat.trend}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStatCards;
