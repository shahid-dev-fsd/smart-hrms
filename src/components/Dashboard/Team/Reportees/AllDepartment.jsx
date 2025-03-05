import React from "react";
import Card from "./Card";

export default function AllDepartment() {
  return (
    <div
      className="w-full grid grid-cols-3 justify-center items-center  place-content-center
     place-items-center place-self-center"
    >
      <Card title={"IT"} />
      <Card title={"Marketing"} />
      <Card title={"Management"} />
    </div>
  );
}
