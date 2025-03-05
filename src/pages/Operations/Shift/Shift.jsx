import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import UserSpecificOperations from "./UserSpecificOperations";
import ManageShifts from "./ManageShifts";
import EmployeeShiftMapping from "./EmployeeShiftMapping";

export default function Shift() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "userSpecificOperations",
  });
  const primaryTabs = [
    {
      label: "User Specific Operations",
      value: "userSpecificOperations",
    },
    {
      label: "Manage Shifts",
      value: "manageShifts",
    },
    {
      label: "Employee Shift Mapping",
      value: "employeeShiftMapping",
    },
  ];
  return (
    <div className="w-full flex flex-col gap-3 px-3 pb-3 rounded-lg border border-gray-800">
      <div>
        <Tabs
          value={switchScreen.primary}
          onChange={(event, newValue) => {
            setSwitchScreen({ ...switchScreen, primary: newValue });
          }}
        >
          {primaryTabs.map((tab, index) => (
            <Tab key={index} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </div>
      {switchScreen.primary === "userSpecificOperations" ? (
        <>
          <UserSpecificOperations />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "manageShifts" ? (
        <>
          <ManageShifts />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "employeeShiftMapping" ? (
        <>
          <EmployeeShiftMapping />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
