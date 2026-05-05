import { useQuery } from '@tanstack/react-query';
import dashboardService from '../services/dashboard-service';

export const useDashboard = (params) => {
  return useQuery({
    queryKey: ['dashboard', params],
    queryFn: () => dashboardService.getDashboardStats(params),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
