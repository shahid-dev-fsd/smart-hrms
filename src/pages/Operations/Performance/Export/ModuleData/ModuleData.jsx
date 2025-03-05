import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";

import KRA from "./KRA";
import Competency from "./Competency";
import SkillSet from "./SkillSet";

export default function ModuleData({ back }) {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "kra",
  });

  const primaryTabs = [
    {
      label: "KRA",
      value: "kra",
    },
    {
      label: "Competency",
      value: "competency",
    },
    {
      label: "Skill Set",
      value: "skillSet",
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
      {switchScreen.primary === "kra" ? (
        <>
          <KRA />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "competency" ? (
        <>
          <Competency />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "skillSet" ? (
        <>
          <SkillSet />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
