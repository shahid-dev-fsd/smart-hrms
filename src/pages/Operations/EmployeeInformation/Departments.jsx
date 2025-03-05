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
import { CiExport } from "react-icons/ci";
import { LiaTrashAlt } from "react-icons/lia";
import CustomTable from "../../../components/CustomTable";
import Pagination from "../../../components/Pagination";
import dayjs from "dayjs";
import CustomModal from "../../../components/CustomModal";
import axios from "axios";

export default function Departments() {
  const [filterModal, setFilterModal] = useState(false);
  const [addRecordModal, setAddRecordModal] = useState(false);
  const [editRecordModal, setEditRecordModal] = useState(false);
  const [viewRecordModal, setViewRecordModal] = useState(false);

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
        per_page: pageSize,
        sort: sortField,
        direction: sortDirection,
      },
    });
    setData(response.data.data);
    setTotalRows(response.data.total);
  };
  useEffect(() => {
    fetchData(pagination.pageIndex, pagination.pageSize, sorting);
  }, [pagination.pageIndex, pagination.pageSize, sorting]);

  const columns = [
    {
      accessorKey: "id",
      header: "Department ID",
      enableSorting: true,
    },
    {
      accessorKey: "departmentName",
      header: "Department Name",
      enableSorting: true,
    },
    { accessorKey: "manager", header: "Manager", enableSorting: true },
    { accessorKey: "location", header: "Location", enableSorting: true },
    {
      accessorKey: "employeeCount",
      header: "Employee Count",
      enableSorting: true,
    },
    { accessorKey: "addedBy", header: "Added By", enableSorting: true },
    { accessorKey: "addedTime", header: "Added Time", enableSorting: true },
    { accessorKey: "modifiedBy", header: "Modified By", enableSorting: true },
    {
      accessorKey: "modifiedTime",
      header: "Modified Time",
      enableSorting: true,
    },
  ];
  const renderRowSelection = (table) => {
    return (
      <div>
        {Object.keys(rowSelection).length > 0 && (
          <Button variant="contained" color="error" onClick={() => {}}>
            Delete
          </Button>
        )}
      </div>
    );
  };
  const handleRowClick = (row) => {
    setViewRecordModal(true);
  };
  const renderActions = (row) => (
    <IconButton>
      <LiaTrashAlt />
    </IconButton>
  );

  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const fields = [
    { field: "departmentID", label: "Department ID" },
    { field: "departmentName", label: "Department Name" },
    { field: "manager", label: "Manager" },
    { field: "location", label: "Location" },
    { field: "employeeCount", label: "Employee Count" },
    { field: "addedBy", label: "Added By" },
    { field: "addedTime", label: "Added Time" },
    { field: "modifiedBy", label: "Modified By" },
    { field: "modifiedTime", label: "Modified Time" },
  ];

  const [filterFormValues, setFilterFormValues] = useState({
    departments: [],
    departmentStatus: "allDepartments",
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

  const addRecordModalFields = [
    {
      type: "autocomplete",
      name: "departmentID",
      label: "Department ID",
      options: ["DepartmentID 1", "DepartmentID 2"],
      defaultValue: "",
    },
    {
      type: "text",
      name: "departmentName",
      label: "Department Name",
      defaultValue: "",
    },
    {
      type: "text",
      name: "manager",
      label: "Manager",
      defaultValue: "",
    },
    {
      type: "text",
      name: "location",
      label: "Location",
      defaultValue: "",
    },
    {
      type: "text",
      name: "employeeCount",
      label: "Employee Count",
      defaultValue: "",
    },
    {
      type: "text",
      name: "addedBy",
      label: "Added By",
      defaultValue: "",
    },
    {
      type: "text",
      name: "addedTime",
      label: "Added Time",
      defaultValue: "",
    },
    {
      type: "text",
      name: "modifiedBy",
      label: "Modified By",
      defaultValue: "",
    },
    {
      type: "text",
      name: "modifiedTime",
      label: "Modified Time",
      defaultValue: "",
    },
  ];

  const handleAddRecordFormSubmit = (data) => {
    console.log("Add Form :- ", data);
  };

  const editRecordModalFields = [
    {
      type: "autocomplete",
      name: "departmentID",
      label: "Department ID",
      options: ["DepartmentID 1", "DepartmentID 2"],
      defaultValue: "DepartmentID 1",
      disabled: true,
    },
    {
      type: "text",
      name: "departmentName",
      label: "Department Name",
      defaultValue: "HR",
    },
    {
      type: "text",
      name: "manager",
      label: "Manager",
      defaultValue: "John Doe",
    },
    {
      type: "text",
      name: "location",
      label: "Location",
      defaultValue: "Building A, Floor 2",
    },
    {
      type: "text",
      name: "employeeCount",
      label: "Employee Count",
      defaultValue: "50",
    },
    {
      type: "text",
      name: "addedBy",
      label: "Added By",
      defaultValue: "Admin",
    },
    {
      type: "text",
      name: "addedTime",
      label: "Added Time",
      defaultValue: "2020-01-01",
    },
    {
      type: "text",
      name: "modifiedBy",
      label: "Modified By",
      defaultValue: "Admin",
    },
    {
      type: "text",
      name: "modifiedTime",
      label: "Modified Time",
      defaultValue: "2024-01-01",
    },
  ];

  const handleEditRecordFormSubmit = (data) => {
    console.log("Edit Form :- ", data);
  };

  const viewRecordModalFields = [
    {
      type: "autocomplete",
      name: "departmentID",
      label: "Department ID",
      options: ["DepartmentID 1", "DepartmentID 2"],
      defaultValue: "DepartmentID 1",
      disabled: true,
    },
    {
      type: "text",
      name: "departmentName",
      label: "Department Name",
      defaultValue: "HR",
      disabled: true,
    },
    {
      type: "text",
      name: "manager",
      label: "Manager",
      defaultValue: "John Doe",
      disabled: true,
    },
    {
      type: "text",
      name: "location",
      label: "Location",
      defaultValue: "Building A, Floor 2",
      disabled: true,
    },
    {
      type: "text",
      name: "employeeCount",
      label: "Employee Count",
      defaultValue: "50",
      disabled: true,
    },
    {
      type: "text",
      name: "addedBy",
      label: "Added By",
      defaultValue: "Admin",
      disabled: true,
    },
    {
      type: "text",
      name: "addedTime",
      label: "Added Time",
      defaultValue: "2020-01-01",
      disabled: true,
    },
    {
      type: "text",
      name: "modifiedBy",
      label: "Modified By",
      defaultValue: "Admin",
      disabled: true,
    },
    {
      type: "text",
      name: "modifiedTime",
      label: "Modified Time",
      defaultValue: "2024-01-01",
      disabled: true,
    },
  ];

  return (
    <div className="w-full min-h-80 flex flex-col">
      <div className="flex flex-row justify-between items-center">
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
        <div className="flex gap-3 justify-between items-center">
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
            Add Department
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
              <MenuItem>
                <div className="flex flex-row gap-3 justify-between items-center">
                  <CiExport className="text-2xl" />
                  <h1>History Export</h1>
                </div>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <div>
        <div className="h-[35.1rem] mt-1 overflow-scroll">
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
      </div>
      <CustomModal
        title="Add Department"
        fields={addRecordModalFields}
        open={addRecordModal}
        onClose={() => {
          setAddRecordModal(false);
        }}
        onSubmit={handleAddRecordFormSubmit}
        isScrollable={true}
      />
      <CustomModal
        title="Edit Department"
        fields={editRecordModalFields}
        open={editRecordModal}
        onClose={() => setEditRecordModal(false)}
        onSubmit={handleEditRecordFormSubmit}
        isScrollable={true}
      />
      <CustomModal
        title="View Department"
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
                  options={["Department 1", "Department 2"]}
                  getOptionLabel={(option) => option}
                  disableCloseOnSelect
                  onChange={(e, value) =>
                    handleFilterFormChange("departments", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Department"
                      placeholder="Department"
                    />
                  )}
                />
                <FormControl sx={{ mb: "15px", width: "100%" }}>
                  <InputLabel id="departmentStatus">
                    Department Status
                  </InputLabel>
                  <Select
                    labelId="departmentStatus"
                    id="departmentStatus"
                    label="Department Status"
                    onChange={(e) =>
                      handleFilterFormChange("departmentStatus", e.target.value)
                    }
                  >
                    <MenuItem value={"allDepartments"}>
                      All Departments
                    </MenuItem>
                    <MenuItem value={"allActiveDepartments"}>
                      All Active Departments
                    </MenuItem>
                    <MenuItem value={"inactiveDepartments"}>
                      Inactive Departments
                    </MenuItem>
                  </Select>
                </FormControl>
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
