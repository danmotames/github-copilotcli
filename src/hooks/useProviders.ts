import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { providerService } from '../services/api';
import { ServiceProvider, ServiceCategory } from '../types';
import { useAppStore } from '../store/useAppStore';

export const useProviders = () => {
  const { setProviders, setLoading, setError } = useAppStore();
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['providers'],
    queryFn: providerService.getAll,
    onSuccess: (data) => {
      setProviders(data);
      setLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setLoading(false);
    },
  });

  return {
    providers: data || [],
    isLoading,
    error: error?.message,
    refetch,
  };
};

export const useProvider = (id: string) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['provider', id],
    queryFn: () => providerService.getById(id),
    enabled: !!id,
  });

  return {
    provider: data,
    isLoading,
    error: error?.message,
  };
};

export const useProvidersByCategory = (category: ServiceCategory | null) => {
  const { providers, isLoading, error } = useProviders();
  
  const filteredProviders = category 
    ? providers.filter(p => p.category === category)
    : providers;

  return {
    providers: filteredProviders,
    isLoading,
    error,
  };
};

export const useSearchProviders = (query: string) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['search-providers', query],
    queryFn: () => providerService.search(query),
    enabled: query.length > 0,
  });

  return {
    providers: data || [],
    isLoading,
    error: error?.message,
  };
};

export const useCreateProvider = () => {
  const queryClient = useQueryClient();
  const { addProvider } = useAppStore();

  const mutation = useMutation({
    mutationFn: providerService.create,
    onSuccess: (newProvider) => {
      addProvider(newProvider);
      queryClient.invalidateQueries({ queryKey: ['providers'] });
    },
  });

  return mutation;
};

export const useUpdateProvider = () => {
  const queryClient = useQueryClient();
  const { updateProvider } = useAppStore();

  const mutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<ServiceProvider> }) => 
      providerService.update(id, updates),
    onSuccess: (updatedProvider) => {
      updateProvider(updatedProvider.id, updatedProvider);
      queryClient.invalidateQueries({ queryKey: ['providers'] });
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
    },
  });

  return mutation;
};

export const useDeleteProvider = () => {
  const queryClient = useQueryClient();
  const { setProviders } = useAppStore();

  const mutation = useMutation({
    mutationFn: providerService.delete,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['providers'] });
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
    },
  });

  return mutation;
};
