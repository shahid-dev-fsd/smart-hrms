import React from "react";
import Reportee from "../../Team/Reportees/Reportee";

export default function EmployeesShift() {
  return (
    <div className="w-full flex gap-3 p-3 flex-col justify-start items-start">
      <div>
        <h1>
          Employees on <span className="text-blue-400">AM Shift</span>
        </h1>
      </div>
      <Reportee />
      <Reportee />
    </div>
  );
}
