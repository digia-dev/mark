import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import dealService from '../services/deal-service';

export const useDealsKanban = (params) => {
  return useQuery({
    queryKey: ['deals', 'kanban', params],
    queryFn: () => dealService.getKanban(params)
  });
};

export const useMoveDealStage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => dealService.moveStage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['deals', 'kanban']);
    }
  });
};

export const useCreateDeal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => dealService.createDeal(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['deals', 'kanban']);
    }
  });
};
