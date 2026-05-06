import { useActivityLogs, useActivityLogStats } from '../features/activity-log/hooks/use-activity-logs';

const ActivityLogPage = () => {
  const { data: logsData, isLoading: isLogsLoading } = useActivityLogs({ page: 1, limit: 10 });
  const { data: statsData, isLoading: isStatsLoading } = useActivityLogStats();

  return (
    <div className="pb-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 mb-1">Activity Logs</h1>
        <p className="text-sm text-gray-500 font-medium">Audit trail dan rekam jejak aktivitas pengguna di sistem</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 h-full">
          <ActivityLogTable />
        </div>
        <div className="xl:col-span-4 h-full">
          <ActivityLogStatPanel 
            stats={statsData?.data} 
            isLoading={isStatsLoading} 
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityLogPage;
