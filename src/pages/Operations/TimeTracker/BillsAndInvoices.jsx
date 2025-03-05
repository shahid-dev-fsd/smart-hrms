import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CheckIcon from "@mui/icons-material/Check";
import CustomEmptyModal from "../../../components/CustomEmptyModal";
import {
  getToday,
  getYesterday,
  getThisWeek,
  getThisMonth,
  getLastWeek,
  getLastMonth,
} from "../../../utilities/date";

export default function BillsAndInvoices() {
  const [generateBillModal, setGenerateBillModal] = useState(false);

  const [generateBillPeriod, setGenerateBillPeriod] = useState("today");

  return (
    <div className="w-full h-[42rem] flex flex-col">
      <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
        <h1>No bills have been generated currently</h1>
        <h1>
          Generate bills for time logs to track budget spending and bill
          specific clients
        </h1>
        <Button
          onClick={() => {
            setGenerateBillModal(true);
          }}
          variant="contained"
        >
          Generate Bill
        </Button>
      </div>
      <CustomEmptyModal
        onClose={() => {
          setGenerateBillModal(false);
        }}
        open={generateBillModal}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setGenerateBillModal(false);
          }}
        >
          <div className="flex flex-col gap-6">
            <div>Generate Bill</div>
            <div className="flex flex-col gap-3">
              <div>
                <Autocomplete
                  sx={{ width: "100%" }}
                  multiple
                  options={["Client 1", "Client 2"]}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Client"
                      placeholder="Client"
                      name="clients"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-3">
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="">Period</InputLabel>
                  <Select
                    value={generateBillPeriod}
                    label="Period"
                    onChange={(event) => {
                      setGenerateBillPeriod(event.target.value);
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
                  {generateBillPeriod === "custom" ? (
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
                <Button type="submit" variant="contained">
                  Next
                </Button>
                <Button
                  onClick={() => {
                    setGenerateBillModal(false);
                  }}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CustomEmptyModal>
    </div>
  );
}
