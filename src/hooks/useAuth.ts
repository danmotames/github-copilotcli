import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/api';
import { User } from '../types';
import { useAuthStore } from '../store/useAuthStore';

export const useLogin = () => {
  const { login, setLoading, setError } = useAuthStore();

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => 
      authService.login(email, password),
    onSuccess: (user) => {
      login(user);
      setLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setLoading(false);
    },
  });

  return mutation;
};

export const useRegister = () => {
  const { login, setLoading, setError } = useAuthStore();

  const mutation = useMutation({
    mutationFn: (userData: Omit<User, 'id' | 'createdAt'>) => 
      authService.register(userData),
    onSuccess: (user) => {
      login(user);
      setLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setLoading(false);
    },
  });

  return mutation;
};

export const useLogout = () => {
  const { logout, setLoading } = useAuthStore();

  const mutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout();
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  return mutation;
};

export const useCurrentUser = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  return { user, isAuthenticated, isLoading };
};
