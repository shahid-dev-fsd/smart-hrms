import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  Grid,
  Modal,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CiViewTable } from "react-icons/ci";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaTrashAlt } from "react-icons/lia";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import axios from "axios";
import CustomTable from "../../../components/CustomTable";

export default function EmployeeAttendanceView({ back }) {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "tableView",
  });
  const [checkInAndCheckOutEntryModal, setCheckInAndCheckOutEntryModal] =
    useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    const response = await axios.get(`https://reqres.in/api/users`, {
      params: {
        page: 1,
        per_page: 10,
      },
    });
    setData(response.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    { accessorKey: "date", header: "Date", enableSorting: false },
    { accessorKey: "firstIn", header: "First In", enableSorting: false },
    { accessorKey: "lastOut", header: "Last Out", enableSorting: false },
    { accessorKey: "totalHours", header: "Total Hours", enableSorting: false },
    {
      accessorKey: "payableHours",
      header: "Payable Hours",
      enableSorting: false,
    },
    {
      accessorKey: "overtimeDeviation",
      header: "Overtime/Deviation",
      enableSorting: false,
    },
    { accessorKey: "status", header: "Status", enableSorting: false },
    { accessorKey: "shifts", header: "Shift(s)", enableSorting: false },
    {
      accessorKey: "regularization",
      header: "Regularization",
      enableSorting: false,
    },
    { accessorKey: "actions", header: "Actions", enableSorting: false }, // Assuming "Actions" is not sortable
  ];
  const renderActions = (row) => (
    <IconButton>
      <LiaTrashAlt />
    </IconButton>
  );

  return (
    <div className="w-full h-full flex flex-col gap-3 justify-start items-center">
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
        <div className="flex flex-row gap-2">
          <Button
            variant={`${
              switchScreen.primary === "tableView" ? "contained" : "outlined"
            }`}
            onClick={() => {
              setSwitchScreen({ primary: "tableView" });
            }}
            title="Table View"
          >
            <CiViewTable className="text-2xl" />
          </Button>
          <Button
            variant={`${
              switchScreen.primary === "calenderView" ? "contained" : "outlined"
            }`}
            onClick={() => {
              setSwitchScreen({ primary: "calenderView" });
            }}
            title="Calender View"
          >
            <IoCalendarOutline className="text-2xl" />
          </Button>
        </div>
      </div>
      {switchScreen.primary === "calenderView" ? (
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
      {switchScreen.primary === "tableView" ? (
        <div className="w-full h-[80%]">
          <CustomTable
            columns={columns}
            renderActions={renderActions}
            data={data}
            loading={loading}
            error={error}
            isPagination={false}
          />
        </div>
      ) : (
        <></>
      )}
      <Modal
        open={checkInAndCheckOutEntryModal}
        onClose={() => {
          setCheckInAndCheckOutEntryModal(false);
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
          className="w-fit p-4 flex flex-col gap-4 rounded-lg border border-gray-800"
        >
          <div>
            <h1>Add Entry</h1>
          </div>
          <div className="w-full">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker label="Clock In Time" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="w-full">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker label="Clock Out Time" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <div>
              <Button variant="contained">Submit</Button>
            </div>
            <div>
              <Button
                onClick={() => {
                  setCheckInAndCheckOutEntryModal(false);
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
