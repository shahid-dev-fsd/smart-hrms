import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/CustomTable";
import Pagination from "../../../components/Pagination";
import { IconButton } from "@mui/material";
import { LiaTrashAlt } from "react-icons/lia";

export default function ExitDetailsTableView() {
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
      field: "interviewer",
      label: "Interviewer",
    },
    {
      field: "separationDate",
      label: "Separation Date",
    },
    {
      field: "reasonForLeaving",
      label: "Reason for Leaving",
    },
    {
      field: "workingForOrganizationAgain",
      label: "Working for this Organization Again",
    },
    {
      field: "suggestionsForImprovement",
      label: "Think the Organization can do to Improve Staff Welfare",
    },
    {
      field: "likedMost",
      label: "What Did You Like the Most About the Organization",
    },
    {
      field: "shareWithUs",
      label: "Anything You Wish to Share with Us",
    },
    {
      field: "companyVehicleHandedIn",
      label: "Company Vehicle Handed In",
    },
    {
      field: "libraryBooksSubmitted",
      label: "All Library Books Submitted",
    },
    {
      field: "exitInterviewConducted",
      label: "Exit Interview Conducted",
    },
    {
      field: "resignationLetterSubmitted",
      label: "Resignation Letter Submitted",
    },
    {
      field: "allEquipmentHandedIn",
      label: "All Equipment Handed In",
    },
    {
      field: "security",
      label: "Security",
    },
    {
      field: "noticePeriodFollowed",
      label: "Notice Period Followed",
    },
    {
      field: "managerSupervisorClearance",
      label: "Manager/Supervisor Clearance",
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
