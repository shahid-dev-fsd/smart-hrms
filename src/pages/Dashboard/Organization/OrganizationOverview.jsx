import React, { useState } from "react";
import { Button, Grid, Tab, Tabs } from "@mui/material";
import { CompanyPreview, OrganizationQuickLinks } from "../../../components";
import { FaRegIdBadge } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GrTrophy } from "react-icons/gr";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import { PiUmbrellaBold } from "react-icons/pi";
import { MdOutlineTimer } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { IoBriefcaseOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default function OrganizationOverview() {
  const [switchScreen, setSwitchScreen] = useState({
    first: "services",
  });

  const handleSwitchScreen = (screen) => {
    setSwitchScreen(screen);
  };

  const tabs = [
    { label: "Services", value: "services" },
    { label: "Location", value: "location" },
  ];
  const currentTabIndex = tabs.findIndex(
    (tab) => tab.value === switchScreen.first
  );

  const handleTabChange = (event, newValue) => {
    const selectedTab = tabs[newValue];
    handleSwitchScreen({
      first: selectedTab.value,
    });
  };

  const options = [
    {
      label: "Onboarding",
      icon: (
        <>
          <FaRegIdBadge />
        </>
      ),
      link: "/onboarding",
    },
    {
      label: "Attendance",
      icon: (
        <>
          <FaRegCalendarAlt />
        </>
      ),
      link: "/Attendance",
    },
    {
      label: "Performance",
      icon: (
        <>
          <GrTrophy />
        </>
      ),
      link: "/Performance",
    },
    {
      label: "Employee Engagement",
      icon: (
        <>
          <FaArrowUpRightDots />
        </>
      ),
      link: "/EmployeeEngagement",
    },
    {
      label: "HR Letters",
      icon: (
        <>
          <FaRegStar />
        </>
      ),
      link: "/HRLetters",
    },
    {
      label: "Tasks",
      icon: (
        <>
          <FaTasks />
        </>
      ),
      link: "/Tasks",
    },
    {
      label: "General",
      icon: (
        <>
          <GrOrganization />
        </>
      ),
      link: "/General",
    },
    {
      label: "Leave Tracker",
      icon: (
        <>
          <PiUmbrellaBold />
        </>
      ),
      link: "/LeaveTracker",
    },
    {
      label: "Time Tracker",
      icon: (
        <>
          <MdOutlineTimer />
        </>
      ),
      link: "/TimeTracker",
    },
    {
      label: "Files",
      icon: (
        <>
          <FaRegFileAlt />
        </>
      ),
      link: "/Files",
    },
    {
      label: "Cases",
      icon: (
        <>
          <IoBriefcaseOutline />
        </>
      ),
      link: "/Cases",
    },
    {
      label: "Travel",
      icon: (
        <>
          <FaRegStar />
        </>
      ),
      link: "/Travel",
    },
    {
      label: "Compensation",
      icon: (
        <>
          <RiMoneyDollarCircleLine />
        </>
      ),
      link: "/Compensation",
    },
  ];

  return (
    <div className="w-full h-full flex gap-3 flex-row justify-between items-start">
      <div className="w-fit h-full flex gap-3 flex-col justify-center items-start">
        <CompanyPreview />
        <OrganizationQuickLinks />
      </div>
      <div className="w-full h-full flex gap-3 flex-col justify-center items-start">
        <Grid
          sx={{
            backgroundColor: "background.default",
          }}
          className="w-full flex flex-row  justify-between items-center"
        >
          <Tabs
            value={currentTabIndex}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="Navigation Tabs"
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </Grid>
        <div className="w-full h-full flex flex-col gap-3">
          {switchScreen.first === "services" ? (
            <>
              <div className="w-full h-full grid grid-cols-2 gap-3">
                {options.map((option) => {
                  return (
                    <>
                      <button
                        onClick={() => {
                          alert(option.link);
                        }}
                        className="w-full flex flex-row gap-3 justify-start items-center text-start p-4 rounded-lg border border-gray-800 cursor-pointer"
                      >
                        <div className="bg-blue-400 text-xl bg-opacity-10 rounded-lg p-2">
                          {option.icon}
                        </div>
                        <div>
                          <h1>{option.label}</h1>
                        </div>
                      </button>
                    </>
                  );
                })}
              </div>
            </>
          ) : (
            <></>
          )}
          {switchScreen.first === "location" ? (
            <>
              <div className="text-center p-4 rounded-lg border border-gray-800 cursor-pointer">
                <h1>No Location Found</h1>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
