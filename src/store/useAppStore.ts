import { create } from 'zustand';
import { ServiceCategory, Condominium, Recommendation, ServiceProvider, Notification } from '../types';

interface AppState {
  currentCondominium: Condominium | null;
  condominiums: Condominium[];
  recommendations: Recommendation[];
  providers: ServiceProvider[];
  notifications: Notification[];
  searchQuery: string;
  selectedCategory: ServiceCategory | null;
  isLoading: boolean;
  error: string | null;
}

interface AppActions {
  setCurrentCondominium: (condominium: Condominium | null) => void;
  setCondominiums: (condominiums: Condominium[]) => void;
  setRecommendations: (recommendations: Recommendation[]) => void;
  setProviders: (providers: ServiceProvider[]) => void;
  setNotifications: (notifications: Notification[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: ServiceCategory | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  addRecommendation: (recommendation: Recommendation) => void;
  updateRecommendation: (id: string, updates: Partial<Recommendation>) => void;
  deleteRecommendation: (id: string) => void;
  
  addProvider: (provider: ServiceProvider) => void;
  updateProvider: (id: string, updates: Partial<ServiceProvider>) => void;
  
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  
  resetFilters: () => void;
}

type AppStore = AppState & AppActions;

const initialState: AppState = {
  currentCondominium: null,
  condominiums: [],
  recommendations: [],
  providers: [],
  notifications: [],
  searchQuery: '',
  selectedCategory: null,
  isLoading: false,
  error: null,
};

export const useAppStore = create<AppStore>((set) => ({
  ...initialState,
  
  setCurrentCondominium: (condominium) => set({ currentCondominium: condominium }),
  
  setCondominiums: (condominiums) => set({ condominiums }),
  
  setRecommendations: (recommendations) => set({ recommendations }),
  
  setProviders: (providers) => set({ providers }),
  
  setNotifications: (notifications) => set({ notifications }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  addRecommendation: (recommendation) => 
    set((state) => ({ 
      recommendations: [recommendation, ...state.recommendations] 
    })),
  
  updateRecommendation: (id, updates) =>
    set((state) => ({
      recommendations: state.recommendations.map((rec) =>
        rec.id === id ? { ...rec, ...updates } : rec
      )
    })),
  
  deleteRecommendation: (id) =>
    set((state) => ({
      recommendations: state.recommendations.filter((rec) => rec.id !== id)
    })),
  
  addProvider: (provider) =>
    set((state) => ({ 
      providers: [provider, ...state.providers] 
    })),
  
  updateProvider: (id, updates) =>
    set((state) => ({
      providers: state.providers.map((provider) =>
        provider.id === id ? { ...provider, ...updates } : provider
      )
    })),
  
  addNotification: (notification) =>
    set((state) => ({ 
      notifications: [notification, ...state.notifications] 
    })),
  
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    })),
  
  resetFilters: () => set({ 
    searchQuery: '', 
    selectedCategory: null 
  }),
}));

// Seletores
export const selectCurrentCondominium = (state: AppStore) => state.currentCondominium;
export const selectCondominiums = (state: AppStore) => state.condominiums;
export const selectRecommendations = (state: AppStore) => state.recommendations;
export const selectProviders = (state: AppStore) => state.providers;
export const selectNotifications = (state: AppStore) => state.notifications;
export const selectSearchQuery = (state: AppStore) => state.searchQuery;
export const selectSelectedCategory = (state: AppStore) => state.selectedCategory;
export const selectIsLoading = (state: AppStore) => state.isLoading;
export const selectError = (state: AppStore) => state.error;

// Seletores computados
export const selectFilteredRecommendations = (state: AppStore) => {
  const { recommendations, searchQuery, selectedCategory } = state;
  
  return recommendations.filter((rec) => {
    const matchesSearch = searchQuery === '' || 
      rec.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === null || 
      rec.provider.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
};

export const selectUnreadNotifications = (state: AppStore) => 
  state.notifications.filter((n) => !n.read);

export const selectRecommendationsByUser = (state: AppStore, userId: string) => 
  state.recommendations.filter((rec) => rec.userId === userId);
