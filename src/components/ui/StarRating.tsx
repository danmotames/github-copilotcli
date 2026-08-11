import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = false,
  reviewCount,
  interactive = false,
  onChange,
}) => {
  const sizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };
  
  const iconSize = sizes[size];
  
  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };
  
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, index) => {
          const filled = index < Math.floor(rating);
          const partial = index === Math.floor(rating) && rating % 1 !== 0;
          const fillPercentage = partial ? (rating % 1) * 100 : 0;
          
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(index)}
              disabled={!interactive}
              className={`relative ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
              aria-label={`Avaliar ${index + 1} de ${maxRating}`}
            >
              {/* Star background (empty) */}
              <Star 
                size={iconSize} 
                className="text-gray-300" 
                strokeWidth={1.5}
              />
              
              {/* Star fill */}
              <div 
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: filled ? '100%' : `${fillPercentage}%` }}
              >
                <Star 
                  size={iconSize} 
                  className="text-amber-400 fill-amber-400" 
                  strokeWidth={1.5}
                />
              </div>
            </button>
          );
        })}
      </div>
      
      {showValue && (
        <span className="text-sm text-gray-600 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
      
      {reviewCount !== undefined && (
        <span className="text-sm text-gray-500 ml-1">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
