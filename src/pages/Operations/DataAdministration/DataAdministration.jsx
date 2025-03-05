import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";

import ImportLog from "./ImportLog";
import ExportLog from "./ExportLog";
import ActivityLog from "./ActivityLog";
import RecycleBin from "./RecycleBin";

export default function DataAdministration() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "importLog",
  });

  const primaryTabs = [
    {
      label: "Import Log",
      value: "importLog",
    },
    {
      label: "Export Log",
      value: "exportLog",
    },
    {
      label: "Activity Log",
      value: "activityLog",
    },
    {
      label: "Recycle Bin",
      value: "recycleBin",
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
      {switchScreen.primary === "importLog" ? (
        <>
          <ImportLog />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "exportLog" ? (
        <>
          <ExportLog />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "activityLog" ? (
        <>
          <ActivityLog />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "recycleBin" ? (
        <>
          <RecycleBin />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
