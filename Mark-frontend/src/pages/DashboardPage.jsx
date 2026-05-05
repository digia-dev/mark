import React, { useState } from 'react';
import { 
  Users, DollarSign, Briefcase, Activity, AlertTriangle, RefreshCw, Filter, Calendar
} from 'lucide-react';
import { useDashboard } from '../features/report/hooks/use-dashboard';

// Components
import DashboardStatCards from '../features/report/components/DashboardStatCards';
import RevenueChart from '../features/report/components/RevenueChart';
import PipelineFunnelDashboard from '../features/report/components/PipelineFunnelDashboard';
import RecentActivity from '../features/report/components/RecentActivity';
import TargetBulanIni from '../features/report/components/TargetBulanIni';
import RecentLeads from '../features/report/components/RecentLeads';
import DealsBySalesChart from '../features/report/components/DealsBySalesChart';
import CustomerMap from '../features/report/components/CustomerMap';
import PipelineOverviewTable from '../features/report/components/PipelineOverviewTable';
import UpcomingTasks from '../features/report/components/UpcomingTasks';

const DashboardPage = () => {
  const [dateRange, setDateRange] = useState({ 
    start: '2025-05-01', 
    end: '2025-05-31' 
  });
  const [salesId, setSalesId] = useState('all');

  const { data: dashboardResponse, isLoading, refetch } = useDashboard({
    startDate: dateRange.start,
    endDate: dateRange.end,
    salesId
  });

  const dashboardData = dashboardResponse?.data || {};

  return (
    <div className="pb-12 space-y-8">
      {/* Top Bar: Header & Global Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Executive Dashboard</h1>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Laporan Ringkasan Performa Bisnis</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <select 
            value={salesId}
            onChange={(e) => setSalesId(e.target.value)}
            className="bg-gray-50 border-none rounded-xl px-4 py-2 text-[10px] font-black text-gray-900 uppercase tracking-widest outline-none focus:ring-0 cursor-pointer hover:bg-gray-100 transition-all"
          >
            <option value="all">Semua Sales</option>
            {dashboardData.salesList?.map(sales => (
              <option key={sales.id} value={sales.id}>{sales.name}</option>
            ))}
          </select>
          <div className="h-4 w-px bg-gray-100 mx-1" />
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl text-[10px] font-black text-gray-600 uppercase tracking-widest border border-gray-100">
            <Calendar size={14} className="text-gray-400" />
            {dateRange.start} - {dateRange.end}
          </div>
          <div className="h-4 w-px bg-gray-100 mx-1" />
          <button 
            onClick={() => refetch()}
            disabled={isLoading}
            className="p-2.5 text-gray-400 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all disabled:opacity-50"
          >
            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
          </button>
          <button className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100">
            <Filter size={18} />
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
