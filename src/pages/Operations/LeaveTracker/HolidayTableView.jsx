import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/CustomTable";
import Pagination from "../../../components/Pagination";
import { IconButton } from "@mui/material";
import { LiaTrashAlt } from "react-icons/lia";
import axios from "axios";

export default function HolidayTableView({ handleRowClick }) {
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
    { accessorKey: "name", header: "Name", enableSorting: true },
    { accessorKey: "date", header: "Date", enableSorting: true },
    { accessorKey: "location", header: "Location", enableSorting: true },
    { accessorKey: "shifts", header: "Shifts", enableSorting: true },
    { accessorKey: "description", header: "Description", enableSorting: true },
    { accessorKey: "actions", header: "Actions", enableSorting: false }, // Assuming "Actions" is not sortable
  ];
  const renderActions = (row) => (
    <IconButton>
      <LiaTrashAlt />
    </IconButton>
  );

  return (
    <div className="w-full h-[37.9rem] flex flex-col items-center">
      <div className="w-full h-full overflow-scroll">
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
  );
}
