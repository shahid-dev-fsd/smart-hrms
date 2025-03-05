import React, { useState } from "react";
import { Avatar, IconButton, Tabs, Tab } from "@mui/material";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import TimeLogs from "./TimeLogs";
import Timesheets from "./Timesheets";
import Jobs from "./Jobs";
import Projects from "./Projects";
import JobSchedule from "./JobSchedule";

export default function EmployeeTimeTrackerView({ back }) {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "timeLogs",
  });

  const primaryTabs = [
    {
      label: "Time Logs",
      value: "timeLogs",
    },
    {
      label: "Timesheets",
      value: "timesheets",
    },
    {
      label: "Jobs",
      value: "jobs",
    },
    {
      label: "Projects",
      value: "projects",
    },
    {
      label: "Job Schedule",
      value: "jobSchedule",
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center gap-3">
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
      {switchScreen.primary === "timeLogs" ? (
        <>
          <TimeLogs />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "timesheets" ? (
        <>
          <Timesheets />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "jobs" ? (
        <>
          <Jobs />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "projects" ? (
        <>
          <Projects />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "jobSchedule" ? (
        <>
          <JobSchedule />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
