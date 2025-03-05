import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import CustomModal from "../../../components/CustomModal";
import { LiaTrashAlt } from "react-icons/lia";
import CustomTable from "../../../components/CustomTable";
import Pagination from "../../../components/Pagination";

export default function EmployeeWageRate() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const totalPages = Math.ceil(totalItems / limit);

  const employeeData = {
    employee_1: {
      ratePerHour: "20",
      overtimeRPH: "30",
      extendedOvertimeRPH: "40",
    },
    employee_2: {
      ratePerHour: "25",
      overtimeRPH: "35",
      extendedOvertimeRPH: "45",
    },
  };

  const columns = [
    { label: "Employee Name", field: "employeeName" },
    { label: "Rate Per Hour (RPH)", field: "ratePerHour" },
    { label: "Overtime RPH", field: "overtimeRPH" },
    { label: "Extended Overtime RPH", field: "extendedOvertimeRPH" },
  ];

  const handleRowClick = (row) => {
    // setViewJobModal(true);
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

  const customEmployeeChangeHandler = (event, formData, setFormData) => {
    const selectedEmployee = event.target.value;
    const selectedData = employeeData[selectedEmployee] || {};
    setFormData({
      ...formData,
      employees: selectedEmployee,
      ratePerHour: selectedData.ratePerHour || "",
      overtimeRPH: selectedData.overtimeRPH || "",
      extendedOvertimeRPH: selectedData.extendedOvertimeRPH || "",
    });
  };

  const [addEmployeeWageRateModal, setAddEmployeeWageRateModal] =
    useState(false);
  const addEmployeeWageRateFields = [
    {
      type: "autocomplete",
      name: "employees",
      label: "Employees",
      options: [
        { label: "Employee 1", value: "employee_1" },
        { label: "Employee 2", value: "employee_2" },
      ],
      defaultValue: "",
      customEventChangeHandler: customEmployeeChangeHandler,
    },
    {
      type: "text",
      name: "ratePerHour",
      label: "Rate Per Hour (RPH)",
      defaultValue: "",
    },
    {
      type: "text",
      name: "overtimeRPH",
      label: "Overtime RPH",
      defaultValue: "",
    },
    {
      type: "text",
      name: "extendedOvertimeRPH",
      label: "Extended Overtime RPH",
      defaultValue: "",
    },
  ];

  return (
    <div className="w-full h-[42rem] flex flex-col">
      <div className="w-full flex gap-3 justify-end items-center">
        <Button
          variant="contained"
          onClick={() => {
            setAddEmployeeWageRateModal(true);
          }}
        >
          Add Employee Wage Rate
        </Button>
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
        title={"Employee Wage Rate"}
        onClose={() => {
          setAddEmployeeWageRateModal(false);
        }}
        fields={addEmployeeWageRateFields}
        open={addEmployeeWageRateModal}
        onSubmit={(data) => {
          console.log("Filter Data :- ", data);
        }}
      />
    </div>
  );
}
