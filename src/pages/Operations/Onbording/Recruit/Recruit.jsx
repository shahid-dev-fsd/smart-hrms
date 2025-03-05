import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";

import Newreceivedapplication from "../../../ReceivedApp/Newreceivedapplication";
import JobListingHome from "../../../JobListing/JobListingHome";
import InterviewHome from "../../../Interview/interviewHome";

export default function Recruit() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "receivedapplications",
  });
  const primaryTabs = [
    {
      label: "Received Applications",
      value: "receivedapplications",
    },
    {
      label: "Job Listing",
      value: "jobListing",
    },
    {
      label: "Interview Questions",
      value: "interviewQuestions",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <Tabs
          value={switchScreen.primary}
          onChange={(event, newValue) => {
            setSwitchScreen({
              primary: newValue,
            });
          }}
        >
          {primaryTabs.map((tab, index) => (
            <Tab key={index} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </div>
      {switchScreen.primary === "receivedapplications" && (
        <>
          <Newreceivedapplication />
        </>
      )}
      {switchScreen.primary === "jobListing" && (
        <>
          <JobListingHome />
        </>
      )}
      {switchScreen.primary === "interviewQuestions" && (
        <>
          <InterviewHome />
        </>
      )}
    </div>
  );
}
