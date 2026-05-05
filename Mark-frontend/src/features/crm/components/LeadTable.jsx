import React from 'react';
import { 
  MoreVertical, Edit2, UserCheck, 
  Phone, Mail, MapPin, Building2,
  ChevronRight, ChevronLeft, Calendar
} from 'lucide-react';

const LeadTable = ({ 
  leads = [], 
  isLoading, 
  meta = {}, 
  onPageChange,
  onEdit,
  onConvert
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm animate-pulse">
        <div className="h-12 bg-gray-50 border-b border-gray-200" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 border-b border-gray-100 px-6" />
        ))}
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'contacted': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'qualified': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'negosiasi': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'penawaran': return 'bg-pink-50 text-pink-700 border-pink-100';
      case 'converted': return 'bg-green-50 text-green-700 border-green-100';
      case 'lost': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Lead Info</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Kontak</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                      {lead.company ? <Building2 size={20} className="text-gray-500" /> : <Building2 size={20} className="text-gray-400" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{lead.name}</p>
                      <p className="text-[11px] text-gray-400 font-medium truncate">{lead.company || 'Personal'}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                      <Phone size={12} className="text-gray-400" />
                      {lead.phone}
                    </div>
                    {lead.email && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Mail size={12} className="text-gray-400" />
                        {lead.email}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-600 font-medium capitalize">
                  {lead.source || '-'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold">
                      {lead.assigned_user?.name?.charAt(0) || '?'}
                    </div>
                    <span className="text-xs text-gray-700 font-medium">{lead.assigned_user?.name || 'Unassigned'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {lead.status !== 'converted' && (
                      <button 
                        onClick={() => onConvert(lead)}
                        className="p-1.5 hover:bg-green-50 text-gray-400 hover:text-green-600 rounded-lg transition-colors"
                        title="Convert to Customer"
                      >
                        <UserCheck size={16} />
                      </button>
                    )}
                    <button 
                      onClick={() => onEdit(lead)}
                      className="p-1.5 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 text-gray-400 rounded-lg">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta.total_pages > 1 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <p className="text-xs text-gray-500 font-medium">
            Showing <span className="text-gray-900 font-bold">{leads.length}</span> of <span className="text-gray-900 font-bold">{meta.total}</span> leads
          </p>
          <div className="flex items-center gap-2">
            <button 
              disabled={meta.page === 1}
              onClick={() => onPageChange(meta.page - 1)}
              className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              disabled={meta.page === meta.total_pages}
              onClick={() => onPageChange(meta.page + 1)}
              className="p-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadTable;
