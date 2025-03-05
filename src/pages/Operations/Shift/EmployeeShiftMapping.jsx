import React, { useState } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  TableBody,
  IconButton,
  Button,
  Autocomplete,
  Grid,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { MdOutlineModeEdit } from "react-icons/md";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { IoFilter } from "react-icons/io5";

export default function EmployeeShiftMapping() {
  const DailyBasedEmployeeShiftMappingTableView = () => {
    const columns = [
      "Employee",
      "08 AM",
      "09 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "01 PM",
      "02 PM",
      "03 PM",
      "04 PM",
      "05 PM",
      "06 PM",
    ];
    const employees = ["1 - Steward Graham", "2 - Lilly Williams"];

    const data = [{}];

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    }));

    return (
      <TableContainer
        style={{ overflowX: "auto", marginTop: "8px" }}
        className="text-nowrap"
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} style={{ whiteSpace: "nowrap" }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => {
              return data.map((row, index) => (
                <>
                  <StyledTableRow>
                    <StyledTableCell>{employee}</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell colSpan={9}>
                      <div className="flex flex-row justify-between items-center bg-blue-300 rounded-lg bg-opacity-10 p-4">
                        <div>
                          <h1>General</h1>
                          <h1>09:00 AM - 06:00 PM</h1>
                        </div>
                        <div>
                          <IconButton>
                            <MdOutlineModeEdit />
                          </IconButton>
                        </div>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                </>
              ));
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  const WeeklyBasedEmployeeShiftMappingTableView = () => {
    const columns = [
      "Employee",
      "Sun 22",
      "Mon 23",
      "Tue 24",
      "Wed 25",
      "Thu 26",
      "Fri 27",
      "Sat 28",
    ];
    const employees = ["1 - Steward Graham", "2 - Lilly Williams"];

    const data = [{}];

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
      "&:last-child td, &:last-child th": {
        border: 0,
      },
    }));

    return (
      <TableContainer
        style={{ overflowX: "auto", marginTop: "8px" }}
        className="text-nowrap"
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} style={{ whiteSpace: "nowrap" }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => {
              return data.map((row, index) => (
                <>
                  <StyledTableRow>
                    <StyledTableCell>{employee}</StyledTableCell>
                    <StyledTableCell>
                      <div className="flex flex-row justify-between items-center bg-blue-300 rounded-lg bg-opacity-10 p-4">
                        <div>
                          <h1>General</h1>
                          <h1>09:00 AM - 06:00 PM</h1>
                        </div>
                        <div>
                          <IconButton>
                            <MdOutlineModeEdit />
                          </IconButton>
                        </div>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex flex-row justify-between items-center bg-blue-300 rounded-lg bg-opacity-10 p-4">
                        <div>
                          <h1>General</h1>
                          <h1>09:00 AM - 06:00 PM</h1>
                        </div>
                        <div>
                          <IconButton>
                            <MdOutlineModeEdit />
                          </IconButton>
                        </div>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex flex-row justify-between items-center bg-blue-300 rounded-lg bg-opacity-10 p-4">
                        <div>
                          <h1>General</h1>
                          <h1>09:00 AM - 06:00 PM</h1>
                        </div>
                        <div>
                          <IconButton>
                            <MdOutlineModeEdit />
                          </IconButton>
                        </div>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex flex-row justify-between items-center bg-blue-300 rounded-lg bg-opacity-10 p-4">
                        <div>
                          <h1>General</h1>
                          <h1>09:00 AM - 06:00 PM</h1>
                        </div>
                        <div>
                          <IconButton>
                            <MdOutlineModeEdit />
                          </IconButton>
                        </div>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex flex-row justify-between items-center bg-blue-300 rounded-lg bg-opacity-10 p-4">
                        <div>
                          <h1>General</h1>
                          <h1>09:00 AM - 06:00 PM</h1>
                        </div>
                        <div>
                          <IconButton>
                            <MdOutlineModeEdit />
                          </IconButton>
                        </div>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex flex-row justify-between items-center bg-blue-300 rounded-lg bg-opacity-10 p-4">
                        <div>
                          <h1>General</h1>
                          <h1>09:00 AM - 06:00 PM</h1>
                        </div>
                        <div>
                          <IconButton>
                            <MdOutlineModeEdit />
                          </IconButton>
                        </div>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>
                      <div className="flex flex-row justify-between items-center bg-blue-300 rounded-lg bg-opacity-10 p-4">
                        <div>
                          <h1>General</h1>
                          <h1>09:00 AM - 06:00 PM</h1>
                        </div>
                        <div>
                          <IconButton>
                            <MdOutlineModeEdit />
                          </IconButton>
                        </div>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                </>
              ));
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const [switchScreen, setSwitchScreen] = useState({
    primary: "weeklyView",
  });

  const [assignShiftModal, setAssignShiftModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const shifts = ["General - 09:00 AM - 06:00 PM"];
  const employees = ["S1 - Steward Graham", "S2 - Lilly Williams"];
  const departments = ["HR", "IT", "Marketing", "Management"];
  const designations = [
    "CEO",
    "Team Member",
    "Manager",
    "Administration",
    "Assistant Manager",
  ];

  return (
    <div className="w-full min-h-80 flex flex-col items-center gap-1">
      <div className="w-full flex flex-row gap-3 justify-end items-center">
        <Button
          variant={
            switchScreen.primary === "weeklyView" ? "contained" : "outlined"
          }
          onClick={() => {
            setSwitchScreen({ primary: "weeklyView" });
          }}
        >
          Weekly
        </Button>
        <Button
          variant={
            switchScreen.primary === "dailyView" ? "contained" : "outlined"
          }
          onClick={() => {
            setSwitchScreen({ primary: "dailyView" });
          }}
        >
          Daily
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setAssignShiftModal(true);
          }}
        >
          Assign Shift
        </Button>
        <IconButton
          onClick={() => {
            setFilterModal(true);
          }}
        >
          <IoFilter />
        </IconButton>
      </div>
      <div className="w-full">
        {switchScreen.primary === "weeklyView" ? (
          <>
            <WeeklyBasedEmployeeShiftMappingTableView />
          </>
        ) : (
          <></>
        )}
        {switchScreen.primary === "dailyView" ? (
          <>
            <DailyBasedEmployeeShiftMappingTableView />
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
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
      <div>
        <Modal
          open={filterModal}
          onClose={() => {
            setFilterModal(false);
          }}
          aria-labelledby="filterModal"
          aria-describedby="filterModal"
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
              <h1>Filter</h1>
            </div>
            <div>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="period">Period</InputLabel>
                <Select
                  labelId="period"
                  id="period"
                  value={"today"}
                  label="Period"
                >
                  <MenuItem value={"today"}>Today</MenuItem>
                  <MenuItem value={"yesterday"}>Yesterday</MenuItem>
                  <MenuItem value={"thisWeek"}>This Week</MenuItem>
                  <MenuItem value={"lastWeek"}>Last Week</MenuItem>
                  <MenuItem value={"thisMonth"}>This Month</MenuItem>
                  <MenuItem value={"lastMonth"}>Last Month</MenuItem>
                  <MenuItem value={"custom"}>Custom</MenuItem>
                </Select>
              </FormControl>
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
              <Autocomplete
                sx={{ width: "100%" }}
                multiple
                options={employees}
                getOptionLabel={(option) => option}
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Employees"
                    placeholder="Employees"
                  />
                )}
              />
            </div>
            <div>
              <Autocomplete
                sx={{ width: "100%" }}
                multiple
                options={departments}
                getOptionLabel={(option) => option}
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Departments"
                    placeholder="Departments"
                  />
                )}
              />
            </div>
            <div>
              <Autocomplete
                sx={{ width: "100%" }}
                multiple
                options={designations}
                getOptionLabel={(option) => option}
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Designations"
                    placeholder="Designations"
                  />
                )}
              />
            </div>
            <div>
              <Autocomplete
                sx={{ width: "100%" }}
                multiple
                options={shifts}
                getOptionLabel={(option) => option}
                disableCloseOnSelect
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Shifts"
                    placeholder="Shifts"
                  />
                )}
              />
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <div>
                <Button variant="contained">Submit</Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setFilterModal(false);
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
    </div>
  );
}
