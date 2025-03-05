import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { IoFilter } from "react-icons/io5";
import dayjs from "dayjs";
import CustomModal from "../../../components/CustomModal";
import CustomInputTable from "../../../components/CustomInputTable";
import { MdDeleteOutline } from "react-icons/md";

const ExceptionalWorkingDays = () => {
  const [filterModal, setFilterModal] = useState(false);
  const [addWorkingDayModal, setAddWorkingDayModal] = useState(false);

  const addWorkingDayModalFields = [
    {
      type: "text",
      name: "name",
      label: "Name",
      defaultValue: "",
    },
    {
      type: "datePicker",
      name: "date",
      label: "Date",
      defaultValue: dayjs(),
    },
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        // Initialize the applicableFor array if it doesn't exist
        if (!formData.applicableFor) {
          formData.applicableFor = [
            { shifts: "Shift 1", select: "General" },
            { shifts: "Shift 2", select: "General" },
          ];
        }

        const handleAddField = () => {
          // Add a new field to the applicableFor array
          const newField = { shifts: "", select: "" };
          handleChange("applicableFor")(null, [
            ...formData.applicableFor,
            newField,
          ]);
        };

        const handleDeleteField = (index) => {
          // Remove the field at the specified index
          const updatedFields = formData.applicableFor.filter(
            (_, i) => i !== index
          );
          handleChange("applicableFor")(null, updatedFields);
        };

        const handleFieldChange = (index, key, value) => {
          // Update the specific field in the applicableFor array
          const updatedFields = formData.applicableFor.map((item, i) =>
            i === index ? { ...item, [key]: value } : item
          );
          handleChange("applicableFor")(null, updatedFields);
        };

        return (
          <div className="flex flex-col gap-3">
            <h1>Applicable For</h1>
            {formData.applicableFor.map((dynamicField, idx) => (
              <div
                key={idx}
                className="flex flex-row gap-3 justify-center items-center"
              >
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Shifts</InputLabel>
                  <Select
                    name="Shifts"
                    label="Shifts"
                    value={dynamicField.shifts}
                    onChange={(event) =>
                      handleFieldChange(idx, "shifts", event.target.value)
                    }
                  >
                    <MenuItem value={"shifts"}>Shifts</MenuItem>
                  </Select>
                </FormControl>
                <div>
                  <h1>Is</h1>
                </div>
                <Autocomplete
                  sx={{ width: "100%", marginBottom: "-15px" }}
                  options={["General"]}
                  value={dynamicField.select}
                  onChange={(event, value) =>
                    handleFieldChange(idx, "select", value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select"
                      placeholder="Select"
                    />
                  )}
                />
                <div>
                  <IconButton onClick={() => handleDeleteField(idx)}>
                    <MdDeleteOutline />
                  </IconButton>
                </div>
              </div>
            ))}
            <div>
              <Button variant="outlined" onClick={handleAddField}>
                Add
              </Button>
            </div>
          </div>
        );
      },
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      defaultValue: "",
    },
    {
      type: "none",
      custom: () => {
        return (
          <div>
            <h1>
              Note : Exceptional working day can be added only on weekends
            </h1>
          </div>
        );
      },
    },
  ];
  const handleAddWorkingDayFormSubmit = (data) => {
    console.log("Add Form :- ", data);
  };

  const filterModalFields = [
    {
      type: "datePicker",
      name: "workingdayAsOn",
      label: "WorkingDay As On",
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
            setAddWorkingDayModal(true);
          }}
        >
          Customize WorkingDay
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
        title="Add Working Day"
        fields={addWorkingDayModalFields}
        open={addWorkingDayModal}
        onClose={() => {
          setAddWorkingDayModal(false);
        }}
        onSubmit={handleAddWorkingDayFormSubmit}
        isScrollable={true}
      />
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

export default ExceptionalWorkingDays;
