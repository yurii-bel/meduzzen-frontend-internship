import React from "react";

interface RatingProps {
  rating: number;
  maxRating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const starIcons = Array(rating)
    .fill(null)
    .map((_, index) => {
      const starClassName = index < rating ? "star-filled" : "star-empty";
      return (
        <span key={index} className={`star-icon ${starClassName}`}>
          &#9733;
        </span>
      );
    });

  return <div className="rating">{starIcons}</div>;
};

export default Rating;
