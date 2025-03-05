import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiImport } from "react-icons/ci";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { LiaTrashAlt } from "react-icons/lia";
import CustomTable from "../../../components/CustomTable";
import Pagination from "../../../components/Pagination";
import CustomModal from "../../../components/CustomModal";
import dayjs from "dayjs";

export default function BonafideLetter() {
  const [filterModal, setFilterModal] = useState(false);
  const [addRecordModal, setAddRecordModal] = useState(false);
  const [editRecordModal, setEditRecordModal] = useState(false);
  const [viewRecordModal, setViewRecordModal] = useState(false);

  const handleAddRecordFormSubmit = (data) => {
    console.log("Add Form :- ", data);
    setAddRecordModal(false);
  };
  const handleEditRecordFormSubmit = (data) => {
    console.log("Edit Form :- ", data);
    setEditRecordModal(false);
  };

  const fields = [
    {
      field: "employeeID",
      label: "EmployeeID",
    },
    {
      field: "dateOfRequest",
      label: "Date Of Request",
    },
    {
      field: "reasonForRequest",
      label: "Reason For Request",
    },
    {
      field: "enterTheReasonForRequest",
      label: "Enter The Reason For Request (If Others Is Chosen)",
    },
  ];

  const [filterFormValues, setFilterFormValues] = useState({
    employees: [],
    employeeStatus: "allRequests",
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
    console.log("Filter Applied: ", filterFormValues);
    setFilterModal(false);
  };

  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const columns = [
    { label: "Employee ID", field: "employeeID", sortable: true },
    { label: "Date Of Request", field: "dateOfRequest", sortable: true },
    { label: "Reason For Request", field: "reasonForRequest", sortable: true },
    {
      label: "Enter The Reason For Rquest",
      field: "enterTheReasonForRquest",
      sortable: true,
    },
    { label: "Actions", field: "actions", sortable: true },
  ];

  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleRowClick = (row) => {
    setViewRecordModal(true);
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

  const addRecordModalFields = [
    {
      type: "autocomplete",
      name: "employeeID",
      label: "EmployeeID",
      options: ["EmployeeID 1", "EmployeeID 2"],
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "Date Of Request",
      name: "dateOfRequest",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "datePicker",
      label: "Date Of Joining",
      name: "dateOfJoining",
      defaultValue: dayjs("2023-10-01"),
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "designation",
      label: "Designation",
      options: ["Designation 1", "Designation 2"],
      defaultValue: "Designation 1",
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "department",
      label: "Department",
      options: ["Department 1", "Department 2"],
      defaultValue: "Department 1",
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "reasonForRequest",
      label: "Reason For Request",
      options: ["Reason 1", "Reason 2"],
      defaultValue: "",
    },
  ];

  const editRecordModalFields = [
    {
      type: "autocomplete",
      name: "employeeID",
      label: "EmployeeID",
      options: ["EmployeeID 1", "EmployeeID 2"],
      defaultValue: "EmployeeID 1",
    },
    {
      type: "datePicker",
      label: "Date Of Request",
      name: "dateOfRequest",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "datePicker",
      label: "Date Of Joining",
      name: "dateOfJoining",
      defaultValue: dayjs("2023-10-01"),
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "designation",
      label: "Designation",
      options: ["Designation 1", "Designation 2"],
      defaultValue: "Designation 1",
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "department",
      label: "Department",
      options: ["Department 1", "Department 2"],
      defaultValue: "Department 1",
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "reasonForRequest",
      label: "Reason For Request",
      options: ["Reason 1", "Reason 2"],
      defaultValue: "Reason 1",
    },
  ];

  const viewRecordModalFields = [
    {
      type: "autocomplete",
      name: "employeeID",
      label: "EmployeeID",
      options: ["EmployeeID 1", "EmployeeID 2"],
      defaultValue: "EmployeeID 1",
      disabled: true,
    },
    {
      type: "datePicker",
      label: "Date Of Request",
      name: "dateOfRequest",
      defaultValue: dayjs("2023-10-01"),
      disabled: true,
    },
    {
      type: "datePicker",
      label: "Date Of Joining",
      name: "dateOfJoining",
      defaultValue: dayjs("2023-10-01"),
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "designation",
      label: "Designation",
      options: ["Designation 1", "Designation 2"],
      defaultValue: "Designation 1",
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "department",
      label: "Department",
      options: ["Department 1", "Department 2"],
      defaultValue: "Department 1",
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "reasonForRequest",
      label: "Reason For Request",
      options: ["Reason 1", "Reason 2"],
      defaultValue: "Reason 1",
      disabled: true,
    },
  ];

  return (
    <div className="w-full min-h-80 flex flex-col">
      <div className="w-full flex gap-3 justify-end items-center">
        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="data">Data</InputLabel>
          <Select labelId="data" id="data" label="Data">
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
            setAddRecordModal(true);
          }}
        >
          Add Record
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
          </Menu>
        </div>
      </div>
      <div>
        <div className="h-[35.1rem] mt-1 overflow-scroll">
          <CustomTable
            columns={columns}
            onRowClick={handleRowClick}
            renderActions={renderActions}
            data={data}
            loading={loading}
            error={error}
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
      <CustomModal
        title="Add Record"
        fields={addRecordModalFields}
        open={addRecordModal}
        onClose={() => setAddRecordModal(false)}
        onSubmit={handleAddRecordFormSubmit}
        isScrollable={true}
        isCustomSubmitButtom={true}
        customSubmitButton={
          <div className="w-full flex flex-row justify-between items-center">
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button variant="contained" type="submit">
              Submit And New
            </Button>
            <Button variant="contained" type="submit">
              Save Draft
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setAddRecordModal(false);
              }}
            >
              Cancle
            </Button>
          </div>
        }
      />
      <CustomModal
        title="Edit Record"
        fields={editRecordModalFields}
        open={editRecordModal}
        onClose={() => setEditRecordModal(false)}
        onSubmit={handleEditRecordFormSubmit}
        isScrollable={true}
      />
      <CustomModal
        title="View Record"
        fields={viewRecordModalFields}
        open={viewRecordModal}
        onClose={() => setViewRecordModal(false)}
        isView={true}
        isScrollable={true}
        isEditButton={true}
        onEditButtonClick={() => {
          setViewRecordModal(false);
          setEditRecordModal(true);
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
                    <MenuItem value={"allRequests"}>All Requests</MenuItem>
                    <MenuItem value={"allActiveEmployeeRequests"}>
                      All Active Employee Requests
                    </MenuItem>
                    <MenuItem value={"exEmployeeRequests"}>
                      Ex-Employee Requests
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
