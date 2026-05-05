import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import presentationService from '../services/presentation-service';

export const usePresentations = (params) => {
  return useQuery({
    queryKey: ['presentations', params],
    queryFn: () => presentationService.getPresentations(params)
  });
};

export const useCreatePresentation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => presentationService.createPresentation(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['presentations']);
    }
  });
};
