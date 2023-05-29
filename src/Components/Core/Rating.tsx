import React from "react";

interface RatingProps {
  rating: number;
  maxRating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  if (!Number.isInteger(rating) || rating < 0) {
    throw new Error(
      "Invalid rating value. Rating should be a non-negative integer."
    );
  }

  const starIcons = Array(rating)
    .fill(null)
    .map((_, index) => {
      const starClassName =
        index < rating ? "text-yellow-500" : "text-gray-400";
      return (
        <span key={index} className={`text-2xl ${starClassName}`}>
          &#9733;
        </span>
      );
    });

  return <div className="flex">{starIcons}</div>;
};

export default Rating;
