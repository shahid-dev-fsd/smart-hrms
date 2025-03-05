import React, { useState } from "react";
import { VscThumbsup, VscThumbsdown } from "react-icons/vsc";
import { CiStar } from "react-icons/ci";
import { IoEyeOutline, IoTrophyOutline } from "react-icons/io5";
import Card from "./Card";

export default function ReceivedFeedback() {
  const [selectedCard, setSelectedCard] = useState("");

  const handleCardClick = (title) => {
    setSelectedCard(title);
  };

  return (
    <div className="w-full flex flex-row gap-3 justify-start items-center">
      <div onClick={() => handleCardClick("All Feedback")}>
        <Card
          type={"rating"}
          title={"All Feedback"}
          rating={0}
          selected={selectedCard === "All Feedback"}
        />
      </div>
      <div onClick={() => handleCardClick("Positive")}>
        <Card
          type={"rating"}
          title={"Positive"}
          icon={<VscThumbsup className="text-2xl m-1" />}
          rating={0}
          selected={selectedCard === "Positive"}
        />
      </div>
      <div onClick={() => handleCardClick("Negative")}>
        <Card
          type={"rating"}
          title={"Negative"}
          icon={<VscThumbsdown className="text-2xl m-1" />}
          rating={0}
          selected={selectedCard === "Negative"}
        />
      </div>
      <div onClick={() => handleCardClick("Training")}>
        <Card
          type={"rating"}
          title={"Training"}
          icon={<CiStar className="text-2xl m-1" />}
          rating={0}
          selected={selectedCard === "Training"}
        />
      </div>
      <div onClick={() => handleCardClick("Observation")}>
        <Card
          type={"rating"}
          title={"Observation"}
          icon={<IoEyeOutline className="text-2xl m-1" />}
          rating={0}
          selected={selectedCard === "Observation"}
        />
      </div>
      <div onClick={() => handleCardClick("Reward")}>
        <Card
          type={"rating"}
          title={"Reward"}
          icon={<IoTrophyOutline className="text-2xl m-1" />}
          rating={0}
          selected={selectedCard === "Reward"}
        />
      </div>
    </div>
  );
}
