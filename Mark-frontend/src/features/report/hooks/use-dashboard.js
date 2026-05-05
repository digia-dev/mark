import { useQuery } from '@tanstack/react-query';
import reportService from '../services/report-service';

export const useDashboard = (params) => {
  return useQuery({
    queryKey: ['dashboard-stats', params],
    queryFn: () => reportService.getDashboardStats(params),
    refetchOnWindowFocus: false
  });
};
