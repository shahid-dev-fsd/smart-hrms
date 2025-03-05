import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";

import Task from "./Task";
import Checklist from "./Checklist";

export default function Tasks() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "task",
  });

  const primaryTabs = [
    {
      label: "Task",
      value: "task",
    },
    {
      label: "Checklist",
      value: "checklist",
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
      {switchScreen.primary === "task" ? (
        <>
          <Task />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "checklist" ? (
        <>
          <Checklist />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
