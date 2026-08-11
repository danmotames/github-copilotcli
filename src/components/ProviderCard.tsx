import React from 'react';
import { ServiceProvider } from '../types';
import { StarRating } from './ui/StarRating';
import { Badge } from './ui/Badge';
import { serviceCategories } from '../services/mockData';

export const ProviderCard = ({ provider }: { provider: ServiceProvider }) => {
  const category = serviceCategories.find(c => c.value === provider.category);
  
  return (
    <div className="card hoverable">
      {provider.images && provider.images.length > 0 && (
        <div className="mb-4">
          <img 
            src={provider.images[0]} 
            alt={provider.name}
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      )}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{category?.icon}</span>
          <div>
            <h3 className="font-bold text-lg">{provider.name}</h3>
            <p className="text-sm text-gray-500">{category?.label}</p>
          </div>
        </div>
        <Badge variant="primary" size="sm">
          {provider.rating.toFixed(1)}
        </Badge>
      </div>
      <div className="mb-3">
        <StarRating rating={provider.rating} size="sm" reviewCount={provider.reviewCount} />
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{provider.description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{provider.phone}</span>
        {provider.recommendedBy.length > 0 && (
          <span>{provider.recommendedBy.length} recomenda{provider.recommendedBy.length > 1 ? 'ções' : 'ção'}</span>
        )}
      </div>
    </div>
  );
};
