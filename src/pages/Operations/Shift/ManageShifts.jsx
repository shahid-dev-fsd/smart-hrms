import React, { useState } from "react";
import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  Grid,
  Modal,
  TableBody,
  Autocomplete,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { MdDeleteOutline } from "react-icons/md";
import { BsTrash3 } from "react-icons/bs";

export default function ManageShifts() {
  const ManageShiftsViewTable = () => {
    const columns = ["Shift Name", "Shift Time", "Delete"];
    const data = [
      {
        shiftName: "General",
        shiftTime: "09 : 00 AM - 06 : 00 PM",
      },
    ];
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
            {data.map((row, index) => (
              <StyledTableRow>
                <StyledTableCell>{row.shiftName}</StyledTableCell>
                <StyledTableCell>{row.shiftTime}</StyledTableCell>
                <StyledTableCell className="w-1">
                  <IconButton>
                    <BsTrash3 />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  const WeekendsAreBasedOnTableView = () => {
    const columns = ["Day", "All", "1st", "2nd", "3rd", "4th", "5th"];
    const week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
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
            {week.map((day, index) => {
              return data.map((row, index) => (
                <>
                  <StyledTableRow>
                    <StyledTableCell>{day}</StyledTableCell>
                    <StyledTableCell>
                      <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="" />
                      </FormGroup>
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="" />
                      </FormGroup>
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="" />
                      </FormGroup>
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="" />
                      </FormGroup>
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="" />
                      </FormGroup>
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="" />
                      </FormGroup>
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
  const [addShiftModal, setAddShiftModal] = useState(false);
  const [isProvideShiftAllowance, setIsProvideShiftAllowance] = useState(false);
  const [isApplicableTo, setIsApplicableTo] = useState(false);
  const [isWeekendsAreBasedOn, setIsWeekendsAreBasedOn] = useState(false);
  const applicables = ["Departments"];
  const departments = ["IT", "HR", "Marketing", "Management"];

  return (
    <div className="w-full min-h-80 flex flex-col items-center gap-1">
      <div className="w-full flex justify-end items-center">
        <Button
          onClick={() => {
            setAddShiftModal(true);
          }}
          variant="contained"
        >
          Add Shift
        </Button>
      </div>
      <div className="w-full">
        <ManageShiftsViewTable />
      </div>
      <div>
        <Modal
          open={addShiftModal}
          onClose={() => {
            setAddShiftModal(false);
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
            <div>
              <TextField
                sx={{ width: "100%" }}
                variant="outlined"
                label="Shift Name"
                placeholder="Shift Name"
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
              <FormControl>
                <FormLabel id="weekendsAreBasedOn">
                  Weekends are based on
                </FormLabel>
                <RadioGroup
                  className="flex flex-row"
                  aria-labelledby="weekendsAreBasedOn"
                  defaultValue="location"
                  onChange={(event) => {
                    if (event.target.value === "shift") {
                      setIsWeekendsAreBasedOn(true);
                    } else {
                      setIsWeekendsAreBasedOn(false);
                    }
                  }}
                  name="weekendsAreBasedOn"
                >
                  <FormControlLabel
                    value="location"
                    control={<Radio />}
                    label="Location"
                  />
                  <FormControlLabel
                    value="shift"
                    control={<Radio />}
                    label="Shift"
                  />
                </RadioGroup>
              </FormControl>
              {isWeekendsAreBasedOn === true ? (
                <div>
                  <div>
                    <h1>Define Weekend Days</h1>
                  </div>
                  <div>
                    <WeekendsAreBasedOnTableView />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Provide Shift Allowance"
                  onChange={() => {
                    setIsProvideShiftAllowance(!isProvideShiftAllowance);
                  }}
                />
              </FormGroup>
              {isProvideShiftAllowance === true ? (
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  label="Rate Per Day"
                  placeholder="Rate Per Day"
                />
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Applicable To</h1>
              </div>
              <div>
                {isApplicableTo === true ? (
                  <div className="h-fit flex flex-row gap-3 justify-start items-center">
                    <Autocomplete
                      sx={{ width: "100%" }}
                      disablePortal
                      options={applicables}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Applicables"
                          placeholder="Applicables"
                        />
                      )}
                    />
                    <div>
                      <h1>Is</h1>
                    </div>
                    <Autocomplete
                      sx={{ width: "100%" }}
                      disablePortal
                      options={departments}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Departments"
                          placeholder="Departments"
                        />
                      )}
                    />
                    <div>
                      <IconButton
                        onClick={() => {
                          setIsApplicableTo(false);
                        }}
                      >
                        <MdDeleteOutline />
                      </IconButton>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setIsApplicableTo(true);
                      }}
                      variant="outlined"
                    >
                      Add Criteria
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <div>
                <Button variant="contained">Submit</Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setAddShiftModal(false);
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
