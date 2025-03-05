import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import UserSpecificOperations from "./UserSpecificOperations";
import Clients from "./Clients";
import Projects from "./Projects";
import Jobs from "./Jobs";
import JobSchedule from "./JobSchedule/JobSchedule";
import Timesheets from "./Timesheets";
import BillsAndInvoices from "./BillsAndInvoices";
import EmployeeWageRate from "./EmployeeWageRate";

export default function TimeTracker() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "userSpecificOperations",
  });
  const primaryTabs = [
    {
      label: "User Specific Operations",
      value: "userSpecificOperations",
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
      label: "Timesheets",
      value: "timesheets",
    },
    {
      label: "Job Schedule",
      value: "jobSchedule",
    },
    {
      label: "Clients",
      value: "clients",
    },
    {
      label: "Bills And Invoices",
      value: "billsAndInvoices",
    },
    {
      label: "Employee Wage Rate",
      value: "employeeWageRate",
    },
    {
      label: "Time Logs Import And Export",
      value: "timeLogsImportAndExport",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3 px-3 pb-3 rounded-lg border border-gray-800">
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
      {switchScreen.primary === "jobs" ? (
        <>
          <Jobs />
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
      {switchScreen.primary === "projects" ? (
        <>
          <Projects />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "clients" ? (
        <>
          <Clients />
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
      {switchScreen.primary === "billsAndInvoices" ? (
        <>
          <BillsAndInvoices />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "employeeWageRate" ? (
        <>
          <EmployeeWageRate />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
