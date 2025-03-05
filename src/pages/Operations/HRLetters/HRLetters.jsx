import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";

import AddressProof from "./AddressProof";
import BonafideLetter from "./BonafideLetter";
import ExperienceLetter from "./ExperienceLetter";

export default function HRLetters() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "addressProof",
  });

  const primaryTabs = [
    {
      label: "Address Proof",
      value: "addressProof",
    },
    {
      label: "Bonafide Letter",
      value: "bonafideLetter",
    },
    {
      label: "Experience Letter",
      value: "experienceLetter",
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
      {switchScreen.primary === "addressProof" ? (
        <>
          <AddressProof />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "bonafideLetter" ? (
        <>
          <BonafideLetter />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "experienceLetter" ? (
        <>
          <ExperienceLetter />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
