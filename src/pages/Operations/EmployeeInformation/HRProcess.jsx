import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { IoFilter } from "react-icons/io5";
import { LiaTrashAlt } from "react-icons/lia";
import CustomTable from "../../../components/CustomTable";
import Pagination from "../../../components/Pagination";
import CustomModal from "../../../components/CustomModal";
import axios from "axios";

export default function HRProcess() {
  const [process, setProcess] = useState("all");
  const [filterModal, setFilterModal] = useState(false);

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
    { accessorKey: "status", header: "Status", enableSorting: false },
    { accessorKey: "employee", header: "Employee", enableSorting: false },
    { accessorKey: "keyField", header: "Key Field", enableSorting: false },
    { accessorKey: "value", header: "Value", enableSorting: false },
    {
      accessorKey: "effectiveDate",
      header: "Effective Date",
      enableSorting: false,
    },
    { accessorKey: "process", header: "Process", enableSorting: false },
    { accessorKey: "reason", header: "Reason", enableSorting: false },
  ];

  return (
    <div className="flex flex-col gap-3 pb-3">
      <div className="flex flex-row justify-end items-center gap-3">
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="process">Process</InputLabel>
          <Select
            labelId="process"
            id="process"
            value={process}
            label="Process"
            onChange={(event) => {
              setProcess(event.target.value);
            }}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"departmentChange"}>Department Change</MenuItem>
            <MenuItem value={"locationChange"}>Location Change</MenuItem>
            <MenuItem value={"designationChange"}>Designation Change</MenuItem>
          </Select>
        </FormControl>
        <IconButton
          onClick={() => {
            setFilterModal(true);
          }}
          variant="contained"
        >
          <IoFilter />
        </IconButton>
      </div>
      <div>
        <div className="h-[33.6rem] mt-1 overflow-scroll">
          <CustomTable
            columns={columns}
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
    </div>
  );
}
