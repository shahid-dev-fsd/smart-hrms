import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/CustomTable";
import Pagination from "../../../components/Pagination";
import { IconButton } from "@mui/material";
import { LiaTrashAlt } from "react-icons/lia";

export default function AddressProofTableView() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const handleRowClick = (row) => {
    // setViewRecordModal(true);
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
  const columns = [
    {
      field: "employeeID",
      label: "EmployeeID",
    },
    {
      field: "dateOfRequest",
      label: "Date of Request",
    },
    {
      field: "changeInPresentAddress",
      label: "Is there any change in Present Address",
    },
    {
      field: "reasonForRequest",
      label: "Reason for Request",
    },
    {
      field: "otherReason",
      label: "Enter the Reason for Request (If 'Others' is chosen)",
    },
    {
      field: "newPresentAddress",
      label: "New Present Address",
    },
  ];

  return (
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
  );
}
