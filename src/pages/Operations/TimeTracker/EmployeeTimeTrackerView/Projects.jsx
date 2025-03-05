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
import CustomTable from "../../../../components/CustomTable";
import Pagination from "../../../../components/Pagination";
import dayjs from "dayjs";
import CustomModal from "../../../../components/CustomModal";

export default function Projects() {
  const [filterModal, setFilterModal] = useState(false);
  const [addProjectModal, setAddProjectModal] = useState(false);
  const [editProjectModal, setEditProjectModal] = useState(false);
  const [viewProjectModal, setViewProjectModal] = useState(false);

  const fields = [
    { label: "Project Name", field: "projectName", sortable: true },
    { label: "Client Name", field: "clientName", sortable: true },
    { label: "Project Cost", field: "projectCost", sortable: true },
    { label: "Status", field: "status", sortable: true },
    { label: "Project Owner", field: "projectOwner", sortable: true },
    { label: "Project Manager", field: "projectManager", sortable: true },
    { label: "Project Users", field: "projectUsers", sortable: true },
    { label: "Description", field: "description", sortable: true },
    { label: "Added By", field: "addedBy", sortable: true },
    { label: "Added Time", field: "addedTime", sortable: true },
    { label: "Modified By", field: "modifiedBy", sortable: true },
    { label: "Modified Time", field: "modifiedTime", sortable: true },
    { label: "Project Head", field: "projectHead", sortable: true },
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
    { label: "Project Name", field: "projectName", sortable: true },
    { label: "Client Name", field: "clientName", sortable: true },
    { label: "Project Cost", field: "projectCost", sortable: true },
    { label: "Status", field: "status", sortable: true },
    { label: "Project Owner", field: "projectOwner", sortable: true },
    { label: "Project Manager", field: "projectManager", sortable: true },
    { label: "Project Users", field: "projectUsers", sortable: true },
    { label: "Description", field: "description", sortable: true },
    { label: "Added By", field: "addedBy", sortable: true },
    { label: "Added Time", field: "addedTime", sortable: true },
    { label: "Modified By", field: "modifiedBy", sortable: true },
    { label: "Modified Time", field: "modifiedTime", sortable: true },
    { label: "Project Head", field: "projectHead", sortable: true },
    { label: "Actions", field: "actions" },
  ];

  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const handleRowClick = (row) => {
    setViewProjectModal(true);
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

  const addProjectModalFields = [
    {
      type: "text",
      name: "projectName",
      label: "Project Name",
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "clientName",
      label: "Client Name",
      options: ["Client 1", "Client 2"],
      defaultValue: "",
    },
    {
      type: "text",
      name: "projectCost",
      label: "Project Cost",
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "projectHead",
      label: "Project Head",
      options: ["Project Head 1", "Project Head 2"],
      defaultValue: "",
    },
    {
      type: "text",
      name: "ratePerHour",
      label: "Rate Per Hour",
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "projectManager",
      label: "Project Manager",
      options: ["Project Manager 1", "Project Manager 2"],
      defaultValue: "",
    },
    {
      type: "text",
      name: "description",
      label: "Description",
      defaultValue: "",
    },
  ];
  const handleAddProjectFormSubmit = (data) => {
    console.log("Add Form :- ", data);
  };

  const editProjectModalFields = [
    {
      type: "text",
      name: "projectName",
      label: "Project Name",
      defaultValue: "Iml",
    },
    {
      type: "autocomplete",
      name: "clientName",
      label: "Client Name",
      options: ["Client 1", "Client 2"],
      defaultValue: "Client 1",
    },
    {
      type: "text",
      name: "projectCost",
      label: "Project Cost",
      defaultValue: "22",
    },
    {
      type: "autocomplete",
      name: "projectHead",
      label: "Project Head",
      options: ["Project Head 1", "Project Head 2"],
      defaultValue: "Project Head 1",
    },
    {
      type: "text",
      name: "ratePerHour",
      label: "Rate Per Hour",
      defaultValue: "1.5",
    },
    {
      type: "autocomplete",
      name: "projectManager",
      label: "Project Manager",
      options: ["Project Manager 1", "Project Manager 2"],
      defaultValue: "Project Manager 1",
    },
    {
      type: "text",
      name: "description",
      label: "Description",
      defaultValue: "Description Data",
    },
  ];
  const handleEditProjectFormSubmit = (data) => {
    console.log("Edit Form :- ", data);
  };

  const viewProjectModalFields = [
    {
      type: "text",
      name: "projectName",
      label: "Project Name",
      defaultValue: "Iml",
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "clientName",
      label: "Client Name",
      options: ["Client 1", "Client 2"],
      defaultValue: "Client 1",
      disabled: true,
    },
    {
      type: "text",
      name: "projectCost",
      label: "Project Cost",
      defaultValue: "22.00",
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "projectHead",
      label: "Project Head",
      options: ["Project Head 1", "Project Head 2"],
      defaultValue: "Project Head 1",
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "projectManager",
      label: "Project Manager",
      options: ["Project Manager 1", "Project Manager 2"],
      defaultValue: "Project Manager 1",
      disabled: true,
    },
    {
      type: "text",
      name: "ratePerHour",
      label: "Rate Per Hour",
      defaultValue: "1.5",
      disabled: true,
    },
    {
      type: "text",
      name: "projectUsers",
      label: "Project Users",
      defaultValue: "Users 1",
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
            setAddProjectModal(true);
          }}
        >
          Add Project
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
        title="Add Project"
        fields={addProjectModalFields}
        open={addProjectModal}
        onClose={() => {
          setAddProjectModal(false);
        }}
        onSubmit={handleAddProjectFormSubmit}
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
                setAddProjectModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        }
      />
      <CustomModal
        title="Edit Project"
        fields={editProjectModalFields}
        open={editProjectModal}
        onClose={() => setEditProjectModal(false)}
        onSubmit={handleEditProjectFormSubmit}
        isScrollable={true}
      />
      <CustomModal
        title="View Project"
        fields={viewProjectModalFields}
        open={viewProjectModal}
        onClose={() => setViewProjectModal(false)}
        isView={true}
        isScrollable={true}
        isEditButton={true}
        onEditButtonClick={() => {
          setViewProjectModal(false);
          setEditProjectModal(true);
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
