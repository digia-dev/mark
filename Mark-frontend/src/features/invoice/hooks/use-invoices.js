import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import invoiceService from '../services/invoice-service';

export const useInvoices = (params) => {
  return useQuery({
    queryKey: ['invoices', params],
    queryFn: () => invoiceService.getInvoices(params)
  });
};

export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => invoiceService.createInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['invoices']);
    }
  });
};
