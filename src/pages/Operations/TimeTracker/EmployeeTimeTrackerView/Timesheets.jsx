import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  TableBody,
  IconButton,
  Modal,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  Avatar,
  TextareaAutosize,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { MdDeleteOutline } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RiHistoryFill } from "react-icons/ri";
import CheckIcon from "@mui/icons-material/Check";
import CustomEmptyModal from "../../../../components/CustomEmptyModal";
import CustomModal from "../../../../components/CustomModal";
import {
  getToday,
  getYesterday,
  getThisWeek,
  getThisMonth,
  getLastWeek,
  getLastMonth,
} from "../../../../utilities/date";
import { LiaTrashAlt } from "react-icons/lia";
import CustomTable from "../../../../components/CustomTable";
import Pagination from "../../../../components/Pagination";
export default function Timesheets() {
  const [filterModal, setFilterModal] = useState(false);
  const [createTimesheetModal, setCreateTimesheetModal] = useState(false);
  const [editTimesheetModal, setEditTimesheetModal] = useState(false);
  const [auditHistoryModal, setAuditHistoryModal] = useState(false);

  const [createTimesheetPeriod, setCeateTimesheetPeriod] = useState("pending");

  const filterFields = [
    {
      type: "select",
      name: "period",
      label: "Period",
      options: [
        { label: "Today", value: getToday() },
        { label: "Yesterday", value: getYesterday() },
        { label: "This Week", value: getThisWeek() },
        { label: "This Month", value: getThisMonth() },
        { label: "Last Week", value: getLastWeek() },
        { label: "Last Month", value: getLastMonth() },
      ],
      defaultValue: getToday(),
    },
  ];

  const columns = [
    { label: "Timesheet Name", field: "timesheetName" },
    { label: "Employee", field: "employee" },
    { label: "Submitted Hours", field: "submittedHours" },
    { label: "Approved Hours", field: "approvedHours" },
    { label: "Status", field: "status" },
    { label: "Actions", field: "actions" },
  ];

  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const handleRowClick = (row) => {
    // setViewJobModal(true);
  };
  const renderActions = (row) => (
    <IconButton>
      <LiaTrashAlt />
    </IconButton>
  );
  const handleSort = (column, direction) => {
    fetchData(column, direction);
  };
  const fetchData = async (sortBy = "", sortOrder = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://reqres.in/api/users?page=${currentPage}&per_page=${limit}&${sortBy}=${sortOrder}`
      );
      const result = await response.json();
      if (result && result.data && result.total) {
        setData(result.data);
        setTotalItems(result.total);
      }
    } catch (error) {
      setError("Error Fetching Data.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, limit]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };
  const totalPages = Math.ceil(totalItems / limit);

  useEffect(() => {
    console.log(getToday());
    console.log(getYesterday());
    console.log(getThisWeek());
    console.log(getThisMonth());
    console.log(getLastWeek());
    console.log(getLastMonth());
  });

  return (
    <div className="w-full h-fit flex flex-col">
      <div className="w-full flex gap-3 justify-end items-center">
        <FormControl sx={{ width: "120px" }}>
          <InputLabel id="filter">Filter</InputLabel>
          <Select labelId="filter" id="filter" label="Filter">
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"draft"}>Draft</MenuItem>
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"approved"}>Approved</MenuItem>
            <MenuItem value={"rejected"}>Rejected</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={() => {
            setCreateTimesheetModal(true);
          }}
        >
          Create Timesheet
        </Button>
        <IconButton
          onClick={() => {
            setFilterModal(true);
          }}
          title="Filter"
        >
          <IoFilter />
        </IconButton>
      </div>
      {/* <div className="w-full h-full flex justify-center items-center">
        <h1>
          No timesheets found for the applied filters.To add new timesheets,
          click Create Timesheet
        </h1>
      </div> */}
      <div >
        <div className="h-[27.5rem] mt-1 overflow-scroll">
          <CustomTable
            columns={columns}
            onRowClick={handleRowClick}
            renderActions={renderActions}
            data={data}
            loading={loading}
            error={error}
            onSort={handleSort}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          limit={limit}
          onLimitChange={handleLimitChange}
        />
      </div>

      <CustomEmptyModal
        onClose={() => {
          setCreateTimesheetModal(false);
        }}
        open={createTimesheetModal}
      >
        <div className="flex flex-col gap-3">
          <div>Create Timesheet</div>
          <div className="flex flex-col gap-3">
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="period">Period</InputLabel>
              <Select
                labelId="period"
                id="period"
                value={createTimesheetPeriod}
                label="Period"
                onChange={(event) => {
                  setCeateTimesheetPeriod(event.target.value);
                }}
              >
                <MenuItem value={"today"}>Today</MenuItem>
                <MenuItem value={"thisWeek"}>This Week</MenuItem>
                <MenuItem value={"thisMonth"}>This Month</MenuItem>
                <MenuItem value={"yesterday"}>Yesterday</MenuItem>
                <MenuItem value={"lastWeek"}>Last Week</MenuItem>
                <MenuItem value={"lastMonth"}>Last Month</MenuItem>
                <MenuItem value={"custom"}>Custom</MenuItem>
              </Select>
            </FormControl>
            <div>
              {createTimesheetPeriod === "custom" ? (
                <div className="w-full flex flex-col gap-1">
                  <div>
                    <h1>Date Range</h1>
                  </div>
                  <div className="w-full flex flex-row gap-3">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker sx={{ width: "100%" }} label="From" />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker sx={{ width: "100%" }} label="To" />
                    </LocalizationProvider>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            <Autocomplete
              sx={{ width: "100%" }}
              multiple
              options={["Client 1", "Client 2"]}
              getOptionLabel={(option) => option}
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Clients"
                  placeholder="Clients"
                />
              )}
              renderOption={(props, option, { selected }) => (
                <MenuItem
                  {...props}
                  key={option}
                  value={option}
                  sx={{ justifyContent: "space-between" }}
                >
                  {option}
                  {selected ? <CheckIcon color="info" /> : null}
                </MenuItem>
              )}
            />
          </div>
          <div>
            <Autocomplete
              sx={{ width: "100%" }}
              multiple
              options={["Project 1", "Project 2"]}
              getOptionLabel={(option) => option}
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Projects"
                  placeholder="Projects"
                />
              )}
              renderOption={(props, option, { selected }) => (
                <MenuItem
                  {...props}
                  key={option}
                  value={option}
                  sx={{ justifyContent: "space-between" }}
                >
                  {option}
                  {selected ? <CheckIcon color="info" /> : null}
                </MenuItem>
              )}
            />
          </div>
          <div>
            <Autocomplete
              sx={{ width: "100%" }}
              multiple
              options={["Job 1", "Job 2"]}
              getOptionLabel={(option) => option}
              disableCloseOnSelect
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Jobs"
                  placeholder="Jobs"
                />
              )}
              renderOption={(props, option, { selected }) => (
                <MenuItem
                  {...props}
                  key={option}
                  value={option}
                  sx={{ justifyContent: "space-between" }}
                >
                  {option}
                  {selected ? <CheckIcon color="info" /> : null}
                </MenuItem>
              )}
            />
          </div>
          <div>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="billableStatus">Billable Status</InputLabel>
              <Select
                labelId="billableStatus"
                id="billableStatus"
                label="Billable Status"
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"billable"}>Billable</MenuItem>
                <MenuItem value={"nonBillable"}>Non Billable</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="w-full flex gap-2 flex-row justify-between items-center">
            <Button
              onClick={() => {
                setCreateTimesheetModal(false);
              }}
              variant="contained"
            >
              Next
            </Button>
            <Button
              onClick={() => {
                setCreateTimesheetModal(false);
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </div>
        </div>
      </CustomEmptyModal>
      <CustomModal
        title={"Filter"}
        onClose={() => {
          setFilterModal(false);
        }}
        fields={filterFields}
        open={filterModal}
        onSubmit={(data) => {
          console.log("Filter Data :- ", data);
        }}
      />
    </div>
  );
}
