import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";

import UserSpecificOperations from "./UserSpecificOperations/UserSpecificOperations";
import Methods from "./Methods/Methods";
import Appraisal from "./Appraisal/Appraisal";
import Import from "./Import/Import";
import Export from "./Export/Export";
import KRA from "./KRA/KRA";
import Competency from "./Competency/Competency";
import SkillSet from "./SkillSet/SkillSet";

export default function Performance() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "userSpecificOperations",
  });
  const primaryTabs = [
    {
      label: "User Specific Operations",
      value: "userSpecificOperations",
    },

    {
      label: "Methods",
      value: "methods",
    },
    {
      label: "Appraisal",
      value: "appraisal",
    },
    {
      label: "Import",
      value: "import",
    },
    {
      label: "Export",
      value: "export",
    },
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
    <div className="w-full min-h-full h-fit flex flex-col gap-3 px-3 rounded-lg border border-neutral-700">
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
      {switchScreen.primary === "userSpecificOperations" ? (
        <>
          <UserSpecificOperations />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "methods" ? (
        <>
          <Methods />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "appraisal" ? (
        <>
          <Appraisal />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "import" ? (
        <>
          <Import />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "export" ? (
        <>
          <Export />
        </>
      ) : (
        <></>
      )}
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
