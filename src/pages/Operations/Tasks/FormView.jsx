import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { IoFilter } from "react-icons/io5";
import { LiaTrashAlt } from "react-icons/lia";
import dayjs from "dayjs";
import CustomTable from "../../../components/CustomTable";
import Pagination from "../../../components/Pagination";
import CustomModal from "../../../components/CustomModal";
import axios from "axios";
import CreateTableView from "../../../components/CreateTableView";

export default function FormView() {
  const [filterModal, setFilterModal] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [viewTaskModal, setViewTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);

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
    {
      accessorKey: "actions",
      header: "Actions",
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
    // setViewRecordModal(true);
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

  const addTaskModalFields = [
    {
      type: "autocomplete",
      name: "taskOwner",
      label: "Task Owner",
      options: ["Task Owner 1", "Task Owner 2"],
      defaultValue: "",
    },
    {
      type: "text",
      label: "Task Name",
      name: "taskName",
      defaultValue: "",
    },
    {
      type: "textarea",
      label: "Description",
      name: "description",
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "Start Date",
      name: "startDate",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "datePicker",
      label: "Due Date",
      name: "dueDate",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "dateTimePicker",
      label: "Reminder",
      name: "reminder",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "select",
      name: "priority",
      label: "Priority",
      options: [
        { label: "Select", value: "select" },
        { label: "Low", value: "low" },
        { label: "Moderate", value: "moderate" },
        { label: "High", value: "high" },
      ],
      defaultValue: "select",
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      options: [
        { label: "Select", value: "select" },
        { label: "Open", value: "open" },
        { label: "Completed", value: "completed" },
      ],
      defaultValue: "select",
    },
  ];
  const handleAddTaskFormSubmit = (data) => {
    console.log("Add Form :- ", data);
  };

  const viewTaskModalFields = [
    {
      type: "autocomplete",
      name: "taskOwner",
      label: "Task Owner",
      options: ["Task Owner 1", "Task Owner 2"],
      defaultValue: "Task Owner 1",
    },
    {
      type: "text",
      label: "Task Name",
      name: "taskName",
      defaultValue: "Name",
    },
    {
      type: "textarea",
      label: "Description",
      name: "description",
      defaultValue: "Description",
    },
    {
      type: "datePicker",
      label: "Start Date",
      name: "startDate",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "datePicker",
      label: "Due Date",
      name: "dueDate",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "dateTimePicker",
      label: "Reminder",
      name: "reminder",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "text",
      label: "Assigned To",
      name: "assignedTo",
      defaultValue: "Assigned To",
    },
    {
      type: "select",
      name: "priority",
      label: "Priority",
      options: [
        { label: "Select", value: "select" },
        { label: "Low", value: "low" },
        { label: "Moderate", value: "moderate" },
        { label: "High", value: "high" },
      ],
      defaultValue: "select",
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      options: [
        { label: "Select", value: "select" },
        { label: "Open", value: "open" },
        { label: "Completed", value: "completed" },
      ],
      defaultValue: "select",
    },
    {
      type: "text",
      label: "Completed On",
      name: "completedOn",
      defaultValue: "",
    },
    {
      type: "text",
      label: "Completed By",
      name: "completedBy",
      defaultValue: "",
    },
  ];

  const editTaskModalFields = [
    {
      type: "autocomplete",
      name: "taskOwner",
      label: "Task Owner",
      options: ["Task Owner 1", "Task Owner 2"],
      defaultValue: "Task Owner 1",
    },
    {
      type: "text",
      label: "Task Name",
      name: "taskName",
      defaultValue: "Task Name",
    },
    {
      type: "textarea",
      label: "Description",
      name: "description",
      defaultValue: "Description",
    },
    {
      type: "datePicker",
      label: "Start Date",
      name: "startDate",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "datePicker",
      label: "Due Date",
      name: "dueDate",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "dateTimePicker",
      label: "Reminder",
      name: "reminder",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "text",
      label: "Assigned To",
      name: "assignedTo",
      defaultValue: "Assigned To",
      disabled: true,
    },
    {
      type: "select",
      name: "priority",
      label: "Priority",
      options: [
        { label: "Select", value: "select" },
        { label: "Low", value: "low" },
        { label: "Moderate", value: "moderate" },
        { label: "High", value: "high" },
      ],
      defaultValue: "select",
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      options: [
        { label: "Select", value: "select" },
        { label: "Open", value: "open" },
        { label: "Completed", value: "completed" },
      ],
      defaultValue: "select",
    },
    {
      type: "text",
      label: "Completed On",
      name: "completedOn",
      defaultValue: "Completed On",
      disabled: true,
    },
    {
      type: "text",
      label: "Completed By",
      name: "completedBy",
      defaultValue: "Completed On",
      disabled: true,
    },
  ];
  const handleEditTaskFormSubmit = (data) => {
    console.log("Edit Form :- ", data);
  };

  const filterModalFields = [
    {
      type: "autocomplete",
      name: "priority",
      label: "Priority",
      options: ["Priority 1", "Priority 2"],
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "relatedForms",
      label: "Related Forms",
      options: ["Related Forms 1", "Related Forms 2"],
      defaultValue: "",
    },
  ];
  const handleFilterFormSubmit = (data) => {
    console.log("Filter Form :- ", data);
  };

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
      label: "Task",
      key: "task",
      options: [
        { title: "Task Owner", name: "task_owner" },
        { title: "Task Name", name: "task_name" },
        { title: "Description", name: "description" },
        { title: "Start Date", name: "start_date" },
        { title: "Due Date", name: "due_date" },
        { title: "Reminder", name: "reminder" },
        { title: "Completed On", name: "completed_on" },
        { title: "Completed By", name: "completed_by" },
        { title: "Assigned To", name: "assigned_to" },
        { title: "Priority", name: "priority" },
        { title: "Status", name: "status" },
      ],
    },
    {
      label: "Task Owner",
      key: "task_owner",
      options: [
        { title: "Employee ID", name: "employee_id" },
        { title: "First Name", name: "first_name" },
        { title: "Last Name", name: "last_name" },
        { title: "Email Address", name: "email_address" },
        { title: "Nick Name", name: "nick_name" },
        { title: "Department", name: "department" },
        { title: "Location", name: "location" },
        { title: "Designation", name: "designation" },
        { title: "Zoho Role", name: "zoho_role" },
        { title: "Reporting Manager", name: "reporting_manager" },
        { title: "Photo", name: "photo" },
        { title: "Date of Joining", name: "date_of_joining" },
        { title: "Seating Location", name: "seating_location" },
        { title: "Work Phone Number", name: "work_phone_number" },
        { title: "Extension", name: "extension" },
        { title: "Personal Email Address", name: "personal_email_address" },
        { title: "Date of Birth", name: "date_of_birth" },
        { title: "Personal Mobile Number", name: "personal_mobile_number" },
        { title: "Tags", name: "tags" },
        { title: "Ask Me About/Expertise", name: "expertise" },
        { title: "About Me", name: "about_me" },
        { title: "Date of Exit", name: "date_of_exit" },
        { title: "Gender", name: "gender" },
        { title: "Employment Type", name: "employment_type" },
        { title: "Employee Status", name: "employee_status" },
        { title: "Source of Hire", name: "source_of_hire" },
        { title: "Marital Status", name: "marital_status" },
        { title: "Age", name: "age" },
        { title: "Current Experience", name: "current_experience" },
        { title: "Onboarding Status", name: "onboarding_status" },
        { title: "Added Time", name: "added_time" },
        { title: "Modified Time", name: "modified_time" },
        { title: "Total Experience", name: "total_experience" },
        { title: "Present Address", name: "present_address" },
        { title: "Permanent Address", name: "permanent_address" },
      ],
    },
    {
      label: "Completed By",
      key: "completed_by",
      options: [
        { title: "Employee ID", name: "employee_id" },
        { title: "First Name", name: "first_name" },
        { title: "Last Name", name: "last_name" },
        { title: "Email Address", name: "email_address" },
        { title: "Nick Name", name: "nick_name" },
        { title: "Department", name: "department" },
        { title: "Location", name: "location" },
        { title: "Designation", name: "designation" },
        { title: "Zoho Role", name: "zoho_role" },
        { title: "Reporting Manager", name: "reporting_manager" },
        { title: "Photo", name: "photo" },
        { title: "Date of Joining", name: "date_of_joining" },
        { title: "Seating Location", name: "seating_location" },
        { title: "Work Phone Number", name: "work_phone_number" },
        { title: "Extension", name: "extension" },
        { title: "Personal Email Address", name: "personal_email_address" },
        { title: "Date of Birth", name: "date_of_birth" },
        { title: "Personal Mobile Number", name: "personal_mobile_number" },
        { title: "Tags", name: "tags" },
        { title: "Ask Me About/Expertise", name: "expertise" },
        { title: "About Me", name: "about_me" },
        { title: "Date of Exit", name: "date_of_exit" },
        { title: "Gender", name: "gender" },
        { title: "Employment Type", name: "employment_type" },
        { title: "Employee Status", name: "employee_status" },
        { title: "Source of Hire", name: "source_of_hire" },
        { title: "Marital Status", name: "marital_status" },
        { title: "Age", name: "age" },
        { title: "Current Experience", name: "current_experience" },
        { title: "Onboarding Status", name: "onboarding_status" },
        { title: "Added Time", name: "added_time" },
        { title: "Modified Time", name: "modified_time" },
        { title: "Total Experience", name: "total_experience" },
        { title: "Present Address", name: "present_address" },
        { title: "Permanent Address", name: "permanent_address" },
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
      label: "Task",
      key: "task",
      options: [
        { key: "task", title: "Task Owner", name: "task_owner" },
        { key: "task", title: "Task Name", name: "task_name" },
        { key: "task", title: "Description", name: "description" },
        { key: "task", title: "Start Date", name: "start_date" },
        { key: "task", title: "Due Date", name: "due_date" },
        { key: "task", title: "Reminder", name: "reminder" },
        { key: "task", title: "Completed On", name: "completed_on" },
        { key: "task", title: "Completed By", name: "completed_by" },
        { key: "task", title: "Assigned To", name: "assigned_to" },
        { key: "task", title: "Priority", name: "priority" },
        { key: "task", title: "Status", name: "status" },
      ],
    },
    {
      label: "Task Owner",
      key: "task_owner",
      options: [
        { key: "task_owner", title: "Employee ID", name: "employee_id" },
        { key: "task_owner", title: "First Name", name: "first_name" },
        { key: "task_owner", title: "Last Name", name: "last_name" },
        { key: "task_owner", title: "Email Address", name: "email_address" },
        { key: "task_owner", title: "Nick Name", name: "nick_name" },
        { key: "task_owner", title: "Department", name: "department" },
        { key: "task_owner", title: "Location", name: "location" },
        { key: "task_owner", title: "Designation", name: "designation" },
        { key: "task_owner", title: "Zoho Role", name: "zoho_role" },
        {
          key: "task_owner",
          title: "Reporting Manager",
          name: "reporting_manager",
        },
        { key: "task_owner", title: "Photo", name: "photo" },
        {
          key: "task_owner",
          title: "Date of Joining",
          name: "date_of_joining",
        },
        {
          key: "task_owner",
          title: "Seating Location",
          name: "seating_location",
        },
        {
          key: "task_owner",
          title: "Work Phone Number",
          name: "work_phone_number",
        },
        { key: "task_owner", title: "Extension", name: "extension" },
        {
          key: "task_owner",
          title: "Personal Email Address",
          name: "personal_email_address",
        },
        { key: "task_owner", title: "Date of Birth", name: "date_of_birth" },
        {
          key: "task_owner",
          title: "Personal Mobile Number",
          name: "personal_mobile_number",
        },
        { key: "task_owner", title: "Tags", name: "tags" },
        {
          key: "task_owner",
          title: "Ask Me About/Expertise",
          name: "expertise",
        },
        { key: "task_owner", title: "About Me", name: "about_me" },
        { key: "task_owner", title: "Date of Exit", name: "date_of_exit" },
        { key: "task_owner", title: "Gender", name: "gender" },
        {
          key: "task_owner",
          title: "Employment Type",
          name: "employment_type",
        },
        {
          key: "task_owner",
          title: "Employee Status",
          name: "employee_status",
        },
        { key: "task_owner", title: "Source of Hire", name: "source_of_hire" },
        { key: "task_owner", title: "Marital Status", name: "marital_status" },
        { key: "task_owner", title: "Age", name: "age" },
        {
          key: "task_owner",
          title: "Current Experience",
          name: "current_experience",
        },
        {
          key: "task_owner",
          title: "Onboarding Status",
          name: "onboarding_status",
        },
        { key: "task_owner", title: "Added Time", name: "added_time" },
        { key: "task_owner", title: "Modified Time", name: "modified_time" },
        {
          key: "task_owner",
          title: "Total Experience",
          name: "total_experience",
        },
        {
          key: "task_owner",
          title: "Present Address",
          name: "present_address",
        },
        {
          key: "task_owner",
          title: "Permanent Address",
          name: "permanent_address",
        },
      ],
    },
    {
      label: "Completed By",
      key: "completed_by",
      options: [
        { key: "completed_by", title: "Employee ID", name: "employee_id" },
        { key: "completed_by", title: "First Name", name: "first_name" },
        { key: "completed_by", title: "Last Name", name: "last_name" },
        { key: "completed_by", title: "Email Address", name: "email_address" },
        { key: "completed_by", title: "Nick Name", name: "nick_name" },
        { key: "completed_by", title: "Department", name: "department" },
        { key: "completed_by", title: "Location", name: "location" },
        { key: "completed_by", title: "Designation", name: "designation" },
        { key: "completed_by", title: "Zoho Role", name: "zoho_role" },
        {
          key: "completed_by",
          title: "Reporting Manager",
          name: "reporting_manager",
        },
        { key: "completed_by", title: "Photo", name: "photo" },
        {
          key: "completed_by",
          title: "Date of Joining",
          name: "date_of_joining",
        },
        {
          key: "completed_by",
          title: "Seating Location",
          name: "seating_location",
        },
        {
          key: "completed_by",
          title: "Work Phone Number",
          name: "work_phone_number",
        },
        { key: "completed_by", title: "Extension", name: "extension" },
        {
          key: "completed_by",
          title: "Personal Email Address",
          name: "personal_email_address",
        },
        { key: "completed_by", title: "Date of Birth", name: "date_of_birth" },
        {
          key: "completed_by",
          title: "Personal Mobile Number",
          name: "personal_mobile_number",
        },
        { key: "completed_by", title: "Tags", name: "tags" },
        {
          key: "completed_by",
          title: "Ask Me About/Expertise",
          name: "expertise",
        },
        { key: "completed_by", title: "About Me", name: "about_me" },
        { key: "completed_by", title: "Date of Exit", name: "date_of_exit" },
        { key: "completed_by", title: "Gender", name: "gender" },
        {
          key: "completed_by",
          title: "Employment Type",
          name: "employment_type",
        },
        {
          key: "completed_by",
          title: "Employee Status",
          name: "employee_status",
        },
        {
          key: "completed_by",
          title: "Source of Hire",
          name: "source_of_hire",
        },
        {
          key: "completed_by",
          title: "Marital Status",
          name: "marital_status",
        },
        { key: "completed_by", title: "Age", name: "age" },
        {
          key: "completed_by",
          title: "Current Experience",
          name: "current_experience",
        },
        {
          key: "completed_by",
          title: "Onboarding Status",
          name: "onboarding_status",
        },
        { key: "completed_by", title: "Added Time", name: "added_time" },
        { key: "completed_by", title: "Modified Time", name: "modified_time" },
        {
          key: "completed_by",
          title: "Total Experience",
          name: "total_experience",
        },
        {
          key: "completed_by",
          title: "Present Address",
          name: "present_address",
        },
        {
          key: "completed_by",
          title: "Permanent Address",
          name: "permanent_address",
        },
      ],
    },
  ];
  const createTableViewCriteriasOptions = [
    {
      label: "Task",
      key: "task",
      options: [
        {
          type: "none",
          title: "Logged In User",
          key: "task",
          name: "logged_in_user",
          show: "task.task_owner",
        },
        {
          type: "select",
          options: [
            { title: "User 1", key: "task", name: "user_1" },
            { title: "User 2", key: "task", name: "user_2" },
          ],
          title: "Is",
          key: "task",
          name: "is",
          multiple: true,
        },
        {
          type: "select",
          options: [
            { title: "User 1", key: "task", name: "user_1" },
            { title: "User 2", key: "task", name: "user_2" },
          ],
          title: "Is Not",
          key: "task",
          name: "is_not",
          multiple: true,
        },
        {
          type: "none",
          title: "Is Empty",
          key: "task",
          name: "is_empty",
        },
        {
          type: "none",
          title: "Is Empty Not",
          key: "task",
          name: "is_empty_not",
        },
        {
          type: "text",
          title: "Start With",
          key: "task",
          name: "start_with",
        },
        {
          type: "text",
          title: "End With",
          key: "task",
          name: "end_with",
        },
        {
          type: "text",
          title: "Contains",
          key: "task",
          name: "contains",
        },
        {
          type: "text",
          title: "Not Contains",
          key: "task",
          name: "not_contains",
        },
      ],
    },
    // {
    //   label: "Task Owner",
    //   key: "task",
    //   options: [
    //     {
    //       type: "none",
    //       key: "task",
    //       title: "Logged in user",
    //       name: "logge_in_user",
    //     },
    //   ],
    // },
    // {
    //   label: "Task Owner",
    //   key: "task_owner",
    //   options: [
    //     { type: "text", title: "Option 1", key: "employee", name: "option1" },
    //     { type: "text", title: "Option 2", key: "employee", name: "option2" },
    //   ],
    // },
    // {
    //   label: "Completed By",
    //   key: "completed_by",
    //   options: [
    //     { type: "text", title: "Option 1", key: "employee", name: "option1" },
    //     { type: "text", title: "Option 2", key: "employee", name: "option2" },
    //   ],
    // },
    // {
    //   label: "Employee",
    //   key: "employee",
    //   options: [
    //     { type: "text", title: "Option 1", key: "employee", name: "option1" },
    //     { type: "text", title: "Option 2", key: "employee", name: "option2" },
    //   ],
    // },
    // {
    //   label: "Department",
    //   key: "department",
    //   options: [
    //     {
    //       type: "select",
    //       options: [
    //         { title: "Option 1", key: "department", name: "option1" },
    //         { title: "Option 2", key: "department", name: "option2" },
    //       ],
    //       title: "Option 1",
    //       key: "department",
    //       name: "option1",
    //     },
    //     { type: "text", title: "Option 2", key: "department", name: "option2" },
    //   ],
    // },
    // {
    //   label: "Location",
    //   key: "location",
    //   options: [
    //     {
    //       type: "datetime",
    //       title: "Option 1",
    //       key: "location",
    //       name: "option1",
    //     },
    //     {
    //       type: "datetime",
    //       title: "Option 2",
    //       key: "location",
    //       name: "option2",
    //     },
    //   ],
    // },
    // {
    //   label: "Designation",
    //   key: "designation",
    //   options: [
    //     {
    //       type: "none",
    //       title: "Option 1",
    //       key: "designation",
    //       name: "option1",
    //     },
    //     {
    //       type: "text",
    //       title: "Option 2",
    //       key: "designation",
    //       name: "option2",
    //     },
    //   ],
    // },
    // {
    //   label: "Reporting Manager",
    //   key: "reportingManager",
    //   options: [
    //     {
    //       type: "text",
    //       title: "Option 1",
    //       key: "reportingManager",
    //       name: "option1",
    //     },
    //     {
    //       type: "text",
    //       title: "Option 2",
    //       key: "reportingManager",
    //       name: "option2",
    //     },
    //   ],
    // },
    // {
    //   label: "Added By",
    //   key: "addedBy",
    //   options: [
    //     { type: "text", title: "Option 1", key: "addedBy", name: "option1" },
    //     { type: "text", title: "Option 2", key: "addedBy", name: "option2" },
    //   ],
    // },
    // {
    //   label: "Modified By",
    //   key: "modifiedBy",
    //   options: [
    //     { type: "text", title: "Option 1", key: "modifiedBy", name: "option1" },
    //     { type: "text", title: "Option 2", key: "modifiedBy", name: "option2" },
    //   ],
    // },
    // {
    //   label: "Present Address",
    //   key: "presentAddress",
    //   options: [
    //     {
    //       type: "text",
    //       title: "Option 1",
    //       key: "presentAddress",
    //       name: "option1",
    //     },
    //     {
    //       type: "text",
    //       title: "Option 2",
    //       key: "presentAddress",
    //       name: "option2",
    //     },
    //   ],
    // },
    // {
    //   label: "Permanent Address",
    //   key: "permanentAddress",
    //   options: [
    //     {
    //       type: "text",
    //       title: "Option 1",
    //       key: "permanentAddress",
    //       name: "option1",
    //     },
    //     {
    //       type: "text",
    //       title: "Option 2",
    //       key: "permanentAddress",
    //       name: "option2",
    //     },
    //   ],
    // },
  ];
  const createTableViewCriteriasRelationships = [
    { title: "AND", name: "and" },
    { title: "OR", name: "or" },
  ];
  return (
    <div className="w-full min-h-80 flex flex-col gap-3">
      <div className="flex gap-3 justify-between items-center">
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
        <div className="flex gap-3 justify-center items-center">
          {/* <Button
            variant="contained"
            onClick={() => {
              setAddTaskModal(true);
            }}
          >
            Add Task
          </Button> */}
          <IconButton
            onClick={() => {
              setFilterModal(true);
            }}
            title="Filter"
          >
            <IoFilter />
          </IconButton>
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
          isBulkSelect={false}
        />
      </div>

      <CustomModal
        title="Add Task"
        fields={addTaskModalFields}
        open={addTaskModal}
        onClose={() => {
          setAddTaskModal(false);
        }}
        onSubmit={handleAddTaskFormSubmit}
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
            <Button
              variant="outlined"
              onClick={() => {
                setAddTaskModal(false);
              }}
            >
              Cancle
            </Button>
          </div>
        }
      />
      <CustomModal
        title="View Task"
        fields={viewTaskModalFields}
        open={viewTaskModal}
        onClose={() => {
          setViewTaskModal(false);
        }}
        isView={true}
        isEditButton={true}
        onEditButtonClick={() => {
          setViewTaskModal(false);
          setEditTaskModal(true);
        }}
        isScrollable={true}
      />
      <CustomModal
        title="Edit Task"
        fields={editTaskModalFields}
        open={editTaskModal}
        onClose={() => {
          setEditTaskModal(false);
        }}
        onSubmit={handleEditTaskFormSubmit}
        isScrollable={true}
      />
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

      <CreateTableView
        open={createTableViewModal}
        onClose={() => {
          setCreateTableViewModal(false);
        }}
        forWhom={"task"}
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
