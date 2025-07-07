import React from 'react';

const RatingStars = ({ rating, size = 'md' }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  return (
    <div className={`flex ${sizeClasses[size]}`}>
      {[...Array(fullStars)].map((_, i) => (
        <i key={`full-${i}`} className="fas fa-star text-amber-400"></i>
      ))}
      {halfStar && <i className="fas fa-star-half-alt text-amber-400"></i>}
      {[...Array(emptyStars)].map((_, i) => (
        <i key={`empty-${i}`} className="far fa-star text-amber-400"></i>
      ))}
    </div>
  );
};

export default RatingStars;