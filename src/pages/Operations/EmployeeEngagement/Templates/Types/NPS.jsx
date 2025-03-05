import React, { useState } from "react";

const NPS = ({ question, mode = "add", handleChange, value }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered index

  // Handle number click
  const handleNumberClick = (index) => {
    if (mode !== "view") {
      handleChange(index + 1); // Update the selected value
    }
  };

  // Handle number hover
  const handleNumberHover = (index) => {
    if (mode !== "view") {
      setHoveredIndex(index); // Update the hovered index
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (mode !== "view") {
      setHoveredIndex(null); // Reset hovered index
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex flex-row gap-3 justify-between items-center">
        {Array.from({ length: 10 }, (_, index) => {
          let borderColor = "";
          let bgColor = "";

          // Determine the color based on the index
          if (index >= 0 && index <= 5) {
            bgColor = "bg-red-500";
            borderColor = "border-red-500";
          } else if (index >= 6 && index <= 7) {
            bgColor = "bg-yellow-500";
            borderColor = "border-yellow-500";
          } else if (index >= 8 && index <= 9) {
            bgColor = "bg-green-500";
            borderColor = "border-green-500";
          }

          // Apply styles if the number is hovered or selected
          const isActive = hoveredIndex !== null
            ? index <= hoveredIndex // Apply to current and previous numbers on hover
            : value !== null && index < value; // Apply to selected numbers

          return (
            <div
              key={index}
              className={`w-12 h-12 flex justify-center items-center p-3 border rounded-lg transition-colors duration-200 ${
                isActive ? borderColor : "border-neutral-700"
              } ${isActive ? `${bgColor} bg-opacity-20` : "bg-transparent"} ${
                mode === "view" ? "cursor-default" : "cursor-pointer"
              }`}
              onClick={() => handleNumberClick(index)}
              onMouseEnter={() => handleNumberHover(index)}
              onMouseLeave={handleMouseLeave}
            >
              <h1>{index + 1}</h1>
            </div>
          );
        })}
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <h1>{question?.minscore_text}</h1>
        <h1>{question?.maxscore_text}</h1>
      </div>
    </div>
  );
};

export default NPS;