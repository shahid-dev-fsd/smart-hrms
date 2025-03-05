import React, { useState, useRef, useEffect } from "react";
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
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { IoCalendarOutline } from "react-icons/io5";
import { CiViewTable } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";
import HolidayTableView from "./HolidayTableView";
import DateButton from "../../../components/DateButton";
import dayjs from "dayjs";
import CustomModal from "../../../components/CustomModal";

export default function Holidays() {
  const [switchScreen, setSwitchScreen] = useState({ primary: "tableView" });
  const [holiday, setHoliday] = useState("myHoliday");
  const [addHolidayModal, setAddHolidayModel] = useState(false);
  const [viewHolidayModal, setViewHolidayModal] = useState(false);
  const [editHolidayModal, setEditHolidayModal] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const calendarRef = useRef(null);
  const handleDateChange = ({ start, end }) => {
    setDateRange({ start, end });
  };

  useEffect(() => {
    if (calendarRef.current && dateRange.start) {
      const calendarApi = calendarRef.current.getApi();
      const startDate = new Date(dateRange.start);
      calendarApi.gotoDate(startDate);
    }
  }, [dateRange]);

  const getDateRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = dayjs(startDate);
    const endDateObj = dayjs(endDate);

    while (
      currentDate.isBefore(endDateObj) ||
      currentDate.isSame(endDateObj, "day")
    ) {
      dates.push(currentDate.format("ddd DD-MMM-YYYY"));
      currentDate = currentDate.add(1, "day");
    }

    return dates;
  };

  const renderDateRange = (startDate, endDate) => {
    const dates = getDateRange(startDate, endDate);

    return dates.map((date, index) => (
      <div
        key={index}
        className="flex flex-row gap-3 justify-center items-center"
      >
        <div className="text-nowrap w-40">
          <h1>{date}</h1>
        </div>
        <div className="w-full">
          <FormControl sx={{ width: "100%" }}>
            <InputLabel>Holiday Type</InputLabel>
            <Select
              sx={{ width: "100%" }}
              name="holidayType"
              label="Holiday Type"
              defaultValue="fullDay"
            >
              <MenuItem value={"fullDay"}>Full Day</MenuItem>
              <MenuItem value={"1thHalfDay"}>1th Half Day</MenuItem>
              <MenuItem value={"2ndHalfDay"}>2nd Half Day</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    ));
  };

  const addHolidayModalFields = [
    {
      type: "text",
      name: "name",
      label: "Name",
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "Start Date",
      name: "startDate",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "datePicker",
      label: "End Date",
      name: "endDate",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        const startDate = formData.startDate || dayjs("2023-10-01");
        const endDate = formData.endDate || dayjs("2023-10-01");

        return (
          <div className="flex flex-col gap-3">
            <h1>Holiday Type</h1>
            {renderDateRange(startDate, endDate)}
          </div>
        );
      },
    },
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        // Initialize the applicableFor array if it doesn't exist
        if (!formData.applicableFor) {
          formData.applicableFor = [];
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
      type: "select",
      name: "noOfDays",
      label: "No of day(s) before when the reminder email is to be sent",
      options: [
        { label: "Select", value: "select" },
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
        { label: "11", value: 11 },
        { label: "12", value: 12 },
        { label: "13", value: 13 },
        { label: "14", value: 14 },
        { label: "15", value: 15 },
        { label: "16", value: 16 },
        { label: "17", value: 17 },
        { label: "18", value: 18 },
        { label: "19", value: 19 },
        { label: "20", value: 20 },
        { label: "21", value: 21 },
        { label: "22", value: 22 },
        { label: "23", value: 23 },
        { label: "24", value: 24 },
        { label: "25", value: 25 },
        { label: "26", value: 26 },
        { label: "27", value: 27 },
        { label: "28", value: 28 },
        { label: "29", value: 29 },
        { label: "30", value: 30 },
      ],
      defaultValue: "select",
    },
    {
      type: "checkbox",
      name: "notifyApplicable",
      title: "Notify applicable employees via feeds",
      label:
        "They will receive a feed notification instantly once this holiday is saved",
      defaultValue: "",
    },
    {
      type: "checkbox",
      name: "reprocessLeave",
      title: "Reprocess leave applications based on this added holiday",
      label:
        "Leaves that are already applied for this holiday will be reprocessed and the balance will be adjusted accordingly",
      defaultValue: "",
    },
  ];

  const handleAddHolidayFormSubmit = (data) => {
    const startDate = data.startDate || dayjs("2023-10-01");
    const endDate = data.endDate || dayjs("2023-10-01");

    const dateRange = getDateRange(startDate, endDate);

    const holidayTypes = dateRange.map((date) => ({
      date: date,
      holidayType: data[`holidayType-${date}`] || "fullDay",
    }));

    const newForm = {
      ...data,
      holidayType: holidayTypes,
    };

    console.log("Add Form Data :- ", newForm);
  };

  const viewHolidayModalFields = [
    {
      type: "text",
      name: "name",
      label: "Name",
      defaultValue: "Demo Holiday",
    },
    {
      type: "datePicker",
      label: "Start Date",
      name: "startDate",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "datePicker",
      label: "End Date",
      name: "endDate",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        const startDate = formData.startDate || dayjs("2023-10-01");
        const endDate = formData.endDate || dayjs("2023-10-01");

        return (
          <div className="flex flex-col gap-3">
            <h1>Holiday Type</h1>
            {renderDateRange(startDate, endDate)}
          </div>
        );
      },
    },
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <div className="flex flex-col gap-3">
            <h1>Applicable For</h1>
            {[
              { shifts: "Shift 1", select: "General" },
              { shifts: "Shift 2", select: "General" },
            ].map((dynamicField, idx) => (
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
                    disabled
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
                  disabled
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Select"
                      placeholder="Select"
                    />
                  )}
                />
              </div>
            ))}
          </div>
        );
      },
    },
    {
      type: "textarea",
      name: "description",
      label: "Description",
      defaultValue: "This is a demo holiday description.",
    },
    {
      type: "select",
      name: "noOfDays",
      label: "No of day(s) before when the reminder email is to be sent",
      options: [
        { label: "Select", value: "select" },
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
        { label: "11", value: 11 },
        { label: "12", value: 12 },
        { label: "13", value: 13 },
        { label: "14", value: 14 },
        { label: "15", value: 15 },
        { label: "16", value: 16 },
        { label: "17", value: 17 },
        { label: "18", value: 18 },
        { label: "19", value: 19 },
        { label: "20", value: 20 },
        { label: "21", value: 21 },
        { label: "22", value: 22 },
        { label: "23", value: 23 },
        { label: "24", value: 24 },
        { label: "25", value: 25 },
        { label: "26", value: 26 },
        { label: "27", value: 27 },
        { label: "28", value: 28 },
        { label: "29", value: 29 },
        { label: "30", value: 30 },
      ],
      defaultValue: "select",
    },
    {
      type: "checkbox",
      name: "notifyApplicable",
      title: "Notify applicable employees via feeds",
      label:
        "They will receive a feed notification instantly once this holiday is saved",
      defaultValue: true,
    },
    {
      type: "checkbox",
      name: "reprocessLeave",
      title: "Reprocess leave applications based on this added holiday",
      label:
        "Leaves that are already applied for this holiday will be reprocessed and the balance will be adjusted accordingly",
      defaultValue: false,
    },
  ];

  const editHolidayModalFields = [
    {
      type: "text",
      name: "name",
      label: "Name",
      defaultValue: "Demo Holiday",
    },
    {
      type: "datePicker",
      label: "Start Date",
      name: "startDate",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "datePicker",
      label: "End Date",
      name: "endDate",
      defaultValue: dayjs("2023-10-05"),
    },
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        const startDate = formData.startDate || dayjs("2023-10-01");
        const endDate = formData.endDate || dayjs("2023-10-05");

        // Demo data for holidayType
        const demoHolidayTypes = [
          { date: "Mon 02-Oct-2023", holidayType: "fullDay" },
          { date: "Tue 03-Oct-2023", holidayType: "1thHalfDay" },
          { date: "Wed 04-Oct-2023", holidayType: "2ndHalfDay" },
        ];

        return (
          <div className="flex flex-col gap-3">
            <h1>Holiday Type</h1>
            {renderDateRange(startDate, endDate)}
          </div>
        );
      },
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
      defaultValue: "This is a demo holiday description.",
    },
    {
      type: "select",
      name: "noOfDays",
      label: "No of day(s) before when the reminder email is to be sent",
      options: [
        { label: "Select", value: "select" },
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
        { label: "6", value: 6 },
        { label: "7", value: 7 },
        { label: "8", value: 8 },
        { label: "9", value: 9 },
        { label: "10", value: 10 },
        { label: "11", value: 11 },
        { label: "12", value: 12 },
        { label: "13", value: 13 },
        { label: "14", value: 14 },
        { label: "15", value: 15 },
        { label: "16", value: 16 },
        { label: "17", value: 17 },
        { label: "18", value: 18 },
        { label: "19", value: 19 },
        { label: "20", value: 20 },
        { label: "21", value: 21 },
        { label: "22", value: 22 },
        { label: "23", value: 23 },
        { label: "24", value: 24 },
        { label: "25", value: 25 },
        { label: "26", value: 26 },
        { label: "27", value: 27 },
        { label: "28", value: 28 },
        { label: "29", value: 29 },
        { label: "30", value: 30 },
      ],
      defaultValue: "select",
    },
    {
      type: "checkbox",
      name: "notifyApplicable",
      title: "Notify applicable employees via feeds",
      label:
        "They will receive a feed notification instantly once this holiday is saved",
      defaultValue: true,
    },
    {
      type: "checkbox",
      name: "reprocessLeave",
      title: "Reprocess leave applications based on this added holiday",
      label:
        "Leaves that are already applied for this holiday will be reprocessed and the balance will be adjusted accordingly",
      defaultValue: false,
    },
  ];

  const handleEditHolidayFormSubmit = (data) => {
    const startDate = data.startDate || dayjs("2023-10-01");
    const endDate = data.endDate || dayjs("2023-10-01");

    const dateRange = getDateRange(startDate, endDate);

    const holidayTypes = dateRange.map((date) => ({
      date: date,
      holidayType: data[`holidayType-${date}`] || "fullDay",
    }));

    const newForm = {
      ...data,
      holidayType: holidayTypes,
    };

    console.log("Edit Form Data :- ", newForm);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3 text-nowrap">
      <div className="w-full flex gap-3 flex-row justify-end items-center">
        <div className="w-full flex gap-3 justify-center items-center">
          <DateButton mode="week" onDateChange={handleDateChange} />
        </div>
        <div className="flex flex-row gap-2 text-nowrap">
          <Button
            variant={`${
              switchScreen.primary === "tableView" ? "contained" : "outlined"
            }`}
            onClick={() => setSwitchScreen({ primary: "tableView" })}
            title="Table View"
          >
            <CiViewTable className="text-2xl" />
          </Button>
          <Button
            variant={`${
              switchScreen.primary === "calendarView" ? "contained" : "outlined"
            }`}
            onClick={() => setSwitchScreen({ primary: "calendarView" })}
            title="Calendar View"
          >
            <IoCalendarOutline className="text-2xl" />
          </Button>
        </div>
        <div>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Holiday</InputLabel>
            <Select
              value={holiday}
              onChange={(event) => setHoliday(event.target.value)}
              label="holiday"
            >
              <MenuItem value="myHoliday">My Holiday</MenuItem>
              <MenuItem value="allHoliday">All Holiday</MenuItem>
              <MenuItem value="allShifts">All Shifts</MenuItem>
              <MenuItem value="general">General</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Button onClick={() => setAddHolidayModel(true)} variant="contained">
            Add Holiday
          </Button>
        </div>
      </div>
      {switchScreen.primary === "calendarView" ? (
        <div className="w-full h-[37.9rem] overflow-scroll pb-3">
          <FullCalendar
            ref={calendarRef}
            style={{ height: "100%", width: "100%" }}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={false}
          />
        </div>
      ) : (
        <></>
      )}
      {switchScreen.primary === "tableView" ? (
        <HolidayTableView
          handleRowClick={(row) => {
            setViewHolidayModal(true);
          }}
        />
      ) : (
        <></>
      )}
      <CustomModal
        title="Add Holiday"
        fields={addHolidayModalFields}
        open={addHolidayModal}
        onClose={() => setAddHolidayModel(false)}
        onSubmit={handleAddHolidayFormSubmit}
        isScrollable={true}
      />
      <CustomModal
        title="View Holiday"
        fields={viewHolidayModalFields}
        open={viewHolidayModal}
        onClose={() => setViewHolidayModal(false)}
        isView={true}
        isEditButton={true}
        onEditButtonClick={() => {
          setViewHolidayModal(false);
          setEditHolidayModal(true);
        }}
        isScrollable={true}
      />
      <CustomModal
        title="Edit Holiday"
        fields={editHolidayModalFields}
        open={editHolidayModal}
        onClose={() => setEditHolidayModal(false)}
        onSubmit={handleEditHolidayFormSubmit}
        isScrollable={true}
      />
    </div>
  );
}
