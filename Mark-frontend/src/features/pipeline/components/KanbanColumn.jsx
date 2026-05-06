import { Droppable } from '@hello-pangea/dnd';
import { Plus, MoreVertical } from 'lucide-react';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ stage, data }) => {
  const getStageLabel = (s) => {
    switch (s) {
      case 'prospek': return 'PROSPEK';
      case 'negosiasi': return 'NEGOSIASI';
      case 'penawaran': return 'PENAWARAN';
      case 'closing': return 'CLOSING';
      case 'instalasi': return 'INSTALASI';
      default: return s.toUpperCase();
    }
  };

  const getStageColor = (s) => {
    switch (s) {
      case 'prospek': return 'bg-blue-600';
      case 'negosiasi': return 'bg-orange-500';
      case 'penawaran': return 'bg-purple-600';
      case 'closing': return 'bg-green-600';
      case 'instalasi': return 'bg-cyan-600';
      default: return 'bg-gray-400';
    }
  };

  const getStageNumber = (s) => {
    switch (s) {
      case 'prospek': return '1.';
      case 'negosiasi': return '2.';
      case 'penawaran': return '3.';
      case 'closing': return '4.';
      case 'instalasi': return '5.';
      default: return '';
    }
  };

  return (
    <div className="flex-1 min-w-[280px] bg-gray-50/30 rounded-2xl border border-gray-100 flex flex-col h-full overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-black ${getStageColor(stage).replace('bg-', 'text-')}`}>
              {getStageNumber(stage)} {getStageLabel(stage)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="text-gray-400 hover:text-gray-600">
              <Plus size={14} />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical size={14} />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <span className="text-[11px] font-bold text-gray-400">
            {data.count} Deals
          </span>
          <span className="text-[11px] font-black text-gray-900">
            Rp {new Intl.NumberFormat('id-ID').format(data.total_value)}
          </span>
        </div>

        <div className={`h-1 w-full mt-3 rounded-full ${getStageColor(stage)} opacity-80`} />
      </div>

      <Droppable droppableId={stage}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-3 overflow-y-auto transition-colors duration-200 min-h-[400px] scrollbar-hide ${snapshot.isDraggingOver ? 'bg-blue-50/20' : ''}`}
          >
            {data.deals.map((deal, index) => (
              <KanbanCard key={deal.id} deal={deal} index={index} />
            ))}
            {provided.placeholder}
            
            {data.deals.length > 0 && (
              <button className="w-full py-3 mt-2 text-[11px] font-bold text-gray-400 hover:text-gray-600 bg-white/50 rounded-xl border border-dashed border-gray-200 transition-all">
                + {data.count > 5 ? data.count - 5 : 0} deals lainnya
              </button>
            )}

            {data.deals.length === 0 && (
              <div className="h-32 border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center text-gray-300 text-[11px] font-bold">
                Drag deal here
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
