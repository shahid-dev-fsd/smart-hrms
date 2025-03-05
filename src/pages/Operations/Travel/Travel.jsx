import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";

import TravelRequest from "./TravelRequest";
import TravelExpense from "./TravelExpense";
import CustomInputTable from "../../../components/CustomInputTable";

export default function Travel() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "travelrequest",
  });

  const primaryTabs = [
    {
      label: "Travel Request",
      value: "travelrequest",
    },
    {
      label: "Travel Expense",
      value: "travelexpense",
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
      {switchScreen.primary === "travelrequest" ? (
        <>
          <TravelRequest />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "travelexpense" ? (
        <>
          <TravelExpense />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
