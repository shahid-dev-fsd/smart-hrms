import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import ChecklistPending from "./ChecklistPending";
import ChecklistCompleted from "./ChecklistCompleted";

export default function Checklist() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "pending",
  });

  const primaryTabs = [
    {
      label: "Pending",
      value: "pending",
    },
    {
      label: "Completed",
      value: "completed",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3">
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
      {switchScreen.primary === "pending" ? (
        <>
          <ChecklistPending />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "completed" ? (
        <>
          <ChecklistCompleted />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
