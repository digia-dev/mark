import React from 'react';
import { Users, UserCheck, UserX, Building2 } from 'lucide-react';
import MetricCard from '../../../shared/components/MetricCard';
import { useCustomerStats } from '../hooks/use-customers';

const CustomerStats = ({ onFilter, isLoading: isTableLoading }) => {
  const { data: statsData, isLoading: isStatsLoading } = useCustomerStats();
  
  const isLoading = isStatsLoading || isTableLoading;
  const stats = statsData?.data || {
    total: 0,
    active: 0,
    corporate: 0,
    personal: 0
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard 
        isLoading={isLoading}
        onClick={() => onFilter({ status: '', type: '' })}
        icon={<Users size={20} className="text-blue-600"/>} bg="bg-blue-50"
        title="Total Customer" value={stats.total} 
        subtext="Terdaftar di sistem"
      />
      <MetricCard 
        isLoading={isLoading}
        onClick={() => onFilter({ status: 'active', type: '' })}
        icon={<UserCheck size={20} className="text-green-600"/>} bg="bg-green-50"
        title="Customer Aktif" value={stats.active} 
        subtext="Berlangganan aktif"
      />
      <MetricCard 
        isLoading={isLoading}
        onClick={() => onFilter({ status: '', type: 'corporate' })}
        icon={<Building2 size={20} className="text-purple-600"/>} bg="bg-purple-50"
        title="Corporate" value={stats.corporate} 
        subtext="B2B Customers"
      />
      <MetricCard 
        isLoading={isLoading}
        onClick={() => onFilter({ status: '', type: 'personal' })}
        icon={<UserX size={20} className="text-orange-600"/>} bg="bg-orange-50"
        title="Personal" value={stats.personal} 
        subtext="Retail Customers"
      />
    </div>
  );
};

export default CustomerStats;
