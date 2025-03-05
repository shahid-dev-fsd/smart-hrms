import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";

import Metrics from "./Metrics/Metrics";
import QuestionPool from "./QuestionPool/QuestionPool";
import Templates from "./Templates/Templates";

export default function EmployeeEngagement({ back }) {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "metrics",
  });

  const primaryTabs = [
    {
      label: "Metrics",
      value: "metrics",
    },
    {
      label: "Templates",
      value: "templates",
    },
    {
      label: "Question Pool",
      value: "questionPool",
    },
  ];

  return (
    <div className="w-full min-h-full h-fit flex flex-col gap-3 px-3 rounded-lg border border-neutral-700">
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
      {switchScreen.primary === "metrics" ? (
        <>
          <Metrics />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "questionPool" ? (
        <>
          <QuestionPool />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "templates" ? (
        <>
          <Templates />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
