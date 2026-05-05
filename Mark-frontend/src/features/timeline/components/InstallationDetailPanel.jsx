import React from 'react';
import { 
  X, Calendar, MapPin, User, Package, 
  Clock, CheckCircle2, AlertCircle, History, 
  MessageSquare, Paperclip, Printer, Download,
  Map, Phone, Mail, Box, Briefcase
} from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';

const InstallationDetailPanel = ({ isOpen, onClose, installation }) => {
  if (!installation) return null;

  const stages = [
    { name: 'Survey', icon: Map, status: 'done', date: installation.created_at },
    { name: 'Preparation', icon: Box, status: 'done', date: installation.scheduled_date },
    { name: 'Installation', icon: Briefcase, status: 'on-progress', date: installation.start_date },
    { name: 'Testing', icon: CheckCircle2, status: 'pending', date: null },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'done': return 'bg-emerald-500 text-white';
      case 'on-progress': return 'bg-blue-900 text-white';
      default: return 'bg-gray-100 text-gray-400';
    }
  };

  return (
    <div 
      className={`fixed top-0 right-0 h-screen w-full max-w-2xl bg-white shadow-2xl z-200 flex flex-col border-l border-gray-100 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* Header */}
      <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-black text-gray-900">{installation.inst_number}</h2>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
              installation.status === 'done' ? 'bg-green-50 text-green-600 border border-green-100' :
              installation.status === 'on-progress' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
              'bg-gray-100 text-gray-500 border border-gray-200'
            }`}>
              {installation.status}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500">Project Timeline untuk <span className="text-gray-900 font-bold">{installation.customer?.name}</span></p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 hover:bg-white rounded-xl text-gray-400 hover:text-blue-600 transition-all shadow-sm border border-transparent hover:border-gray-100">
            <Printer size={18} />
          </button>
          <button className="p-2.5 hover:bg-white rounded-xl text-gray-400 hover:text-blue-600 transition-all shadow-sm border border-transparent hover:border-gray-100">
            <Download size={18} />
          </button>
          <button onClick={onClose} className="p-2.5 hover:bg-white rounded-xl text-gray-400 hover:text-gray-900 transition-all shadow-sm border border-transparent hover:border-gray-100 ml-2">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs.Root defaultValue="detail" className="flex-1 flex flex-col overflow-hidden">
        <Tabs.List className="flex px-8 border-b border-gray-100 bg-white sticky top-0 z-10">
          {[
            { id: 'detail', label: 'Informasi', icon: Calendar },
            { id: 'activity', label: 'Aktivitas', icon: History },
            { id: 'document', label: 'Dokumen', icon: Paperclip },
            { id: 'notes', label: 'Catatan', icon: MessageSquare }
          ].map(tab => (
            <Tabs.Trigger 
              key={tab.id}
              value={tab.id}
              className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b-2 border-transparent data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 transition-all flex items-center gap-2"
            >
              <tab.icon size={14} />
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <Tabs.Content value="detail" className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Stage Progress */}
            <div className="space-y-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Tahapan Proyek</h3>
              <div className="flex items-center justify-between relative px-2">
                <div className="absolute left-10 right-10 top-[18px] h-0.5 bg-gray-100 z-0" />
                {stages.map((stage, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 relative z-10">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-4 border-white ${getStatusColor(stage.status)}`}>
                      <stage.icon size={16} />
                    </div>
                    <div className="text-center">
                      <p className={`text-[10px] font-black uppercase tracking-wider ${stage.status !== 'pending' ? 'text-gray-900' : 'text-gray-400'}`}>{stage.name}</p>
                      {stage.date && (
                        <p className="text-[9px] font-bold text-gray-400 mt-0.5">
                          {new Date(stage.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                   <User size={12} className="text-blue-500" /> Sales PIC
                </span>
                <p className="text-sm font-black text-gray-900">{installation.sales?.name || 'Unassigned'}</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                   <User size={12} className="text-orange-500" /> Teknisi PIC
                </span>
                <p className="text-sm font-black text-gray-900">{installation.technician?.name || 'Belum Di-assign'}</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                   <Package size={12} className="text-purple-500" /> Layanan / Paket
                </span>
                <p className="text-sm font-black text-gray-900">{installation.product?.name || 'Internet Pro'}</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                   <MapPin size={12} className="text-red-500" /> Area
                </span>
                <p className="text-sm font-black text-gray-900">{installation.area || '-'}</p>
              </div>
              <div className="col-span-2 space-y-1.5">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                   <MapPin size={12} className="text-emerald-500" /> Alamat Pengerjaan
                </span>
                <p className="text-sm font-bold text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                   {installation.address}
                </p>
              </div>
            </div>

            {/* Schedule Info */}
            <div className="bg-blue-900 p-8 rounded-[32px] text-white flex justify-between items-center shadow-xl shadow-blue-900/20">
               <div className="space-y-1">
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Tgl Mulai</span>
                  <p className="text-lg font-black">{new Date(installation.scheduled_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
               </div>
               <div className="h-10 w-px bg-white/10" />
               <div className="space-y-1 text-right">
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Target Selesai</span>
                  <p className="text-lg font-black">{new Date(installation.target_end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
               </div>
            </div>
          </Tabs.Content>
          
          <Tabs.Content value="activity" className="animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="relative space-y-8 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-50">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-6 relative">
                    <div className="w-9 h-9 rounded-full bg-gray-50 border-4 border-white flex items-center justify-center z-10 shadow-sm text-gray-400">
                      <Clock size={16} />
                    </div>
                    <div className="flex-1 pb-6 border-b border-gray-50 last:border-0">
                      <p className="text-xs font-black text-gray-900">Status Update: {i === 1 ? 'Survey Done' : 'Hardware Preparation'}</p>
                      <p className="text-[10px] font-medium text-gray-500 mt-1">Oleh: <span className="text-blue-900 font-bold">Teknisi A</span> • 2 jam yang lalu</p>
                    </div>
                  </div>
                ))}
             </div>
          </Tabs.Content>
        </div>
      </Tabs.Root>

      {/* Footer Actions */}
      <div className="p-8 border-t border-gray-100 flex gap-4 bg-white">
        <button className="flex-1 py-4 bg-white border border-gray-100 text-gray-700 rounded-2xl text-sm font-black hover:bg-gray-50 transition-all">
           Log Aktivitas
        </button>
        <button className="flex-2 py-4 bg-blue-900 text-white rounded-2xl text-sm font-black hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20">
           Update Status Pengerjaan
        </button>
      </div>
    </div>
  );
};

export default InstallationDetailPanel;
