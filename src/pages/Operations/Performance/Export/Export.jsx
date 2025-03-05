import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";

import AppraisalCycleData from "./AppraisalCycleData/AppraisalCycleData";
import SalaryHikeCycleData from "./SalaryHikeCycleData/SalaryHikeCycleData";
import ModuleData from "./ModuleData/ModuleData";

export default function Export({ back }) {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "appraisalCycleData",
  });

  const primaryTabs = [
    {
      label: "Appraisal Cycle Data",
      value: "appraisalCycleData",
    },
    {
      label: "Salary Hike Cycle Data",
      value: "salaryHikeCycleData",
    },
    {
      label: "Module Data",
      value: "moduleData",
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
      {switchScreen.primary === "appraisalCycleData" ? (
        <>
          <AppraisalCycleData />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "salaryHikeCycleData" ? (
        <>
          <SalaryHikeCycleData />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "moduleData" ? (
        <>
          <ModuleData />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
