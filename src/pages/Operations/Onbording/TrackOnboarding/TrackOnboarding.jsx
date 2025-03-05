import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoFilter } from "react-icons/io5";
import dayjs from "dayjs";

import CustomModal from "../../../../components/CustomModal";

export default function TrackOnboarding() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "all",
  });
  const primaryTabs = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Onboarding",
      value: "onboarding",
    },
    {
      label: "Onboarding In Progress",
      value: "onboardingInProgress",
    },
  ];

  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const [filterModal, setFilterModal] = useState(false);
  const filterFields = [
    {
      type: "text",
      label: "Employee Name",
      name: "employeeName",
      defaultValue: "",
    },
    {
      type: "autocomplete",
      label: "Onboarding Status",
      name: "onboardingStatus",
      options: [
        {
          label: "Onboarding Status 1",
          value: "onboarding_status_1",
        },
        {
          label: "Onboarding Status 2",
          value: "onboarding_status_2",
        },
      ],
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "Date Of Joining",
      name: "dateOfJoining",
      defaultValue: dayjs(),
    },
    {
      type: "autocomplete",
      label: "Designation",
      name: "designation",
      options: [
        {
          label: "Designation 1",
          value: "designation_1",
        },
        {
          label: "Designation 2",
          value: "designation_2",
        },
      ],
      defaultValue: "",
    },
    {
      type: "autocomplete",
      label: "Clikkle HR",
      name: "clikkleHR",
      options: [
        {
          label: "Clikkle HR 1",
          value: "clikkle_hr_1",
        },
        {
          label: "Clikkle HR 2",
          value: "clikkle_hr_2",
        },
      ],
      defaultValue: "",
    },
    {
      type: "autocomplete",
      label: "Department",
      name: "department",
      options: [
        {
          label: "Department 1",
          value: "department_1",
        },
        {
          label: "Department 2",
          value: "department_2",
        },
      ],
      defaultValue: "",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full flex flex-row justify-between items-center'">
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
        <div className="flex flex-row gap-3 justify-center items-center">
          <IconButton
            onClick={() => {
              setFilterModal(true);
            }}
          >
            <IoFilter />
          </IconButton>
          <div>
            <IconButton
              id="basic-button"
              aria-controls={isMenuopen ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={isMenuopen ? "true" : undefined}
              onClick={(event) => {
                setMenuAnchor(event.currentTarget);
              }}
            >
              <HiDotsHorizontal className="text-2xl" />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={menuAnchor}
              open={isMenuopen}
              onClose={() => {
                setMenuAnchor(null);
              }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => {}}>CSV</MenuItem>
              <MenuItem onClick={() => {}}>XLS</MenuItem>
              <MenuItem onClick={() => {}}>XLSX</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      {switchScreen.primary === "all" && (
        <div className="w-full min-h-80 py-2 flex justify-center items-center">
          No All Record Found
        </div>
      )}
      {switchScreen.primary === "onboarding" && (
        <div className="w-full min-h-80 py-2 flex justify-center items-center">
          No Onboarding Record Found
        </div>
      )}
      {switchScreen.primary === "onboardingInProgress" && (
        <div className="w-full min-h-80 py-2 flex justify-center items-center">
          No Onboarding In Progress Record Found
        </div>
      )}

      <CustomModal
        title={"Filter"}
        fields={filterFields}
        open={filterModal}
        onClose={() => [setFilterModal(false)]}
        onSubmit={(formData, setFormData) => {
          console.log("Filter Form Data :- ", formData);
        }}
      />
    </div>
  );
}
