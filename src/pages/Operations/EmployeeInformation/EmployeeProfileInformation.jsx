import { Avatar, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/CustomTable";
import axios from "axios";

export default function EmployeeProfileInformation() {
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
      },
    });
    setData(response.data.data);
    setTotalRows(response.data.total);
  };
  useEffect(() => {
    fetchData(pagination.pageIndex, pagination.pageSize, sorting);
  }, [pagination.pageIndex, pagination.pageSize, sorting]);

  // Work Experience Columns
  const workExperienceColumns = [
    { accessorKey: "companyName", header: "Company Name", enableSorting: true },
    { accessorKey: "jobTitle", header: "Job Title", enableSorting: true },
    { accessorKey: "fromDate", header: "From Date", enableSorting: true },
    { accessorKey: "toDate", header: "To Date", enableSorting: true },
    {
      accessorKey: "jobDescription",
      header: "Job Description",
      enableSorting: true,
    },
    { accessorKey: "relevant", header: "Relevant", enableSorting: true },
  ];

  // Education Details Columns
  const educationDetailsColumns = [
    {
      accessorKey: "instituteName",
      header: "Institute Name",
      enableSorting: true,
    },
    { accessorKey: "degree", header: "Degree/Diploma", enableSorting: true },
    {
      accessorKey: "specialization",
      header: "Specialization",
      enableSorting: true,
    },
    {
      accessorKey: "dateOfCompletion",
      header: "Date of Completion",
      enableSorting: true,
    },
  ];

  // Dependent Details Columns
  const dependentDetailsColumns = [
    { accessorKey: "name", header: "Name", enableSorting: true },
    {
      accessorKey: "relationship",
      header: "Relationship",
      enableSorting: true,
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date of Birth",
      enableSorting: true,
    },
  ];

  // Card Component
  const Card = ({ image, title, more }) => {
    return (
      <div className="flex flex-row px-6 py-2 gap-3 items-center rounded-lg border border-neutral-700 text-nowrap">
        <div>
          <Avatar />
        </div>
        <div>
          <div>
            <h1>{title}</h1>
          </div>
          <div>
            <h1>{more}</h1>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex gap-3 flex-col justify-center items-center ">
      {/* Work Information Section */}
      <div className="w-full grid gap-3 grid-cols-5 p-3 rounded-lg border border-neutral-700">
        <Card title={"Department"} more={"-"} />
        <Card title={"Location"} more={"-"} />
        <Card title={"Designation"} more={"-"} />
        <Card title={"Zoho Role"} more={"Admin"} />
        <Card title={"Employment Type"} more={"-"} />
        <Card title={"Employee Status"} more={"Active"} />
        <Card title={"Source of Hire"} more={"-"} />
        <Card title={"Date of Joining"} more={"-"} />
        <Card title={"Current Experience"} more={"-"} />
        <Card title={"Total Experience"} more={"-"} />
      </div>

      {/* Basic Information Section */}
      <div className="w-full flex flex-col gap-3 p-3 rounded-lg border border-neutral-700">
        <h1>Basic Information</h1>
        <div className="w-full grid gap-3 grid-cols-2">
          <TextField
            sx={{ width: "100%" }}
            label="Employee ID"
            variant="outlined"
            disabled
            value="1"
          />
          <TextField
            sx={{ width: "100%" }}
            label="First Name"
            variant="outlined"
            disabled
            value="kmuller1690"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Last Name"
            variant="outlined"
            disabled
            value="-"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Nick Name"
            variant="outlined"
            disabled
            value="-"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Email Address"
            variant="outlined"
            disabled
            value="kmuller1690@gmail.com"
          />
        </div>
      </div>

      {/* Hierarchy Information Section */}
      <div className="w-full flex flex-col gap-3 p-3 rounded-lg border border-neutral-700">
        <h1>Hierarchy Information</h1>
        <div className="w-full grid gap-3 grid-cols-2">
          <TextField
            sx={{ width: "100%" }}
            label="Reporting Manager"
            variant="outlined"
            disabled
            value="-"
          />
        </div>
      </div>

      {/* Personal Details Section */}
      <div className="w-full flex flex-col gap-3 p-3 rounded-lg border border-neutral-700">
        <h1>Personal Details</h1>
        <div className="w-full grid gap-3 grid-cols-2">
          <TextField
            sx={{ width: "100%" }}
            label="Date of Birth"
            variant="outlined"
            disabled
            value="-"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Age"
            variant="outlined"
            disabled
            value="-"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Gender"
            variant="outlined"
            disabled
            value="-"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Marital Status"
            variant="outlined"
            disabled
            value="-"
          />
          <TextField
            sx={{ width: "100%" }}
            label="About Me"
            variant="outlined"
            disabled
            value="-"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Ask me about/Expertise"
            variant="outlined"
            disabled
            value="-"
          />
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="w-full flex flex-col gap-3 p-3 rounded-lg border border-neutral-700">
        <h1>Contact Details</h1>
        <div className="w-full grid gap-3 grid-cols-2">
          <TextField
            sx={{ width: "100%" }}
            label="Work Phone Number"
            variant="outlined"
            disabled
            value="-"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Extension"
            variant="outlined"
            disabled
            value="-"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Seating Location"
            variant="outlined"
            disabled
            value="-"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Tags"
            variant="outlined"
            disabled
            value="-"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Present Address"
            variant="outlined"
            disabled
            value="-"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Permanent Address"
            variant="outlined"
            disabled
            value="-"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Personal Mobile Number"
            variant="outlined"
            disabled
            value="-"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Personal Email Address"
            variant="outlined"
            disabled
            value="-"
          />
        </div>
      </div>

      {/* Separation Information Section */}
      <div className="w-full flex flex-col gap-3 p-3 rounded-lg border border-neutral-700">
        <h1>Separation Information</h1>
        <div className="w-full grid gap-3 grid-cols-2">
          <TextField
            sx={{ width: "100%" }}
            label="Date of Exit"
            variant="outlined"
            disabled
            value="-"
          />
        </div>
      </div>

      {/* System Fields Section */}
      <div className="w-full flex flex-col gap-3 p-3 rounded-lg border border-neutral-700">
        <h1>System Fields</h1>
        <div className="w-full grid gap-3 grid-cols-2">
          <TextField
            sx={{ width: "100%" }}
            label="Added By"
            variant="outlined"
            disabled
            value="1 - kmuller1690 -"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Added Time"
            variant="outlined"
            disabled
            value="07-Jan-2025 07:11 AM"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Modified By"
            variant="outlined"
            disabled
            value="1 - kmuller1690 -"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Modified Time"
            variant="outlined"
            disabled
            value="07-Jan-2025 07:11 AM"
          />
          <TextField
            sx={{ width: "100%" }}
            label="Onboarding Status"
            variant="outlined"
            disabled
            value="-"
          />
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="w-full flex flex-col gap-3 p-3 rounded-lg border border-neutral-700">
        <h1>Work Experience</h1>
        <div className="w-full">
          <CustomTable
            columns={workExperienceColumns}
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

      {/* Education Details Section */}
      <div className="w-full flex flex-col gap-3 p-3 rounded-lg border border-neutral-700">
        <h1>Education Details</h1>
        <div className="w-full">
          <CustomTable
            columns={educationDetailsColumns}
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

      {/* Dependent Details Section */}
      <div className="w-full flex flex-col gap-3 p-3 rounded-lg border border-neutral-700">
        <h1>Dependent Details</h1>
        <div className="w-full">
          <CustomTable
            columns={dependentDetailsColumns}
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
