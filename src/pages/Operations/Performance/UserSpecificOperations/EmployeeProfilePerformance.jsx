import React, { useState } from "react";
import { Avatar, IconButton, Tabs, Tab } from "@mui/material";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import KRA from "./KRA/KRA";
import Competency from "./Competency/Competency";
import SkillSet from "./SkillSet/SkillSet";
import Feedback from "./Feedback/Feedback";
import Summary from "./Summary/Summary";

export default function EmployeeTimeTrackerView({ back }) {
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
      label: "Feedback",
      value: "feedback",
    },
    {
      label: "Summary",
      value: "summary",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3">
      <div className="w-full h-fit flex flex-row gap-2 justify-between items-center ">
        <IconButton onClick={back}>
          <IoArrowBackCircleOutline className="text-2xl" />
        </IconButton>
        <div className="w-full h-fit flex flex-row gap-2 justify-start items-center">
          <div>
            <Avatar />
          </div>
          <div>
            <div>
              <h1>S10 - Lindon Smith</h1>
            </div>
            <div>
              <h1>Marketing</h1>
            </div>
          </div>
        </div>
      </div>
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
      {switchScreen.primary === "feedback" ? (
        <>
          <Feedback />
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
