import React from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

const InstallationGantt = ({ installations }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
  const currentMonth = 4; // Mei (0-indexed)

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
          Timeline Project <span className="text-blue-900">Mei 2025</span>
        </h3>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"><ChevronLeft size={18} /></button>
          <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="relative border border-gray-50 rounded-2xl overflow-hidden">
        {/* Header Days */}
        <div className="flex bg-gray-50/50 border-b border-gray-50">
          <div className="w-48 p-4 border-r border-gray-50 text-[10px] font-black text-gray-400 uppercase">Proyek / Pelanggan</div>
          <div className="flex-1 flex">
            {Array.from({ length: 31 }).map((_, i) => (
              <div key={i} className={`flex-1 text-center py-4 text-[9px] font-black border-r border-gray-50/50 last:border-0 ${i + 1 === 13 ? 'text-blue-900 bg-blue-50' : 'text-gray-300'}`}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-50">
          {installations.slice(0, 5).map((inst, idx) => {
            const startDay = new Date(inst.scheduled_date).getDate();
            const duration = 3; // Mock duration
            
            return (
              <div key={inst.id} className="flex group hover:bg-gray-50/30 transition-all">
                <div className="w-48 p-4 border-r border-gray-50 flex flex-col justify-center">
                  <span className="text-xs font-black text-gray-900 truncate">{inst.customer?.name}</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase truncate">{inst.inst_number}</span>
                </div>
                <div className="flex-1 flex relative items-center h-16">
                   {/* Background grid */}
                   <div className="absolute inset-0 flex">
                      {Array.from({ length: 31 }).map((_, i) => (
                        <div key={i} className="flex-1 border-r border-gray-50/30 last:border-0" />
                      ))}
                   </div>
                   
                   {/* Progress Bar */}
                   <div 
                    className={`absolute h-8 rounded-xl shadow-lg shadow-blue-900/10 flex items-center px-3 z-10 transition-all group-hover:scale-[1.02]
                      ${inst.status === 'done' ? 'bg-green-500 text-white' : 'bg-blue-900 text-white'}
                    `}
                    style={{
                      left: `${((startDay - 1) / 31) * 100}%`,
                      width: `${(duration / 31) * 100}%`
                    }}
                   >
                     <span className="text-[9px] font-black whitespace-nowrap overflow-hidden">
                       {inst.current_stage || 'Installation'}
                     </span>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-900 rounded-full" />
          <span className="text-[10px] font-bold text-gray-500 uppercase">Scheduled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-[10px] font-bold text-gray-500 uppercase">Completed</span>
        </div>
        <div className="flex items-center gap-2 ml-auto text-[10px] font-bold text-gray-400 italic">
          <Info size={12} className="text-blue-500" />
          <span>Klik bar untuk melihat detail progres harian</span>
        </div>
      </div>
    </div>
  );
};

export default InstallationGantt;
