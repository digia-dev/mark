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

export const useInvoiceStats = () => {
  return useQuery({
    queryKey: ['invoices', 'stats'],
    queryFn: () => invoiceService.getStats()
  });
};

export const useInvoiceDetail = (id) => {
  return useQuery({
    queryKey: ['invoices', id],
    queryFn: () => invoiceService.getInvoice(id),
    enabled: !!id
  });
};

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => invoiceService.updateInvoice(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['invoices']);
      queryClient.invalidateQueries(['invoices', variables.id]);
    }
  });
};

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => invoiceService.deleteInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['invoices']);
    }
  });
};

export const useRecordPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => invoiceService.recordPayment(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['invoices']);
      queryClient.invalidateQueries(['invoices', variables.id]);
    }
  });
};

export const useGenerateInvoicePdf = () => {
  return useMutation({
    mutationFn: (id) => invoiceService.generatePdf(id)
  });
};
