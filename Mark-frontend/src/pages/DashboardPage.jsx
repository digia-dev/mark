import React, { useState } from 'react';
import { 
  Users, DollarSign, Briefcase, Activity, AlertTriangle 
} from 'lucide-react';
import { useDashboard } from '../features/dashboard/hooks/use-dashboard';

// Components
import DashboardFilterBar from '../features/dashboard/components/DashboardFilterBar';
import MetricCard from '../shared/components/MetricCard';
import RevenueChart from '../features/dashboard/components/RevenueChart';
import PipelineFunnel from '../features/dashboard/components/PipelineFunnel';
import ActivityFeed from '../features/dashboard/components/ActivityFeed';
import TargetBulanIni from '../features/dashboard/components/TargetBulanIni';
import LeadTerbaru from '../features/dashboard/components/LeadTerbaru';
import DealsBySales from '../features/dashboard/components/DealsBySales';

const DashboardPage = () => {
  const [dateRange, setDateRange] = useState({ 
    start: '01 Mei 2025', 
    end: '31 Mei 2025' 
  });
  const [salesId, setSalesId] = useState('all');

  const { data: dashboardResponse, isLoading, refetch } = useDashboard({
    startDate: '2025-05-01',
    endDate: '2025-05-31',
    salesId
  });

  const dashboardData = dashboardResponse?.data || {};

  const formatCurrency = (val) => {
    if (val >= 1000000) return `Rp ${(val / 1000000).toFixed(1)}jt`;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="pb-8">
      {/* Header & Filters */}
      <DashboardFilterBar 
        dateRange={dateRange}
        onDateChange={setDateRange}
        salesId={salesId}
        onSalesChange={setSalesId}
        onRefresh={refetch}
        isLoading={isLoading}
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <MetricCard 
          isLoading={isLoading}
          icon={<Users size={20} className="text-blue-600"/>} bg="bg-blue-50"
          title="Total Customers" 
          value={dashboardData.statCards?.totalCustomers || 0} 
          trend="up" trendValue="12.5%" 
          subtext="Total pelanggan terdaftar"
        />
        <MetricCard 
          isLoading={isLoading}
          icon={<DollarSign size={20} className="text-orange-600"/>} bg="bg-orange-50"
          title="Revenue (Bulan Ini)" 
          value={formatCurrency(dashboardData.statCards?.revenue || 0)} 
          trend="up" trendValue="18.7%" 
          subtext="Total penagihan berhasil"
        />
        <MetricCard 
          isLoading={isLoading}
          icon={<Briefcase size={20} className="text-green-600"/>} bg="bg-green-50"
          title="Deals Closing" 
          value={dashboardData.statCards?.deals || 0} 
          trend="up" trendValue="23.1%" 
          subtext="Peluang yang berhasil closing"
        />
        <MetricCard 
          isLoading={isLoading}
          icon={<Activity size={20} className="text-purple-600"/>} bg="bg-purple-50"
          title="Instalasi Aktif" 
          value={dashboardData.statCards?.activeInstallations || 0} 
          trend="up" trendValue="5.9%" 
          subtext="Dalam proses pengerjaan"
        />
        <MetricCard 
          isLoading={isLoading}
          icon={<AlertTriangle size={20} className="text-red-600"/>} bg="bg-red-50"
          title="Trouble Ticket" 
          value={dashboardData.statCards?.activeTickets || 0} 
          isWarning
          subtext="Tiket belum selesai" 
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Section */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xl:col-span-8">
              <RevenueChart data={dashboardData.revenueChart} isLoading={isLoading} />
            </div>
            <div className="col-span-12 xl:col-span-4">
              <PipelineFunnel data={dashboardData.pipelineFunnel} isLoading={isLoading} />
            </div>
          </div>

          {/* Table & Bar Row */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xl:col-span-7">
              <DealsBySales data={dashboardData.dealsBySales} isLoading={isLoading} />
            </div>
            <div className="col-span-12 xl:col-span-5">
              <ActivityFeed activities={dashboardData.recentActivities} isLoading={isLoading} />
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <TargetBulanIni data={dashboardData.targetBulanIni} isLoading={isLoading} />
          <LeadTerbaru leads={dashboardData.recentLeads} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
