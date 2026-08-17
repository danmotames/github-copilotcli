import { create } from 'zustand';
import { ServiceProvider, Recommendation } from '../../core/types';
import { ServiceCategoryConfig } from '../../data/repositories/providerRepository';

interface AppState {
  providers: ServiceProvider[];
  recommendations: Recommendation[];
  categories: ServiceCategoryConfig[];
  isLoading: boolean;
  error: string | null;
  setProviders: (providers: ServiceProvider[]) => void;
  setRecommendations: (recommendations: Recommendation[]) => void;
  setCategories: (categories: ServiceCategoryConfig[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  providers: [],
  recommendations: [],
  categories: [],
  isLoading: false,
  error: null,
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  setProviders: (providers) => set({ providers }),
  setRecommendations: (recommendations) => set({ recommendations }),
  setCategories: (categories) => set({ categories }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
