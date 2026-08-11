import { create } from 'zustand';
import { User } from '../types';
import { mockUsers } from '../services/mockData';
interface AuthStore {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthStore>((set) => ({
  user: mockUsers[0],
  login: (u) => set({ user: u }),
  logout: () => set({ user: null }),
}));
