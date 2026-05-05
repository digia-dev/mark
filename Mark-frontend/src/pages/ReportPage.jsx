import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { 
  BarChart3, PieChart, TrendingUp, Users, 
  Download, FileText, Filter, Calendar 
} from 'lucide-react';
import { useReports } from '../features/report/hooks/use-reports';

// Report-specific components
import DashboardStatCards from '../features/report/components/DashboardStatCards';
import RevenueChart from '../features/report/components/RevenueChart';

const ReportPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({
    startDate: '2025-05-01',
    endDate: '2025-05-31'
  });

  const { data, isLoading } = useReports(activeTab, filters);

  const tabs = [
    { id: 'overview', label: 'Ringkasan', icon: PieChart },
    { id: 'sales', label: 'Performa Sales', icon: Users },
    { id: 'pipeline', label: 'Analisa Pipeline', icon: TrendingUp },
    { id: 'product', label: 'Penjualan Produk', icon: BarChart3 }
  ];

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Reports & Analytics</h1>
          <p className="text-sm text-gray-500 font-medium">Analisa mendalam performa bisnis dan operasional</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm">
            <Download size={18} />
            Export PDF/Excel
          </button>
        </div>
      </div>

      <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="flex flex-col gap-8">
        <Tabs.List className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl w-fit border border-gray-100">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all outline-none
                ${activeTab === tab.id 
                  ? 'bg-white text-blue-900 shadow-sm border border-gray-100' 
                  : 'text-gray-400 hover:text-gray-600'}
              `}
            >
              <tab.icon size={16} />
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* Global Filter for Reports */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                 <Calendar size={16} className="text-gray-400" />
                 <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{filters.startDate} - {filters.endDate}</span>
              </div>
              <button className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400 hover:text-gray-900 transition-all">
                <Filter size={18} />
              </button>
           </div>
        </div>

        <Tabs.Content value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <DashboardStatCards data={data?.data?.statCards} isLoading={isLoading} />
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8">
              <RevenueChart data={data?.data?.revenueChart} isLoading={isLoading} />
            </div>
            <div className="col-span-12 lg:col-span-4">
               <div className="bg-blue-900 rounded-[32px] p-8 text-white h-full relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-xl font-black mb-4">Efisiensi Pipeline</h3>
                    <p className="text-blue-200 text-sm font-bold leading-relaxed mb-8">
                      Konversi prospek ke instalasi naik sebesar 12% dibanding kuartal lalu. 
                      Rata-rata waktu penutupan deal adalah 14 hari.
                    </p>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-blue-300">
                        <span>Lead Conversion</span>
                        <span>42%</span>
                      </div>
                      <div className="h-2 bg-blue-800 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[42%] rounded-full" />
                      </div>
                    </div>
                  </div>
                  <PieChart size={180} className="absolute -bottom-12 -right-12 text-blue-800/50 group-hover:scale-110 transition-transform duration-700" />
               </div>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="sales" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm flex flex-col items-center justify-center text-center h-96">
             <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center mb-6">
                <Users size={32} />
             </div>
             <h3 className="text-lg font-black text-gray-900 mb-2">Performa Tim Sales</h3>
             <p className="text-sm text-gray-400 font-medium max-w-md">Laporan performa individual per sales representative akan segera tersedia.</p>
          </div>
        </Tabs.Content>

        <Tabs.Content value="pipeline" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
           {/* Pipeline specific charts would go here */}
           <div className="bg-gray-50 rounded-[32px] border border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center h-96">
              <TrendingUp size={48} className="text-gray-300 mb-4" />
              <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Detail Analisa Pipeline Sedang Dikembangkan</p>
           </div>
        </Tabs.Content>

        <Tabs.Content value="product" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
           <div className="bg-gray-50 rounded-[32px] border border-dashed border-gray-200 p-12 flex flex-col items-center justify-center text-center h-96">
              <BarChart3 size={48} className="text-gray-300 mb-4" />
              <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Laporan Performa Produk Sedang Dikembangkan</p>
           </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default ReportPage;
