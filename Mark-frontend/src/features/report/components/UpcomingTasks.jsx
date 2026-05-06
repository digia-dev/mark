import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle, Clock, User } from 'lucide-react';
import { toast } from 'react-hot-toast';

const UpcomingTasks = ({ tasks = [], isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm animate-pulse h-full">
        <div className="h-4 bg-gray-50 rounded w-1/2 mb-8" />
        <div className="space-y-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-16 bg-gray-50 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const handleComplete = (e, taskName) => {
    e.stopPropagation();
    toast.success(`Tugas "${taskName}" ditandai selesai`);
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm h-full group hover:border-blue-900/20 transition-all flex flex-col">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h3 className="font-black text-gray-900 text-lg tracking-tight">Upcoming Tasks</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Agenda & Follow-up Tim Sales</p>
        </div>
        <button 
          onClick={() => toast.info('Buka Kalender Agenda')}
          className="p-2 bg-gray-50 text-gray-400 rounded-xl hover:text-gray-900 transition-all border border-gray-100"
        >
           <Calendar size={18} />
        </button>
      </div>

      <div className="space-y-4 flex-1">
        {tasks?.length > 0 ? (
          tasks.map((item) => (
            <div 
              key={item.id} 
              onClick={() => toast.info(`Detail tugas: ${item.task}`)}
              className="p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-gray-100 hover:bg-white transition-all group/item flex items-start gap-4 cursor-pointer active:scale-[0.98]"
            >
              <div className="mt-1">
                 <div 
                   onClick={(e) => handleComplete(e, item.task)}
                   className="w-5 h-5 rounded-md border-2 border-gray-200 group-hover/item:border-blue-900 flex items-center justify-center cursor-pointer transition-all hover:bg-blue-50"
                 >
                    <CheckCircle size={12} className="text-blue-900 opacity-0 group-hover/item:opacity-20 hover:opacity-100" />
                 </div>
              </div>
              <div className="flex-1 min-w-0">
                 <h4 className="text-xs font-black text-gray-900 line-clamp-1">{item.task}</h4>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mt-0.5 line-clamp-1">{item.customer}</p>
                 <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-400 uppercase tracking-widest bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm">
                       <Clock size={10} /> {item.date}
                    </div>
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-blue-900 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 shadow-sm">
                       <User size={10} /> {item.assigned}
                    </div>
                 </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 mb-4">
              <Calendar size={24} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tidak ada tugas mendatang</p>
          </div>
        )}
      </div>


      <button 
        onClick={() => toast.info('Navigasi ke halaman Agenda penuh')}
        className="mt-8 w-full py-3 border border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-gray-50 hover:text-gray-900 transition-all"
      >
        Semua Agenda →
      </button>
    </div>
  );
};

export default UpcomingTasks;
