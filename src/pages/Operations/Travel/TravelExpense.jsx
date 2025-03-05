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
import CustomInputTable from "../../../components/CustomInputTable";

export default function TravelExpense() {
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
    console.log("Filter Data :- ", filterFormValues);
    setFilterModal(false);
  };

  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const columns = [
    {
      field: "employeeID",
      label: "EmployeeID",
    },
    {
      field: "travelID",
      label: "TravelID",
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
  const [limit, setLimit] = useState(15);
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
      name: "groupID",
      label: "GroupID",
      options: ["GroupID 1", "GroupID 2"],
      defaultValue: "",
    },
    {
      type: "text",
      name: "placeOfVisit",
      label: "Place of visit",
      defaultValue: "Dummy",
      disabled: true,
    },
    {
      type: "text",
      name: "purposeOfVisit",
      label: "Purpose of visit",
      defaultValue: "Dummy",
      disabled: true,
    },
  ];
  const handleAddRecordFormSubmit = (data) => {
    console.log("Add Form :- ", { ...data, table: addRecordTableData });
  };

  const editRecordModalFields = [
    {
      type: "autocomplete",
      name: "employeeID",
      label: "EmployeeID",
      options: ["EmployeeID 1", "EmployeeID 2"],
      defaultValue: "EmployeeID 1",
    },
    {
      type: "autocomplete",
      name: "travelID",
      label: "TravelID",
      options: ["TravelID 1", "TravelID 2"],
      defaultValue: "TravelID 1",
    },

    {
      type: "text",
      name: "placeOfVisit",
      label: "Place of visit",
      defaultValue: "New place",
      disabled: true,
    },
    {
      type: "text",
      name: "purposeOfVisit",
      label: "Purpose of visit",
      defaultValue: "Enquiry",
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
  ];
  const handleEditRecordFormSubmit = (data) => {
    console.log("Edit Form :- ", { ...data, table: editRecordTableData });
  };

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
      type: "autocomplete",
      name: "travelID",
      label: "TravelID",
      options: ["TravelID 1", "TravelID 2"],
      defaultValue: "TravelID 1",
      disabled: true,
    },
    {
      type: "text",
      name: "placeOfVisit",
      label: "Place of visit",
      defaultValue: "New place",
      disabled: true,
    },
    {
      type: "text",
      name: "purposeOfVisit",
      label: "Purpose of visit",
      defaultValue: "Enquiry",
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
  ];

  const addRecordTableColumns = [
    {
      name: "description",
      label: "Description",
      type: "textarea",
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "Date",
      name: "date",
      defaultValue: dayjs("2023-10-01"),
    },
    { name: "ticket", label: "Ticket", type: "text", defaultValue: "" },
    { name: "lodging", label: "Lodging", type: "text", defaultValue: "" },
    { name: "boarding", label: "Boarding", type: "text", defaultValue: "" },
    { name: "phone", label: "Phone", type: "text", defaultValue: "" },
    {
      name: "localConveyance",
      label: "Local Conveyance",
      type: "text",
      defaultValue: "",
    },
    {
      name: "incidentals",
      label: "Incidentals",
      type: "text",
      defaultValue: "",
    },
    { name: "others", label: "Others", type: "text", defaultValue: "" },
    {
      type: "select",
      name: "currency",
      label: "Currency",
      options: [
        { label: "Select", value: "select" },
        { label: "Dinor", value: "dinor" },
        { label: "Dollar", value: "dollar" },
        { label: "Euro", value: "euro" },
        { label: "Pound", value: "pound" },
        { label: "Yen", value: "yen" },
      ],
      defaultValue: "select",
    },
    { name: "actions", label: "Actions", type: "actions" },
  ];
  const [addRecordTableData, setAddRecordTableData] = useState([
    {
      description: "",
      date: dayjs(),
      ticket: "",
      lodging: "",
      boarding: "",
      phone: "",
      localConveyance: "",
      incidentals: "",
      others: "",
    },
  ]);
  const handleAddRecordTableRowSubmit = (formData, index) => {
    const updatedData = [...addRecordTableData];
    updatedData[index] = formData;
    setAddRecordTableData(updatedData);
  };

  const editRecordTableColumns = [
    {
      name: "description",
      label: "Description",
      type: "textarea",
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "Date",
      name: "date",
      defaultValue: dayjs("2023-10-01"),
    },
    { name: "ticket", label: "Ticket", type: "text", defaultValue: "" },
    { name: "lodging", label: "Lodging", type: "text", defaultValue: "" },
    { name: "boarding", label: "Boarding", type: "text", defaultValue: "" },
    { name: "phone", label: "Phone", type: "text", defaultValue: "" },
    {
      name: "localConveyance",
      label: "Local Conveyance",
      type: "text",
      defaultValue: "",
    },
    {
      name: "incidentals",
      label: "Incidentals",
      type: "text",
      defaultValue: "",
    },
    { name: "others", label: "Others", type: "text", defaultValue: "" },
    {
      type: "select",
      name: "currency",
      label: "Currency",
      options: [
        { label: "Select", value: "select" },
        { label: "Dinor", value: "dinor" },
        { label: "Dollar", value: "dollar" },
        { label: "Euro", value: "euro" },
        { label: "Pound", value: "pound" },
        { label: "Yen", value: "yen" },
      ],
      defaultValue: "select",
    },
    { name: "actions", label: "Actions", type: "actions" },
  ];
  const [editRecordTableData, setEditRecordTableData] = useState([
    {
      description: "",
      date: dayjs(),
      ticket: "",
      lodging: "",
      boarding: "",
      phone: "",
      localConveyance: "",
      incidentals: "",
      others: "",
    },
  ]);
  const handleEditRecordTableRowSubmit = (formData, index) => {
    const updatedData = [...editRecordTableData];
    updatedData[index] = formData;
    setEditRecordTableData(updatedData);
  };

  const viewRecordTableColumns = [
    {
      name: "description",
      label: "Description",
      type: "textarea",
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "Date",
      name: "date",
      defaultValue: dayjs("2023-10-01"),
    },
    { name: "ticket", label: "Ticket", type: "text", defaultValue: "" },
    { name: "lodging", label: "Lodging", type: "text", defaultValue: "" },
    { name: "boarding", label: "Boarding", type: "text", defaultValue: "" },
    { name: "phone", label: "Phone", type: "text", defaultValue: "" },
    {
      name: "localConveyance",
      label: "Local Conveyance",
      type: "text",
      defaultValue: "",
    },
    {
      name: "incidentals",
      label: "Incidentals",
      type: "text",
      defaultValue: "",
    },
    { name: "others", label: "Others", type: "text", defaultValue: "" },
    {
      type: "select",
      name: "currency",
      label: "Currency",
      options: [
        { label: "Select", value: "select" },
        { label: "Dinor", value: "dinor" },
        { label: "Dollar", value: "dollar" },
        { label: "Euro", value: "euro" },
        { label: "Pound", value: "pound" },
        { label: "Yen", value: "yen" },
      ],
      defaultValue: "select",
    },
    { name: "actions", label: "Actions", type: "actions" },
  ];
  const [viewRecordTableData, setViewRecordTableData] = useState([
    {
      description: "",
      date: dayjs(),
      ticket: "",
      lodging: "",
      boarding: "",
      phone: "",
      localConveyance: "",
      incidentals: "",
      others: "",
    },
  ]);

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
        onClose={() => {
          setAddRecordModal(false);
        }}
        onSubmit={handleAddRecordFormSubmit}
        isScrollable={true}
      >
        <div className="w-full flex gap-3 flex-col justify-end items-center p-3 rounded-lg border border-gray-800">
          <div className="w-full flex justify-end">
            <Button
              variant="contained"
              onClick={() => {
                const newRow = {
                  description: "",
                  date: dayjs(),
                  ticket: "",
                  lodging: "",
                  boarding: "",
                  phone: "",
                  localConveyance: "",
                  incidentals: "",
                  others: "",
                };
                setAddRecordTableData((prevData) => [...prevData, newRow]);
              }}
            >
              Add Row
            </Button>
          </div>
          <CustomInputTable
            columns={addRecordTableColumns}
            data={addRecordTableData}
            onSubmit={handleAddRecordTableRowSubmit}
          />
        </div>
      </CustomModal>
      <CustomModal
        title="Edit Record"
        fields={editRecordModalFields}
        open={editRecordModal}
        onClose={() => setEditRecordModal(false)}
        onSubmit={handleEditRecordFormSubmit}
        isScrollable={true}
      >
        <div className="w-full flex gap-3 flex-col justify-end items-center p-3 rounded-lg border border-gray-800">
          <div className="w-full flex justify-end">
            <Button
              variant="contained"
              onClick={() => {
                const newRow = {
                  description: "",
                  date: dayjs(),
                  ticket: "",
                  lodging: "",
                  boarding: "",
                  phone: "",
                  localConveyance: "",
                  incidentals: "",
                  others: "",
                };
                setEditRecordTableData((prevData) => [...prevData, newRow]);
              }}
            >
              Add Row
            </Button>
          </div>
          <CustomInputTable
            columns={editRecordTableColumns}
            data={editRecordTableData}
            onSubmit={handleEditRecordTableRowSubmit}
          />
        </div>
      </CustomModal>
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
      >
        <CustomInputTable
          columns={viewRecordTableColumns}
          data={viewRecordTableData}
          onSubmit={() => {}}
          isView={true}
        />
      </CustomModal>
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
