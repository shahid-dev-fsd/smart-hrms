import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Modal,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  FormControlLabel,
  Menu,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { IoFilter } from "react-icons/io5";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiImport } from "react-icons/ci";
import { LiaTrashAlt } from "react-icons/lia";
import CustomTable from "../../../components/CustomTable";
import Pagination from "../../../components/Pagination";
import dayjs from "dayjs";
import CustomModal from "../../../components/CustomModal";

export default function AllApprovals() {
  const [filterModal, setFilterModal] = useState(false);
  const [addRecordModal, setAddRecordModal] = useState(false);
  const [editRecordModal, setEditRecordModal] = useState(false);
  const [viewRecordModal, setViewRecordModal] = useState(false);

  const fields = [
    {
      field: "employeeID",
      label: "EmployeeID",
    },
    {
      field: "travelID",
      label: "TravelID",
    },
    {
      field: "employeeDepartment",
      label: "Employee Department",
    },
    {
      field: "placeOfVisit",
      label: "Place of visit",
    },
    {
      field: "expectedDateOfDeparture",
      label: "Expected date of departure",
    },
    {
      field: "purposeOfVisit",
      label: "Purpose of visit",
    },
    {
      field: "expectedDurationInDays",
      label: "Expected duration in days",
    },
    {
      field: "ExpectedDateOfArrival",
      label: "Expected date of arrival",
    },
    {
      field: "isBillableToCustomer",
      label: "Is billable to customer",
    },
    {
      field: "customerName",
      label: "Customer name",
    },
    {
      field: "addedBy",
      label: "Added By",
    },
    {
      field: "addedTime",
      label: "Added Time",
    },
    {
      field: "modifiedBy",
      label: "Modified By",
    },
    {
      field: "modifiedTime",
      label: "Modified Time",
    },
  ];
  const [filterFormValues, setFilterFormValues] = useState({
    approver: [],
    record_owner: [],
    forms: [],
    status: [],
    employeeStatus: "allRequests",
  });
  const handleFilterFormChange = (name, value) => {
    setFilterFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleFilterValueChange = (field, condition, value) => {
    setFilterFormValues((prev) => ({
      ...prev,
      filterFields: prev.filterFields.map((item) =>
        item.field === field ? { ...item, condition, value } : item
      ),
    }));
  };

  // const handleFilterFormSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Filter Data :- ", filterFormValues);
  //   setFilterModal(false);
  // };

  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const handleRowClick = (row) => {
    setViewRecordModal(true);
  };

  const filterModalFields = [
    {
      type: "autocomplete",
      name: "approver",
      label: "Approver",
      options: ["Approver 1", "Approver 2"],
      defaultValue: "",
    },
    {
      type: "select",
      name: "recordOwner",
      label: "Record Owner",
      options: [
        { label: "All Users", value: "allUsers" },
        { label: "Record Owner 1", value: "Record Owner 1" },
      ],
      defaultValue: "allUsers",
    },
    {
      type: "autocomplete",
      name: "forms",
      label: "Forms",
      options: ["Forms 1", "Forms 2"],
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "status",
      label: "Status",
      options: ["Status 1", "Status 2"],
      defaultValue: "Status 1",
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "employeeStatus",
      label: "Employee Status",
      options: ["Employee Status 1", "Employee Status 2"],
      defaultValue: "",
      disabled: (formData) => {
        if (formData.recordOwner === "allUsers") {
          formData.employeeStatus = "";
          return true;
        } else {
          return false;
        }
      },
    },
  ];
  const handleFilterFormSubmit = (data) => {
    console.log("Filter Form :- ", data);
  };

  return (
    <div className="w-full h-[42rem] flex flex-col">
      <div className="w-full flex gap-3 justify-end items-center">
        <IconButton
          onClick={() => {
            setFilterModal(true);
          }}
          title="Filter"
        >
          <IoFilter />
        </IconButton>
        <Button
          variant="text"
          onClick={() => {
            console.log("reset clicked");
          }}
        >
          Reset
        </Button>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <h1>
          There are no results that fit your criteria. Please revise your
          filters.
        </h1>
      </div>
      {/* <CustomModal
        title="Filter"
        open={filterModal}
        onClose={() => setFilterModal(false)}
        // onSubmit={handleFilterFormSubmit}
        isScrollable={true}
      >
        <form onSubmit={handleFilterFormSubmit} className="flex flex-col gap-3">
          <div>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="systemFilters"
                id="systemFilters"
              >
                <Typography component="span">Approver</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Autocomplete
                  sx={{ width: "100%" }}
                  multiple
                  options={["Select", "All Users", "1 Steward Graham"]}
                  getOptionLabel={(option) => option}
                  disableCloseOnSelect
                  onChange={(e, value) =>
                    handleFilterFormChange("approver", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Approver"
                      placeholder="Approver"
                    />
                  )}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="systemFilters"
                id="systemFilters"
              >
                <Typography component="span">Record Owner</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={["All Users", "1 Steward Graham"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Record Owner" />
                  )}
                  onChange={(e, value) =>
                    handleFilterFormChange("record_owner", value)
                  }
                />
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="systemFilters"
                id="systemFilters"
              >
                <Typography component="span">Forms</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={["All Forms"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Forms" />
                  )}
                  onChange={(e, value) =>
                    handleFilterFormChange("forms", value)
                  }
                />
              </AccordionDetails>
            </Accordion>{" "}
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="systemFilters"
                id="systemFilters"
              >
                <Typography component="span">Status</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={["All Status", "Pending", "Approved", "Rejected"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Status" />
                  )}
                  onChange={(e, value) =>
                    handleFilterFormChange("status", value)
                  }
                />
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="systemFilters"
                id="systemFilters"
              >
                <Typography component="span">Employee Status</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={[
                    "All Requests",
                    "All Active Employee Requests",
                    "Ex Employee Requests",
                  ]}
                  renderInput={(params) => (
                    <TextField {...params} label="Employee Status" />
                  )}
                  onChange={(e, value) =>
                    handleFilterFormChange("employeeStatus", value)
                  }
                />
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="w-full flex gap-2 flex-row justify-between items-center">
            <Button type="submit" variant="contained">
              Apply
            </Button>
            <Button
              onClick={() => {
                setFilterModal(false);
              }}
              variant="outlined"
            >
              Reset
            </Button>
          </div>
        </form>
      </CustomModal> */}

      <CustomModal
        title="Filter"
        submitLabel="Apply"
        fields={filterModalFields}
        open={filterModal}
        onClose={() => {
          setFilterModal(false);
        }}
        onSubmit={handleFilterFormSubmit}
        // isScrollable={true}
      />
    </div>
  );
}
