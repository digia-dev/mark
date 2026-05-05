import React from 'react';
import { Calendar, ChevronDown, RefreshCcw } from 'lucide-react';

const DashboardFilterBar = ({ dateRange, onDateChange, salesId, onSalesChange, onRefresh, isLoading }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-sm text-gray-500">Selamat datang kembali, Administrator 👋</p>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm text-gray-600 shadow-sm">
          <Calendar size={16} className="mr-2 text-gray-400" />
          <span>{dateRange.start} - {dateRange.end}</span>
        </div>
        
        <div className="relative group">
          <select 
            value={salesId}
            onChange={(e) => onSalesChange(e.target.value)}
            className="appearance-none flex items-center border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm text-gray-600 w-40 justify-between shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/10"
          >
            <option value="all">Semua Sales</option>
            <option value="1">Andi Pratama</option>
            <option value="2">Budi Santoso</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <button 
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50"
        >
          {isLoading ? (
            <RefreshCcw size={14} className="animate-spin" />
          ) : (
            <RefreshCcw size={14} />
          )}
          Refresh
        </button>
      </div>
    </div>
  );
};

export default DashboardFilterBar;
