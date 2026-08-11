import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { recommendationService } from '../services/api';
import { Recommendation } from '../types';
import { useAppStore } from '../store/useAppStore';

export const useRecommendations = (condominiumId?: string) => {
  const { setRecommendations, setLoading, setError } = useAppStore();
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['recommendations', condominiumId],
    queryFn: () => recommendationService.getAll(condominiumId),
    onSuccess: (data) => {
      setRecommendations(data);
      setLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setLoading(false);
    },
  });

  return {
    recommendations: data || [],
    isLoading,
    error: error?.message,
    refetch,
  };
};

export const useRecommendation = (id: string) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['recommendation', id],
    queryFn: () => recommendationService.getById(id),
    enabled: !!id,
  });

  return {
    recommendation: data,
    isLoading,
    error: error?.message,
  };
};

export const useUserRecommendations = (userId: string) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['user-recommendations', userId],
    queryFn: () => recommendationService.getByUser(userId),
    enabled: !!userId,
  });

  return {
    recommendations: data || [],
    isLoading,
    error: error?.message,
  };
};

export const useCreateRecommendation = () => {
  const queryClient = useQueryClient();
  const { addRecommendation } = useAppStore();

  const mutation = useMutation({
    mutationFn: recommendationService.create,
    onSuccess: (newRecommendation) => {
      addRecommendation(newRecommendation);
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
      queryClient.invalidateQueries({ queryKey: ['providers'] });
    },
  });

  return mutation;
};

export const useUpdateRecommendation = () => {
  const queryClient = useQueryClient();
  const { updateRecommendation } = useAppStore();

  const mutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Recommendation> }) => 
      recommendationService.update(id, updates),
    onSuccess: (updatedRecommendation) => {
      updateRecommendation(updatedRecommendation.id, updatedRecommendation);
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
    },
  });

  return mutation;
};

export const useDeleteRecommendation = () => {
  const queryClient = useQueryClient();
  const { deleteRecommendation } = useAppStore();

  const mutation = useMutation({
    mutationFn: recommendationService.delete,
    onSuccess: (_, id) => {
      deleteRecommendation(id);
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
    },
  });

  return mutation;
};

export const useLikeRecommendation = () => {
  const mutation = useMutation({
    mutationFn: ({ recommendationId, userId }: { recommendationId: string; userId: string }) => 
      recommendationService.like(recommendationId, userId),
  });

  return mutation;
};
