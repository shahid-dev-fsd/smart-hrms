import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import Employees from "./Employees";
import Departments from "./Departments";
import Designations from "./Designations";
import HRProcess from "./HRProcess";
import Groups from "./Groups";
import Delegation from "./Delegation";
import UserSpecificOperations from "./UserSpecificOperations";

export default function EmployeeInformation() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "userSpecificOperations",
  });
  const primaryTabs = [
    {
      label: "User Specific Operations",
      value: "userSpecificOperations",
    },
    {
      label: "Insights",
      value: "insights",
    },
    {
      label: "Employees",
      value: "employees",
    },
    {
      label: "Departments",
      value: "departments",
    },
    {
      label: "Designations",
      value: "designations",
    },
    {
      label: "HR Process",
      value: "hrProcess",
    },
    {
      label: "Groups",
      value: "groups",
    },
    {
      label: "Delegation",
      value: "delegation",
    },
  ];

  const handlePrimaryTabChange = (event, newValue) => {
    setSwitchScreen({ ...switchScreen, primary: newValue });
  };
  return (
    <div className="w-full flex flex-col gap-3 pb-3 px-3 rounded-lg border border-gray-800">
      <div>
        <Tabs value={switchScreen.primary} onChange={handlePrimaryTabChange}>
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
      {switchScreen.primary === "insights" ? (
        <>
          <div className="w-full h-[42.025rem] py-2 flex justify-center items-center ">
            No Insights Founded
          </div>
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "employees" ? (
        <>
          <Employees />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "departments" ? (
        <>
          <Departments />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "designations" ? (
        <>
          <Designations />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "hrProcess" ? (
        <>
          <HRProcess />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "groups" ? (
        <>
          <Groups />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "delegation" ? (
        <>
          <Delegation />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
