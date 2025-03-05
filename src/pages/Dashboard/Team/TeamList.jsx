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
import CustomTable from "../../../components/CustomTable";
import Pagination from "../../../components/Pagination";
import dayjs from "dayjs";
import CustomModal from "../../../components/CustomModal";

export default function TeamList() {
  const [filterModal, setFilterModal] = useState(false);
  const [addRecordModal, setAddRecordModal] = useState(false);
  const [editRecordModal, setEditRecordModal] = useState(false);
  const [viewRecordModal, setViewRecordModal] = useState(false);

  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const totalPages = Math.ceil(totalItems / limit);

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

  const columns = [
    { field: "employeeID", label: "Employee ID", sortable: true },
    { field: "firstName", label: "First Name", sortable: true },
    { field: "lastName", label: "Last Name", sortable: true },
    { field: "nickname", label: "Nick Name", sortable: true },
    { field: "email", label: "Email Address", sortable: true },
    { field: "department", label: "Department", sortable: true },
    { field: "designation", label: "Designation", sortable: true },
    { field: "clikkleHR", label: "Clikkle HR", sortable: true },
    { field: "employmentType", label: "Employment Type", sortable: true },
    { field: "employeeStatus", label: "Employee Status", sortable: true },
    { field: "sourceOfHire", label: "Source of Hire", sortable: true },
    { field: "dateOfJoining", label: "Date of Joining", sortable: true },
    { field: "currentExperience", label: "Current Experience", sortable: true },
    { field: "totalExperience", label: "Total Experience", sortable: true },
    { field: "reportingManager", label: "Reporting Manager", sortable: true },
    { field: "dateOfBirth", label: "Date of Birth", sortable: true },
    { field: "age", label: "Age", sortable: true },
    { field: "gender", label: "Gender", sortable: true },
    { field: "maritalStatus", label: "Marital Status", sortable: true },
    { field: "aboutMe", label: "About Me", sortable: true },
    { field: "expertise", label: "Ask me about/Expertise", sortable: true },
    { field: "workPhoneNumber", label: "Work Phone Number", sortable: true },
    { field: "extension", label: "Extension", sortable: true },
    { field: "seatingLocation", label: "Seating Location", sortable: true },
    { field: "tags", label: "Tags", sortable: true },
    {
      field: "personalMobileNumber",
      label: "Personal Mobile Number",
      sortable: true,
    },
    {
      field: "personalEmailAddress",
      label: "Personal Email Address",
      sortable: true,
    },
    { field: "dateOfExit", label: "Date of Exit", sortable: true },
    { field: "addedBy", label: "Added By", sortable: true },
    { field: "modifiedBy", label: "Modified By", sortable: true },
    { field: "addedTime", label: "Added Time", sortable: true },
    { field: "modifiedTime", label: "Modified Time", sortable: true },
    { field: "onboardingStatus", label: "Onboarding Status", sortable: true },
    { field: "presentAddress", label: "Present Address", sortable: true },
    { field: "permanentAddress", label: "Permanent Address", sortable: true },
  ];

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

  const handleSort = (column, direction) => {
    fetchData(column, direction);
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

  const addRecordModalFields = [
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
      disabled: true,
    },
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      defaultValue: "John",
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      defaultValue: "Doe",
    },
    {
      type: "text",
      name: "nickname",
      label: "Nick Name",
      defaultValue: "Johnny",
    },
    {
      type: "text",
      name: "email",
      label: "Email Address",
      defaultValue: "john.doe@example.com",
    },
    {
      type: "autocomplete",
      name: "department",
      label: "Department",
      options: ["HR", "Management", "Marketing", "IT"],
      defaultValue: "HR",
    },
    {
      type: "text",
      name: "designation",
      label: "Designation",
      defaultValue: "Manager",
    },
    {
      type: "text",
      name: "clikkleHR",
      label: "Clikkle HR",
      defaultValue: "Admin",
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
      defaultValue: "Referral",
    },
    {
      type: "datePicker",
      name: "dateOfJoining",
      label: "Date of Joining",
      defaultValue: dayjs("2020-01-15"),
    },
    {
      type: "text",
      name: "currentExperience",
      label: "Current Experience",
      defaultValue: "4 years",
    },
    {
      type: "text",
      name: "totalExperience",
      label: "Total Experience",
      defaultValue: "6 years",
    },
    {
      type: "text",
      name: "reportingManager",
      label: "Reporting Manager",
      defaultValue: "Jane Smith",
    },
    {
      type: "datePicker",
      name: "dateOfBirth",
      label: "Date of Birth",
      defaultValue: dayjs("1990-02-25"),
    },
    {
      type: "text",
      name: "age",
      label: "Age",
      defaultValue: "34",
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
      defaultValue: "Enthusiastic professional.",
    },
    {
      type: "text",
      name: "expertise",
      label: "Ask me about/Expertise",
      defaultValue: "Project Management",
    },
    {
      type: "text",
      name: "workPhoneNumber",
      label: "Work Phone Number",
      defaultValue: "+1234567890",
    },
    {
      type: "text",
      name: "extension",
      label: "Extension",
      defaultValue: "101",
    },
    {
      type: "text",
      name: "seatingLocation",
      label: "Seating Location",
      defaultValue: "Building A, Floor 2",
    },
    {
      type: "text",
      name: "tags",
      label: "Tags",
      defaultValue: "Team Player, Leader",
    },
    {
      type: "text",
      name: "personalMobileNumber",
      label: "Personal Mobile Number",
      defaultValue: "+9876543210",
    },
    {
      type: "text",
      name: "personalEmailAddress",
      label: "Personal Email Address",
      defaultValue: "john.doe.personal@example.com",
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
      defaultValue: "Admin",
    },
    {
      type: "text",
      name: "modifiedBy",
      label: "Modified By",
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
      name: "modifiedTime",
      label: "Modified Time",
      defaultValue: "2024-01-01",
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
      defaultValue: "123 Street, City, Country",
    },
    {
      type: "text",
      name: "permanentAddress",
      label: "Permanent Address",
      defaultValue: "456 Avenue, City, Country",
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
      type: "text",
      name: "firstName",
      label: "First Name",
      defaultValue: "John",
      disabled: true,
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      defaultValue: "Doe",
      disabled: true,
    },
    {
      type: "text",
      name: "nickname",
      label: "Nick Name",
      defaultValue: "Johnny",
      disabled: true,
    },
    {
      type: "text",
      name: "email",
      label: "Email Address",
      defaultValue: "john.doe@example.com",
      disabled: true,
    },
    {
      type: "autocomplete",
      name: "department",
      label: "Department",
      options: ["HR", "Management", "Marketing", "IT"],
      defaultValue: "HR",
      disabled: true,
    },
    {
      type: "text",
      name: "designation",
      label: "Designation",
      defaultValue: "Manager",
      disabled: true,
    },
    {
      type: "text",
      name: "clikkleHR",
      label: "Clikkle HR",
      defaultValue: "Admin",
      disabled: true,
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
      disabled: true,
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
      disabled: true,
    },
    {
      type: "text",
      name: "sourceOfHire",
      label: "Source of Hire",
      defaultValue: "Referral",
      disabled: true,
    },
    {
      type: "datePicker",
      name: "dateOfJoining",
      label: "Date of Joining",
      defaultValue: dayjs("2020-01-15"),
      disabled: true,
    },
    {
      type: "text",
      name: "currentExperience",
      label: "Current Experience",
      defaultValue: "4 years",
      disabled: true,
    },
    {
      type: "text",
      name: "totalExperience",
      label: "Total Experience",
      defaultValue: "6 years",
      disabled: true,
    },
    {
      type: "text",
      name: "reportingManager",
      label: "Reporting Manager",
      defaultValue: "Jane Smith",
      disabled: true,
    },
    {
      type: "datePicker",
      name: "dateOfBirth",
      label: "Date of Birth",
      defaultValue: dayjs("1990-02-25"),
      disabled: true,
    },
    {
      type: "text",
      name: "age",
      label: "Age",
      defaultValue: "34",
      disabled: true,
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
      disabled: true,
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
      disabled: true,
    },
    {
      type: "text",
      name: "aboutMe",
      label: "About Me",
      defaultValue: "Enthusiastic professional.",
      disabled: true,
    },
    {
      type: "text",
      name: "expertise",
      label: "Ask me about/Expertise",
      defaultValue: "Project Management",
      disabled: true,
    },
    {
      type: "text",
      name: "workPhoneNumber",
      label: "Work Phone Number",
      defaultValue: "+1234567890",
      disabled: true,
    },
    {
      type: "text",
      name: "extension",
      label: "Extension",
      defaultValue: "101",
      disabled: true,
    },
    {
      type: "text",
      name: "seatingLocation",
      label: "Seating Location",
      defaultValue: "Building A, Floor 2",
      disabled: true,
    },
    {
      type: "text",
      name: "tags",
      label: "Tags",
      defaultValue: "Team Player, Leader",
      disabled: true,
    },
    {
      type: "text",
      name: "personalMobileNumber",
      label: "Personal Mobile Number",
      defaultValue: "+9876543210",
      disabled: true,
    },
    {
      type: "text",
      name: "personalEmailAddress",
      label: "Personal Email Address",
      defaultValue: "john.doe.personal@example.com",
      disabled: true,
    },
    {
      type: "datePicker",
      name: "dateOfExit",
      label: "Date of Exit",
      defaultValue: dayjs("2023-10-01"),
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
      name: "modifiedBy",
      label: "Modified By",
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
      name: "modifiedTime",
      label: "Modified Time",
      defaultValue: "2024-01-01",
      disabled: true,
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
      disabled: true,
    },
    {
      type: "text",
      name: "presentAddress",
      label: "Present Address",
      defaultValue: "123 Street, City, Country",
      disabled: true,
    },
    {
      type: "text",
      name: "permanentAddress",
      label: "Permanent Address",
      defaultValue: "456 Avenue, City, Country",
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
        title="Add Employee"
        fields={addRecordModalFields}
        open={addRecordModal}
        onClose={() => {
          setAddRecordModal(false);
        }}
        onSubmit={handleAddRecordFormSubmit}
        isScrollable={true}
      />
      <CustomModal
        title="Edit Employee"
        fields={editRecordModalFields}
        open={editRecordModal}
        onClose={() => setEditRecordModal(false)}
        onSubmit={handleEditRecordFormSubmit}
        isScrollable={true}
      />
      <CustomModal
        title="View Employee"
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
    </div>
  );
}
