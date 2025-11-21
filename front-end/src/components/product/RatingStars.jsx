import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating, onRatingChange, interactive = false, size = 24 }) => {
  const [hoveredRating, setHoveredRating] = React.useState(0);

  const handleClick = (value) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    if (interactive) {
      setHoveredRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoveredRating(0);
    }
  };

  const displayRating = interactive ? (hoveredRating || rating) : rating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${
            star <= displayRating
              ? 'fill-[#FFAD33] text-[#FFAD33]'
              : 'fill-gray-300 text-gray-300'
          } ${interactive ? 'cursor-pointer transition-all hover:scale-110' : ''}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

export default RatingStars;
