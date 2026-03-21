'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
  disabled?: boolean;
}

export function StarRating({ rating, setRating, disabled = false }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-6 w-6 cursor-pointer',
            (hoverRating >= star || rating >= star) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground',
            disabled ? 'cursor-not-allowed opacity-50' : ''
          )}
          onMouseEnter={() => !disabled && setHoverRating(star)}
          onMouseLeave={() => !disabled && setHoverRating(0)}
          onClick={() => !disabled && setRating(star)}
        />
      ))}
    </div>
  );
}
