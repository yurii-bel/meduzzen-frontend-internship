import React from "react";

interface RatingProps {
  rating: number;
  maxRating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const starIcons = [];

  for (let i = 1; i <= rating; i++) {
    const starClassName = i <= rating ? "star-filled" : "star-empty";
    starIcons.push(
      <span key={i} className={`star-icon ${starClassName}`}>
        &#9733;
      </span>
    );
  }

  return <div className="rating">{starIcons}</div>;
};

export default Rating;
