import React from "react";
import { MdOutlineCircle } from "react-icons/md";

const RatingScale = ({ question, mode = "add", handleChange, value }) => {
  // Predefined rating scale settings
  const ratingScaleSetting = {
    agreement_scale: {
      3: [
        {
          icon: "😡",
          label: "Disagree",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: "😐",
          label: "Neutral",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: "😃",
          label: "Agree",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
      5: [
        {
          icon: "😡",
          label: "Strongly Disagree",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: "😢",
          label: "Disagree",
          bg: "bg-red-300",
          border: "border-red-300",
        },
        {
          icon: "😐",
          label: "Neutral",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: "🙂",
          label: "Agree",
          bg: "bg-green-300",
          border: "border-green-300",
        },
        {
          icon: "😃",
          label: "Strongly Agree",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
      7: [
        {
          icon: "😡",
          label: "Strongly Disagree",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: "😢",
          label: "Disagree",
          bg: "bg-red-300",
          border: "border-red-300",
        },
        {
          icon: "☹️",
          label: "Somewhat Disagree",
          bg: "bg-yellow-100",
          border: "border-yellow-100",
        },
        {
          icon: "😐",
          label: "Neither Agree Nor Disagree",
          bg: "bg-yellow-300",
          border: "border-yellow-300",
        },
        {
          icon: "🙂",
          label: "Somewhat Agree",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: "😄",
          label: "Agree",
          bg: "bg-green-300",
          border: "border-green-300",
        },
        {
          icon: "😁",
          label: "Strongly Agree",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
    },
    satisfaction_scale: {
      3: [
        {
          icon: "😡",
          label: "Dissatisfied",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: "😐",
          label: "Neutral",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: "😃",
          label: "Satisfied",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
      5: [
        {
          icon: "😡",
          label: "Very Dissatisfied",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: "😢",
          label: "Dissatisfied",
          bg: "bg-red-300",
          border: "border-red-300",
        },
        {
          icon: "😐",
          label: "Neutral",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: "🙂",
          label: "Satisfied",
          bg: "bg-green-300",
          border: "border-green-300",
        },
        {
          icon: "😃",
          label: "Very Satisfied",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
      7: [
        {
          icon: "😡",
          label: "Very Dissatisfied",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: "😢",
          label: "Dissatisfied",
          bg: "bg-red-300",
          border: "border-red-300",
        },
        {
          icon: "☹️",
          label: "Somewhat Dissatisfied",
          bg: "bg-yellow-100",
          border: "border-yellow-100",
        },
        {
          icon: "😐",
          label: "Neutral",
          bg: "bg-yellow-300",
          border: "border-yellow-300",
        },
        {
          icon: "🙂",
          label: "Somewhat Satisfied",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: "😄",
          label: "Satisfied",
          bg: "bg-green-300",
          border: "border-green-300",
        },
        {
          icon: "😁",
          label: "Very Satisfied",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
    },
    frequency_scale: {
      3: [
        {
          icon: <MdOutlineCircle />,
          label: "Never",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Sometimes",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Always",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
      5: [
        {
          icon: <MdOutlineCircle />,
          label: "Never",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Rarely",
          bg: "bg-red-300",
          border: "border-red-300",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Sometimes",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Often",
          bg: "bg-green-300",
          border: "border-green-300",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Always",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
      7: [
        {
          icon: <MdOutlineCircle />,
          label: "Never",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Very Rarely",
          bg: "bg-red-300",
          border: "border-red-300",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Rarely",
          bg: "bg-yellow-100",
          border: "border-yellow-100",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Sometimes",
          bg: "bg-yellow-300",
          border: "border-yellow-300",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Often",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Very Often",
          bg: "bg-green-300",
          border: "border-green-300",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Always",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
    },
  };

  // Helper functions for dynamic colors
  const getBackgroundColor = (index, maxCount) => {
    if (maxCount === 3) {
      return index === 0
        ? "bg-red-500"
        : index === 1
        ? "bg-yellow-500"
        : "bg-green-500";
    } else if (maxCount === 5) {
      return index === 0
        ? "bg-red-500"
        : index === 1
        ? "bg-red-300"
        : index === 2
        ? "bg-yellow-500"
        : index === 3
        ? "bg-green-300"
        : "bg-green-500";
    } else if (maxCount === 7) {
      return index === 0
        ? "bg-red-500"
        : index === 1
        ? "bg-red-300"
        : index === 2
        ? "bg-yellow-100"
        : index === 3
        ? "bg-yellow-300"
        : index === 4
        ? "bg-yellow-500"
        : index === 5
        ? "bg-green-300"
        : "bg-green-500";
    }
    return "bg-neutral-800"; // Default background color
  };

  const getBorderColor = (index, maxCount) => {
    if (maxCount === 3) {
      return index === 0
        ? "border-red-500"
        : index === 1
        ? "border-yellow-500"
        : "border-green-500";
    } else if (maxCount === 5) {
      return index === 0
        ? "border-red-500"
        : index === 1
        ? "border-red-300"
        : index === 2
        ? "border-yellow-500"
        : index === 3
        ? "border-green-300"
        : "border-green-500";
    } else if (maxCount === 7) {
      return index === 0
        ? "border-red-500"
        : index === 1
        ? "border-red-300"
        : index === 2
        ? "border-yellow-100"
        : index === 3
        ? "border-yellow-300"
        : index === 4
        ? "border-yellow-500"
        : index === 5
        ? "border-green-300"
        : "border-green-500";
    }
    return "border-neutral-700"; // Default border color
  };

  // Get the scale options based on the scale type
  const scaleOptions =
    question?.scale_type === "custom"
      ? question?.customLabels?.map(({ label }, index) => ({
          icon: question?.icon_type === "number" ? index + 1 : "😐", // Use numbers or default emoji
          label,
          bg: getBackgroundColor(index, question?.max_count), // Dynamically assign background color
          border: getBorderColor(index, question?.max_count), // Dynamically assign border color
        }))
      : ratingScaleSetting[question?.scale_type]?.[question?.max_count];

  return (
    <div className="w-full">
      {/* Card View */}
      {question?.scale_view === "card" && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-start items-center text-white">
          {scaleOptions?.map(({ icon, label, bg, border }, index) => (
            <div
              key={index}
              className={`w-full h-[8rem] flex flex-col justify-between items-center rounded-lg border ${
                value === index + 1 ? border : "border-neutral-700"
              } ${value === index + 1 ? bg : "bg-transparent"} bg-opacity-25 ${
                mode === "view" ? "cursor-default" : "cursor-pointer"
              }`}
              onClick={() => mode !== "view" && handleChange(index + 1)}
            >
              <span className="h-full flex justify-center items-center text-3xl">
                {icon}
              </span>
              <h1 className="w-full flex justify-center items-center text-center p-2 h-full text-wrap rounded-b-lg bg-neutral-950">
                {label}
              </h1>
            </div>
          ))}
        </div>
      )}

      {/* Button View */}
      {question?.scale_view === "button" && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-start items-center">
          {scaleOptions?.map(({ icon, label, bg, border }, index) => (
            <div
              key={index}
              className={`flex flex-row gap-3 p-3 justify-center items-center border ${
                value === index + 1 ? border : "border-neutral-700"
              } rounded-lg ${
                value === index + 1 ? bg : "bg-transparent"
              } bg-opacity-25 ${
                mode === "view" ? "cursor-default" : "cursor-pointer"
              }`}
              onClick={() => mode !== "view" && handleChange(index + 1)}
            >
              <span className="text-2xl">{icon}</span>
              <h1 className="w-full truncate">{label}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatingScale;
