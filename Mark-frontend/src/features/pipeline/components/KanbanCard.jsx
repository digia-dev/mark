import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { MoreHorizontal, Calendar, MapPin, Building2, User } from 'lucide-react';

const KanbanCard = ({ deal, index }) => {
  const getInitial = (name) => name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : '??';

  const getSalesColor = (name) => {
    const colors = [
      'bg-blue-100 text-blue-700',
      'bg-orange-100 text-orange-700',
      'bg-purple-100 text-purple-700',
      'bg-green-100 text-green-700',
      'bg-red-100 text-red-700'
    ];
    const index = (name || '').length % colors.length;
    return colors[index];
  };

  return (
    <Draggable draggableId={deal.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-3 group hover:border-blue-400 hover:shadow-md transition-all relative ${snapshot.isDragging ? 'rotate-2 shadow-xl border-blue-500 z-50' : ''}`}
        >
          <div className="flex justify-between items-start mb-3">
            <h4 className="text-[13px] font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
              {deal.customer?.name || deal.lead?.name || deal.name}
            </h4>
            <button className="text-gray-200 hover:text-gray-400">
              <MoreHorizontal size={14} />
            </button>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-[11px] font-bold text-gray-400 leading-none">
              {deal.product_name || 'Internet Dedicated 100 Mbps'}
            </p>
            
            <div className="flex items-center gap-1.5 text-gray-500">
              <span className="text-[11px] font-medium truncate flex-1">{deal.sales?.name || 'Andi Pratama'}</span>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black ${getSalesColor(deal.sales?.name || 'Andi Pratama')}`}>
                {getInitial(deal.sales?.name || 'Andi Pratama')}
              </div>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
              <MapPin size={10} />
              <span>{deal.area || 'Jakarta Selatan'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
            <p className="text-[11px] font-black text-gray-900">
              Rp {new Intl.NumberFormat('id-ID').format(deal.value)}
            </p>
            <p className="text-[10px] font-bold text-gray-400">
              {deal.expected_closing_date ? new Date(deal.expected_closing_date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '20 Mei 2025'}
            </p>
          </div>

          {/* Status Badge - Optional based on stage */}
          {deal.stage === 'instalasi' && (
             <div className="absolute top-1/2 -translate-y-1/2 -right-1 translate-x-full hidden group-hover:block z-10">
                <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-1 rounded shadow-sm whitespace-nowrap border border-green-200">
                  On Progress
                </span>
             </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
