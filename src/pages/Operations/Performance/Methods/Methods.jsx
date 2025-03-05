import React, { useState } from "react";
import { Avatar, IconButton, Tabs, Tab } from "@mui/material";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import KRA from "./KRA/KRA";
import Competency from "./Competency/Competency";
import SkillSet from "./SkillSet/SkillSet";
import ReviewQuestions from "./ReviewQuestions/ReviewQuestions";
import Summary from "./Summary/Summary";

export default function Methods({ back }) {
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
    {
      label: "Review Questions",
      value: "reviewQuestions",
    },
    {
      label: "Summary",
      value: "summary",
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
      {switchScreen.primary === "reviewQuestions" ? (
        <>
          <ReviewQuestions />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "summary" ? (
        <>
          <Summary />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
