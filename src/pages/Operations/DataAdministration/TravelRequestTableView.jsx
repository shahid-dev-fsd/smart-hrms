import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/CustomTable";
import Pagination from "../../../components/Pagination";
import { IconButton } from "@mui/material";
import { LiaTrashAlt } from "react-icons/lia";

export default function TravelRequestTableView() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
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
      label: "Employee ID",
    },
    {
      field: "travelID",
      label: "Travel ID",
    },
    {
      field: "employeeDepartment",
      label: "Employee Department",
    },
    {
      field: "placeOfVisit",
      label: "Place of Visit",
    },
    {
      field: "expectedDateOfDeparture",
      label: "Expected Date of Departure",
    },
    {
      field: "expectedDateOfArrival",
      label: "Expected Date of Arrival",
    },
    {
      field: "purposeOfVisit",
      label: "Purpose of Visit",
    },
    {
      field: "expectedDurationInDays",
      label: "Expected Duration in Days",
    },
    {
      field: "isBillableToCustomer",
      label: "Is Billable to Customer",
    },
    {
      field: "customerName",
      label: "Customer Name",
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
      field: "deletedBy",
      label: "Deleted By",
    },
    {
      field: "deletedTime",
      label: "Deleted Time",
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
