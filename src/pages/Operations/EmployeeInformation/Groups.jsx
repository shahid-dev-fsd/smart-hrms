import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
} from "@mui/material";
import { IoFilter } from "react-icons/io5";
import { LiaTrashAlt } from "react-icons/lia";
import CustomTable from "../../../components/CustomTable";
import Pagination from "../../../components/Pagination";
import CustomModal from "../../../components/CustomModal";
import axios from "axios";

export default function Groups() {
  const [groups, setGroups] = useState("");

  const [filterModal, setFilterModal] = useState(false);
  const [addGroupModal, setAddGroupModal] = useState(false);
  const [viewGroupModal, setViewGroupModal] = useState(false);
  const [editGroupModal, setEditGroupModal] = useState(false);

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
    { accessorKey: "groupName", header: "Group Name", enableSorting: false },
    { accessorKey: "groupEmail", header: "Group Email", enableSorting: false },
    { accessorKey: "description", header: "Description", enableSorting: false },
    { accessorKey: "actions", header: "Actions", enableSorting: false }, // Assuming "Actions" is not sortable
  ];
  const handleRowClick = (row) => {
    setViewGroupModal(true);
  };
  const renderActions = (row) => (
    <div className="flex flex-row gap-3">
      <IconButton>
        <LiaTrashAlt />
      </IconButton>
    </div>
  );

  const addGroupModalFields = [
    {
      type: "text",
      label: "Group Name",
      name: "groupName",
      defaultValue: "",
    },
    {
      type: "textarea",
      label: "Description",
      name: "description",
      defaultValue: "",
    },
    {
      type: "text",
      label: "Group Email ID",
      name: "groupEmail",
      defaultValue: "",
    },
    {
      type: "textarea",
      label: "Reason For Leave",
      name: "reasonForLeave",
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "administrators",
      label: "Administrators",
      options: ["Santiago Solis"],
      defaultValue: "",
      multiple: true,
    },
    {
      type: "autocomplete",
      name: "members",
      label: "Members",
      options: ["Santiago Solis"],
      defaultValue: "",
      multiple: true,
    },
    {
      type: "checkbox",
      name: "notify",
      label: "Notify newly added employees.",
      defaultValue: false,
    },
  ];
  const handleAddGroupFormSubmit = (data) => {
    console.log("Add Group Form :- ", data);
  };

  const viewGroupModalFields = [
    {
      type: "text",
      label: "Group Name",
      name: "groupName",
      defaultValue: "",
    },
    {
      type: "textarea",
      label: "Description",
      name: "description",
      defaultValue: "",
    },
    {
      type: "text",
      label: "Group Email ID",
      name: "groupEmail",
      defaultValue: "",
    },
    {
      type: "textarea",
      label: "Reason For Leave",
      name: "reasonForLeave",
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "administrators",
      label: "Administrators",
      options: ["Santiago Solis"],
      defaultValue: "",
      multiple: true,
    },
    {
      type: "autocomplete",
      name: "members",
      label: "Members",
      options: ["Santiago Solis"],
      defaultValue: "",
      multiple: true,
    },
    {
      type: "checkbox",
      name: "notify",
      label: "Notify newly added employees.",
      defaultValue: false,
    },
  ];

  const editGroupModalFields = [
    {
      type: "text",
      label: "Group Name",
      name: "groupName",
      defaultValue: "",
    },
    {
      type: "textarea",
      label: "Description",
      name: "description",
      defaultValue: "",
    },
    {
      type: "text",
      label: "Group Email ID",
      name: "groupEmail",
      defaultValue: "",
    },
    {
      type: "textarea",
      label: "Reason For Leave",
      name: "reasonForLeave",
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "administrators",
      label: "Administrators",
      options: ["Santiago Solis"],
      defaultValue: "",
      multiple: true,
    },
    {
      type: "autocomplete",
      name: "members",
      label: "Members",
      options: ["Santiago Solis"],
      defaultValue: "",
      multiple: true,
    },
    {
      type: "checkbox",
      name: "notify",
      label: "Notify newly added employees.",
      defaultValue: false,
    },
  ];
  const handleEditGroupFormSubmit = (data) => {
    console.log("Edit Group Form :- ", data);
  };

  const filterModalFields = [
    {
      type: "autocomplete",
      name: "groupName",
      label: "Group Name",
      options: ["Group 1", "Group 2"],
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "groupEmail",
      label: "Group Email",
      options: ["group1@example.com", "group2@example.com"],
      defaultValue: "",
    },
  ];
  const handleFilterFormSubmit = (data) => {
    console.log("Filter Form :- ", data);
  };

  return (
    <div className="flex flex-col gap-3 pb-3">
      <div className="flex flex-row justify-end items-center gap-3">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="groups">Groups</InputLabel>
          <Select
            labelId="groups"
            id="groups"
            value={groups}
            label="Groups"
            onChange={(event) => {
              setGroups(event.target.value);
            }}
          >
            <MenuItem value="allGroups">All Groups</MenuItem>
            <MenuItem value={"myGroups"}>My Groups</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={() => {
            setAddGroupModal(true);
          }}
          variant="contained"
        >
          Add Group
        </Button>
      </div>
      <div>
        <div className="h-[33.6rem] mt-1 overflow-scroll">
          <CustomTable
            columns={columns}
            onRowClick={handleRowClick}
            renderActions={renderActions}
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
          />
        </div>
      </div>
      <CustomModal
        title="Add Group"
        fields={addGroupModalFields}
        open={addGroupModal}
        onClose={() => {
          setAddGroupModal(false);
        }}
        onSubmit={handleAddGroupFormSubmit}
        isScrollable={true}
      />
      <CustomModal
        title="View Group"
        fields={viewGroupModalFields}
        open={viewGroupModal}
        onClose={() => {
          setViewGroupModal(false);
        }}
        isView={true}
        isEditButton={true}
        onEditButtonClick={() => {
          setViewGroupModal(false);
          setEditGroupModal(true);
        }}
        isScrollable={true}
      />
      <CustomModal
        title="Edit Group"
        fields={editGroupModalFields}
        open={editGroupModal}
        onClose={() => {
          setEditGroupModal(false);
        }}
        onSubmit={handleEditGroupFormSubmit}
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
      />
    </div>
  );
}
