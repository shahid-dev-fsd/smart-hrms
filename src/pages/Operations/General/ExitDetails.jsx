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

export default function TravelRequest() {
  const [filterModal, setFilterModal] = useState(false);
  const [addRecordModal, setAddRecordModal] = useState(false);
  const [editRecordModal, setEditRecordModal] = useState(false);
  const [viewRecordModal, setViewRecordModal] = useState(false);

  const fields = [
    {
      field: "employeeID",
      label: "Employee ID",
    },
    {
      field: "interviewer",
      label: "Interviewer",
    },
    {
      field: "seperationdate",
      label: "Seperation Date",
    },
    {
      field: "reasonforleaving",
      label: "Reason for leaving",
    },
    {
      field: "workingforthisorganizationagain",
      label: "Working for this organization again",
    },
    {
      field: "thinktheorganizationdotoimprovestaffwelfare",
      label: "Think the organization do to improve staff welfare",
    },

    {
      field: "whatdidyoulikethemostoftheorganization",
      label: "What did you like the most of the organization",
    },
    {
      field: "anythingyouwishtosharewithus",
      label: "Anything you wish to share with us",
    },
    {
      field: "companyvehiclehandedin",
      label: "Company Vehicle handed in",
    },
    {
      field: "alllibrarybookssubmitted",
      label: "All library books submitted",
    },
    {
      field: "exitinterviewconducted",
      label: "Exit interview conducted",
    },
    {
      field: "Resignation letter submitted",
      label: "resignationlettersubmitted",
    },
    {
      field: "allequipmentshandedin",
      label: "All equipments handed in",
    },
    {
      field: "security",
      label: "Security",
    },

    {
      field: "noticeperiodfollowed",
      label: "Notice period followed",
    },
    {
      field: "manager/supervisorclearance",
      label: "Manager/Supervisor clearance",
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
    search: "",
    employees: [],
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

  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const columns = [
    {
      field: "employeeID",
      label: "Employee ID",
    },
    {
      field: "interviewer",
      label: "Interviewer",
    },
    {
      field: "seperationdate",
      label: "Seperation Date",
    },
    {
      field: "reasonforleaving",
      label: "Reason for leaving",
    },
    {
      field: "workingforthisorganizationagain",
      label: "Working for this organization again",
    },
    {
      field: "thinktheorganizationdotoimprovestaffwelfare",
      label: "Think the organization do to improve staff welfare",
    },

    {
      field: "whatdidyoulikethemostoftheorganization",
      label: "What did you like the most of the organization",
    },
    {
      field: "anythingyouwishtosharewithus",
      label: "Anything you wish to share with us",
    },
    {
      field: "companyvehiclehandedin",
      label: "Company Vehicle handed in",
    },
    {
      field: "alllibrarybookssubmitted",
      label: "All library books submitted",
    },
    {
      field: "exitinterviewconducted",
      label: "Exit interview conducted",
    },
    {
      field: "Resignation letter submitted",
      label: "resignationlettersubmitted",
    },
    {
      field: "allequipmentshandedin",
      label: "All equipments handed in",
    },
    {
      field: "security",
      label: "Security",
    },

    {
      field: "noticeperiodfollowed",
      label: "Notice period followed",
    },
    {
      field: "manager/supervisorclearance",
      label: "Manager/Supervisor clearance",
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
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://reqres.in/api/users?page=${currentPage}&per_page=${limit}`
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
      type: "autocomplete",
      name: "interviewer",
      label: "Interviewer",
      options: ["Interviewer 1", "Interviewer 2"],
      defaultValue: "",
    },
    {
      type: "datePicker",
      name: "seperationdate",
      label: "Seperation Date",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "autocomplete",
      name: "reasonforleaving",
      label: "Reason for leaving",
      options: ["Reason 1", "Reason 2"],
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "workingforthisorganizationagain",
      label: "Working for this organization again",
      options: ["Select", "Yes", "No"],
      defaultValue: "Select",
    },
    {
      type: "text",
      name: "thinktheorganizationdotoimprovestaffwelfare",
      label: "Think the organization do to improve staff welfare",
      defaultValue: "",
    },
    {
      type: "text",
      name: "whatdidyoulikethemostoftheorganization",
      label: "What did you like the most of the organization",
      defaultValue: "",
    },
    {
      type: "text",
      name: "anythingyouwishtosharewithus",
      label: "Anything you wish to share with us",
      defaultValue: "",
    },
    {
      type: "text",
      name: "companyvehiclehandedin",
      label: "Company Vehicle handed in",
      defaultValue: "",
    },
    {
      type: "text",
      name: "alllibrarybookssubmitted",
      label: "All library books submitted",
      defaultValue: "",
    },
    {
      type: "text",
      name: "exitinterviewconducted",
      label: "Exit interview conducted",
      defaultValue: "",
    },
    {
      type: "text",
      name: "resignationlettersubmitted",
      label: "Resignation letter submitted",
      defaultValue: "",
    },
    {
      type: "text",
      name: "allequipmentshandedin",
      label: "All equipments handed in",
      defaultValue: "",
    },
    {
      type: "text",
      name: "security",
      label: "Security",
      defaultValue: "",
    },
    {
      type: "text",
      name: "noticeperiodfollowed",
      label: "Notice period followed",
      defaultValue: "",
    },
    {
      type: "text",
      name: "manager/supervisorclearance",
      label: "Manager/Supervisor clearance",
      defaultValue: "",
    },
  ];
  const handleAddRecordFormSubmit = (data) => {
    console.log("Add Form :- ", data);
  };

  const editRecordModalFields = [
    {
      type: "autocomplete",
      name: "employeeID",
      label: "Employee ID",
      options: ["EmployeeID 1", "EmployeeID 2"],
      defaultValue: "EmployeeID 1",
    },
    {
      type: "autocomplete",
      name: "interviewer",
      label: "Interviewer",
      options: ["Interviewer 1", "Interviewer 2"],
      defaultValue: "Interviewer 1",
    },
    {
      type: "datePicker",
      name: "seperationdate",
      label: "Seperation Date",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "autocomplete",
      name: "reasonforleaving",
      label: "Reason for leaving",
      options: ["Reason 1", "Reason 2"],
      defaultValue: "Reason 1",
    },
    {
      type: "text",
      name: "addedBy",
      label: "Added By",
      defaultValue: "1 - steward graham - ",
      disabled: true,
    },
    {
      type: "text",
      name: "modifiedBy",
      label: "Modified By",
      defaultValue: "1 - steward graham - ",
      disabled: true,
    },
    {
      type: "text",
      name: "addedTime",
      label: "Added Time",
      defaultValue: "03-Jan-2025 01:30 AM",
      disabled: true,
    },
    {
      type: "text",
      name: "modifiedTime",
      label: "Modified Time",
      defaultValue: "03-Jan-2025 01:30 AM",
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "workingforthisorganizationagain",
      label: "Working for this organization again",
      options: ["Select", "Yes", "No"],
      defaultValue: "Yes",
    },
    {
      type: "text",
      name: "thinktheorganizationdotoimprovestaffwelfare",
      label: "Think the organization do to improve staff welfare",
      defaultValue: "Dummy",
    },
    {
      type: "text",
      name: "whatdidyoulikethemostoftheorganization",
      label: "What did you like the most of the organization",
      defaultValue: "Dummy",
    },
    {
      type: "text",
      name: "anythingyouwishtosharewithus",
      label: "Anything you wish to share with us",
      defaultValue: "Dummy",
    },
    {
      type: "text",
      name: "companyvehiclehandedin",
      label: "Company Vehicle handed in",
      defaultValue: "Dummy",
    },
    {
      type: "text",
      name: "alllibrarybookssubmitted",
      label: "All library books submitted",
      defaultValue: "Dummy",
    },
    {
      type: "text",
      name: "exitinterviewconducted",
      label: "Exit interview conducted",
      defaultValue: "Dummy",
    },
    {
      type: "text",
      name: "resignationlettersubmitted",
      label: "Resignation letter submitted",
      defaultValue: "Dummy",
    },
    {
      type: "text",
      name: "allequipmentshandedin",
      label: "All equipments handed in",
      defaultValue: "Dummy",
    },
    {
      type: "text",
      name: "security",
      label: "Security",
      defaultValue: "Dummy",
    },
    {
      type: "text",
      name: "noticeperiodfollowed",
      label: "Notice period followed",
      defaultValue: "Dummy",
    },
    {
      type: "text",
      name: "manager/supervisorclearance",
      label: "Manager/Supervisor clearance",
      defaultValue: "Dummy",
    },
  ];
  const handleEditRecordFormSubmit = (data) => {
    console.log("Edit Form :- ", data);
  };

  const viewRecordModalFields = [
    {
      type: "autocomplete",
      name: "employeeID",
      label: "Employee ID",
      options: ["EmployeeID 1", "EmployeeID 2"],
      defaultValue: "EmployeeID 1",
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "interviewer",
      label: "Interviewer",
      options: ["Interviewer 1", "Interviewer 2"],
      defaultValue: "Interviewer 1",
      disabled: true,
    },
    {
      type: "datePicker",
      name: "seperationdate",
      label: "Seperation Date",
      defaultValue: dayjs("2023-10-01"),
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "reasonforleaving",
      label: "Reason for leaving",
      options: ["Reason 1", "Reason 2"],
      defaultValue: "Reason 1",
      disabled: true,
    },
    {
      type: "text",
      name: "addedBy",
      label: "Added By",
      defaultValue: "1 - steward graham - ",
      disabled: true,
    },
    {
      type: "text",
      name: "modifiedBy",
      label: "Modified By",
      defaultValue: "1 - steward graham - ",
      disabled: true,
    },
    {
      type: "text",
      name: "addedTime",
      label: "Added Time",
      defaultValue: "03-Jan-2025 01:30 AM",
      disabled: true,
    },
    {
      type: "text",
      name: "modifiedTime",
      label: "Modified Time",
      defaultValue: "03-Jan-2025 01:30 AM",
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "workingforthisorganizationagain",
      label: "Working for this organization again",
      options: ["Select", "Yes", "No"],
      defaultValue: "Yes",
      disabled: true,
    },
    {
      type: "text",
      name: "thinktheorganizationdotoimprovestaffwelfare",
      label: "Think the organization do to improve staff welfare",
      defaultValue: "Dummy",
      disabled: true,
    },
    {
      type: "text",
      name: "whatdidyoulikethemostoftheorganization",
      label: "What did you like the most of the organization",
      defaultValue: "Dummy",
      disabled: true,
    },
    {
      type: "text",
      name: "anythingyouwishtosharewithus",
      label: "Anything you wish to share with us",
      defaultValue: "Dummy",
      disabled: true,
    },
    {
      type: "text",
      name: "companyvehiclehandedin",
      label: "Company Vehicle handed in",
      defaultValue: "Dummy",
      disabled: true,
    },
    {
      type: "text",
      name: "alllibrarybookssubmitted",
      label: "All library books submitted",
      defaultValue: "Dummy",
      disabled: true,
    },
    {
      type: "text",
      name: "exitinterviewconducted",
      label: "Exit interview conducted",
      defaultValue: "Dummy",
      disabled: true,
    },
    {
      type: "text",
      name: "resignationlettersubmitted",
      label: "Resignation letter submitted",
      defaultValue: "Dummy",
      disabled: true,
    },
    {
      type: "text",
      name: "allequipmentshandedin",
      label: "All equipments handed in",
      defaultValue: "Dummy",
      disabled: true,
    },
    {
      type: "text",
      name: "security",
      label: "Security",
      defaultValue: "Dummy",
      disabled: true,
    },
    {
      type: "text",
      name: "noticeperiodfollowed",
      label: "Notice period followed",
      defaultValue: "Dummy",
      disabled: true,
    },
    {
      type: "text",
      name: "manager/supervisorclearance",
      label: "Manager/Supervisor clearance",
      defaultValue: "Dummy",
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
        <CustomTable
          columns={columns}
          onRowClick={handleRowClick}
          renderActions={renderActions}
          data={data}
          loading={loading}
          error={error}
        />
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
        onClose={() => {
          setAddRecordModal(false);
        }}
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
              Cancel
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
                <Typography component="span">Filter</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  sx={{ width: "100%" }}
                  variant="outlined"
                  label="Search"
                  placeholder="Search"
                  value={filterFormValues.search}
                  onChange={(e) =>
                    handleFilterFormChange("search", e.target.value)
                  }
                />
              </AccordionDetails>
            </Accordion>
          </div>

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
