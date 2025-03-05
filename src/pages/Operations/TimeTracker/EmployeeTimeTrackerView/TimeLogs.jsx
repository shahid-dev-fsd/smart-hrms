import React, { useState } from "react";
import {
  Button,
  Grid,
  Modal,
  Autocomplete,
  TextField,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  TableBody,
  IconButton,
  Menu,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoList } from "react-icons/io5";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiImport } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import CustomModal from "../../../../components/CustomModal";
import dayjs from "dayjs";
import {
  getToday,
  getYesterday,
  getThisWeek,
  getThisMonth,
  getLastWeek,
  getLastMonth,
} from "../../../../utilities/date";

export default function TimeLogs() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "tableView",
  });
  const [filterModal, setFilterModal] = useState(false);
  const handleFilterFormSubmit = (data) => {
    console.log("Form Data :- ", data);
  };
  const filterModalFields = [
    {
      type: "select",
      name: "period",
      label: "Period",
      options: [
        { label: "Today", value: getToday() },
        { label: "Yesterday", value: getYesterday() },
        { label: "This Week", value: getThisMonth() },
        { label: "This Month", value: getThisWeek() },
        { label: "Last Week", value: getLastWeek() },
        { label: "Last Month", value: getLastMonth() },
        { label: "Custom", value: "custom" },
      ],
      defaultValue: getToday(),
      custom: (formData, setFormData, field, index, handleChange) => {
        if (
          formData.period === "custom" ||
          (formData.period?.start && formData.period?.end)
        ) {
          return (
            <div className="w-full flex flex-row gap-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From"
                  sx={{ width: "100%" }}
                  value={
                    formData.period?.start ? dayjs(formData.period.start) : null
                  }
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      period: {
                        ...prev.period,
                        start: value,
                      },
                    }))
                  }
                  renderInput={(params) => (
                    <TextField {...params} fullWidth margin="normal" />
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="To"
                  sx={{ width: "100%" }}
                  value={
                    formData.period?.end ? dayjs(formData.period.end) : null
                  }
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      period: {
                        ...prev.period,
                        end: value,
                      },
                    }))
                  }
                  renderInput={(params) => (
                    <TextField {...params} fullWidth margin="normal" />
                  )}
                />
              </LocalizationProvider>
            </div>
          );
        }
        return null;
      },
    },
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
      type: "select",
      name: "period",
      label: "Period",
      options: [
        { label: "Today", value: "today" },
        { label: "This Week", value: "this-week" },
        { label: "This Month", value: "this-month" },
        { label: "Yesterday", value: "yesterday" },
        { label: "Last Week", value: "last-week" },
        { label: "Last Month", value: "last-month" },
      ],
      defaultValue: "today",
    },
    {
      type: "select",
      name: "billableStatus",
      label: "Billable Status",
      options: [
        { label: "All", value: "all" },
        { label: "Billable", value: "billable" },
        { label: "Non-billable", value: "non-billable" },
      ],
      defaultValue: "all",
    },
    {
      type: "select",
      name: "approvalStatus",
      label: "Approval Status",
      options: [
        { label: "All", value: "all" },
        { label: "Approved", value: "approved" },
        { label: "Unapproved", value: "unapproved" },
      ],
      defaultValue: "all",
    },
  ];

  const EmployeeLogTimeTableView = () => {
    const columns = [
      "Project Name",
      "Job Name",
      "Work Item",
      "Date",
      "Description",
      "Hours",
      "Billable Status",
    ];

    const data = [
      {
        projectName: "Hello",
        jobName: "Hello",
        workItem: "Hello",
        date: "Hello",
        description: "Hello",
        hours: "Hello",
        billableStatus: "Hello",
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
              <>
                <StyledTableRow>
                  <StyledTableCell>{row.projectName}</StyledTableCell>
                  <StyledTableCell>{row.jobName}</StyledTableCell>
                  <StyledTableCell>{row.workItem}</StyledTableCell>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                  <StyledTableCell>{row.hours}</StyledTableCell>
                  <StyledTableCell>{row.billableStatus}</StyledTableCell>
                  <StyledTableCell>
                    <div className="w-3 flex flex-row gap-2">
                      <IconButton>
                        <MdOutlineModeEdit />
                      </IconButton>
                      <IconButton>
                        <MdDeleteOutline />
                      </IconButton>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  const DailyLogTimeTableView = () => {
    const columns = [
      "Project Name",
      "Job Name",
      "Work Item",
      "Billable Status",
      "Description",
      "Hours",
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
            {data.map((row, index) => (
              <>
                <StyledTableRow>
                  <StyledTableCell>
                    <Autocomplete
                      sx={{ width: "200px" }}
                      disablePortal
                      options={["One", "Two"]}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Project Name"
                          placeholder="Project Name"
                        />
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Autocomplete
                      sx={{ width: "200px" }}
                      disablePortal
                      options={["One", "Two"]}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Job Name"
                          placeholder="Job Name"
                        />
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      variant="outlined"
                      label="Work Item"
                      placeholder="Work Item"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <FormControl sx={{ width: "200px" }}>
                      <InputLabel id="billable-status">
                        Billable Status
                      </InputLabel>
                      <Select
                        labelId="billable-status"
                        id="billable-status"
                        label="Billable Status"
                        onChange={() => {}}
                      >
                        <MenuItem value={"billable"}>Billable</MenuItem>
                        <MenuItem value={">nonBillable"}>Non Billable</MenuItem>
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      variant="outlined"
                      label="Description"
                      placeholder="Description"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "100%" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                </StyledTableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  const WeeklyLogTimeTableView = () => {
    const columns = [
      "Project Name",
      "Job Name",
      "Work Item",
      "Billable Status",
      "Description",
      "Dec 22 Sun",
      "Dec 23 Mon",
      "Dec 24 Tue",
      "Dec 25 Wed",
      "Dec 26 Thu",
      "Dec 27 Fri",
      "Dec 28 Sat",
      "Total Hours",
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
            {data.map((row, index) => (
              <>
                <StyledTableRow>
                  <StyledTableCell>
                    <Autocomplete
                      sx={{ width: "200px" }}
                      disablePortal
                      options={["One", "Two"]}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Project Name"
                          placeholder="Project Name"
                        />
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Autocomplete
                      sx={{ width: "200px" }}
                      disablePortal
                      options={["One", "Two"]}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Job Name"
                          placeholder="Job Name"
                        />
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      sx={{ minWidth: "200px" }}
                      variant="outlined"
                      label="Work Item"
                      placeholder="Work Item"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <FormControl sx={{ width: "200px" }}>
                      <InputLabel id="billable-status">
                        Billable Status
                      </InputLabel>
                      <Select
                        labelId="billable-status"
                        id="billable-status"
                        label="Billable Status"
                        onChange={() => {}}
                      >
                        <MenuItem value={"billable"}>Billable</MenuItem>
                        <MenuItem value={">nonBillable"}>Non Billable</MenuItem>
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      sx={{ minWidth: "200px" }}
                      variant="outlined"
                      label="Description"
                      placeholder="Description"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>00 : 00</StyledTableCell>
                </StyledTableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  const SemiMonthlyLogTimeTableView = () => {
    const columns = [
      "Project Name",
      "Job Name",
      "Work Item",
      "Billable Status",
      "Description",
      "Dec 01 Sun",
      "Dec 02 Mon",
      "Dec 03 Tue",
      "Dec 04 Wed",
      "Dec 05 Thu",
      "Dec 06 Fri",
      "Dec 07 Sat",
      "Dec 08 Sat",
      "Dec 09 Sat",
      "Dec 10 Sat",
      "Dec 11 Sat",
      "Dec 12 Sat",
      "Dec 13 Sat",
      "Dec 14 Sat",
      "Dec 15 Sat",
      "Total Hours",
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
            {data.map((row, index) => (
              <>
                <StyledTableRow>
                  <StyledTableCell>
                    <Autocomplete
                      sx={{ width: "200px" }}
                      disablePortal
                      options={["One", "Two"]}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Project Name"
                          placeholder="Project Name"
                        />
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Autocomplete
                      sx={{ width: "200px" }}
                      disablePortal
                      options={["One", "Two"]}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Job Name"
                          placeholder="Job Name"
                        />
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      sx={{ minWidth: "200px" }}
                      variant="outlined"
                      label="Work Item"
                      placeholder="Work Item"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <FormControl sx={{ width: "200px" }}>
                      <InputLabel id="billable-status">
                        Billable Status
                      </InputLabel>
                      <Select
                        labelId="billable-status"
                        id="billable-status"
                        label="Billable Status"
                        onChange={() => {}}
                      >
                        <MenuItem value={"billable"}>Billable</MenuItem>
                        <MenuItem value={">nonBillable"}>Non Billable</MenuItem>
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      sx={{ minWidth: "200px" }}
                      variant="outlined"
                      label="Description"
                      placeholder="Description"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>00 : 00</StyledTableCell>
                </StyledTableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  const MonthlyLogTimeTableView = () => {
    const columns = [
      "Project Name",
      "Job Name",
      "Work Item",
      "Billable Status",
      "Description",
      "Dec 01 Sun",
      "Dec 02 Mon",
      "Dec 03 Tue",
      "Dec 04 Wed",
      "Dec 05 Thu",
      "Dec 06 Fri",
      "Dec 07 Sat",
      "Dec 08 Sat",
      "Dec 09 Sat",
      "Dec 10 Sat",
      "Dec 11 Sat",
      "Dec 12 Sat",
      "Dec 13 Sat",
      "Dec 14 Sat",
      "Dec 15 Sat",
      "Dec 16 Sat",
      "Dec 17 Sat",
      "Dec 18 Sat",
      "Dec 19 Sat",
      "Dec 20 Sat",
      "Dec 21 Sat",
      "Dec 22 Sat",
      "Dec 23 Sat",
      "Dec 24 Sat",
      "Dec 25 Sat",
      "Dec 26 Sat",
      "Dec 27 Sat",
      "Dec 28 Sat",
      "Dec 29 Sat",
      "Dec 30 Sat",
      "Dec 31 Sat",
      "Total Hours",
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
            {data.map((row, index) => (
              <>
                <StyledTableRow>
                  <StyledTableCell>
                    <Autocomplete
                      sx={{ width: "200px" }}
                      disablePortal
                      options={["One", "Two"]}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Project Name"
                          placeholder="Project Name"
                        />
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Autocomplete
                      sx={{ width: "200px" }}
                      disablePortal
                      options={["One", "Two"]}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Job Name"
                          placeholder="Job Name"
                        />
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      sx={{ minWidth: "200px" }}
                      variant="outlined"
                      label="Work Item"
                      placeholder="Work Item"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <FormControl sx={{ width: "200px" }}>
                      <InputLabel id="billable-status">
                        Billable Status
                      </InputLabel>
                      <Select
                        labelId="billable-status"
                        id="billable-status"
                        label="Billable Status"
                        onChange={() => {}}
                      >
                        <MenuItem value={"billable"}>Billable</MenuItem>
                        <MenuItem value={">nonBillable"}>Non Billable</MenuItem>
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell>
                    <TextField
                      sx={{ minWidth: "200px" }}
                      variant="outlined"
                      label="Description"
                      placeholder="Description"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        sx={{ minWidth: "120px" }}
                        ampm={false}
                        label="Hour"
                      />
                    </LocalizationProvider>
                  </StyledTableCell>
                  <StyledTableCell>00 : 00</StyledTableCell>
                </StyledTableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  const [logsAnchor, setLogsAnchor] = useState(null);
  const isLogsMenu = Boolean(logsAnchor);

  const [logsModal, setLogsModal] = useState(false);
  const [multiLogsModal, setMultiLogsModal] = useState(false);

  const [hours, setHours] = useState("totalHours");

  const [selectedMultiLog, setSelectedMultiLog] = useState("dailyLog");

  const [checkedFields, setCheckedFields] = useState([]);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  return (
    <div className="w-full min-h-80 flex flex-col">
      <div className="w-full flex gap-1 justify-end items-center">
        {switchScreen.primary === "tableView" ? (
          <>
            <div>
              <Button
                id="logs"
                variant="contained"
                aria-controls={isLogsMenu ? "logs-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isLogsMenu ? "true" : undefined}
                onClick={(event) => {
                  setLogsAnchor(event.currentTarget);
                }}
              >
                Logs
              </Button>
              <Menu
                id="logs-menu"
                anchorEl={logsAnchor}
                open={isLogsMenu}
                onClose={(event) => {
                  setLogsAnchor(null);
                }}
                MenuListProps={{
                  "aria-labelledby": "logs",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                PaperProps={{
                  style: {
                    marginTop: "5px",
                  },
                }}
              >
                <MenuItem
                  onClick={(event) => {
                    setLogsModal(true);
                    setLogsAnchor(null);
                  }}
                >
                  Log Time
                </MenuItem>
                <MenuItem
                  onClick={(event) => {
                    setMultiLogsModal(true);
                    setLogsAnchor(null);
                  }}
                >
                  Daily Logs
                </MenuItem>
                <MenuItem
                  onClick={(event) => {
                    setMultiLogsModal(true);
                    setLogsAnchor(null);
                  }}
                >
                  Weekly Logs
                </MenuItem>
                <MenuItem
                  onClick={(event) => {
                    setMultiLogsModal(true);
                    setLogsAnchor(null);
                  }}
                >
                  Semi Monthly Logs
                </MenuItem>
                <MenuItem
                  onClick={(event) => {
                    setMultiLogsModal(true);
                    setLogsAnchor(null);
                  }}
                >
                  Monthly Logs
                </MenuItem>
              </Menu>
            </div>
          </>
        ) : (
          <></>
        )}

        <Button
          variant={
            switchScreen.primary === "tableView" ? "contained" : "outlined"
          }
          onClick={() => {
            setSwitchScreen({ primary: "tableView" });
          }}
          title="Table View"
        >
          <IoList className="text-2xl" />
        </Button>
        <Button
          variant={
            switchScreen.primary === "calendarView" ? "contained" : "outlined"
          }
          onClick={() => {
            setSwitchScreen({ primary: "calendarView" });
          }}
          title="Calendar View"
        >
          <IoCalendarOutline className="text-2xl" />
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
          </Menu>
        </div>
      </div>
      <div className="w-full">
        {switchScreen.primary === "tableView" ? (
          <>
            <EmployeeLogTimeTableView />
          </>
        ) : (
          <></>
        )}
        {switchScreen.primary === "calendarView" ? (
          <>
            <div className="w-full h-[60dvh] pt-3 overflow-scroll">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div>
        <CustomModal
          isScrollable={true}
          title="Filter"
          submitLabel="Apply"
          fields={filterModalFields}
          open={filterModal}
          onClose={() => {
            setFilterModal(false);
          }}
          onSubmit={handleFilterFormSubmit}
        />
      </div>
      <div>
        <Modal
          open={logsModal}
          onClose={() => {
            setLogsModal(false);
          }}
          aria-labelledby="logsModal"
          aria-describedby="logsModal"
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
              <h1>Log Time</h1>
            </div>
            <div>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="project-name">Project Name</InputLabel>
                <Select
                  labelId="project-name"
                  id="project-name"
                  label="Project Name"
                  onChange={() => {}}
                >
                  <MenuItem value={"all"}>All</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="job-name">Job Name</InputLabel>
                <Select
                  labelId="job-name"
                  id="job-name"
                  label="Project Name"
                  onChange={() => {}}
                >
                  <MenuItem value={"all"}>All</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                sx={{ width: "100%" }}
                label="Work Item"
                variant="outlined"
              />
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{ minWidth: "100%" }} label="Date" />
              </LocalizationProvider>
            </div>
            <div>
              <FormControl>
                <FormLabel id="hours">Hours</FormLabel>
                <RadioGroup
                  className="flex"
                  sx={{ flexDirection: "row" }}
                  aria-labelledby="hours"
                  defaultValue="totalHours"
                  name="hours"
                  onChange={(event) => {
                    setHours(event.target.value);
                  }}
                >
                  <FormControlLabel
                    value="totalHours"
                    control={<Radio />}
                    label="Total Hours"
                  />
                  <FormControlLabel
                    value="startTimeAndEndTime"
                    control={<Radio />}
                    label="Start Time and End Time"
                  />
                </RadioGroup>
              </FormControl>

              {hours === "totalHours" ? (
                <>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      sx={{ minWidth: "100%" }}
                      ampm={false}
                      label="Hour"
                    />
                  </LocalizationProvider>
                </>
              ) : (
                <></>
              )}
              {hours === "startTimeAndEndTime" ? (
                <div className="flex flex-row gap-3">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker sx={{ width: "50%" }} label="From" />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker sx={{ width: "50%" }} label="To" />
                  </LocalizationProvider>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="billable-status">Billable</InputLabel>
                <Select
                  labelId="billable-status"
                  id="billable-status"
                  label="Billable Status"
                  onChange={() => {}}
                >
                  <MenuItem value={"billable"}>Billable</MenuItem>
                  <MenuItem value={">nonBillable"}>Non Billable</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <Button
                sx={{ width: "100%", height: "50px" }}
                variant="outlined"
                component="label"
              >
                Upload File
                <input type="file" hidden />
              </Button>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <div>
                <Button variant="contained">Save</Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setLogsModal(false);
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
          open={multiLogsModal}
          onClose={() => {
            setMultiLogsModal(false);
          }}
          aria-labelledby="logsModal"
          aria-describedby="logsModal"
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
            className="w-3/4 p-4 flex flex-col gap-4 rounded-lg border border-gray-800"
          >
            <div>
              <h1>Multiple Logs Time</h1>
            </div>
            <div className="w-full flex justify-end">
              <FormControl sx={{ width: "200px" }}>
                <InputLabel id="logs">Logs</InputLabel>
                <Select
                  labelId="logs"
                  id="logs"
                  label="Logs"
                  value={selectedMultiLog}
                  onChange={(event) => {
                    setSelectedMultiLog(event.target.value);
                  }}
                >
                  <MenuItem value={"dailyLog"}>Daily Log</MenuItem>
                  <MenuItem value={"weeklyLog"}>Weekly Log</MenuItem>
                  <MenuItem value={"semiMonthlyLog"}>Semi Monthly Log</MenuItem>
                  <MenuItem value={"monthlyLog"}>Monthly Log</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="w-full">
              {selectedMultiLog === "dailyLog" ? (
                <>
                  <DailyLogTimeTableView />
                </>
              ) : (
                <></>
              )}
              {selectedMultiLog === "weeklyLog" ? (
                <>
                  <WeeklyLogTimeTableView />
                </>
              ) : (
                <></>
              )}
              {selectedMultiLog === "semiMonthlyLog" ? (
                <>
                  <SemiMonthlyLogTimeTableView />
                </>
              ) : (
                <></>
              )}
              {selectedMultiLog === "monthlyLog" ? (
                <>
                  <MonthlyLogTimeTableView />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="w-full flex gap-2 flex-row justify-start items-center">
              <Button variant="contained">Save</Button>
              <Button
                onClick={() => {
                  setMultiLogsModal(false);
                }}
                variant="outlined"
              >
                Reset
              </Button>
              <Button
                onClick={() => {
                  setMultiLogsModal(false);
                }}
                variant="outlined"
              >
                Cancel
              </Button>
            </div>
          </Grid>
        </Modal>
      </div>
    </div>
  );
}
