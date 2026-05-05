import { useMutation, useQuery } from '@tanstack/react-query';
import authService from '../services/auth-service';
import useAuthStore from '../store/auth-store';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (userData) => authService.register(userData)
  });
};

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      clearAuth();
      window.location.href = '/login';
    },
  });
};

export const useProfile = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ['profile'],
    queryFn: authService.getProfile,
    enabled: isAuthenticated,
    onSuccess: (data) => {
      setUser(data);
    },
  });
};
