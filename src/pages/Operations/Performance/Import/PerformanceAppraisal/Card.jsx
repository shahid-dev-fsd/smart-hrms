import React from "react";

export default function Card({ title, para }) {
  return (
    <div className="w-[25rem] flex flex-col gap-1">
      <div>
        <h1 className="text-orange-400">{title} :</h1>
      </div>
      <div>
        <p>{para}</p>
      </div>
    </div>
  );
}
