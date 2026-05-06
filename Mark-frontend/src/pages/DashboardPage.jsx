import React, { useState } from 'react';
import { 
  RefreshCw, Filter, Calendar, ChevronDown, Download
} from 'lucide-react';
import { useDashboard } from '../features/report/hooks/use-dashboard';
import { toast } from 'react-hot-toast';
import { exportToCSV } from '../shared/utils/csv-utils';

// Components
import DashboardStatCards from '../features/report/components/DashboardStatCards';
import RevenueChart from '../features/report/components/RevenueChart';
import PipelineFunnelDashboard from '../features/report/components/PipelineFunnelDashboard';
import CustomerMap from '../features/report/components/CustomerMap';
import PipelineOverviewTable from '../features/report/components/PipelineOverviewTable';
import DealsBySalesChart from '../features/report/components/DealsBySalesChart';
import RecentActivity from '../features/report/components/RecentActivity';
import RecentLeads from '../features/report/components/RecentLeads';
import UpcomingTasks from '../features/report/components/UpcomingTasks';
import TargetBulanIni from '../features/report/components/TargetBulanIni';

const DashboardPage = () => {
  const [salesId, setSalesId] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '01/05/2026',
    end: '31/05/2026'
  });

  const { data: dashboardData = {}, isLoading, refetch } = useDashboard({
    salesId: salesId === 'all' ? null : salesId,
    startDate: dateRange.start,
    endDate: dateRange.end
  });

  const handleRefresh = async () => {
    try {
      await refetch();
      toast.success('Data diperbarui');
    } catch (error) {
      toast.error('Gagal memuat data');
    }
  };

  const handleExport = () => {
    if (!dashboardData.statCards) {
      toast.error('Data belum siap untuk diekspor');
      return;
    }

    const exportData = [
      { Kategori: 'Total Customers', Nilai: dashboardData.statCards.totalCustomers?.value },
      { Kategori: 'Total Revenue', Nilai: dashboardData.statCards.revenue?.value },
      { Kategori: 'Total Deals', Nilai: dashboardData.statCards.deals?.value },
      { Kategori: 'Active Installations', Nilai: dashboardData.statCards.activeInstallations?.value },
      { Kategori: 'Active Tickets', Nilai: dashboardData.statCards.activeTickets?.value }
    ];

    exportToCSV(exportData, `Dashboard-Report-${new Date().toISOString().split('T')[0]}`);
    toast.success('Laporan berhasil diekspor');
  };

  return (
    <div className="pb-12 space-y-8">
      {/* Top Bar: Header & Global Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Executive Dashboard</h1>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Laporan Ringkasan Performa Bisnis</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <div className="relative">
            <select 
              value={salesId}
              onChange={(e) => setSalesId(e.target.value)}
              className="appearance-none bg-gray-50 border-none rounded-xl pl-4 pr-10 py-2 text-[10px] font-black text-gray-900 uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-900/5 cursor-pointer hover:bg-gray-100 transition-all"
            >
              <option value="all">Semua Sales</option>
              {dashboardData.salesList?.map(sales => (
                <option key={sales.id} value={sales.id}>{sales.name}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="h-4 w-px bg-gray-100 mx-1" />
          
          <button 
            onClick={() => toast.info('Fitur Date Picker sedang dalam pengembangan')}
            className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-[10px] font-black text-gray-600 uppercase tracking-widest border border-gray-100 transition-all group"
          >
            <Calendar size={14} className="text-gray-400 group-hover:text-blue-900" />
            {dateRange.start} - {dateRange.end}
          </button>
          
          <div className="h-4 w-px bg-gray-100 mx-1" />
          
          <button 
            onClick={handleRefresh}
            disabled={isLoading}
            title="Refresh Data"
            className="p-2.5 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all disabled:opacity-50"
          >
            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
          </button>
          <button 
            onClick={() => toast.info('Fitur Filter sedang dalam pengembangan')}
            className="p-2.5 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all"
          >
            <Filter size={18} />
          </button>

          <div className="h-4 w-px bg-gray-100 mx-1" />
          
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all active:scale-95"
          >
            <Download size={14} />
            Export Report
          </button>
        </div>
      </div>

      {/* 1. Stat Cards Row */}
      <DashboardStatCards data={dashboardData.statCards} isLoading={isLoading} />

      {/* 2. Main Analytics Row: Charts & Activity */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-8">
          <RevenueChart data={dashboardData.revenueChart} isLoading={isLoading} />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <PipelineFunnelDashboard data={dashboardData.pipelineFunnel} isLoading={isLoading} />
        </div>
      </div>

      {/* 3. Customer Distribution Map (Full Width) */}
      <CustomerMap customers={dashboardData.customers || []} isLoading={isLoading} />

      {/* 4. Sales & Pipeline Details Row */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-8">
          <PipelineOverviewTable data={dashboardData.pipelineOverview} isLoading={isLoading} />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <DealsBySalesChart data={dashboardData.dealsBySales} isLoading={isLoading} />
        </div>
      </div>

      {/* 5. Lower Grid: Activity, Leads, Tasks, Target */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <RecentActivity activities={dashboardData.recentActivities || []} isLoading={isLoading} />
        <RecentLeads leads={dashboardData.recentLeads || []} isLoading={isLoading} />
        <UpcomingTasks tasks={dashboardData.upcomingTasks || []} isLoading={isLoading} />
        <TargetBulanIni data={dashboardData.targetBulanIni} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default DashboardPage;
