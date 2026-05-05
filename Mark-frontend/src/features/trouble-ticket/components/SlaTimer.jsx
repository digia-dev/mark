import React, { useState, useEffect } from 'react';

const SlaTimer = ({ deadline, status }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isOverdue, setIsOverdue] = useState(false);
  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    if (!deadline || status === 'resolved' || status === 'closed') {
      return;
    }

    const calculateTime = () => {
      const now = new Date();
      const end = new Date(deadline);
      const diffMs = end - now;

      if (diffMs <= 0) {
        setTimeLeft(0);
        setIsOverdue(true);
        setPercentage(0);
      } else {
        const totalMs = 4 * 60 * 60 * 1000; // Assume 4 hours for total SLA as base for percentage for now
        setTimeLeft(Math.floor(diffMs / (1000 * 60)));
        setIsOverdue(false);
        setPercentage(Math.max(0, Math.min(100, (diffMs / totalMs) * 100)));
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [deadline, status]);

  if (!deadline) return <span className="text-gray-400">-</span>;

  if (status === 'resolved' || status === 'closed') {
    return <span className="text-green-500 font-bold">Resolved in SLA</span>;
  }

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const isWarning = percentage < 20;

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8 flex items-center justify-center">
        <svg className="w-8 h-8 transform -rotate-90">
          <circle
            cx="16"
            cy="16"
            r="14"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-gray-100"
          />
          <circle
            cx="16"
            cy="16"
            r="14"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={2 * Math.PI * 14}
            strokeDashoffset={2 * Math.PI * 14 * ((100 - percentage) / 100)}
            className={`transition-all duration-1000 ${
              isOverdue ? 'text-red-500' : isWarning ? 'text-orange-500' : 'text-blue-500'
            }`}
          />
        </svg>
      </div>
      <div className={`text-xs font-black ${isOverdue ? 'text-red-500' : isWarning ? 'text-orange-500' : 'text-gray-700'}`}>
        {isOverdue ? 'OVERDUE' : formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default SlaTimer;
