import { useQuery } from '@tanstack/react-query';
import activityLogService from '../services/activity-log-service';

export const useActivityLogs = (params) => {
  return useQuery({
    queryKey: ['activity-logs', params],
    queryFn: () => activityLogService.getLogs(params)
  });
};

export const useActivityLogStats = () => {
  return useQuery({
    queryKey: ['activity-logs', 'stats'],
    queryFn: () => activityLogService.getStats()
  });
};
