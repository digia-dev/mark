import React from 'react';

const StatusBadge = ({ status, text }) => {
  // Define colors based on design.md badge specifications
  const getBadgeStyle = (statusName) => {
    const statusLower = String(statusName).toLowerCase();
    
    // Green (Success/Done)
    if (['paid', 'lunas', 'done', 'selesai', 'approved', 'won', 'active', 'aktif'].includes(statusLower)) {
      return 'bg-green-100 text-green-700 border-green-200';
    }
    
    // Blue (In Progress/Active Info)
    if (['in-progress', 'dikirim', 'sent', 'partial', 'on-progress'].includes(statusLower)) {
      return 'bg-blue-100 text-blue-700 border-blue-200';
    }
    
    // Orange/Yellow (Warning/Pending)
    if (['pending', 'draft', 'negosiasi', 'prospek', 'scheduled', 'tertunda'].includes(statusLower)) {
      return 'bg-orange-100 text-orange-700 border-orange-200';
    }
    
    // Red (Error/Failed)
    if (['overdue', 'lost', 'rejected', 'ditolak', 'cancelled', 'batal'].includes(statusLower)) {
      return 'bg-red-100 text-red-700 border-red-200';
    }
    
    // Gray (Default)
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const badgeStyle = getBadgeStyle(status);
  
  // Convert status to readable format if text is not provided
  const displayLabel = text || status.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${badgeStyle} inline-flex items-center justify-center`}>
      {displayLabel}
    </span>
  );
};

export default StatusBadge;
