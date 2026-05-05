import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';

const KanbanBoard = ({ data = {}, onDragEnd }) => {
  const stages = ['prospek', 'negosiasi', 'penawaran', 'closing', 'instalasi'];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-200">
        {stages.map((stage) => (
          <KanbanColumn 
            key={stage} 
            stage={stage} 
            data={data[stage] || { deals: [], total_value: 0, count: 0 }} 
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
