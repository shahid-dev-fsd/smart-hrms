import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";

import Location from "./Location";
import Department from "./Department";

export default function OrganizationFiles() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "location",
  });

  const primaryTabs = [
    {
      label: "Location",
      value: "location",
    },
    {
      label: "Department",
      value: "department",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3 ">
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
      {switchScreen.primary === "location" ? (
        <>
          <Location />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "department" ? (
        <>
          <Department />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
