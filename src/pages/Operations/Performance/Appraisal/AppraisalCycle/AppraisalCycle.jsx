import React, { useState } from "react";
import { Tabs, Tab, Button, IconButton, TextField } from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import SelectAppraisalCycle from "./Select/SelectAppraisalCycle";

export default function AppraisalCycle() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "appraisalCycle",
  });

  const primaryTabs = [
    {
      label: "Appraisal Cycle 0",
      value: "appraisalCycle",
    },
    {
      label: "Completed Cycles 0",
      value: "completedCycles",
    },
  ];

  const [isSearch, setIsSearch] = useState(false);

  const [selectAppraisalCycleModal, setSelectAppraisalCycleModal] =
    useState(false);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-3">
      <div className="w-full flex justify-between items-center">
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
        <div className="flex flex-row gap-3 justify-center items-center">
          <Button
            onClick={() => {
              setSelectAppraisalCycleModal(true);
            }}
            variant="contained"
          >
            Select Appraisal Cycle
          </Button>

          {isSearch === true ? (
            <>
              <TextField
                sx={{ width: "200px", margin: 0, padding: 0 }}
                label="Search"
                variant="outlined"
              />
            </>
          ) : (
            <></>
          )}

          <IconButton
            onClick={() => {
              setIsSearch(!isSearch);
            }}
          >
            <IoIosSearch />
          </IconButton>
        </div>
      </div>
      {switchScreen.primary === "appraisalCycle" ? (
        <>
          <div className="w-full min-h-[30rem] flex flex-col justify-center items-center">
            <h1>No active appraisal cycles at the moment</h1>
          </div>
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "completedCycles" ? (
        <>
          <div className="w-full min-h-[30rem] flex flex-col justify-center items-center">
            <h1>No completed appraisal cycles at the moment</h1>
          </div>
        </>
      ) : (
        <></>
      )}

      <SelectAppraisalCycle
        open={selectAppraisalCycleModal}
        onClose={() => {
          setSelectAppraisalCycleModal(false);
        }}
        onSubmit={(event) => {
          event.preventDefault();
          console.log("Selected Appraisal Cycle Form Data :- ");
        }}
      />
    </div>
  );
}
