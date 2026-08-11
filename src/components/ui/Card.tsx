import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'featured' | 'compact';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverable = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'bg-white rounded-xl transition-all duration-200';
  
  const variants = {
    default: 'shadow-md p-6',
    featured: 'shadow-lg p-6 border-2 border-primary-200',
    compact: 'shadow-sm p-4',
  };
  
  const hoverClasses = hoverable ? 'hover:shadow-lg hover:-translate-y-1' : '';
  
  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
