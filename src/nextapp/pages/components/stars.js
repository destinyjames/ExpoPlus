import React, { useState } from 'react';

const DEFAULT_COUNT = 5;
const DEFAULT_ICON = "★";
const DEFAULT_UNSELECTED_COLOR = "grey";
const DEFAULT_COLOR = "gold";

const StarRating = ({ count, defaultRating, icon, color, iconSize, userName, projectId }) => {
  const [rating, setRating] = useState(defaultRating);
  const [temporaryRating, setTemporaryRating] = useState(0);

  const handleClick = async (newRating) => {
    setRating(newRating); // Update local component state

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NGROK_URL}/api/ratings`, { // Adjust the URL based on your environment
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'any-value', // This can be any value according to your source

          // Include authorization header if required, example:
          // 'Authorization': `Bearer ${yourAuthToken}`
        },
        body: JSON.stringify({
          username: userName ,
          project_id: projectId,
          rating: newRating
        })
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Rating updated successfully:', data);
        // Optionally, you could trigger a state update or callback to reflect the change in your UI
      } else {
        throw new Error(data.error || 'An error occurred while updating the rating.');
      }
    } catch (error) {
      console.error('Error updating rating:', error);
      // Handle error feedback to the user here
    }
  };

  return (
    <div className="starsContainer">
      {Array.from({ length: count || DEFAULT_COUNT }, (_, index) => (
        <span
          className="star"
          key={index}
          style={{
            fontSize: iconSize ? `${iconSize}px` : "24px",
            color: (index < (rating || temporaryRating)) ? (color || DEFAULT_COLOR) : DEFAULT_UNSELECTED_COLOR,
            filter: `${index < (rating || temporaryRating) ? "grayscale(0%)" : "grayscale(100%)"}`,
            cursor: 'pointer',
            transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out'
          }}
          onMouseEnter={() => setTemporaryRating(index + 1)}
          onMouseLeave={() => setTemporaryRating(0)}
          onClick={() => handleClick(index + 1)}
        >
          {icon || DEFAULT_ICON}
        </span>
      ))}
    </div>
  );
};

export default StarRating;


