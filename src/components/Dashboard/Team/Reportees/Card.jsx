import React from "react";

export default function Card({ title, number, datas }) {
  return (
    <div className="h-fit w-96 flex flex-col gap-3 p-3 justify-center rounded-lg border border-gray-800">
      <div className="w-full h-full flex flex-row justify-between items-center">
        <h1>{title}</h1>
        <h1>{number}</h1>
      </div>
      <div className="max-h-60 overflow-y-scroll flex flex-col gap-3 ">
        {datas?.map((data) => {
          return data;
        })}
      </div>
    </div>
  );
}
