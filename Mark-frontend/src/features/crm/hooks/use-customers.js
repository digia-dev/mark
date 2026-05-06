import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import customerService from '../services/customer-service';

export const useCustomers = (params) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => customerService.getCustomers(params),
    keepPreviousData: true
  });
};

export const useCustomerDetail = (id) => {
  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => customerService.getCustomer(id),
    enabled: !!id
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => customerService.createCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    }
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => customerService.updateCustomer(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(['customers']);
      queryClient.invalidateQueries(['customer', id]);
    }
  });
};

export const useCustomerStats = () => {
  return useQuery({
    queryKey: ['customers', 'stats'],
    queryFn: () => customerService.getStats()
  });
};
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => customerService.deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['customers']);
    }
  });
};
