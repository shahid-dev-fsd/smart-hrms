import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import UserSpecificOperations from "./UserSpecificOperations";
import BiometricIDMapping from "./BiometricIDMapping";
import CheckInAndOutImportAndExport from "./CheckInAndOutImportAndExport";

export default function Attendance() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "userSpecificOperations",
  });
  const primaryTabs = [
    {
      label: "User Specific Operations",
      value: "userSpecificOperations",
    },
    {
      label: "Biometric ID mapping",
      value: "biometricIDmapping",
    },
    {
      label: "Check-in/out Import & Export",
      value: "checkInAndOutImportAndExport",
    },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-3 px-3 rounded-lg border border-neutral-700 overflow-hidden">
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
      {switchScreen.primary === "biometricIDmapping" ? (
        <>
          <BiometricIDMapping />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "checkInAndOutImportAndExport" ? (
        <>
          <CheckInAndOutImportAndExport />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
