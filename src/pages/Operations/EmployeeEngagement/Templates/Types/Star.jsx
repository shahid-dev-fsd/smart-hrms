import React, { useState } from "react";
import { LiaStarSolid } from "react-icons/lia";

const Star = ({ question, mode = "add", handleChange, value }) => {
  const [hoveredStar, setHoveredStar] = useState(null); // Track hovered star

  // Handle star click
  const handleStarClick = (starIndex) => {
    if (mode !== "view") {
      handleChange(starIndex + 1); // Update the selected value
    }
  };

  // Handle star hover
  const handleStarHover = (starIndex) => {
    if (mode !== "view") {
      setHoveredStar(starIndex); // Update the hovered star
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (mode !== "view") {
      setHoveredStar(null); // Reset hovered star
    }
  };

  return (
    <div className="w-full flex flex-row gap-3 justify-start items-center">
      {Array.from({ length: question?.max_count || 5 }, (_, index) => {
        // Determine if the star should be filled based on hover or selection
        const isFilled =
          (hoveredStar !== null && index <= hoveredStar) || // Hover effect
          (hoveredStar === null && value !== null && index < value); // Selected stars

        return (
          <LiaStarSolid
            key={index}
            className={`text-4xl transition-colors duration-200 ${
              isFilled
                ? "text-yellow-300 stroke-yellow-300" // Filled star color and yellow stroke
                : "text-transparent stroke-neutral-700" // Transparent fill and neutral stroke
            } ${
              mode === "view" ? "cursor-default" : "cursor-pointer"
            } stroke-2`} // Stroke width
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarHover(index)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default Star;
