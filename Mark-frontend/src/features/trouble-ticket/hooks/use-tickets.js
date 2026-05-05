import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ticketService from '../services/ticket-service';

export const useTickets = (params) => {
  return useQuery({
    queryKey: ['tickets', params],
    queryFn: () => ticketService.getTickets(params)
  });
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => ticketService.createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets']);
    }
  });
};

export const useUpdateTicketStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => ticketService.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets']);
    }
  });
};
