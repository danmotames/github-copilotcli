import React from 'react';
import { Recommendation } from '../types';
import { StarRating } from './ui/StarRating';
import { Avatar } from './ui/Avatar';
import { Badge } from './ui/Badge';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const RecommendationCard = ({ recommendation }: { recommendation: Recommendation }) => {
  const timeAgo = formatDistanceToNow(recommendation.createdAt, { locale: ptBR, addSuffix: true });
  
  return (
    <div className="card hoverable">
      <div className="flex items-start gap-4">
        <Avatar src={recommendation.user.avatar} name={recommendation.user.name} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900">{recommendation.user.name}</span>
            <span className="text-gray-500 text-sm">-</span>
            <span className="text-gray-500 text-sm">{timeAgo}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={recommendation.rating} size="sm" showValue />
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">{recommendation.provider.name}</h3>
          <p className="text-gray-600 mb-3 line-clamp-2">{recommendation.comment}</p>
          <div className="flex flex-wrap gap-2">
            {recommendation.tags.slice(0, 3).map((tag) => (<Badge key={tag} variant="info" size="sm">{tag}</Badge>))}
          </div>
        </div>
      </div>
    </div>
  );
};
