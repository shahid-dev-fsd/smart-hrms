import React from "react";

export default function Card({
  title,
  icon,
  rating,
  type = "rating",
  selected = false,
}) {
  return (
    <>
      {type === "display" ? (
        <>
          <div
            className={`w-32 h-20 p-3 flex flex-col justify-center items-center border cursor-pointer ${
              selected ? "border-blue-500" : "border-neutral-700"
            } rounded-lg`}
          >
            <h1>{title}</h1>
            {icon}
          </div>
        </>
      ) : (
        <>
          <div
            className={`w-32 h-20 p-3 flex flex-col justify-start items-center border cursor-pointer ${
              selected ? "border-blue-500" : "border-neutral-700"
            } rounded-lg`}
          >
            <div className="w-full flex justify-start">
              <h1>{title}</h1>
            </div>
            <div className="w-full flex flex-row gap-1 justify-start items-center">
              {icon}
              <h1>{rating}</h1>
            </div>
          </div>
        </>
      )}
    </>
  );
}
