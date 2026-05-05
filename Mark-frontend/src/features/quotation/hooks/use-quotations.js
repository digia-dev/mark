import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import quotationService from '../services/quotation-service';

export const useQuotations = (params) => {
  return useQuery({
    queryKey: ['quotations', params],
    queryFn: () => quotationService.getQuotations(params)
  });
};

export const useQuotationDetail = (id) => {
  return useQuery({
    queryKey: ['quotations', id],
    queryFn: () => quotationService.getQuotationDetail(id),
    enabled: !!id
  });
};

export const useCreateQuotation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => quotationService.createQuotation(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['quotations']);
    }
  });
};

export const useUpdateQuotationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => quotationService.updateStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['quotations']);
      queryClient.invalidateQueries(['quotations', id]);
    }
  });
};
