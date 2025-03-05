import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";

import ActiveCycles from "./ActiveCycles";
import CompletedCycles from "./CompletedCycles";

export default function AppraisalCycleData({ back }) {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "activeCycles",
  });

  const primaryTabs = [
    {
      label: "Active Cycles",
      value: "activeCycles",
    },
    {
      label: "Completed Cycles",
      value: "completedCycles",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-3">
      <div className="w-full flex justify-start items-center">
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
      {switchScreen.primary === "activeCycles" ? (
        <>
          <ActiveCycles />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "completedCycles" ? (
        <>
          <CompletedCycles />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
