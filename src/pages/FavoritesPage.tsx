import React from 'react';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { ProviderCard } from '../components/ProviderCard';
import { mockProviders } from '../services/mockData';

export const FavoritesPage = () => {
  const favorites = mockProviders.filter(p => p.rating >= 4.5);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Favoritos" />
      
      <main className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};
