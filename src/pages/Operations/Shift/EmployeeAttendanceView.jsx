import React, { useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Grid,
  Modal,
  Autocomplete,
  TextField,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

export default function EmployeeAttendanceView({ back }) {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "monthlyView",
  });
  const [assignShiftModal, setAssignShiftModal] = useState(false);

  const shifts = ["General - 09:00 AM - 06:00 PM"];

  return (
    <div className="w-full flex flex-col gap-3 justify-center items-center">
      <div className="w-full h-fit flex flex-row gap-2 justify-between items-center ">
        <IconButton onClick={back}>
          <IoArrowBackCircleOutline className="text-2xl" />
        </IconButton>
        <div className="w-full flex flex-row gap-2 justify-start items-center">
          <div>
            <Avatar />
          </div>
          <div>
            <div>
              <h1>S10 - Lindon Smith</h1>
            </div>
            <div>
              <h1>Marketing</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 text-nowrap">
          <Button
            variant={`${
              switchScreen.primary === "weeklyView" ? "contained" : "outlined"
            }`}
            onClick={() => {
              setSwitchScreen({ primary: "weeklyView" });
            }}
            title="Weekly"
          >
            Weekly
          </Button>
          <Button
            variant={`${
              switchScreen.primary === "monthlyView" ? "contained" : "outlined"
            }`}
            onClick={() => {
              setSwitchScreen({ primary: "monthlyView" });
            }}
            title="Monthly"
          >
            Monthly
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setAssignShiftModal(true);
            }}
          >
            Assign Shift
          </Button>
        </div>
      </div>
      {switchScreen.primary === "monthlyView" ? (
        <>
          <div className="w-full h-[70dvh] overflow-scroll">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
            />
          </div>
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "weeklyView" ? (
        <>
          <div className="w-full h-[70dvh] overflow-scroll">
            <FullCalendar
              plugins={[timeGridPlugin]}
              initialView="timeGridWeek"
            />
          </div>
        </>
      ) : (
        <></>
      )}
      <Modal
        open={assignShiftModal}
        onClose={() => {
          setAssignShiftModal(false);
        }}
        aria-labelledby="checkInAndCheckOutEntryModal"
        aria-describedby="checkInAndCheckOutEntryModal"
      >
        <Grid
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "background.default",
            flexDirection: "column",
          }}
          className="w-1/2 p-4 flex flex-col gap-4 rounded-lg border border-gray-800"
        >
          <div>
            <h1>Assign Shift</h1>
          </div>
          <div className="w-full">
            <Autocomplete
              sx={{ width: "100%" }}
              disablePortal
              options={shifts}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Shifts"
                  placeholder="Shifts"
                />
              )}
              onChange={() => {
                setAssignShiftModal(true);
              }}
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className="w-full">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{ minWidth: "100%" }} label="From" />
              </LocalizationProvider>
            </div>
            <div className="w-full">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="w-full"
                  sx={{ minWidth: "100%" }}
                  label="To"
                />
              </LocalizationProvider>
            </div>
          </div>
          <div>
            <TextField
              sx={{ width: "100%" }}
              variant="outlined"
              label="Reason"
              placeholder="Reason"
            />
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <div>
              <Button variant="contained">Submit</Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  setAssignShiftModal(false);
                }}
                variant="outlined"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Grid>
      </Modal>
    </div>
  );
}
