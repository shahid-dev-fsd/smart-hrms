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
import { CiExport, CiImport } from "react-icons/ci";
import { LiaTrashAlt } from "react-icons/lia";
import Pagination from "../../../../components/Pagination";
import dayjs from "dayjs";
import CustomModal from "../../../../components/CustomModal";
import CustomTable from "../../../../components/CustomTable";

export default function Jobs() {
  const [filterModal, setFilterModal] = useState(false);
  const [addJobModal, setAddJobModal] = useState(false);
  const [editJobModal, setEditJobModal] = useState(false);
  const [viewJobModal, setViewJobModal] = useState(false);

  const fields = [
    { label: "Job Name", field: "jobName" },
    { label: "Project", field: "project" },
    { label: "Start Date", field: "startDate" },
    { label: "End Date", field: "endDate" },
    { label: "Hours", field: "hours" },
    { label: "Rate Per Hour", field: "ratePerHour" },
    { label: "Description", field: "description" },
    { label: "Attachment", field: "attachment" },
    { label: "Reminder", field: "reminder" },
    { label: "Reminder Time", field: "reminderTime" },
    { label: "Assignees", field: "assignees" },
    { label: "Status", field: "status" },
    { label: "Job Owner", field: "jobOwner" },
    { label: "Billable Status", field: "billableStatus" },
    { label: "Added By", field: "addedBy" },
    { label: "Added Time", field: "addedTime" },
    { label: "Modified By", field: "modifiedBy" },
    { label: "Modified Time", field: "modifiedTime" },
  ];

  const [filterFormValues, setFilterFormValues] = useState({
    search: "",
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
    { label: "Job Name", field: "jobName", sortable: true },
    { label: "Project", field: "project", sortable: true },
    { label: "Start Date", field: "startDate", sortable: true },
    { label: "End Date", field: "endDate", sortable: true },
    { label: "Hours", field: "hours", sortable: true },
    { label: "Rate Per Hour", field: "ratePerHour", sortable: true },
    { label: "Description", field: "description", sortable: true },
    { label: "Attachment", field: "attachment", sortable: true },
    { label: "Reminder", field: "reminder", sortable: true },
    { label: "Reminder Time", field: "reminderTime", sortable: true },
    { label: "Assignees", field: "assignees", sortable: true },
    { label: "Status", field: "status", sortable: true },
    { label: "Job Owner", field: "jobOwner", sortable: true },
    { label: "Billable Status", field: "billableStatus", sortable: true },
    { label: "Added By", field: "addedBy", sortable: true },
    { label: "Added Time", field: "addedTime", sortable: true },
    { label: "Modified By", field: "modifiedBy", sortable: true },
    { label: "Modified Time", field: "modifiedTime", sortable: true },
    { label: "Actions", field: "actions" },
  ];

  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const handleRowClick = (row) => {
    setViewJobModal(true);
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

  const addJobModalFields = [
    {
      type: "text",
      name: "jobName",
      label: "Job Name",
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "project",
      label: "Project",
      options: ["Project 1", "Project 2"],
      defaultValue: "",
    },

    {
      type: "datePicker",
      label: "Start Date",
      name: "startDate",
      defaultValue: dayjs("2023-10-01"),
      // disabled,
    },
    {
      type: "datePicker",
      label: "End Date",
      name: "endDate",
      defaultValue: dayjs("2023-10-01"),
      // disabled,
    },
    {
      type: "text",
      name: "hours",
      label: "Hours",
      defaultValue: "00:00",
      disabled: true,
    },
    {
      type: "text",
      name: "ratePerHour",
      label: "Rate Per Hour",
      defaultValue: "",
    },
    {
      type: "text",
      name: "description",
      label: "Description",
      defaultValue: "",
    },
    {
      type: "checkbox",
      name: "reminder",
      label: "Reminder",
      defaultValue: "",
    },
    {
      type: "select",
      name: "billableStatus",
      label: "Billable Status",
      options: [
        { label: "Billable", value: "billable" },
        { label: "Non-billable", value: "non-billable" },
        { label: "Select", value: "select" },
      ],
      defaultValue: "select",
    },
  ];
  const handleAddJobFormSubmit = (data) => {
    console.log("Add Form :- ", data);
  };

  const editJobModalFields = [
    {
      type: "text",
      name: "jobName",
      label: "Job Name",
      defaultValue: "Iml",
    },
    {
      type: "autocomplete",
      name: "project",
      label: "Project",
      options: ["Project 1", "Project 2"],
      defaultValue: "Project 1",
    },

    {
      type: "datePicker",
      label: "Start Date",
      name: "startDate",
      defaultValue: dayjs("2025-10-01"),
      // disabled,
    },
    {
      type: "datePicker",
      label: "End Date",
      name: "endDate",
      defaultValue: dayjs("2025-10-01"),
      // disabled,
    },
    {
      type: "text",
      name: "hours",
      label: "Hours",
      defaultValue: "00:00",
      disabled: true,
    },
    {
      type: "text",
      name: "ratePerHour",
      label: "Rate Per Hour",
      defaultValue: "0.00",
    },
    {
      type: "text",
      name: "description",
      label: "Description",
      defaultValue: "Description Data",
    },
    {
      type: "checkbox",
      name: "reminder",
      label: "Reminder",
      defaultValue: "checked",
    },
    {
      type: "select",
      name: "billableStatus",
      label: "Billable Status",
      options: [
        { label: "Billable", value: "billable" },
        { label: "Non-billable", value: "non-billable" },
        { label: "Select", value: "select" },
      ],
      defaultValue: "Billable",
    },
  ];
  const handleEditJobFormSubmit = (data) => {
    console.log("Edit Form :- ", data);
  };

  const viewJobModalFields = [
    {
      type: "text",
      name: "jobName",
      label: "Job Name",
      defaultValue: "Iml",
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "project",
      label: "Project",
      options: ["Project 1", "Project 2"],
      defaultValue: "Project 1",
      disabled: true,
    },

    {
      type: "datePicker",
      label: "Start Date",
      name: "startDate",
      defaultValue: dayjs("2025-01-01"),
      disabled: true,
      // disabled,
    },
    {
      type: "datePicker",
      label: "End Date",
      name: "endDate",
      defaultValue: dayjs("2025-05-01"),
      disabled: true,
      // disabled,
    },
    {
      type: "text",
      name: "hours",
      label: "Hours",
      defaultValue: "00:00",
      disabled: true,
    },
    {
      type: "text",
      name: "ratePerHour",
      label: "Rate Per Hour",
      defaultValue: "0.00",
      disabled: true,
    },
    {
      type: "text",
      name: "description",
      label: "Description",
      defaultValue: "Description Data",
      disabled: true,
    },
    {
      type: "text",
      name: "reminder",
      label: "Reminder",
      defaultValue: "No",
      disabled: true,
    },
    {
      type: "text",
      name: "reminderTime",
      label: "Reminder Time",
      defaultValue: "-",
      disabled: true,
    },
    {
      type: "select",
      name: "billableStatus",
      label: "Billable Status",
      options: [
        { label: "Billable", value: "billable" },
        { label: "Non-billable", value: "non-billable" },
        { label: "Select", value: "select" },
      ],
      defaultValue: "Billable",
      disabled: true,
    },
  ];
  return (
    <div className="w-full min-h-80 flex flex-col">
      <div className="w-full h-fit flex gap-3 justify-end items-center">
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
            setAddJobModal(true);
          }}
        >
          Add Job
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
            <MenuItem>
              <div className="flex flex-row gap-3 justify-between items-center">
                <CiExport className="text-2xl" />
                <h1>Export</h1>
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
      <CustomModal
        title="Add Job"
        fields={addJobModalFields}
        open={addJobModal}
        onClose={() => {
          setAddJobModal(false);
        }}
        onSubmit={handleAddJobFormSubmit}
        isScrollable={true}
        isCustomSubmitButtom={true}
        customSubmitButton={
          <div className="w-full flex flex-row justify-between items-center">
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setAddJobModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        }
      />
      <CustomModal
        title="Edit Job"
        fields={editJobModalFields}
        open={editJobModal}
        onClose={() => setEditJobModal(false)}
        onSubmit={handleEditJobFormSubmit}
        isScrollable={true}
      />
      <CustomModal
        title="View Job"
        fields={viewJobModalFields}
        open={viewJobModal}
        onClose={() => setViewJobModal(false)}
        isView={true}
        isScrollable={true}
        isEditButton={true}
        onEditButtonClick={() => {
          setViewJobModal(false);
          setEditJobModal(true);
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
                <Typography component="span">Search</Typography>
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
