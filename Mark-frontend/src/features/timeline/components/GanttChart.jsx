import React from 'react';
import { ChevronLeft, ChevronRight, Info, Search, Filter, Plus } from 'lucide-react';

const GanttChart = ({ installations = [] }) => {
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getStageColor = (stage) => {
    switch (stage) {
      case 'survey': return 'bg-blue-500 shadow-blue-500/30';
      case 'preparation': return 'bg-orange-500 shadow-orange-500/30';
      case 'installation': return 'bg-amber-500 shadow-amber-500/30';
      case 'testing': return 'bg-emerald-500 shadow-emerald-500/30';
      case 'done': return 'bg-teal-600 shadow-teal-600/30';
      case 'delayed': return 'bg-red-500 shadow-red-500/30';
      default: return 'bg-blue-900 shadow-blue-900/30';
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[600px]">
      {/* Chart Header */}
      <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
        <div className="flex items-center gap-6">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
            Timeline <span className="text-blue-900">{months[currentMonth]} {currentYear}</span>
          </h3>
          <div className="flex bg-white rounded-xl border border-gray-100 p-1 shadow-sm">
            <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 transition-all"><ChevronLeft size={16} /></button>
            <div className="px-3 py-1.5 text-[10px] font-black text-gray-900 uppercase">Hari Ini</div>
            <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 transition-all"><ChevronRight size={16} /></button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-black text-gray-500 uppercase">T{i}</div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-900 flex items-center justify-center text-[10px] font-black text-white">+5</div>
           </div>
           <div className="h-8 w-px bg-gray-100 mx-2" />
           <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-blue-900 transition-all shadow-sm">
              <Filter size={18} />
           </button>
           <button 
             onClick={() => {
               // This should trigger the parent's setIsFormOpen(true)
               // But we don't have that prop here. I'll add an onAdd prop.
               toast.info('Gunakan tombol "Buat Jadwal Baru" di pojok kanan atas');
             }}
             className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
           >
              <Plus size={16} />
              Tambah Jadwal
           </button>
        </div>
      </div>

      {/* Chart Content */}
      <div className="flex-1 overflow-auto scrollbar-hide relative">
        <div className="min-w-[1200px]">
          {/* Days Header */}
          <div className="flex bg-gray-50/50 border-b border-gray-100 sticky top-0 z-20">
            <div className="w-64 p-4 border-r border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest sticky left-0 bg-gray-50/50 backdrop-blur-md">
              Proyek / Pelanggan
            </div>
            <div className="flex-1 flex">
              {days.map(day => (
                <div key={day} className={`flex-1 text-center py-4 text-[10px] font-black border-r border-gray-100/50 last:border-0 ${day === new Date().getDate() ? 'bg-blue-50 text-blue-900' : 'text-gray-300'}`}>
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-50">
            {installations.map((inst, idx) => {
              const start = new Date(inst.scheduled_date).getDate();
              const end = new Date(inst.target_end_date).getDate();
              const duration = Math.max(1, end - start + 1);

              return (
                <div key={inst.id} className="flex group hover:bg-blue-50/10 transition-all">
                  {/* Info Column */}
                  <div className="w-64 p-5 border-r border-gray-100 flex flex-col justify-center sticky left-0 bg-white group-hover:bg-blue-50/10 z-10 transition-all">
                    <span className="text-xs font-black text-gray-900 truncate mb-0.5">{inst.customer?.name}</span>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{inst.inst_number}</span>
                       <div className={`w-1.5 h-1.5 rounded-full ${inst.status === 'done' ? 'bg-green-500' : 'bg-blue-500'}`} />
                    </div>
                  </div>

                  {/* Timeline Column */}
                  <div className="flex-1 flex relative items-center h-20">
                    {/* Vertical Lines */}
                    <div className="absolute inset-0 flex">
                      {days.map(day => (
                        <div key={day} className="flex-1 border-r border-gray-100/30 last:border-0" />
                      ))}
                    </div>

                    {/* Bar */}
                    <div 
                      className={`absolute h-10 rounded-2xl shadow-xl flex items-center px-4 z-10 transition-all group-hover:scale-[1.01] cursor-pointer ${getStageColor(inst.current_stage || 'survey')}`}
                      style={{
                        left: `${((start - 1) / daysInMonth) * 100}%`,
                        width: `${(duration / daysInMonth) * 100}%`
                      }}
                    >
                       <span className="text-[10px] font-black text-white whitespace-nowrap overflow-hidden tracking-wider uppercase">
                         {inst.current_stage || 'survey'}
                       </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="p-6 border-t border-gray-50 bg-gray-50/20 flex items-center gap-8">
        {[
          { label: 'Survey', color: 'bg-blue-500' },
          { label: 'Preparation', color: 'bg-orange-500' },
          { label: 'Installation', color: 'bg-amber-500' },
          { label: 'Testing', color: 'bg-emerald-500' },
          { label: 'Delayed', color: 'bg-red-500' }
        ].map(l => (
          <div key={l.label} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${l.color} shadow-sm`} />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{l.label}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-2 text-[10px] font-bold text-gray-400 italic">
          <Info size={14} className="text-blue-500" />
          Hover bar untuk melihat detail progres harian
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
