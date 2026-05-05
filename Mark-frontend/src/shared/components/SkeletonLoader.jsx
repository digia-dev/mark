import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1, className = '' }) => {
  const elements = Array.from({ length: count }, (_, i) => i);

  if (type === 'stat') {
    return (
      <>
        {elements.map((key) => (
          <div key={key} className={`bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-between animate-pulse ${className}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              <div className="w-16 h-6 rounded-full bg-gray-200"></div>
            </div>
            <div>
              <div className="w-24 h-4 bg-gray-200 rounded-md mb-2"></div>
              <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'table') {
    return (
      <div className={`bg-white border border-gray-100 rounded-[24px] shadow-sm overflow-hidden animate-pulse ${className}`}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
          <div className="w-64 h-10 bg-gray-200 rounded-xl"></div>
          <div className="w-32 h-10 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="w-full">
          {/* Header */}
          <div className="flex items-center gap-4 p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
            <div className="w-48 h-4 bg-gray-200 rounded"></div>
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 bg-gray-200 rounded ml-auto"></div>
          </div>
          {/* Rows */}
          {elements.map((key) => (
            <div key={key} className="flex items-center gap-4 p-4 border-b border-gray-50">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="w-32 h-4 bg-gray-200 rounded"></div>
              <div className="w-48 h-4 bg-gray-200 rounded"></div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
              <div className="w-20 h-6 bg-gray-200 rounded-full ml-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: basic card/rectangle
  return (
    <>
      {elements.map((key) => (
        <div key={key} className={`bg-gray-200 rounded-2xl animate-pulse ${className}`}></div>
      ))}
    </>
  );
};

export default SkeletonLoader;
