import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";

import OrganizationFiles from "./OrganizationFiles";
import EmployeeFiles from "./EmployeeFiles";
import HRFormsAndTemplates from "./HRFormsAndTemplates";
import Folders from "./Folders";

export default function Files() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "organizationFiles",
  });

  const primaryTabs = [
    {
      label: "Organization Files",
      value: "organizationFiles",
    },
    {
      label: "Employee Files",
      value: "employeeFiles",
    },
    {
      label: "HR Forms & Templates",
      value: "hrFormsAndTemplates",
    },
    {
      label: "Folders",
      value: "folders",
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
      {switchScreen.primary === "organizationFiles" ? (
        <>
          <OrganizationFiles />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "employeeFiles" ? (
        <>
          <EmployeeFiles />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "hrFormsAndTemplates" ? (
        <>
          <HRFormsAndTemplates />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "folders" ? (
        <>
          <Folders />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
