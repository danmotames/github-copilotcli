import { useEffect, useMemo, useCallback } from 'react';
import { ProviderRepository } from '../../data/repositories/providerRepository';
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
    // Skip fetching if data is already present to avoid redundant calls from multiple pages
    if (providers.length > 0 && recommendations.length > 0 && categories.length > 0) {
      return;
    }

    // `cancelled` guards against updating state after the effect cleanup
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const [p, r, c] = await Promise.all([
          repository.getProviders(),
          repository.getRecommendations(),
          repository.getCategories(),
        ]);

        if (!cancelled) {
          setProviders(p);
          setRecommendations(r);
          setCategories(c);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Erro ao carregar dados');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repository]);

  const featuredProviders = useMemo(
    () => [...providers].sort((a, b) => b.rating - a.rating).slice(0, 3),
    [providers],
  );

  const getRecommendationsByCategory = useCallback(
    (category: ServiceCategory | null) =>
      category === null
        ? recommendations
        : recommendations.filter((r) => r.provider.category === category),
    [recommendations],
  );

  return {
    isLoading,
    error,
    categories,
    featuredProviders,
    recommendations,
    getRecommendationsByCategory,
  };
}

