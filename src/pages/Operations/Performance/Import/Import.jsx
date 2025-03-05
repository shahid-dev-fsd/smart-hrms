import React, { useState } from "react";
import { Avatar, IconButton, Tabs, Tab } from "@mui/material";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import PerformanceAppraisal from "./PerformanceAppraisal/PerformanceAppraisal";
import SelfAppraisal from "./SelfAppraisal/SelfAppraisal";
import SalaryHike from "./SalaryHike/SalaryHike";
import EmployeesKRA from "./EmployeesKRA/EmployeesKRA";
import EmployeesCompetency from "./EmployeesCompetency/EmployeesCompetency";
import SkillLevels from "./SkillLevels/SkillLevels";

export default function Methods({ back }) {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "performanceAppraisal",
  });

  const primaryTabs = [
    {
      label: "Performance Appraisal",
      value: "performanceAppraisal",
    },
    {
      label: "Self Appraisal",
      value: "selfAppraisal",
    },
    {
      label: "Salary Hike",
      value: "salaryHike",
    },
    {
      label: "Employee's KRA",
      value: "employeesKRA",
    },
    {
      label: "Employee's Competency",
      value: "employeesCompetency",
    },
    {
      label: "Skill Levels",
      value: "skillLevels",
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
      {switchScreen.primary === "performanceAppraisal" ? (
        <>
          <PerformanceAppraisal />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "selfAppraisal" ? (
        <>
          <SelfAppraisal />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "salaryHike" ? (
        <>
          <SalaryHike />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "employeesKRA" ? (
        <>
          <EmployeesKRA />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "employeesCompetency" ? (
        <>
          <EmployeesCompetency />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "skillLevels" ? (
        <>
          <SkillLevels />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
