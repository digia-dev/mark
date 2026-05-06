import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, 
  Search, Filter, Download, MoreVertical, SlidersHorizontal, Check
} from 'lucide-react';

/**
 * Reusable DataTable component
 * Features: pagination, filter button, export button, column toggle
 */
const DataTable = ({ 
  columns, 
  data, 
  total = 0, 
  page = 1, 
  limit = 10, 
  onPageChange,
  onSearch,
  onFilterClick,
  onExportClick,
  onColumnToggle,
  actions
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showColumnToggle, setShowColumnToggle] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(columns.map((_, i) => i));
  
  const totalPages = Math.ceil(total / limit) || 1;
  const isFirstPage = page === 1;
  const isLastPage = page >= totalPages;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm overflow-hidden flex flex-col h-full">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/30">
        
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Cari data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow"
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {onFilterClick && (
            <button 
              onClick={onFilterClick}
              className="px-3 py-2 flex items-center gap-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-colors"
            >
              <Filter size={16} /> Filter
            </button>
          )}
          
          {onExportClick && (
            <button 
              onClick={onExportClick}
              className="px-3 py-2 flex items-center gap-2 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Download size={16} /> Export
            </button>
          )}
          
          <button 
            onClick={() => setShowColumnToggle(!showColumnToggle)}
            className="p-2 text-gray-400 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors relative group"
            aria-label="Toggle columns"
            title="Pilih kolom yang ditampilkan"
          >
            <SlidersHorizontal size={16} />
            {showColumnToggle && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2">
                <div className="text-xs font-bold text-gray-500 uppercase px-2 py-1">Tampilkan Kolom</div>
                {columns.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setVisibleColumns(prev => 
                        prev.includes(idx) 
                          ? prev.filter(i => i !== idx)
                          : [...prev, idx]
                      );
                      if (onColumnToggle) onColumnToggle(idx);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded flex items-center gap-2 transition-colors"
                  >
                    {visibleColumns.includes(idx) && <Check size={14} className="text-blue-600" />}
                    <span className={visibleColumns.includes(idx) ? 'font-medium' : ''}>{col.header}</span>
                  </button>
                ))}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="w-10 p-4 border-b border-gray-100">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </th>
              {columns.map((col, index) => 
                visibleColumns.includes(index) && (
                  <th key={index} className="p-4 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {col.header}
                  </th>
                )
              )}
              {actions && (
                <th className="p-4 border-b border-gray-100 text-right w-16"></th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={row.id || rowIndex} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="p-4">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </td>
                  
                  {columns.map((col, colIndex) => 
                    visibleColumns.includes(colIndex) && (
                      <td key={colIndex} className="p-4 text-sm text-gray-700 whitespace-nowrap">
                        {col.cell ? col.cell(row) : row[col.accessor]}
                      </td>
                    )
                  )}
                  
                  {actions && (
                    <td className="p-4 text-right">
                      {typeof actions === 'function' ? (
                        actions(row)
                      ) : (
                        <div className="relative inline-block text-left group">
                          <button 
                            className="p-1 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-white transition-colors"
                            aria-label="More actions"
                            aria-haspopup="true"
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 2 : 1)} className="p-8 text-center text-gray-500 text-sm">
                  Tidak ada data yang ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
        <p className="text-sm text-gray-500">
          Menampilkan <span className="font-bold text-gray-900">{data.length > 0 ? (page - 1) * limit + 1 : 0}</span> hingga <span className="font-bold text-gray-900">{Math.min(page * limit, total)}</span> dari <span className="font-bold text-gray-900">{total}</span> data
        </p>
        
        <div className="flex items-center gap-1">
          <button 
            disabled={isFirstPage}
            onClick={() => onPageChange(1)}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors"
          >
            <ChevronsLeft size={16} />
          </button>
          <button 
            disabled={isFirstPage}
            onClick={() => onPageChange(page - 1)}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="px-4 py-1.5 text-sm font-bold text-gray-900 bg-gray-50 rounded-lg border border-gray-200 mx-1">
            {page} / {totalPages}
          </div>
          
          <button 
            disabled={isLastPage}
            onClick={() => onPageChange(page + 1)}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
          <button 
            disabled={isLastPage}
            onClick={() => onPageChange(totalPages)}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 transition-colors"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
