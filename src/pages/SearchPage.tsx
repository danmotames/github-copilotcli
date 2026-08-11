import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { mockProviders, mockRecommendations } from '../services/mockData';
import { ProviderCard } from '../components/ProviderCard';
import { RecommendationCard } from '../components/RecommendationCard';
import { SearchBar } from '../components/SearchBar';
import { ServiceCategoryFilter } from '../components/ServiceCategoryFilter';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

export const SearchPage = () => {
  const { searchQuery, selectedCategory, filteredRecommendations } = useAppStore();
  const [activeTab, setActiveTab] = useState('providers');
  
  // Filter providers
  const filteredProviders = mockProviders.filter((provider) => {
    const matchesSearch = searchQuery === '' || 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || provider.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Buscar" />
      
      <main className="p-4">
        {/* Search */}
        <div className="mb-4">
          <SearchBar />
        </div>
        
        {/* Category Filter */}
        <div className="mb-6">
          <ServiceCategoryFilter />
        </div>
        
        {/* Results Tabs */}
        <Tabs defaultValue="providers" className="w-full">
          <TabsList className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <TabsTrigger 
              value="providers" 
              className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-500"
            >
              Prestadores ({filteredProviders.length})
            </TabsTrigger>
            <TabsTrigger 
              value="recommendations" 
              className="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-500"
            >
              Recomendações ({filteredRecommendations.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="providers" className="space-y-4">
            {filteredProviders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProviders.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Nenhum prestador encontrado</p>
                <p className="text-sm mt-1">Tente ajustar seus filtros</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-4">
            {filteredRecommendations.length > 0 ? (
              <div className="space-y-4">
                {filteredRecommendations.map((recommendation) => (
                  <RecommendationCard key={recommendation.id} recommendation={recommendation} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Nenhuma recomendação encontrada</p>
                <p className="text-sm mt-1">Tente ajustar seus filtros</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Navigation />
    </div>
  );
};
