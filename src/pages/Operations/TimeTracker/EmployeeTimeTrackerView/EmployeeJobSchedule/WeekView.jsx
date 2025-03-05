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
import dayjs from "dayjs";
import CustomTable from "../../../../../components/CustomTable";
import CustomModal from "../../../../../components/CustomModal";
import Pagination from "../../../../../components/Pagination";

export default function WeekView() {
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
    { label: "Date", field: "date", sortable: false },
    { label: "Sun 05", field: "sun05", sortable: true },
    { label: "Mon 06", field: "mon06", sortable: true },
    { label: "Tue 07", field: "tue07", sortable: true },
    { label: "Wed 08", field: "wed08", sortable: true },
    { label: "Thu 09", field: "thu09", sortable: true },
    { label: "Fri 10", field: "fri10", sortable: true },
    { label: "Sat 11", field: "sat11", sortable: true },
  ];

  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const handleRowClick = (row) => {
    setEditProjectModal(true);
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
        title="Edit Project"
        fields={editProjectModalFields}
        open={editProjectModal}
        onClose={() => setEditProjectModal(false)}
        onSubmit={handleEditProjectFormSubmit}
        isScrollable={true}
      />
    </div>
  );
}
