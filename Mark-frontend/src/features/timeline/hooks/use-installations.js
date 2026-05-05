import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import installationService from '../services/installation-service';

export const useInstallations = (params) => {
  return useQuery({
    queryKey: ['installations', params],
    queryFn: () => installationService.getInstallations(params)
  });
};

export const useScheduleInstallation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => installationService.scheduleInstallation(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['installations']);
    }
  });
};

export const useUpdateInstallationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => installationService.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['installations']);
    }
  });
};
