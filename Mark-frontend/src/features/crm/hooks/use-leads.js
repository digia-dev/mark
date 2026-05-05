import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import leadService from '../services/lead-service';

export const useLeads = (params) => {
  return useQuery({
    queryKey: ['leads', params],
    queryFn: () => leadService.getLeads(params),
    keepPreviousData: true
  });
};

export const useCreateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => leadService.createLead(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['leads']);
    }
  });
};

export const useUpdateLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => leadService.updateLead(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['leads']);
    }
  });
};

export const useConvertLead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => leadService.convertLead(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['leads']);
      queryClient.invalidateQueries(['customers']);
    }
  });
};
