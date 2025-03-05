import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import AllApprovals from "./AllApprovals";

export default function Approvals() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "allapprovals",
  });

  const primaryTabs = [
    {
      label: "All Approvals",
      value: "allapprovals",
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
      {switchScreen.primary === "allapprovals" ? (
        <>
          <AllApprovals />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
