import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";

import AppraisalCycle from "./AppraisalCycle/AppraisalCycle";
import ReviewExtension from "./ReviewExtension/ReviewExtension";

export default function Appraisal() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "appraisalCycle",
  });

  const primaryTabs = [
    {
      label: "Appraisal Cycle",
      value: "appraisalCycle",
    },
    {
      label: "Review Extension",
      value: "reviewExtension",
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
      {switchScreen.primary === "appraisalCycle" ? (
        <>
          <AppraisalCycle />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "reviewExtension" ? (
        <>
          <ReviewExtension />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
