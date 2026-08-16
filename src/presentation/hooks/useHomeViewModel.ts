import { useEffect, useMemo, useCallback } from 'react';
import { ProviderRepository, ServiceCategoryConfig } from '../../data/repositories/providerRepository';
import { ServiceCategory } from '../../core/types';
import { useAppStore } from '../store/useAppStore';

export function useHomeViewModel(repository: ProviderRepository) {
  const {
    providers,
    recommendations,
    categories,
    isLoading,
    error,
    setProviders,
    setRecommendations,
    setCategories,
    setLoading,
    setError,
  } = useAppStore();

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!active) return;
      setLoading(true);
      setError(null);
      try {
        const [p, r, c] = await Promise.all([
          repository.getProviders(),
          repository.getRecommendations(),
          repository.getCategories(),
        ]);
        if (!active) return;
        setProviders(p);
        setRecommendations(r);
        setCategories(c);
      } catch (e) {
        if (!active) return;
        setError(e instanceof Error ? e.message : 'Erro ao carregar dados.');
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repository]);

  const featuredProviders = useMemo(
    () => [...providers].sort((a, b) => b.rating - a.rating).slice(0, 3),
    [providers],
  );

  const categoryMap = useMemo(() => {
    const map = new Map<ServiceCategory, ServiceCategoryConfig>();
    categories.forEach((c) => map.set(c.value, c));
    return map;
  }, [categories]);

  const getRecommendationsByCategory = useCallback(
    (cat: ServiceCategory | null) =>
      cat === null ? recommendations : recommendations.filter((r) => r.provider.category === cat),
    [recommendations],
  );

  return {
    isLoading,
    error,
    categories,
    categoryMap,
    featuredProviders,
    recommendations,
    getRecommendationsByCategory,
  };
}
