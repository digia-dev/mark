import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import notificationService from '../services/notification-service';

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getNotifications(),
    refetchInterval: 30000 // Refetch every 30 seconds
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    }
  });
};
