import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
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
import dayjs from "dayjs";
import axios from "axios";

import CustomTable from "../../../../components/CustomTable";
import CustomModal from "../../../../components/CustomModal";
import CandidateFromModal from "./CandidateFromModal";

export default function Candidate() {
  const [filterModal, setFilterModal] = useState(false);
  const [addCandidateModal, setAddCandidateModal] = useState(false);
  const [editCandidateModal, setEditCandidateModal] = useState(false);
  const [viewCandidateModal, setViewCandidateModal] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [sorting, setSorting] = useState([{ id: "id", desc: false }]);
  const [rowSelection, setRowSelection] = useState({});

  const fetchData = async (pageIndex, pageSize, sorting) => {
    const sortField = sorting[0]?.id || "id";
    const sortDirection = sorting[0]?.desc ? "desc" : "asc";

    const response = await axios.get(`https://reqres.in/api/users`, {
      params: {
        page: pageIndex + 1,
        pageSize,
      },
    });
    setData(response.data.data);
    setTotalRows(response.data.total);
  };
  useEffect(() => {
    fetchData(pagination.pageIndex, pagination.pageSize, sorting);
  }, [pagination.pageIndex, pagination.pageSize, sorting]);

  const columns = [
    { accessorKey: "id", header: "Employee ID", enableSorting: true },
    { accessorKey: "firstName", header: "First Name", enableSorting: true },
    { accessorKey: "lastName", header: "Last Name", enableSorting: true },
    { accessorKey: "nickname", header: "Nick Name", enableSorting: true },
    { accessorKey: "email", header: "Email Address", enableSorting: true },
    { accessorKey: "department", header: "Department", enableSorting: true },
    { accessorKey: "designation", header: "Designation", enableSorting: true },
    { accessorKey: "clikkleHR", header: "Clikkle HR", enableSorting: true },
    {
      accessorKey: "employmentType",
      header: "Employment Type",
      enableSorting: true,
    },
    {
      accessorKey: "employeeStatus",
      header: "Employee Status",
      enableSorting: true,
    },
    {
      accessorKey: "sourceOfHire",
      header: "Source of Hire",
      enableSorting: true,
    },
    {
      accessorKey: "dateOfJoining",
      header: "Date of Joining",
      enableSorting: true,
    },
    {
      accessorKey: "currentExperience",
      header: "Current Experience",
      enableSorting: true,
    },
    {
      accessorKey: "totalExperience",
      header: "Total Experience",
      enableSorting: true,
    },
    {
      accessorKey: "reportingManager",
      header: "Reporting Manager",
      enableSorting: true,
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date of Birth",
      enableSorting: true,
    },
    { accessorKey: "age", header: "Age", enableSorting: true },
    { accessorKey: "gender", header: "Gender", enableSorting: true },
    {
      accessorKey: "maritalStatus",
      header: "Marital Status",
      enableSorting: true,
    },
    { accessorKey: "aboutMe", header: "About Me", enableSorting: true },
    {
      accessorKey: "expertise",
      header: "Ask me about/Expertise",
      enableSorting: true,
    },
    {
      accessorKey: "workPhoneNumber",
      header: "Work Phone Number",
      enableSorting: true,
    },
    { accessorKey: "extension", header: "Extension", enableSorting: true },
    {
      accessorKey: "seatingLocation",
      header: "Seating Location",
      enableSorting: true,
    },
    { accessorKey: "tags", header: "Tags", enableSorting: true },
    {
      accessorKey: "personalMobileNumber",
      header: "Personal Mobile Number",
      enableSorting: true,
    },
    {
      accessorKey: "personalEmailAddress",
      header: "Personal Email Address",
      enableSorting: true,
    },
    { accessorKey: "dateOfExit", header: "Date of Exit", enableSorting: true },
    { accessorKey: "addedBy", header: "Added By", enableSorting: true },
    { accessorKey: "modifiedBy", header: "Modified By", enableSorting: true },
    { accessorKey: "addedTime", header: "Added Time", enableSorting: true },
    {
      accessorKey: "modifiedTime",
      header: "Modified Time",
      enableSorting: true,
    },
    {
      accessorKey: "onboardingStatus",
      header: "Onboarding Status",
      enableSorting: true,
    },
    {
      accessorKey: "presentAddress",
      header: "Present Address",
      enableSorting: true,
    },
    {
      accessorKey: "permanentAddress",
      header: "Permanent Address",
      enableSorting: true,
    },
    {
      accessorKey: "actions",
      header: "Actions",
    },
  ];
  const renderRowSelection = (table) => {
    return (
      <div>
        {Object.keys(rowSelection)?.length > 0 && (
          <Button variant="contained" color="error" onClick={() => {}}>
            Delete
          </Button>
        )}
      </div>
    );
  };
  const handleRowClick = (row) => {
    setViewCandidateModal(true);
  };
  const renderActions = (row) => (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        console.log("Delete Button Clicked");
      }}
    >
      <LiaTrashAlt />
    </IconButton>
  );

  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const fields = [
    { field: "employeeID", label: "Employee ID" },
    { field: "firstName", label: "First Name" },
    { field: "lastName", label: "Last Name" },
    { field: "nickname", label: "Nick Name" },
    { field: "email", label: "Email Address" },
    { field: "department", label: "Department" },
    { field: "designation", label: "Designation" },
    { field: "clikkleHR", label: "Clikkle HR" },
    { field: "employmentType", label: "Employment Type" },
    { field: "employeeStatus", label: "Employee Status" },
    { field: "sourceOfHire", label: "Source of Hire" },
    { field: "dateOfJoining", label: "Date of Joining" },
    { field: "currentExperience", label: "Current Experience" },
    { field: "totalExperience", label: "Total Experience" },
    { field: "reportingManager", label: "Reporting Manager" },
    { field: "dateOfBirth", label: "Date of Birth" },
    { field: "age", label: "Age" },
    { field: "gender", label: "Gender" },
    { field: "maritalStatus", label: "Marital Status" },
    { field: "aboutMe", label: "About Me" },
    { field: "expertise", label: "Ask me about/Expertise" },
    { field: "workPhoneNumber", label: "Work Phone Number" },
    { field: "extension", label: "Extension" },
    { field: "seatingLocation", label: "Seating Location" },
    { field: "tags", label: "Tags" },
    { field: "personalMobileNumber", label: "Personal Mobile Number" },
    { field: "personalEmailAddress", label: "Personal Email Address" },
    { field: "dateOfExit", label: "Date of Exit" },
    { field: "addedBy", label: "Added By" },
    { field: "modifiedBy", label: "Modified By" },
    { field: "addedTime", label: "Added Time" },
    { field: "modifiedTime", label: "Modified Time" },
    { field: "onboardingStatus", label: "Onboarding Status" },
    { field: "presentAddress", label: "Present Address" },
    { field: "permanentAddress", label: "Permanent Address" },
  ];
  const [filterFormValues, setFilterFormValues] = useState({
    employees: [],
    employeeStatus: "allCandidates",
    department: "",
    location: "",
    filterFields: [],
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
  const handleCheckboxChange = (field) => (event) => {
    const checkedFields = filterFormValues.filterFields;
    if (event.target.checked) {
      setFilterFormValues((prev) => ({
        ...prev,
        filterFields: [...checkedFields, { field, condition: "is", value: "" }],
      }));
    } else {
      setFilterFormValues((prev) => ({
        ...prev,
        filterFields: checkedFields.filter((item) => item.field !== field),
      }));
    }
  };
  const handleFilterFormSubmit = (e) => {
    e.preventDefault();
    console.log("Filter Data :- ", filterFormValues);
    setFilterModal(false);
  };

  const [editCandidateFormData, setEditCandidateFormData] = useState({
    candidate: {
      email: "Hello 1",
      firstName: "Hello 2",
      lastName: "",
      countryCode: "",
      number: "",
      officalEmail: "",
      photo: null,
    },
    presentAddress: {
      address1: "",
      address2: "",
      city: "",
      country: "",
      state: "",
      postalCode: "",
    },
    permanentAddress: {
      address1: "",
      address2: "",
      city: "",
      country: "",
      state: "",
      postalCode: "",
      sameAsPresentAddress: false,
    },
    professional: {
      experience: "",
      currentSalary: "",
      location: "",
      department: "",
      sourceOfHire: "",
      skillSet: "",
      highestQualification: "",
      offerLetter: null,
      tentativeJoiningDate: null,
      title: "",
    },
    education: [
      {
        instituteName: "",
        degree: "",
        specialization: "",
        additionalNotes: "",
        dateOfCompletion: dayjs(),
      },
    ],
    experience: [
      {
        occupation: "",
        company: "",
        duration: "",
        summary: "",
        currentlyWorkHere: "",
      },
    ],
  });
  const [viewCandidateFormData, viewEditCandidateFormData] = useState({
    candidate: {
      email: "Hello 1",
      firstName: "Hello 2",
      lastName: "",
      countryCode: "",
      number: "",
      officalEmail: "",
      photo: null,
    },
    presentAddress: {
      address1: "",
      address2: "",
      city: "",
      country: "",
      state: "",
      postalCode: "",
    },
    permanentAddress: {
      address1: "",
      address2: "",
      city: "",
      country: "",
      state: "",
      postalCode: "",
      sameAsPresentAddress: false,
    },
    professional: {
      experience: "",
      currentSalary: "",
      location: "",
      department: "",
      sourceOfHire: "",
      skillSet: "",
      highestQualification: "",
      offerLetter: null,
      tentativeJoiningDate: null,
      title: "",
    },
    education: [
      {
        instituteName: "",
        degree: "",
        specialization: "",
        additionalNotes: "",
        dateOfCompletion: dayjs(),
      },
    ],
    experience: [
      {
        occupation: "",
        company: "",
        duration: "",
        summary: "",
        currentlyWorkHere: "",
      },
    ],
  });

  return (
    <div className="w-full min-h-80 flex flex-col gap-3">
      <div className="w-full flex gap-3 justify-between items-center">
        <div className="flex flex-row gap-3 justify-center items-center">
          <div>
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="table-view">Table View</InputLabel>
              <Select labelId="table-view" id="table-view" label="Table View">
                <MenuItem value={"one"}>One</MenuItem>
                <MenuItem value={"two"}>Two</MenuItem>
                <div className="w-full ">
                  <Button
                    sx={{ width: "100%" }}
                    onClick={() => {
                      // setCreateTableViewModal(true);
                    }}
                    variant="outlined"
                  >
                    Create Table View
                  </Button>
                </div>
              </Select>
            </FormControl>
          </div>
          <div>
            <Button variant="outlined">Edit</Button>
          </div>
          <div className="h-9 w-[0.15rem] rounded-lg bg-neutral-500" />
          <div>
            <Button variant="outlined" color="error">
              Delete
            </Button>
          </div>
        </div>
        <div className="flex flex-row gap-3 justify-center items-center">
          <FormControl>
            <InputLabel id="data">Data</InputLabel>
            <Select
              sx={{
                width: "200px",
              }}
              labelId="data"
              id="data"
              label="Data"
            >
              <MenuItem value={"allData"}>All Data</MenuItem>
              <MenuItem value={"reporteesPlusMyData"}>
                Reportees + My Data
              </MenuItem>
              <MenuItem value={"reporteesData"}>Reportees Data</MenuItem>
              <MenuItem value={"directReporteesData"}>
                Direct Reportees Data
              </MenuItem>
              <MenuItem value={"myData"}>My Data</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={() => {
              setAddCandidateModal(true);
            }}
          >
            Add Candidate
          </Button>
          <IconButton
            onClick={() => {
              setFilterModal(true);
            }}
            title="Filter"
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
              <HiDotsHorizontal />
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
            </Menu>
          </div>
        </div>
      </div>
      <div className="h-[30rem]">
        <CustomTable
          columns={columns}
          onRowClick={handleRowClick}
          renderActions={renderActions}
          renderRowSelection={renderRowSelection}
          data={data}
          loading={loading}
          error={error}
          sorting={sorting}
          setSorting={setSorting}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
          pagination={pagination}
          setPagination={setPagination}
          totalRows={totalRows}
          setTotalRows={setTotalRows}
          isBulkSelect={true}
        />
      </div>

      <CandidateFromModal
        title={"Add Candidate"}
        open={addCandidateModal}
        onClose={() => {
          setAddCandidateModal(false);
        }}
        onSubmit={(data) => {
          console.log("Add Candidate Form Data :- ", data);
        }}
      />
      <CandidateFromModal
        title={"Edit Candidate"}
        open={editCandidateModal}
        onClose={() => {
          setEditCandidateModal(false);
        }}
        onSubmit={(data) => {
          console.log("Edit Candidate Form Data :- ", data);
        }}
        editFormData={editCandidateFormData}
      />

      <CandidateFromModal
        title={"View Candidate"}
        open={viewCandidateModal}
        onClose={() => {
          setViewCandidateModal(false);
        }}
        viewFormData={viewCandidateFormData}
        handleEdit={() => {
          setViewCandidateModal(false);
          setEditCandidateModal(true);
        }}
      />
      <CustomModal
        title="Filter"
        open={filterModal}
        onClose={() => setFilterModal(false)}
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
                <Typography component="span">System Filters</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Autocomplete
                  sx={{ width: "100%" }}
                  multiple
                  options={["Employee 1", "Employee 2"]}
                  getOptionLabel={(option) => option}
                  disableCloseOnSelect
                  onChange={(e, value) =>
                    handleFilterFormChange("employees", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Employee"
                      placeholder="Employee"
                    />
                  )}
                />
                <FormControl sx={{ mb: "15px", width: "100%" }}>
                  <InputLabel id="employeeStatus">Employee Status</InputLabel>
                  <Select
                    labelId="employeeStatus"
                    id="employeeStatus"
                    label="Employee Status"
                    onChange={(e) =>
                      handleFilterFormChange("employeeStatus", e.target.value)
                    }
                  >
                    <MenuItem value={"allCandidates"}>All Candidates</MenuItem>
                    <MenuItem value={"allActiveEmployeeCandidates"}>
                      All Active Employee Candidates
                    </MenuItem>
                    <MenuItem value={"exEmployeeCandidates"}>
                      Ex-Employee Candidates
                    </MenuItem>
                  </Select>
                </FormControl>
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={["All", "HR", "IT", "Management", "Marketing"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Department" />
                  )}
                  onChange={(e, value) =>
                    handleFilterFormChange("department", value)
                  }
                />
                <Autocomplete
                  sx={{ width: "100%" }}
                  options={["Location 1", "Location 2"]}
                  renderInput={(params) => (
                    <TextField {...params} label="Location" />
                  )}
                  onChange={(e, value) =>
                    handleFilterFormChange("location", value)
                  }
                />
              </AccordionDetails>
            </Accordion>
          </div>

          <div>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">Field</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col gap-3">
                  {fields.map((field, index) => (
                    <div key={index}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={handleCheckboxChange(field.field)}
                              checked={filterFormValues.filterFields.some(
                                (item) => item.field === field.field
                              )}
                            />
                          }
                          label={field.label}
                        />
                      </FormGroup>

                      {filterFormValues.filterFields
                        .filter((item) => item.field === field.field)
                        .map((filter, idx) => (
                          <div className="flex flex-col gap-3" key={idx}>
                            <FormControl sx={{ width: "100%" }}>
                              <InputLabel id={`filter-${index}`}>
                                Condition
                              </InputLabel>
                              <Select
                                labelId={`filter-${index}`}
                                id={`filter-${index}`}
                                label="Condition"
                                value={filter.condition}
                                onChange={(e) =>
                                  handleFilterValueChange(
                                    field.field,
                                    e.target.value,
                                    filter.value
                                  )
                                }
                              >
                                <MenuItem value={"is"}>Is</MenuItem>
                                <MenuItem value={"isNot"}>Is Not</MenuItem>
                                <MenuItem value={"startWith"}>
                                  Start With
                                </MenuItem>
                                <MenuItem value={"endWith"}>End With</MenuItem>
                                <MenuItem value={"contains"}>Contains</MenuItem>
                                <MenuItem value={"notContains"}>
                                  Not Contains
                                </MenuItem>
                                <MenuItem value={"Like"}>Like</MenuItem>
                                <MenuItem value={"isEmpty"}>Is Empty</MenuItem>
                                <MenuItem value={"isNotEmpty"}>
                                  Is Not Empty
                                </MenuItem>
                              </Select>
                            </FormControl>
                            <TextField
                              sx={{ width: "100%" }}
                              variant="outlined"
                              label="Value"
                              placeholder="Value"
                              value={filter.value}
                              onChange={(e) =>
                                handleFilterValueChange(
                                  field.field,
                                  filter.condition,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
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
      </CustomModal>
    </div>
  );
}
