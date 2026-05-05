import { useQuery } from '@tanstack/react-query';
import reportService from '../services/report-service';

export const useDashboard = (params) => {
  return useQuery({
    queryKey: ['dashboard-stats', params],
    queryFn: () => reportService.getDashboardStats(params),
    refetchOnWindowFocus: false
  });
};

export const useReports = (type, params) => {
  return useQuery({
    queryKey: ['reports', type, params],
    queryFn: () => {
      switch (type) {
        case 'sales': return reportService.getSalesPerformance(params);
        case 'pipeline': return reportService.getPipelineReport(params);
        case 'product': return reportService.getProductPerformance(params);
        default: return reportService.getDashboardStats(params);
      }
    },
    enabled: !!type
  });
};
