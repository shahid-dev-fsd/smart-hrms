import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
} from "@mui/material";
import { IoFilter } from "react-icons/io5";
import { LiaTrashAlt } from "react-icons/lia";
import dayjs from "dayjs";
import CustomTable from "../../../components/CustomTable";
import Pagination from "../../../components/Pagination";
import CustomModal from "../../../components/CustomModal";
import axios from "axios";

export default function Completed() {
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
    {
      accessorKey: "task_owner",
      header: "Task Owner",
      enableSorting: false,
    },
    { header: "Task Name", accessorKey: "task_name", enableSorting: false },
    { header: "Assigned To", accessorKey: "assigned_to", enableSorting: false },
    { header: "Start Date", accessorKey: "start_date", enableSorting: false },
    { header: "End Date", accessorKey: "end_date", enableSorting: false },
    {
      accessorKey: "actions",
      header: "Actions",
      enableSorting: false,
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
  return (
    <div className="w-full min-h-80 flex flex-col gap-3">
      <div className="w-full flex gap-3 justify-end items-center">
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
    </div>
  );
}
