'use client';

import { memo } from 'react';

import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  reviewCount?: number;
  className?: string;
}

const sizeClasses = {
  sm: { star: 'h-3 w-3', text: 'text-xs' },
  md: { star: 'h-4 w-4', text: 'text-sm' },
  lg: { star: 'h-5 w-5', text: 'text-base' },
};

export const StarRating = memo(function StarRating({
  rating,
  totalStars = 5,
  size = 'md',
  showCount = false,
  reviewCount = 0,
  className,
}: StarRatingProps) {
  const { star: starSizeClass, text: textSizeClass } = sizeClasses[size];
  const stars = [];

  // Create an array of stars (filled, half-filled, or empty)
  for (let i = 1; i <= totalStars; i++) {
    const difference = rating - i + 1;

    stars.push(
      <Star
        key={i}
        className={cn(starSizeClass, difference > 0 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300')}
      />,
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex">{stars}</div>
      {showCount && (
        <span className={cn('text-gray-500', textSizeClass)}>
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
});
