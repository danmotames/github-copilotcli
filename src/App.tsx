import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { RecommendPage } from './pages/RecommendPage';
import { ProvidersPage } from './pages/ProvidersPage';
import { ProfilePage } from './pages/ProfilePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { useAuthStore } from './store/useAuthStore';
import { mockUsers } from './services/mockData';

const queryClient = new QueryClient();

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, login } = useAuthStore();
  
  React.useEffect(() => {
    if (!user) {
      login(mockUsers[0]);
    }
  }, [user, login]);
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="/providers" element={<ProvidersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthWrapper>
    </QueryClientProvider>
  );
};

export default App;
