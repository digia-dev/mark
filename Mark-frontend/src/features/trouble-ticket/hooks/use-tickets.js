import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketService } from '../services/ticket-service';

export const useTickets = (params) => {
  return useQuery({
    queryKey: ['trouble-tickets', params],
    queryFn: () => ticketService.getTickets(params),
    keepPreviousData: true,
  });
};

export const useTicketDetail = (id) => {
  return useQuery({
    queryKey: ['trouble-ticket', id],
    queryFn: () => ticketService.getTicketDetail(id),
    enabled: !!id,
  });
};

export const useTicketStats = () => {
  return useQuery({
    queryKey: ['trouble-ticket-stats'],
    queryFn: () => ticketService.getTicketStats(),
  });
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ticketService.createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries(['trouble-tickets']);
      queryClient.invalidateQueries(['trouble-ticket-stats']);
    },
  });
};

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => ticketService.updateTicket(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['trouble-tickets']);
      queryClient.invalidateQueries(['trouble-ticket', variables.id]);
    },
  });
};

export const useUpdateTicketStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => ticketService.updateStatus(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['trouble-tickets']);
      queryClient.invalidateQueries(['trouble-ticket', variables.id]);
      queryClient.invalidateQueries(['trouble-ticket-stats']);
    },
  });
};

export const useAssignTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, userId }) => ticketService.assignTicket(id, userId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['trouble-tickets']);
      queryClient.invalidateQueries(['trouble-ticket', variables.id]);
    },
  });
};

export const useAddTicketNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => ticketService.addNote(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['trouble-ticket', variables.id]);
    },
  });
};
