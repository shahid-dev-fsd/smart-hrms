import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import LeaveRequests from "./LeaveRequests";
import Holidays from "./Holidays";
import CustomizeBalance from "./CustomizeBalance";
import CustomizePolicy from "./CustomizePolicy";
import ExceptionalWorkingDays from "./ExceptionalWorkingDays";
import UserSpecificOperations from "./UserSpecificOperations";

export default function LeaveTracker() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "userSpecificOperations",
  });
  const primaryTabs = [
    {
      label: "User Specific Operations",
      value: "userSpecificOperations",
    },
    {
      label: "Leave Requests",
      value: "leaveRequests",
    },
    {
      label: "Holidays",
      value: "holidays",
    },
    {
      label: "Customize Balance",
      value: "customizeBalance",
    },
    {
      label: "Customize Policy",
      value: "customizePolicy",
    },
    {
      label: "Exceptional Working Days",
      value: "exceptionalWorkingDays",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3 px-3 rounded-lg border border-gray-800">
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
      {switchScreen.primary === "leaveRequests" ? (
        <>
          <LeaveRequests />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "holidays" ? (
        <>
          <Holidays />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "customizeBalance" ? (
        <>
          <CustomizeBalance />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "customizePolicy" ? (
        <>
          <CustomizePolicy />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "exceptionalWorkingDays" ? (
        <>
          <ExceptionalWorkingDays />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
