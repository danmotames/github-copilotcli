import React from 'react';
import { serviceCategories } from '../services/mockData';
import { useAppStore } from '../store/useAppStore';

export const ServiceCategoryFilter = () => {
  const { selectedCategory, setSelectedCategory, resetFilters } = useAppStore();
  
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
      <button onClick={() => resetFilters()} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === null ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200'}`}>Todos</button>
      {serviceCategories.map((category) => (<button key={category.value} onClick={() => setSelectedCategory(category.value)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === category.value ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200'}`}><span className="mr-1">{category.icon}</span>{category.label}</button>))}
    </div>
  );
};
