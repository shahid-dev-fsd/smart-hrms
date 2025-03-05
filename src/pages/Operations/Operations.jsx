import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import { FaRegAddressCard } from "react-icons/fa6";
import { GoOrganization } from "react-icons/go";
import { PiUmbrella } from "react-icons/pi";
import { LuCalendarCheck } from "react-icons/lu";
import { MdOutlineFilterTiltShift } from "react-icons/md";
import { MdOutlineTimer } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { GoFileDirectory } from "react-icons/go";
import { FaRegHandshake } from "react-icons/fa6";
import { SlEnvolopeLetter } from "react-icons/sl";
import { CiPaperplane } from "react-icons/ci";
import { BsListTask } from "react-icons/bs";
import { FaRegSquareCheck } from "react-icons/fa6";
import { LuDatabase } from "react-icons/lu";

import Onboarding from "./Onbording/Onboarding";
import EmployeeInformation from "./EmployeeInformation/EmployeeInformation";
import LeaveTracker from "./LeaveTracker/LeaveTracker";
import Attendance from "./Attendance/Attendance";
import Shift from "./Shift/Shift";
import TimeTracker from "./TimeTracker/TimeTracker";
import Files from "./Files/Files";
import HRLetters from "./HRLetters/HRLetters";
import Tasks from "./Tasks/Tasks";
import Travel from "./Travel/Travel";
import DataAdministration from "./DataAdministration/DataAdministration";
import Approvals from "./Approvals/Approvals";
import General from "./General/General";
import Performance from "./Performance/Performance";
import EmployeeEngagement from "./EmployeeEngagement/EmployeeEngagement";

export default function Operations() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: null,
  });

  const buttons = [
    {
      label: "Onboarding",
      icon: (
        <>
          <FaRegAddressCard />
        </>
      ),
      value: "onboarding",
    },
    {
      label: "Employee Information",
      icon: (
        <>
          <GoOrganization />
        </>
      ),
      value: "employeeInformation",
    },
    {
      label: "Leave Tracker",
      icon: (
        <>
          <PiUmbrella />
        </>
      ),
      value: "leaveTracker",
    },
    {
      label: "Attendance",
      icon: (
        <>
          <LuCalendarCheck />
        </>
      ),
      value: "attendance",
    },
    {
      label: "Shift",
      icon: (
        <>
          <MdOutlineFilterTiltShift />
        </>
      ),
      value: "shift",
    },
    {
      label: "Time Tracker",
      icon: (
        <>
          <MdOutlineTimer />
        </>
      ),
      value: "timeTracker",
    },
    {
      label: "Performance",
      icon: (
        <>
          <SlGraph />
        </>
      ),
      value: "performance",
    },
    {
      label: "Files",
      icon: (
        <>
          <GoFileDirectory />
        </>
      ),
      value: "files",
    },
    {
      label: "Employee Engagement",
      icon: (
        <>
          <FaRegHandshake />
        </>
      ),
      value: "employeeEngagement",
    },
    {
      label: "HR Letters",
      icon: (
        <>
          <SlEnvolopeLetter />
        </>
      ),
      value: "hrLetters",
    },
    {
      label: "Travel",
      icon: (
        <>
          <CiPaperplane />
        </>
      ),
      value: "travel",
    },
    {
      label: "Tasks",
      icon: (
        <>
          <BsListTask />
        </>
      ),
      value: "tasks",
    },
    {
      label: "General",
      icon: (
        <>
          <GoOrganization />
        </>
      ),
      value: "general",
    },
    {
      label: "Approvals",
      icon: (
        <>
          <FaRegSquareCheck />
        </>
      ),
      value: "approvals",
    },
    {
      label: "Data Administration",
      icon: (
        <>
          <LuDatabase />
        </>
      ),
      value: "dataAdministration",
    },
  ];

  useEffect(() => {
    console.log(switchScreen);
  }, [switchScreen]);

  function Card({ label, value, icon }) {
    const navigate = useNavigate();
    return (
      <button
        onClick={() => {
          if (value === "onboarding") {
            navigate(value);
            return;
          }
          setSwitchScreen({ primary: value });
        }}
        className="w-40 h-32 p-2 flex gap-3 flex-col justify-center items-center rounded-lg border border-neutral-700"
      >
        <div className="text-2xl">{icon}</div>
        <div>
          <h1>{label}</h1>
        </div>
      </button>
    );
  }

  return (
    <div className="w-full h-full flex px-2 py-2 flex-col items-start">
      <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 justify-center items-center place-self-center place-content-center place-items-center">
        {switchScreen.primary === null
          ? buttons.map((button, index) => (
              <Card
                key={index}
                label={button.label}
                value={button.value}
                icon={button.icon}
              />
            ))
          : null}
      </div>
      <div className="w-full h-full flex flex-col gap-1 items-start justify-start">
        <div className="flex flex-row items-center gap-1">
          {switchScreen.primary != null ? (
            <>
              <IconButton
                onClick={() => {
                  setSwitchScreen({ primary: null });
                }}
              >
                <IoArrowBackCircleOutline className="text-2xl" />
              </IconButton>
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "onboarding" ? (
            <>
              <h1>Onbording</h1>
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "employeeInformation" ? (
            <>
              <h1>Employee Information</h1>
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "leaveTracker" ? (
            <>
              <h1>Leave Tracker</h1>
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "attendance" ? (
            <>
              <h1>Attendance</h1>
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "shift" ? (
            <>
              <h1>Shift</h1>
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "timeTracker" ? (
            <>
              <h1>Time Tracker</h1>
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "files" ? (
            <>
              <h1>Files</h1>
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "hrLetters" ? (
            <>
              <h1>HR Letters</h1>
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "tasks" ? (
            <>
              <h1>Tasks</h1>
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "travel" ? (
            <>
              <h1>Travel</h1>
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "dataAdministration" ? (
            <>
              <h1>Data Administration</h1>
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "approvals" ? (
            <>
              <h1>Approvals</h1>
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "general" ? (
            <>
              <h1>General</h1>
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "performance" ? (
            <>
              <h1>Performance</h1>
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "employeeEngagement" ? (
            <>
              <h1>Employee Engagement</h1>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full h-full">
          {switchScreen.primary === "onboarding" ? (
            <>
              <Onboarding />
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "employeeInformation" ? (
            <>
              <EmployeeInformation />
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "leaveTracker" ? (
            <>
              <LeaveTracker />
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "attendance" ? (
            <>
              <Attendance />
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "shift" ? (
            <>
              <Shift />
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "timeTracker" ? (
            <>
              <TimeTracker />
            </>
          ) : (
            <></>
          )}

          {switchScreen.primary === "files" ? (
            <>
              <Files />
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "hrLetters" ? (
            <>
              <HRLetters />
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "tasks" ? (
            <>
              <Tasks />
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "travel" ? (
            <>
              <Travel />
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "dataAdministration" ? (
            <>
              <DataAdministration />
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "approvals" ? (
            <>
              <Approvals />
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "general" ? (
            <>
              <General />
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "performance" ? (
            <>
              <Performance />
            </>
          ) : (
            <></>
          )}
          {switchScreen.primary === "employeeEngagement" ? (
            <>
              <EmployeeEngagement />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
