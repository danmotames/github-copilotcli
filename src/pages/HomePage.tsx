import React, { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { mockRecommendations, mockProviders } from '../services/mockData';
import { RecommendationCard } from '../components/RecommendationCard';
import { ProviderCard } from '../components/ProviderCard';
import { SearchBar } from '../components/SearchBar';
import { ServiceCategoryFilter } from '../components/ServiceCategoryFilter';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp } from 'lucide-react';

export const HomePage = () => {
  const { setRecommendations, setProviders, filteredRecommendations } = useAppStore();
  
  useEffect(() => {
    setRecommendations(mockRecommendations);
    setProviders(mockProviders);
  }, []);
  
  const featuredProviders = mockProviders
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  
  const recentRecommendations = filteredRecommendations
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="CondoServices" />
      
      <main className="p-4">
        {/* Search */}
        <div className="mb-6">
          <SearchBar />
        </div>
        
        {/* Category Filter */}
        <div className="mb-6">
          <ServiceCategoryFilter />
        </div>
        
        {/* Featured Providers */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              <TrendingUp className="inline w-5 h-5 mr-2" />
              Melhores Avaliados
            </h2>
            <Link to="/providers" className="text-sm text-primary-600 font-medium hover:text-primary-700">
              Ver todos
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4">
            {featuredProviders.map((provider) => (
              <div key={provider.id} className="flex-shrink-0 w-64">
                <ProviderCard provider={provider} />
              </div>
            ))}
          </div>
        </section>
        
        {/* Recent Recommendations */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              <Sparkles className="inline w-5 h-5 mr-2" />
              Recomendações Recentes
            </h2>
            <Link to="/recommendations" className="text-sm text-primary-600 font-medium hover:text-primary-700">
              Ver todas
            </Link>
          </div>
          <div className="space-y-4">
            {recentRecommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          </div>
        </section>
      </main>
      
      <Navigation />
    </div>
  );
};
