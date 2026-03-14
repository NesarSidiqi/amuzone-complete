// ShopWave – StarRating Component

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  showCount?: boolean;
}

export default function StarRating({ rating, reviewCount, size = 14, showCount = true }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rating);
          const partial = !filled && star === Math.ceil(rating) && rating % 1 > 0;
          return (
            <span key={star} className="relative inline-block" style={{ width: size, height: size }}>
              <Star size={size} className="text-gray-200 fill-gray-200" />
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? "100%" : `${(rating % 1) * 100}%` }}
                >
                  <Star size={size} className="text-amber-400 fill-amber-400" />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-sm text-gray-500 font-body">
          {rating.toFixed(1)} ({reviewCount.toLocaleString()} reviews)
        </span>
      )}
    </div>
  );
}
