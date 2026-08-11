import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { mockProviders } from '../services/mockData';
import { ProviderCard } from '../components/ProviderCard';
import { SearchBar } from '../components/SearchBar';
import { ServiceCategoryFilter } from '../components/ServiceCategoryFilter';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export const ProvidersPage = () => {
  const { searchQuery, selectedCategory, setProviders } = useAppStore();
  
  React.useEffect(() => {
    setProviders(mockProviders);
  }, []);
  
  const filteredProviders = mockProviders.filter((provider) => {
    const matchesSearch = searchQuery === '' || provider.name.toLowerCase().includes(searchQuery.toLowerCase()) || provider.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || provider.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Prestadores" />
      <main className="p-4">
        <div className="mb-4"><SearchBar /></div>
        <div className="mb-6"><ServiceCategoryFilter /></div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">{filteredProviders.length} prestadores</span>
          <Link to="/recommend" className="flex items-center gap-2 text-sm text-primary-600 font-medium"><Plus size={16} />Adicionar</Link>
        </div>
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProviders.map((provider) => (<ProviderCard key={provider.id} provider={provider} />))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>Nenhum prestador encontrado</p>
          </div>
        )}
      </main>
      <Navigation />
    </div>
  );
};
