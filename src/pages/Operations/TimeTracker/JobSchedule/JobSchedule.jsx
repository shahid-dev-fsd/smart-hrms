import React, { useRef, useState } from "react";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import { IoFilter } from "react-icons/io5";
import { MdFormatListBulleted } from "react-icons/md";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CustomModal from "../../../../components/CustomModal";
import DayView from "./DayView";
import WeekView from "./WeekView";
import dayjs from "dayjs";
import { CiExport, CiFolderOn, CiImport } from "react-icons/ci";
import { PiPrinterThin } from "react-icons/pi";
import { PiFilePdfThin } from "react-icons/pi";
import { HiDotsHorizontal } from "react-icons/hi";
import DateButton from "../../../../components/DateButton";

export default function JobSchedule() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "day",
  });
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const handleDateChange = ({ start, end }) => {
    setDateRange({ start, end });
  };
  const addProjectModalFields = [
    {
      type: "text",
      name: "projectName",
      label: "Project Name",
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "clientName",
      label: "Client Name",
      options: ["Client 1", "Client 2"],
      defaultValue: "",
    },
    {
      type: "text",
      name: "projectCost",
      label: "Project Cost",
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "projectHead",
      label: "Project Head",
      options: ["Project Head 1", "Project Head 2"],
      defaultValue: "",
    },
    {
      type: "text",
      name: "ratePerHour",
      label: "Rate Per Hour",
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "projectManager",
      label: "Project Manager",
      options: ["Project Manager 1", "Project Manager 2"],
      defaultValue: "",
    },
    {
      type: "text",
      name: "description",
      label: "Description",
      defaultValue: "",
    },
  ];
  const handleAddProjectFormSubmit = (data) => {
    console.log("Add Form :- ", data);
  };
  const [filterModal, setFilterModal] = useState(false);
  const [addProjectModal, setAddProjectModal] = useState(false);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const [filterFormValues, setFilterFormValues] = useState({
    fileName: "",
    dateFrom: null,
    dateTo: null,
  });

  const handleFilterFormChange = (name, value) => {
    setFilterFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Values: ", filterFormValues);
    setFilterModal(false);
  };

  const filterModalFields = [
    {
      type: "multipleSelect",
      name: "employee",
      label: "Employee",
      options: ["1", "2", "3"],
      defaultValue: "",
    },
    {
      type: "multipleSelect",
      name: "clients",
      label: "Clients",
      options: ["1", "2", "3"],
      defaultValue: "",
    },
    {
      type: "multipleSelect",
      name: "projects",
      label: "Projects",
      options: ["1", "2", "3"],
      defaultValue: "",
    },
    {
      type: "multipleSelect",
      name: "jobs",
      label: "Jobs",
      options: ["1", "2", "3"],
      defaultValue: "",
    },
    {
      type: "multipleSelect",
      name: "publishStatus",
      label: "Publish Status",
      options: ["1", "2", "3"],
      defaultValue: "",
    },
    {
      type: "multipleSelect",
      name: "Department",
      label: "Department",
      options: ["Department 1", "Department 2", "Department 3"],
      defaultValue: "",
    },
    {
      type: "multipleSelect",
      name: "Designation",
      label: "Designation",
      options: ["Designation 1", "Designation 2", "Designation 3"],
      defaultValue: "",
    },
  ];

  return (
    <div className="w-full h-fit flex flex-col gap-3">
      <div className="flex flex-row gap-3 justify-between items-center">
        <div className="w-full flex justify-center items-center">
          {switchScreen.primary === "day" ? (
            <>
              <div className="w-full flex gap-3 justify-center items-center">
                <DateButton mode="day" onDateChange={handleDateChange} />
              </div>
            </>
          ) : (
            <></>
          )}{" "}
          {switchScreen.primary === "week" ? (
            <>
              <div className="w-full flex gap-3 justify-center items-center">
                <DateButton mode="week" onDateChange={handleDateChange} />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-row gap-3 justify-center items-center text-nowrap">
          <Button
            title="Day"
            variant={switchScreen.primary === "day" ? "contained" : "outlined"}
            onClick={() => {
              setSwitchScreen({ primary: "day" });
            }}
          >
            <div className="text-1xl">Day</div>
          </Button>
          <Button
            title="Week"
            variant={switchScreen.primary === "week" ? "contained" : "outlined"}
            onClick={() => {
              setSwitchScreen({ primary: "week" });
            }}
          >
            <div className="text-1xl">Week</div>
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setAddProjectModal(true);
            }}
          >
            Add Project
          </Button>
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
              <MenuItem>
                <div className="flex flex-row gap-3 justify-between items-center">
                  <CiImport className="text-2xl" />
                  <h1>Import</h1>
                </div>
              </MenuItem>
              <MenuItem>
                <div className="flex flex-row gap-3 justify-between items-center">
                  <CiExport className="text-2xl" />
                  <h1>Export</h1>
                </div>
              </MenuItem>
              <MenuItem>
                <div className="flex flex-row gap-3 justify-between items-center">
                  <PiFilePdfThin className="text-2xl" />
                  <h1>Download as PDF</h1>
                </div>
              </MenuItem>
              <MenuItem>
                <div className="flex flex-row gap-3 justify-between items-center">
                  <PiPrinterThin className="text-2xl" />
                  <h1>Print</h1>
                </div>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      {switchScreen.primary === "day" ? (
        <>
          <DayView />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "week" ? (
        <>
          <WeekView />
        </>
      ) : (
        <></>
      )}
      <div>
        <CustomModal
          title="Filter"
          submitLabel="Apply"
          fields={filterModalFields}
          open={filterModal}
          onClose={() => {
            setFilterModal(false);
          }}
          isScrollable={true}
          onSubmit={handleFilterFormSubmit}
        />
      </div>
      <div>
        <CustomModal
          title="Add Project"
          fields={addProjectModalFields}
          open={addProjectModal}
          onClose={() => {
            setAddProjectModal(false);
          }}
          onSubmit={handleAddProjectFormSubmit}
          isScrollable={true}
          isCustomSubmitButtom={true}
          customSubmitButton={
            <div className="w-full flex flex-row justify-between items-center">
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button variant="contained" type="submit">
                Save Draft
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setAddProjectModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
}
