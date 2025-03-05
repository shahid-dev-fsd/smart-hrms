import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";

import Candidate from "./Candidate/Candidate";
import TrackOnboarding from "./TrackOnboarding/TrackOnboarding";
import Recruit from "./Recruit/Recruit";

export default function Onboarding() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "trackOnboarding",
  });
  const primaryTabs = [
    {
      label: "Track Onboarding",
      value: "trackOnboarding",
    },
    {
      label: "Candidate",
      value: "candidate",
    },
    {
      label: "Recruit",
      value: "recruit",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-3 px-3 pb-3 rounded-lg border border-gray-800">
      <div>
        <Tabs
          value={switchScreen.primary}
          onChange={(event, newValue) => {
            setSwitchScreen({
              primary: newValue,
            });
          }}
        >
          {primaryTabs.map((tab, index) => (
            <Tab key={index} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </div>
      {switchScreen.primary === "trackOnboarding" && (
        <>
          <TrackOnboarding />
        </>
      )}
      {switchScreen.primary === "candidate" && (
        <>
          <Candidate />
        </>
      )}
      {switchScreen.primary === "recruit" && (
        <>
          <Recruit />
        </>
      )}
    </div>
  );
}
