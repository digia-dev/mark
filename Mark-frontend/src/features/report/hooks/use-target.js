import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../../lib/axios';

export const useTarget = (month, year) => {
  return useQuery({
    queryKey: ['target', month, year],
    queryFn: async () => {
      const { data } = await axios.get('/targets', { params: { month, year } });
      return data.data;
    }
  });
};

export const useCreateTarget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post('/targets', payload);
      return data.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['target'] });
    }
  });
};
