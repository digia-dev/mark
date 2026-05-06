import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import settingService from '../services/setting-service';
import { toast } from 'react-hot-toast';

export const useCompanyProfile = () => {
  return useQuery({
    queryKey: ['settings', 'company'],
    queryFn: () => settingService.getCompanyProfile(),
  });
};

export const useUpdateCompanyProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => settingService.updateCompanyProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['settings', 'company']);
      toast.success('Profil perusahaan diperbarui');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error?.message || 'Gagal memperbarui profil');
    }
  });
};

export const useSystemPreferences = () => {
  return useQuery({
    queryKey: ['settings', 'preferences'],
    queryFn: () => settingService.getPreferences(),
  });
};

export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => settingService.updatePreferences(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['settings', 'preferences']);
      toast.success('Preferensi sistem diperbarui');
    },
    onError: (error) => {
      toast.error(error.response?.data?.error?.message || 'Gagal memperbarui preferensi');
    }
  });
};

export const useUsers = (params) => {
  return useQuery({
    queryKey: ['settings', 'users', params],
    queryFn: () => settingService.getUsers(params),
  });
};
