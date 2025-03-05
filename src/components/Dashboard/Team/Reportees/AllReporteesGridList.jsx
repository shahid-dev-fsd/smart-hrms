import React from "react";
import Reportee from "./Reportee";

export default function AllReporteesGridList() {
  return (
    <div className="w-full grid gap-3 grid-cols-3 justify-center items-center place-content-center place-items-center place-self-center">
      <Reportee />
      <Reportee />
      <Reportee />
      <Reportee />
      <Reportee />
      <Reportee />
      <Reportee />
      <Reportee />
      <Reportee />
    </div>
  );
}
