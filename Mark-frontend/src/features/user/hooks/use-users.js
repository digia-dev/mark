import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/user-service';

export const useUsers = (params) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userService.getUsers(params),
  });
};
