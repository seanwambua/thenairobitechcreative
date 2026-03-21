'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

export function StarRating({ rating, setRating }: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={ratingValue}
            className={cn(
              'transition-colors',
              ratingValue <= (hover || rating)
                ? 'text-yellow-400'
                : 'text-gray-300'
            )}
            onClick={() => setRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        );
      })}
    </div>
  );
}
