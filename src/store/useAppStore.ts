import { create } from 'zustand';
import { Recommendation, ServiceProvider } from '../types';
interface AppStore {
  recommendations: Recommendation[];
  providers: ServiceProvider[];
  setRecommendations: (r: Recommendation[]) => void;
  setProviders: (p: ServiceProvider[]) => void;
}
export const useAppStore = create<AppStore>((set) => ({
  recommendations: [],
  providers: [],
  setRecommendations: (r) => set({ recommendations: r }),
  setProviders: (p) => set({ providers: p }),
}));
