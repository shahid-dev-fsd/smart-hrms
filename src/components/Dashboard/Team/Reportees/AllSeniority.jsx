import React from "react";
import Card from "./Card";

export default function AllSeniority() {
  return (
    <div
      className="w-full grid grid-cols-3 justify-center items-center  place-content-center
     place-items-center place-self-center"
    >
      <Card title={"0 - 5 Years"} />
      <Card title={"5 - 10 Years"} />
      <Card title={"Above 10 Years"} />
    </div>
  );
}
