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
  Avatar,
  Tabs,
  Tab,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import { IoFilter, IoArrowBackCircleOutline } from "react-icons/io5";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiExport, CiImport } from "react-icons/ci";
import { LiaTrashAlt } from "react-icons/lia";
import CustomTable from "../../../components/CustomTable";
import Pagination from "../../../components/Pagination";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CustomModal from "../../../components/CustomModal";
import CustomInputTable from "../../../components/CustomInputTable";
import CustomEmptyModal from "../../../components/CustomEmptyModal";
import { CiCirclePlus } from "react-icons/ci";
import CreateTableView from "../../../components/CreateTableView";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";

export default function Employees() {
  const [filterModal, setFilterModal] = useState(false);
  const [addEmployeeModal, setAddEmployeeModal] = useState(false);
  const [editEmployeeModal, setEditEmployeeModal] = useState(false);
  const [viewEmployeeModal, setViewEmployeeModal] = useState(false);

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
  const renderActions = (row) => (
    <IconButton>
      <LiaTrashAlt />
    </IconButton>
  );
  const handleRowClick = (row) => {
    setViewEmployeeModal(true);
  };

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
    employeeStatus: "allEmployees",
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

  const addEmployeeModalFields = [
    {
      type: "autocomplete",
      name: "employeeID",
      label: "Employee ID",
      options: ["EmployeeID 1", "EmployeeID 2"],
      defaultValue: "",
    },
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      defaultValue: "",
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      defaultValue: "",
    },
    {
      type: "text",
      name: "nickname",
      label: "Nick Name",
      defaultValue: "",
    },
    {
      type: "text",
      name: "email",
      label: "Email Address",
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "department",
      label: "Department",
      options: ["HR", "Management", "Marketing", "IT"],
      defaultValue: "",
    },
    {
      type: "text",
      name: "designation",
      label: "Designation",
      defaultValue: "",
    },
    {
      type: "text",
      name: "clikkleHR",
      label: "Clikkle HR",
      defaultValue: "",
    },
    {
      type: "select",
      name: "employmentType",
      label: "Employment Type",
      options: [
        { label: "Full-time", value: "full-time" },
        { label: "Part-time", value: "part-time" },
        { label: "Contract", value: "contract" },
      ],
      defaultValue: "full-time",
    },
    {
      type: "select",
      name: "employeeStatus",
      label: "Employee Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
      defaultValue: "active",
    },
    {
      type: "text",
      name: "sourceOfHire",
      label: "Source of Hire",
      defaultValue: "",
    },
    {
      type: "datePicker",
      name: "dateOfJoining",
      label: "Date of Joining",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "text",
      name: "currentExperience",
      label: "Current Experience",
      defaultValue: "",
    },
    {
      type: "text",
      name: "totalExperience",
      label: "Total Experience",
      defaultValue: "",
    },
    {
      type: "text",
      name: "reportingManager",
      label: "Reporting Manager",
      defaultValue: "",
    },
    {
      type: "datePicker",
      name: "dateOfBirth",
      label: "Date of Birth",
      defaultValue: dayjs("1990-01-01"),
    },
    {
      type: "text",
      name: "age",
      label: "Age",
      defaultValue: "",
    },
    {
      type: "select",
      name: "gender",
      label: "Gender",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
      ],
      defaultValue: "male",
    },
    {
      type: "select",
      name: "maritalStatus",
      label: "Marital Status",
      options: [
        { label: "Single", value: "single" },
        { label: "Married", value: "married" },
        { label: "Divorced", value: "divorced" },
      ],
      defaultValue: "single",
    },
    {
      type: "text",
      name: "aboutMe",
      label: "About Me",
      defaultValue: "",
    },
    {
      type: "text",
      name: "expertise",
      label: "Ask me about/Expertise",
      defaultValue: "",
    },
    {
      type: "text",
      name: "workPhoneNumber",
      label: "Work Phone Number",
      defaultValue: "",
    },
    {
      type: "text",
      name: "extension",
      label: "Extension",
      defaultValue: "",
    },
    {
      type: "text",
      name: "seatingLocation",
      label: "Seating Location",
      defaultValue: "",
    },
    {
      type: "text",
      name: "tags",
      label: "Tags",
      defaultValue: "",
    },
    {
      type: "text",
      name: "personalMobileNumber",
      label: "Personal Mobile Number",
      defaultValue: "",
    },
    {
      type: "text",
      name: "personalEmailAddress",
      label: "Personal Email Address",
      defaultValue: "",
    },
    {
      type: "datePicker",
      name: "dateOfExit",
      label: "Date of Exit",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "text",
      name: "addedBy",
      label: "Added By",
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
      name: "addedTime",
      label: "Added Time",
      defaultValue: "",
    },
    {
      type: "text",
      name: "modifiedTime",
      label: "Modified Time",
      defaultValue: "",
    },
    {
      type: "select",
      name: "onboardingStatus",
      label: "Onboarding Status",
      options: [
        { label: "Completed", value: "completed" },
        { label: "Pending", value: "pending" },
      ],
      defaultValue: "completed",
    },
    {
      type: "text",
      name: "presentAddress",
      label: "Present Address",
      defaultValue: "",
    },
    {
      type: "text",
      name: "permanentAddress",
      label: "Permanent Address",
      defaultValue: "",
    },
  ];

  const handleAddEmployeeFormSubmit = (data) => {
    console.log("Add Form :- ", data);
  };

  const editWorkExperienceTableColumns = [
    {
      type: "text",
      label: "Company Name",
      name: "companyName",
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "From",
      name: "from",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "datePicker",
      label: "To",
      name: "to",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "textarea",
      label: "Job Description",
      name: "jobDescription",
      defaultValue: "",
    },
    {
      type: "select",
      name: "relevant",
      label: "Relevant",
      options: [
        { label: "Select", value: "select" },
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
      defaultValue: "select",
    },
    { name: "actions", label: "Actions", type: "actions" },
  ];
  const [editWorkExperienceTableData, setEditWorkExperienceTableData] =
    useState([
      {
        companyName: "",
        from: dayjs("2023-10-01"),
        to: dayjs("2023-10-01"),
        jobDescription: "",
        relevant: "select",
      },
    ]);
  const handleEditWorkExperienceTableRowSubmit = (formData, index) => {
    const updatedData = [...editWorkExperienceTableData];
    updatedData[index] = formData;
    setEditWorkExperienceTableData(updatedData);
  };

  const editEducationDetailsTableColumns = [
    {
      type: "text",
      label: "Institute Name",
      name: "instituteName",
      defaultValue: "",
    },
    {
      type: "text",
      label: "Degree/Diploma",
      name: "degree",
      defaultValue: "",
    },
    {
      type: "text",
      label: "Specialization",
      name: "specialization",
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "Date of Completion",
      name: "dateOfCompletion",
      defaultValue: dayjs(),
    },
    { name: "actions", label: "Actions", type: "actions" },
  ];
  const [editEducationDetailsTableData, setEditEducationDetailsTableData] =
    useState([
      {
        instituteName: "",
        degree: "",
        specialization: "",
        dateOfCompletion: dayjs(),
      },
    ]);
  const handleEditEducationDetailsTableRowSubmit = (formData, index) => {
    const updatedData = [...editEducationDetailsTableData];
    updatedData[index] = formData;
    setEditEducationDetailsTableData(updatedData);
  };

  const editDependentDetailsTableColumns = [
    {
      type: "text",
      label: "Name",
      name: "name",
      defaultValue: "",
    },
    {
      type: "select",
      label: "Relationship",
      name: "relationship",
      options: [
        { label: "Select", value: "" },
        { label: "Spouse", value: "spouse" },
        { label: "Child", value: "child" },
        { label: "Parent", value: "parent" },
      ],
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "Date of Birth",
      name: "dateOfBirth",
      defaultValue: dayjs(),
    },
    { name: "actions", label: "Actions", type: "actions" },
  ];
  const [editDependentDetailsTableData, setEditDependentDetailsTableData] =
    useState([
      {
        name: "",
        relationship: "",
        dateOfBirth: dayjs(),
      },
    ]);
  const handleEditDependentDetailsTableRowSubmit = (formData, index) => {
    const updatedData = [...editDependentDetailsTableData];
    updatedData[index] = formData;
    setEditDependentDetailsTableData(updatedData);
  };

  const editEmployeeModalFields = [
    // Basic information section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Basic information</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="employeeID"
                    label="Employee ID"
                    variant="outlined"
                    value={formData.employeeID || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        employeeID: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="nickName"
                    label="Nick Name"
                    variant="outlined"
                    value={formData.nickName || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        nickName: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    value={formData.firstName || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        firstName: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    value={formData.lastName || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        lastName: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="emailAddress"
                    label="Email Address"
                    variant="outlined"
                    value={formData.emailAddress || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        emailAddress: event.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Work Information section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        const departments = [
          { label: "HR", value: "hr" },
          { label: "Finance", value: "finance" },
          { label: "IT", value: "it" },
          { label: "Marketing", value: "marketing" },
          { label: "Sales", value: "sales" },
        ];

        const locations = [
          { label: "New York", value: "newYork" },
          { label: "San Francisco", value: "sanFrancisco" },
          { label: "London", value: "london" },
          { label: "Berlin", value: "berlin" },
          { label: "Tokyo", value: "tokyo" },
        ];

        const designations = [
          { label: "Manager", value: "manager" },
          { label: "Developer", value: "developer" },
          { label: "Designer", value: "designer" },
          { label: "Analyst", value: "analyst" },
          { label: "Consultant", value: "consultant" },
        ];

        const clikkleRoles = [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Manager", value: "manager" },
          { label: "Guest", value: "guest" },
        ];

        const employmentTypes = [
          { label: "Full-Time", value: "fullTime" },
          { label: "Part-Time", value: "partTime" },
          { label: "Contract", value: "contract" },
          { label: "Intern", value: "intern" },
        ];

        const employeeStatuses = [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "On Leave", value: "onLeave" },
          { label: "Terminated", value: "terminated" },
        ];

        const sourcesOfHire = [
          { label: "Referral", value: "referral" },
          { label: "Job Portal", value: "jobPortal" },
          { label: "Campus", value: "campus" },
          { label: "Agency", value: "agency" },
        ];

        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Work Information</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {/* Department */}
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    label="Department"
                    variant="outlined"
                    value={formData.department}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        department: event.target.value,
                      }));
                    }}
                  >
                    {departments.map((dept, index) => (
                      <MenuItem key={index} value={dept.value}>
                        {dept.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Location */}
                <FormControl fullWidth>
                  <InputLabel>Location</InputLabel>
                  <Select
                    name="location"
                    label="Location"
                    variant="outlined"
                    value={formData.location}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        location: event.target.value,
                      }));
                    }}
                  >
                    {locations.map((loc, index) => (
                      <MenuItem key={index} value={loc.value}>
                        {loc.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Designation */}
                <FormControl fullWidth>
                  <InputLabel>Designation</InputLabel>
                  <Select
                    name="designation"
                    label="Designation"
                    variant="outlined"
                    value={formData.designation}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        designation: event.target.value,
                      }));
                    }}
                  >
                    {designations.map((desg, index) => (
                      <MenuItem key={index} value={desg.value}>
                        {desg.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Clikkle Role */}
                <FormControl fullWidth>
                  <InputLabel>Clikkle Role</InputLabel>
                  <Select
                    name="clikkleRole"
                    label="Clikkle Role"
                    variant="outlined"
                    value={formData.clikkleRole}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        clikkleRole: event.target.value,
                      }));
                    }}
                  >
                    {clikkleRoles.map((role, index) => (
                      <MenuItem key={index} value={role.value}>
                        {role.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Employment Type */}
                <FormControl fullWidth>
                  <InputLabel>Employment Type</InputLabel>
                  <Select
                    name="employmentType"
                    label="Employment Type"
                    variant="outlined"
                    value={formData.employmentType}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        employmentType: event.target.value,
                      }));
                    }}
                  >
                    {employmentTypes.map((type, index) => (
                      <MenuItem key={index} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Employee Status */}
                <FormControl fullWidth>
                  <InputLabel>Employee Status</InputLabel>
                  <Select
                    name="employeeStatus"
                    label="Employee Status"
                    variant="outlined"
                    value={formData.employeeStatus}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        employeeStatus: event.target.value,
                      }));
                    }}
                  >
                    {employeeStatuses.map((status, index) => (
                      <MenuItem key={index} value={status.value}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Source of Hire */}
                <FormControl fullWidth>
                  <InputLabel>Source of Hire</InputLabel>
                  <Select
                    name="sourceOfHire"
                    label="Source of Hire"
                    variant="outlined"
                    value={formData.sourceOfHire}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        sourceOfHire: event.target.value,
                      }));
                    }}
                  >
                    {sourcesOfHire.map((source, index) => (
                      <MenuItem key={index} value={source.value}>
                        {source.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Date of Joining */}
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="Date of Joining"
                      value={formData.dateOfJoining || null}
                      onChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          dateOfJoining: value,
                        }));
                      }}
                    />
                  </LocalizationProvider>
                </div>

                {/* Current Experience */}
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="currentExperience"
                    label="Current Experience"
                    variant="outlined"
                    value={formData.currentExperience || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        currentExperience: event.target.value,
                      }));
                    }}
                    disabled
                  />
                </div>

                {/* Total Experience */}
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="totalExperience"
                    label="Total Experience"
                    variant="outlined"
                    value={formData.totalExperience || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        totalExperience: event.target.value,
                      }));
                    }}
                    disabled
                  />
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Hierarchy Information
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        const reportingManagers = [
          { label: "Manager 1", value: "manager1" },
          { label: "Manager 2", value: "manager2" },
        ];

        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Hierarchy Information</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormControl fullWidth>
                  <InputLabel>Reporting Manager</InputLabel>
                  <Select
                    name="reportingManager"
                    label="Reporting Manager"
                    variant="outlined"
                    value={formData.reportingManager}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        reportingManager: event.target.value,
                      }));
                    }}
                  >
                    <MenuItem value="">Select</MenuItem>
                    {reportingManagers.map((manager, index) => (
                      <MenuItem key={index} value={manager.value}>
                        {manager.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </>
        );
      },
    },

    // Personal Details section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        const genders = [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ];
        const maritalStatuses = [
          { label: "Single", value: "single" },
          { label: "Married", value: "married" },
        ];

        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Personal Details</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="Date of Birth"
                      value={formData.dateOfBirth || null}
                      onChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          dateOfBirth: value,
                        }));
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="age"
                    label="Age"
                    variant="outlined"
                    value={formData.age || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        age: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="gender"
                      label="Gender"
                      variant="outlined"
                      value={formData.gender}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          gender: event.target.value,
                        }));
                      }}
                    >
                      {genders.map((gender, index) => (
                        <MenuItem key={index} value={gender.value}>
                          {gender.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl>
                    <FormLabel>Marital Status</FormLabel>
                    <RadioGroup
                      name="maritalStatus"
                      row
                      value={formData.maritalStatus}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          maritalStatus: event.target.value,
                        }));
                      }}
                    >
                      {maritalStatuses.map((status, index) => (
                        <FormControlLabel
                          key={index}
                          value={status.value}
                          control={<Radio />}
                          label={status.label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="aboutMe"
                    label="About Me / Expertise"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={formData.aboutMe || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        aboutMe: event.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Contact Details section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        const countries = [
          { label: "New York", value: "newYork" },
          { label: "San Francisco", value: "sanFrancisco" },
          { label: "London", value: "london" },
          { label: "Berlin", value: "berlin" },
          { label: "Tokyo", value: "tokyo" },
        ];
        const states = [
          { label: "New York", value: "newYork" },
          { label: "San Francisco", value: "sanFrancisco" },
          { label: "London", value: "london" },
          { label: "Berlin", value: "berlin" },
          { label: "Tokyo", value: "tokyo" },
        ];
        const countryCodes = [
          { label: "+1", value: "1" },
          { label: "+2", value: "2" },
          { label: "+3", value: "3" },
        ];

        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Contact Details</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="workPhoneNumber"
                    label="Work Phone Number"
                    variant="outlined"
                    value={formData.workPhoneNumber || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        workPhoneNumber: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="extension"
                    label="Extension"
                    variant="outlined"
                    value={formData.extension || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        extension: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="personalEmailAddress"
                    label="Personal Email Address"
                    variant="outlined"
                    value={formData.personalEmailAddress || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        personalEmailAddress: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="seatingLocation"
                    label="Seating Location"
                    variant="outlined"
                    value={formData.seatingLocation || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        seatingLocation: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="tags"
                    label="Tags"
                    variant="outlined"
                    value={formData.tags || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        tags: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="flex flex-row gap-3">
                  <FormControl fullWidth>
                    <InputLabel>Country Code</InputLabel>
                    <Select
                      name="countryCode"
                      label="Country Code"
                      variant="outlined"
                      value={formData.countryCode}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          countryCode: event.target.value,
                        }));
                      }}
                    >
                      {countryCodes.map((code, index) => (
                        <MenuItem key={index} value={code.value}>
                          {code.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    sx={{ width: "100%" }}
                    name="number"
                    label="Number"
                    variant="outlined"
                    value={formData.number || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        number: event.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <h1>Present Address</h1>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="presentAddress1"
                      label="Address line 1"
                      variant="outlined"
                      value={formData.presentAddress1 || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          presentAddress1: event.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="presentAddress2"
                      label="Address line 2"
                      variant="outlined"
                      value={formData.presentAddress2 || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          presentAddress2: event.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="presentCity"
                      label="City"
                      variant="outlined"
                      value={formData.presentCity || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          presentCity: event.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel>Country</InputLabel>
                      <Select
                        name="presentAddressCountry"
                        label="Country"
                        variant="outlined"
                        value={formData.presentAddressCountry}
                        onChange={(event) => {
                          setFormData((prev) => ({
                            ...prev,
                            presentAddressCountry: event.target.value,
                          }));
                        }}
                      >
                        {countries.map((country, index) => (
                          <MenuItem key={index} value={country.value}>
                            {country.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel>State</InputLabel>
                      <Select
                        name="presentAddressState"
                        label="State"
                        variant="outlined"
                        value={formData.presentAddressState}
                        onChange={(event) => {
                          setFormData((prev) => ({
                            ...prev,
                            presentAddressState: event.target.value,
                          }));
                        }}
                      >
                        {states.map((state, index) => (
                          <MenuItem key={index} value={state.value}>
                            {state.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="presentPostalCode"
                      label="Postal Code"
                      variant="outlined"
                      value={formData.presentPostalCode || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          presentPostalCode: event.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <FormControl fullWidth margin="normal">
                  <FormLabel component="legend">
                    Same as Present Address
                  </FormLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        placeholder="Same"
                        checked={formData.sameAsPresentAddress || false}
                        onChange={(event) => {
                          const isChecked = event.target.checked;
                          setFormData((prev) => {
                            const updatedFormData = {
                              ...prev,
                              sameAsPresentAddress: isChecked,
                            };

                            if (isChecked) {
                              // Copy Present Address to Permanent Address
                              updatedFormData.permanentAddress1 =
                                prev.presentAddress1 || "";
                              updatedFormData.permanentAddress2 =
                                prev.presentAddress2 || "";
                              updatedFormData.permanentCity =
                                prev.presentCity || "";
                              updatedFormData.permanentAddressCountry =
                                prev.presentAddressCountry || "";
                              updatedFormData.permanentAddressState =
                                prev.presentAddressState || "";
                              updatedFormData.permanentPostalCode =
                                prev.presentPostalCode || "";
                            } else {
                              // Optionally, reset Permanent Address fields when unchecked
                              updatedFormData.permanentAddress1 = "";
                              updatedFormData.permanentAddress2 = "";
                              updatedFormData.permanentCity = "";
                              updatedFormData.permanentAddressCountry = "";
                              updatedFormData.permanentAddressState = "";
                              updatedFormData.permanentPostalCode = "";
                            }

                            return updatedFormData;
                          });
                        }}
                      />
                    }
                    label="Same as Present Address"
                    margin="normal"
                  />
                </FormControl>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <h1>Permanent Address</h1>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="permanentAddress1"
                      label="Address line 1"
                      variant="outlined"
                      value={formData.permanentAddress1 || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          permanentAddress1: event.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="permanentAddress2"
                      label="Address line 2"
                      variant="outlined"
                      value={formData.permanentAddress2 || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          permanentAddress2: event.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="permanentCity"
                      label="City"
                      variant="outlined"
                      value={formData.permanentCity || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          permanentCity: event.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel>Country</InputLabel>
                      <Select
                        name="permanentAddressCountry"
                        label="Country"
                        variant="outlined"
                        value={formData.permanentAddressCountry}
                        onChange={(event) => {
                          setFormData((prev) => ({
                            ...prev,
                            permanentAddressCountry: event.target.value,
                          }));
                        }}
                      >
                        {countries.map((country, index) => (
                          <MenuItem key={index} value={country.value}>
                            {country.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel>State</InputLabel>
                      <Select
                        name="permanentAddressState"
                        label="State"
                        variant="outlined"
                        value={formData.permanentAddressState}
                        onChange={(event) => {
                          setFormData((prev) => ({
                            ...prev,
                            permanentAddressState: event.target.value,
                          }));
                        }}
                      >
                        {states.map((state, index) => (
                          <MenuItem key={index} value={state.value}>
                            {state.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="permanentPostalCode"
                      label="Postal Code"
                      variant="outlined"
                      value={formData.permanentPostalCode || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          permanentPostalCode: event.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Separation Information section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Separation Information</h1>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="Date of Exit"
                      value={formData.dateOfExit || null}
                      onChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          dateOfExit: value,
                        }));
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // System Fields section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>System Fields</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="addedBy"
                    label="Added By"
                    variant="outlined"
                    value={formData.addedBy || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="addedTime"
                    label="Added Time"
                    variant="outlined"
                    value={formData.addedTime || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="modifiedBy"
                    label="Modified By"
                    variant="outlined"
                    value={formData.modifiedBy || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="modifiedTime"
                    label="Modified Time"
                    variant="outlined"
                    value={formData.modifiedTime || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="onboardingStatus"
                    label="Onboarding Status"
                    variant="outlined"
                    value={formData.onboardingStatus || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Work experience section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <CustomInputTable
              columns={editWorkExperienceTableColumns}
              data={editWorkExperienceTableData}
              onSubmit={handleEditWorkExperienceTableRowSubmit}
            />
          </>
        );
      },
    },

    // Education Details section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <CustomInputTable
              columns={editEducationDetailsTableColumns}
              data={editEducationDetailsTableData}
              onSubmit={handleEditEducationDetailsTableRowSubmit}
            />
          </>
        );
      },
    },

    // Dependent Details section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <CustomInputTable
              columns={editDependentDetailsTableColumns}
              data={editDependentDetailsTableData}
              onSubmit={handleEditDependentDetailsTableRowSubmit}
            />
          </>
        );
      },
    },
  ];

  const handleEditEmployeeFormSubmit = (data) => {
    console.log("Edit  Form Data :- ", {
      data,
      workExperience: editWorkExperienceTableData,
      educationDetails: editEducationDetailsTableData,
      dependentDetails: editDependentDetailsTableData,
    });
    setEditEmployeeModal(false);
  };

  const viewWorkExperienceTableColumns = [
    {
      type: "text",
      label: "Company Name",
      name: "companyName",
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "From",
      name: "from",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "datePicker",
      label: "To",
      name: "to",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "textarea",
      label: "Job Description",
      name: "jobDescription",
      defaultValue: "",
    },
    {
      type: "select",
      name: "relevant",
      label: "Relevant",
      options: [
        { label: "Select", value: "select" },
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
      defaultValue: "select",
    },
  ];
  const [viewWorkExperienceTableData, setViewWorkExperienceTableData] =
    useState([
      {
        companyName: "",
        from: dayjs("2023-10-01"),
        to: dayjs("2023-10-01"),
        jobDescription: "",
        relevant: "select",
      },
    ]);

  const viewEducationDetailsTableColumns = [
    {
      type: "text",
      label: "Institute Name",
      name: "instituteName",
      defaultValue: "",
    },
    {
      type: "text",
      label: "Degree/Diploma",
      name: "degree",
      defaultValue: "",
    },
    {
      type: "text",
      label: "Specialization",
      name: "specialization",
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "Date of Completion",
      name: "dateOfCompletion",
      defaultValue: dayjs(),
    },
  ];
  const [viewEducationDetailsTableData, setViewEducationDetailsTableData] =
    useState([
      {
        instituteName: "",
        degree: "",
        specialization: "",
        dateOfCompletion: dayjs(),
      },
    ]);

  const viewDependentDetailsTableColumns = [
    {
      type: "text",
      label: "Name",
      name: "name",
      defaultValue: "",
    },
    {
      type: "select",
      label: "Relationship",
      name: "relationship",
      options: [
        { label: "Select", value: "" },
        { label: "Spouse", value: "spouse" },
        { label: "Child", value: "child" },
        { label: "Parent", value: "parent" },
      ],
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "Date of Birth",
      name: "dateOfBirth",
      defaultValue: dayjs(),
    },
  ];
  const [viewDependentDetailsTableData, setViewDependentDetailsTableData] =
    useState([
      {
        name: "",
        relationship: "",
        dateOfBirth: dayjs(),
      },
    ]);

  const viewEmployeeModalFields = [
    // Basic information section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Basic information</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="employeeID"
                    label="Employee ID"
                    variant="outlined"
                    value={formData.employeeID || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="nickName"
                    label="Nick Name"
                    variant="outlined"
                    value={formData.nickName || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    value={formData.firstName || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    value={formData.lastName || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="emailAddress"
                    label="Email Address"
                    variant="outlined"
                    value={formData.emailAddress || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Work Information section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Work Information</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="department"
                    label="Department"
                    variant="outlined"
                    value={formData.department || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="location"
                    label="Location"
                    variant="outlined"
                    value={formData.location || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="designation"
                    label="Designation"
                    variant="outlined"
                    value={formData.designation || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="clikkleRole"
                    label="Clikkle Role"
                    variant="outlined"
                    value={formData.clikkleRole || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="employmentType"
                    label="Employment Type"
                    variant="outlined"
                    value={formData.employmentType || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="employeeStatus"
                    label="Employee Status"
                    variant="outlined"
                    value={formData.employeeStatus || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="sourceOfHire"
                    label="Source of Hire"
                    variant="outlined"
                    value={formData.sourceOfHire || ""}
                    disabled
                  />
                </div>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="Date of Joining"
                      value={formData.dateOfJoining || null}
                      disabled
                    />
                  </LocalizationProvider>
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="currentExperience"
                    label="Current Experience"
                    variant="outlined"
                    value={formData.currentExperience || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="totalExperience"
                    label="Total Experience"
                    variant="outlined"
                    value={formData.totalExperience || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Hierarchy Information
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Hierarchy Information</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="reportingManager"
                    label="Reporting Manager"
                    variant="outlined"
                    value={formData.reportingManager || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Personal Details section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Personal Details</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="Date of Birth"
                      value={formData.dateOfBirth || null}
                      disabled
                    />
                  </LocalizationProvider>
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="age"
                    label="Age"
                    variant="outlined"
                    value={formData.age || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="gender"
                    label="Gender"
                    variant="outlined"
                    value={formData.gender || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="maritalStatus"
                    label="Marital Status"
                    variant="outlined"
                    value={formData.maritalStatus || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="aboutMe"
                    label="About Me / Expertise"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={formData.aboutMe || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Contact Details section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Contact Details</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="workPhoneNumber"
                    label="Work Phone Number"
                    variant="outlined"
                    value={formData.workPhoneNumber || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="extension"
                    label="Extension"
                    variant="outlined"
                    value={formData.extension || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="personalEmailAddress"
                    label="Personal Email Address"
                    variant="outlined"
                    value={formData.personalEmailAddress || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="seatingLocation"
                    label="Seating Location"
                    variant="outlined"
                    value={formData.seatingLocation || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="tags"
                    label="Tags"
                    variant="outlined"
                    value={formData.tags || ""}
                    disabled
                  />
                </div>
                <div className="flex flex-row gap-3">
                  <TextField
                    sx={{ width: "100%" }}
                    name="countryCode"
                    label="Country Code"
                    variant="outlined"
                    value={formData.countryCode || ""}
                    disabled
                  />
                  <TextField
                    sx={{ width: "100%" }}
                    name="number"
                    label="Number"
                    variant="outlined"
                    value={formData.number || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <h1>Present Address</h1>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="presentAddress1"
                      label="Address line 1"
                      variant="outlined"
                      value={formData.presentAddress1 || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="presentAddress2"
                      label="Address line 2"
                      variant="outlined"
                      value={formData.presentAddress2 || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="presentCity"
                      label="City"
                      variant="outlined"
                      value={formData.presentCity || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="presentAddressCountry"
                      label="Country"
                      variant="outlined"
                      value={formData.presentAddressCountry || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="presentAddressState"
                      label="State"
                      variant="outlined"
                      value={formData.presentAddressState || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="presentPostalCode"
                      label="Postal Code"
                      variant="outlined"
                      value={formData.presentPostalCode || ""}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div>
                <FormControl fullWidth margin="normal">
                  <FormLabel component="legend">
                    Same as Present Address
                  </FormLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        placeholder="Same"
                        checked={formData.sameAsPresentAddress || false}
                        disabled
                      />
                    }
                    label="Same as Present Address"
                    margin="normal"
                  />
                </FormControl>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <h1>Permanent Address</h1>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="permanentAddress1"
                      label="Address line 1"
                      variant="outlined"
                      value={formData.permanentAddress1 || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="permanentAddress2"
                      label="Address line 2"
                      variant="outlined"
                      value={formData.permanentAddress2 || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="permanentCity"
                      label="City"
                      variant="outlined"
                      value={formData.permanentCity || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="permanentAddressCountry"
                      label="Country"
                      variant="outlined"
                      value={formData.permanentAddressCountry || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="permanentAddressState"
                      label="State"
                      variant="outlined"
                      value={formData.permanentAddressState || ""}
                      disabled
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="permanentPostalCode"
                      label="Postal Code"
                      variant="outlined"
                      value={formData.permanentPostalCode || ""}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Separation Information section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Separation Information</h1>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="Date of Exit"
                      value={formData.dateOfExit || null}
                      disabled
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // System Fields section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>System Fields</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="addedBy"
                    label="Added By"
                    variant="outlined"
                    value={formData.addedBy || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="addedTime"
                    label="Added Time"
                    variant="outlined"
                    value={formData.addedTime || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="modifiedBy"
                    label="Modified By"
                    variant="outlined"
                    value={formData.modifiedBy || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="modifiedTime"
                    label="Modified Time"
                    variant="outlined"
                    value={formData.modifiedTime || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="onboardingStatus"
                    label="Onboarding Status"
                    variant="outlined"
                    value={formData.onboardingStatus || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Work experience section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <CustomInputTable
              columns={viewWorkExperienceTableColumns}
              data={viewWorkExperienceTableData}
              onSubmit={() => {}}
              isView={true}
            />
          </>
        );
      },
    },

    // Education Details section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <CustomInputTable
              columns={viewEducationDetailsTableColumns}
              data={viewEducationDetailsTableData}
              onSubmit={() => {}}
              isView={true}
            />
          </>
        );
      },
    },

    // Dependent Details section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <CustomInputTable
              columns={viewDependentDetailsTableColumns}
              data={viewDependentDetailsTableData}
              isView={true}
            />
          </>
        );
      },
    },
  ];

  const [createTableViewModal, setCreateTableViewModal] = useState(false);
  const [createTableViewForm, setCreateTableViewForm] = useState({
    view_name: "",
    default: false,
    viewPermission: "onlyMe",
    permission: {
      users: ["8889"],
      // departments: ["1", "2"],
      // roles: ["1", "2"],
      // locations: ["1", "2"],
    },
    select_columns: [
      // {
      //   title: "EmployeeID",
      //   key: "employee.employee_id",
      // },
      // {
      //   title: "First Name",
      //   key: "employee.name",
      // },
    ],
    criterias: [
      {
        relationship: null,
        column: null,
        title: "",
        condition: null,
        value: null,
      },
    ],
  });
  const createTableViewColumns = [
    {
      label: "Employee",
      key: "employee",
      options: [
        { title: "Employee 1", name: "employee1" },
        { title: "Employee 2", name: "employee2" },
      ],
    },
    {
      label: "Department",
      key: "department",
      options: [
        { title: "Department 1", name: "department1" },
        { title: "Department 2", name: "department2" },
      ],
    },
    {
      label: "Location",
      key: "location",
      options: [
        { title: "Location 1", name: "location1" },
        { title: "Location 2", name: "location2" },
      ],
    },
    {
      label: "Designation",
      key: "designation",
      options: [
        { title: "Designation 1", name: "designation1" },
        { title: "Designation 2", name: "designation2" },
      ],
    },
    {
      label: "Reporting Manager",
      key: "reportingManager",
      options: [
        { title: "Reporting Manager 1", name: "reportingManager1" },
        { title: "Reporting Manager 2", name: "reportingManager2" },
      ],
    },
    {
      label: "Added By",
      key: "addedBy",
      options: [
        { title: "Added By 1", name: "addedBy1" },
        { title: "Added By 2", name: "addedBy2" },
      ],
    },
    {
      label: "Modified By",
      key: "modifiedBy",
      options: [
        { title: "Modified By 1", name: "modifiedBy1" },
        { title: "Modified By 2", name: "modifiedBy2" },
      ],
    },
    {
      label: "Present Address",
      key: "presentAddress",
      options: [
        { title: "Present Address 1", name: "presentAddress1" },
        { title: "Present Address 2", name: "presentAddress2" },
      ],
    },
    {
      label: "Permanent Address",
      key: "permanentAddress",
      options: [
        { title: "Permanent Address 1", name: "permanentAddress1" },
        { title: "Permanent Address 2", name: "permanentAddress2" },
      ],
    },
  ];
  const createTableViewSpecifics = [
    {
      label: "User",
      options: [
        { title: "Hello 1", id: "hello1" },
        { title: "Hello 2", id: "hello2" },
      ],
    },
    {
      label: "Department",
      options: [
        { title: "Hello 1", id: "hello1" },
        { title: "Hello 2", id: "hello2" },
      ],
    },
    {
      label: "Role",
      options: [
        { title: "Hello 1", id: "hello1" },
        { title: "Hello 2", id: "hello2" },
      ],
    },
    {
      label: "Locations",
      options: [
        { title: "Hello 1", id: "hello1" },
        { title: "Hello 2", id: "hello2" },
      ],
    },
  ];
  const createTableViewCriterias = [
    {
      label: "Employee",
      key: "employee",
      options: [
        { title: "Employee ID", key: "employee", name: "employeeID" },
        { title: "Full Name", key: "employee", name: "fullName" },
      ],
    },
    {
      label: "Department",
      key: "department",
      options: [
        { title: "Department 1", key: "department", name: "department1" },
        { title: "Department 2", key: "department", name: "department2" },
      ],
    },
    {
      label: "Location",
      key: "location",
      options: [
        { title: "Location 1", key: "location", name: "location1" },
        { title: "Location 2", key: "location", name: "location2" },
      ],
    },
    {
      label: "Designation",
      key: "designation",
      options: [
        { title: "Designation 1", key: "designation", name: "designation1" },
        { title: "Designation 2", key: "designation", name: "designation2" },
      ],
    },
    {
      label: "Reporting Manager",
      key: "reportingManager",
      options: [
        {
          title: "Reporting Manager 1",
          key: "reportingManager",
          name: "reportingManager1",
        },
        {
          title: "Reporting Manager 2",
          key: "reportingManager",
          name: "reportingManager2",
        },
      ],
    },
    {
      label: "Added By",
      key: "addedBy",
      options: [
        { title: "Added By 1", key: "addedBy", name: "addedBy1" },
        { title: "Added By 2", key: "addedBy", name: "addedBy2" },
      ],
    },
    {
      label: "Modified By",
      key: "modifiedBy",
      options: [
        { title: "Modified By 1", key: "modifiedBy", name: "modifiedBy1" },
        { title: "Modified By 2", key: "modifiedBy", name: "modifiedBy2" },
      ],
    },
    {
      label: "Present Address",
      key: "presentAddress",
      options: [
        {
          title: "Present Address 1",
          key: "presentAddress",
          name: "presentAddress1",
        },
        {
          title: "Present Address 2",
          key: "presentAddress",
          name: "presentAddress2",
        },
      ],
    },
    {
      label: "Permanent Address",
      key: "permanentAddress",
      options: [
        {
          title: "Permanent Address 1",
          key: "permanentAddress",
          name: "permanentAddress1",
        },
        {
          title: "Permanent Address 2",
          key: "permanentAddress",
          name: "permanentAddress2",
        },
      ],
    },
  ];
  const createTableViewCriteriasOptions = [
    {
      label: "Employee",
      key: "employee",
      options: [
        { type: "text", title: "Option 1", key: "employee", name: "option1" },
        { type: "text", title: "Option 2", key: "employee", name: "option2" },
      ],
    },
    {
      label: "Department",
      key: "department",
      options: [
        {
          type: "select",
          options: [
            { title: "Option 1", key: "department", name: "option1" },
            { title: "Option 2", key: "department", name: "option2" },
          ],
          title: "Option 1",
          key: "department",
          name: "option1",
        },
        { type: "text", title: "Option 2", key: "department", name: "option2" },
      ],
    },
    {
      label: "Location",
      key: "location",
      options: [
        {
          type: "datetime",
          title: "Option 1",
          key: "location",
          name: "option1",
        },
        {
          type: "datetime",
          title: "Option 2",
          key: "location",
          name: "option2",
        },
      ],
    },
    {
      label: "Designation",
      key: "designation",
      options: [
        {
          type: "none",
          title: "Option 1",
          key: "designation",
          name: "option1",
        },
        {
          type: "text",
          title: "Option 2",
          key: "designation",
          name: "option2",
        },
      ],
    },
    {
      label: "Reporting Manager",
      key: "reportingManager",
      options: [
        {
          type: "text",
          title: "Option 1",
          key: "reportingManager",
          name: "option1",
        },
        {
          type: "text",
          title: "Option 2",
          key: "reportingManager",
          name: "option2",
        },
      ],
    },
    {
      label: "Added By",
      key: "addedBy",
      options: [
        { type: "text", title: "Option 1", key: "addedBy", name: "option1" },
        { type: "text", title: "Option 2", key: "addedBy", name: "option2" },
      ],
    },
    {
      label: "Modified By",
      key: "modifiedBy",
      options: [
        { type: "text", title: "Option 1", key: "modifiedBy", name: "option1" },
        { type: "text", title: "Option 2", key: "modifiedBy", name: "option2" },
      ],
    },
    {
      label: "Present Address",
      key: "presentAddress",
      options: [
        {
          type: "text",
          title: "Option 1",
          key: "presentAddress",
          name: "option1",
        },
        {
          type: "text",
          title: "Option 2",
          key: "presentAddress",
          name: "option2",
        },
      ],
    },
    {
      label: "Permanent Address",
      key: "permanentAddress",
      options: [
        {
          type: "text",
          title: "Option 1",
          key: "permanentAddress",
          name: "option1",
        },
        {
          type: "text",
          title: "Option 2",
          key: "permanentAddress",
          name: "option2",
        },
      ],
    },
  ];
  const createTableViewCriteriasRelationships = [
    { title: "AND", name: "and" },
    { title: "OR", name: "or" },
  ];

  return (
    <div className="w-full min-h-80 flex flex-col">
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
                      setCreateTableViewModal(true);
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

        <div className="flex flex-row gap-3">
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
              setAddEmployeeModal(true);
            }}
          >
            Add Employee
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
        title="Add Employee"
        fields={addEmployeeModalFields}
        open={addEmployeeModal}
        onClose={() => {
          setAddEmployeeModal(false);
        }}
        onSubmit={handleAddEmployeeFormSubmit}
        isScrollable={true}
      />
      <CustomModal
        title="Edit Employee"
        fields={editEmployeeModalFields}
        open={editEmployeeModal}
        onClose={() => {
          setEditEmployeeModal(false);
        }}
        onSubmit={handleEditEmployeeFormSubmit}
        isScrollable={true}
      />
      <CustomModal
        title="View Employee"
        fields={viewEmployeeModalFields}
        open={viewEmployeeModal}
        onClose={() => setViewEmployeeModal(false)}
        isView={true}
        isScrollable={true}
        isEditButton={true}
        onEditButtonClick={() => {
          setViewEmployeeModal(false);
          setEditEmployeeModal(true);
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
                    <MenuItem value={"allEmployees"}>All Employees</MenuItem>
                    <MenuItem value={"allActiveEmployee"}>
                      All Active Employees
                    </MenuItem>
                    <MenuItem value={"exEmployee"}>Ex-Employees</MenuItem>
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

      <CreateTableView
        open={createTableViewModal}
        onClose={() => {
          setCreateTableViewModal(false);
        }}
        forWhom={"employee"}
        form={createTableViewForm}
        setForm={setCreateTableViewForm}
        columns={createTableViewColumns}
        specifics={createTableViewSpecifics}
        criterias={createTableViewCriterias}
        criteriasOptions={createTableViewCriteriasOptions}
        criteriasRelationships={createTableViewCriteriasRelationships}
      />
    </div>
  );
}
