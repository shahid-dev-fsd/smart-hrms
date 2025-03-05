import React, { useState } from "react";
import { Button, IconButton } from "@mui/material";
import { IoFilter } from "react-icons/io5";
import dayjs from "dayjs";
import CustomModal from "../../../components/CustomModal";
import CustomInputTable from "../../../components/CustomInputTable";

const CustomizeBalance = () => {
  const [filterModal, setFilterModal] = useState(false);
  const [addBalanceModal, setAddBalanceModal] = useState(false);

  const addBalanceModalFields = [
    {
      type: "autocomplete",
      name: "employee",
      label: "Employee",
      options: ["Employee 1", "Employee 2"],
      defaultValue: "",
    },
  ];
  const handleAddBalanceFormSubmit = (data) => {
    console.log("Add Form :- ", data);
  };

  const addBalanceTableColumns = [
    {
      type: "text",
      name: "leaveType",
      label: "Leave Type",
      defaultValue: "",
    },
    {
      type: "text",
      name: "date",
      label: "Date",
      defaultValue: "",
    },
    {
      type: "text",
      name: "existingBalance",
      label: "Existing Balance",
      defaultValue: "",
    },
    {
      type: "text",
      name: "newBalance",
      label: "New Balance",
      defaultValue: "",
    },
    {
      type: "text",
      name: "reason",
      label: "Reason",
      defaultValue: "",
    },
    { name: "actions", label: "Actions", type: "actions" },
  ];
  const [addBalanceTableData, setAddBalanceTableData] = useState([
    {
      leaveType: "",
      date: "",
      existingBalance: "",
      newBalance: "",
      reason: "",
    },
  ]);
  const handleAddBalanceTableRowSubmit = (formData, index) => {
    const updatedData = [...addBalanceTableData];
    updatedData[index] = formData;
    setAddBalanceTableData(updatedData);
  };

  const filterModalFields = [
    {
      type: "datePicker",
      name: "balanceAsOn",
      label: "Balance As On",
      defaultValue: dayjs(),
    },
    {
      type: "autocomplete",
      name: "type",
      label: "Type",
      options: ["Type 1", "Type 2"],
      defaultValue: "",
    },
    {
      type: "multipleSelect",
      name: "employees",
      label: "Employees",
      options: ["Employee 1", "Employee 2"],
      defaultValue: [],
    },
    {
      type: "checkbox",
      name: "showOnlyDirectReportees",
      title: "Show Only Direct Reportees",
      label: "Show",
      defaultValue: false,
      disabled: (formData) => {
        return formData.employees && formData.employees.length > 0;
      },
    },
    {
      type: "multipleSelect",
      name: "department",
      label: "Department",
      options: ["all", "Department 1", "Department 2"],
      defaultValue: [],
    },
    {
      type: "multipleSelect",
      name: "profile",
      label: "Profile",
      options: ["Profile 1", "Profile 2"],
      defaultValue: [],
    },
    {
      type: "checkbox",
      name: "showExEmployees",
      title: "Show ex-employees with exit date on or after the selected period",
      label: "Show",
      defaultValue: true,
    },
  ];
  const handleFilterFormSubmit = (data) => {
    console.log("Filter Data :- ", data);
  };

  return (
    <div className="w-full min-h-80 flex flex-col">
      <div className="w-full flex gap-3 justify-end items-center">
        <Button
          variant="contained"
          onClick={() => {
            setAddBalanceModal(true);
          }}
        >
          Customize Balance
        </Button>
        <IconButton
          onClick={() => {
            setFilterModal(true);
          }}
          title="Filter"
        >
          <IoFilter />
        </IconButton>
      </div>
      <div className="min-h-60 w-full flex flex-col justify-center items-center">
        <div>
          <h1>No Data Found</h1>
        </div>
      </div>
      <CustomModal
        title="Customize Balance"
        fields={addBalanceModalFields}
        open={addBalanceModal}
        onClose={() => {
          setAddBalanceModal(false);
        }}
        onSubmit={handleAddBalanceFormSubmit}
        isScrollable={true}
      >
        <div className="w-full flex gap-3 flex-col justify-end items-center p-3 rounded-lg border border-gray-800">
          <div className="w-full flex justify-end">
            <Button
              variant="contained"
              onClick={() => {
                const newRow = {
                  description: "",
                  date: dayjs(),
                  ticket: "",
                  lodging: "",
                  boarding: "",
                  phone: "",
                  localConveyance: "",
                  incidentals: "",
                  others: "",
                };
                setAddBalanceTableData((prevData) => [...prevData, newRow]);
              }}
            >
              Add Row
            </Button>
          </div>
          <CustomInputTable
            columns={addBalanceTableColumns}
            data={addBalanceTableData}
            onSubmit={handleAddBalanceTableRowSubmit}
          />
        </div>
      </CustomModal>
      <CustomModal
        title="Filter"
        fields={filterModalFields}
        open={filterModal}
        onClose={() => setFilterModal(false)}
        onSubmit={handleFilterFormSubmit}
        isScrollable={true}
      />
    </div>
  );
};

export default CustomizeBalance;
