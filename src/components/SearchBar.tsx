import React from 'react';
import { Search } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useAppStore();
  
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Buscar prestadores ou recomendações..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
      />
    </div>
  );
};
