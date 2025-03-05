import React, { useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import EmployeeProfileInformation from "./EmployeeProfileInformation";
import EmployeeCareerHistory from "./EmployeeCareerHistory";
import EmployeeAuditHistory from "./EmployeeAuditHistory";
import CustomModal from "../../../components/CustomModal";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CustomInputTable from "../../../components/CustomInputTable";

export default function EmployeeView({ back }) {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "employeeProfileInformation",
  });
  const [editProfileModal, setEditProfileModal] = useState(false);

  const tabs = [
    {
      label: "Profile Information",
      value: "employeeProfileInformation",
    },
    {
      label: "Career History",
      value: "employeeCareerHistory",
    },
    {
      label: "Audit History",
      value: "employeeAuditHistory",
    },
  ];
  const handlePrimaryTabChange = (event, newValue) => {
    setSwitchScreen({ ...switchScreen, primary: newValue });
  };

  const editProfileWorkExperienceTableColumns = [
    {
      type: "text",
      label: "Company Name",
      name: "companyName",
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "From",
      name: "from",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "datePicker",
      label: "To",
      name: "to",
      defaultValue: dayjs("2023-10-01"),
    },
    {
      type: "textarea",
      label: "Job Description",
      name: "jobDescription",
      defaultValue: "",
    },
    {
      type: "select",
      name: "relevant",
      label: "Relevant",
      options: [
        { label: "Select", value: "select" },
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
      defaultValue: "select",
    },
    { name: "actions", label: "Actions", type: "actions" },
  ];
  const [editWorkExperienceTableData, setEditWorkExperienceTableData] =
    useState([
      {
        companyName: "",
        from: dayjs("2023-10-01"),
        to: dayjs("2023-10-01"),
        jobDescription: "",
        relevant: "select",
      },
    ]);
  const handleEditProfileWorkExperienceTableRowSubmit = (formData, index) => {
    const updatedData = [...editWorkExperienceTableData];
    updatedData[index] = formData;
    setEditWorkExperienceTableData(updatedData);
  };

  const editEducationDetailsTableColumns = [
    {
      type: "text",
      label: "Institute Name",
      name: "instituteName",
      defaultValue: "",
    },
    {
      type: "text",
      label: "Degree/Diploma",
      name: "degree",
      defaultValue: "",
    },
    {
      type: "text",
      label: "Specialization",
      name: "specialization",
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "Date of Completion",
      name: "dateOfCompletion",
      defaultValue: dayjs(),
    },
    { name: "actions", label: "Actions", type: "actions" },
  ];
  const [editEducationDetailsTableData, setEditEducationDetailsTableData] =
    useState([
      {
        instituteName: "",
        degree: "",
        specialization: "",
        dateOfCompletion: dayjs(),
      },
    ]);
  const handleEditEducationDetailsTableRowSubmit = (formData, index) => {
    const updatedData = [...editEducationDetailsTableData];
    updatedData[index] = formData;
    setEditEducationDetailsTableData(updatedData);
  };

  const editDependentDetailsTableColumns = [
    {
      type: "text",
      label: "Name",
      name: "name",
      defaultValue: "",
    },
    {
      type: "select",
      label: "Relationship",
      name: "relationship",
      options: [
        { label: "Select", value: "" },
        { label: "Spouse", value: "spouse" },
        { label: "Child", value: "child" },
        { label: "Parent", value: "parent" },
      ],
      defaultValue: "",
    },
    {
      type: "datePicker",
      label: "Date of Birth",
      name: "dateOfBirth",
      defaultValue: dayjs(),
    },
    { name: "actions", label: "Actions", type: "actions" },
  ];
  const [editDependentDetailsTableData, setEditDependentDetailsTableData] =
    useState([
      {
        name: "",
        relationship: "",
        dateOfBirth: dayjs(),
      },
    ]);
  const handleEditDependentDetailsTableRowSubmit = (formData, index) => {
    const updatedData = [...editDependentDetailsTableData];
    updatedData[index] = formData;
    setEditDependentDetailsTableData(updatedData);
  };

  const editProfileModalFields = [
    // Basic information section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Basic information</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="employeeID"
                    label="Employee ID"
                    variant="outlined"
                    value={formData.employeeID || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        employeeID: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="nickName"
                    label="Nick Name"
                    variant="outlined"
                    value={formData.nickName || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        nickName: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    value={formData.firstName || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        firstName: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    value={formData.lastName || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        lastName: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="emailAddress"
                    label="Email Address"
                    variant="outlined"
                    value={formData.emailAddress || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        emailAddress: event.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Work Information section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        const departments = [
          { label: "HR", value: "hr" },
          { label: "Finance", value: "finance" },
          { label: "IT", value: "it" },
          { label: "Marketing", value: "marketing" },
          { label: "Sales", value: "sales" },
        ];

        const locations = [
          { label: "New York", value: "newYork" },
          { label: "San Francisco", value: "sanFrancisco" },
          { label: "London", value: "london" },
          { label: "Berlin", value: "berlin" },
          { label: "Tokyo", value: "tokyo" },
        ];

        const designations = [
          { label: "Manager", value: "manager" },
          { label: "Developer", value: "developer" },
          { label: "Designer", value: "designer" },
          { label: "Analyst", value: "analyst" },
          { label: "Consultant", value: "consultant" },
        ];

        const clikkleRoles = [
          { label: "Admin", value: "admin" },
          { label: "User", value: "user" },
          { label: "Manager", value: "manager" },
          { label: "Guest", value: "guest" },
        ];

        const employmentTypes = [
          { label: "Full-Time", value: "fullTime" },
          { label: "Part-Time", value: "partTime" },
          { label: "Contract", value: "contract" },
          { label: "Intern", value: "intern" },
        ];

        const employeeStatuses = [
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "On Leave", value: "onLeave" },
          { label: "Terminated", value: "terminated" },
        ];

        const sourcesOfHire = [
          { label: "Referral", value: "referral" },
          { label: "Job Portal", value: "jobPortal" },
          { label: "Campus", value: "campus" },
          { label: "Agency", value: "agency" },
        ];

        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Work Information</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {/* Department */}
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    label="Department"
                    variant="outlined"
                    value={formData.department}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        department: event.target.value,
                      }));
                    }}
                  >
                    {departments.map((dept, index) => (
                      <MenuItem key={index} value={dept.value}>
                        {dept.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Location */}
                <FormControl fullWidth>
                  <InputLabel>Location</InputLabel>
                  <Select
                    name="location"
                    label="Location"
                    variant="outlined"
                    value={formData.location}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        location: event.target.value,
                      }));
                    }}
                  >
                    {locations.map((loc, index) => (
                      <MenuItem key={index} value={loc.value}>
                        {loc.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Designation */}
                <FormControl fullWidth>
                  <InputLabel>Designation</InputLabel>
                  <Select
                    name="designation"
                    label="Designation"
                    variant="outlined"
                    value={formData.designation}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        designation: event.target.value,
                      }));
                    }}
                  >
                    {designations.map((desg, index) => (
                      <MenuItem key={index} value={desg.value}>
                        {desg.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Clikkle Role */}
                <FormControl fullWidth>
                  <InputLabel>Clikkle Role</InputLabel>
                  <Select
                    name="clikkleRole"
                    label="Clikkle Role"
                    variant="outlined"
                    value={formData.clikkleRole}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        clikkleRole: event.target.value,
                      }));
                    }}
                  >
                    {clikkleRoles.map((role, index) => (
                      <MenuItem key={index} value={role.value}>
                        {role.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Employment Type */}
                <FormControl fullWidth>
                  <InputLabel>Employment Type</InputLabel>
                  <Select
                    name="employmentType"
                    label="Employment Type"
                    variant="outlined"
                    value={formData.employmentType}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        employmentType: event.target.value,
                      }));
                    }}
                  >
                    {employmentTypes.map((type, index) => (
                      <MenuItem key={index} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Employee Status */}
                <FormControl fullWidth>
                  <InputLabel>Employee Status</InputLabel>
                  <Select
                    name="employeeStatus"
                    label="Employee Status"
                    variant="outlined"
                    value={formData.employeeStatus}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        employeeStatus: event.target.value,
                      }));
                    }}
                  >
                    {employeeStatuses.map((status, index) => (
                      <MenuItem key={index} value={status.value}>
                        {status.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Source of Hire */}
                <FormControl fullWidth>
                  <InputLabel>Source of Hire</InputLabel>
                  <Select
                    name="sourceOfHire"
                    label="Source of Hire"
                    variant="outlined"
                    value={formData.sourceOfHire}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        sourceOfHire: event.target.value,
                      }));
                    }}
                  >
                    {sourcesOfHire.map((source, index) => (
                      <MenuItem key={index} value={source.value}>
                        {source.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Date of Joining */}
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="Date of Joining"
                      value={formData.dateOfJoining || null}
                      onChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          dateOfJoining: value,
                        }));
                      }}
                    />
                  </LocalizationProvider>
                </div>

                {/* Current Experience */}
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="currentExperience"
                    label="Current Experience"
                    variant="outlined"
                    value={formData.currentExperience || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        currentExperience: event.target.value,
                      }));
                    }}
                    disabled
                  />
                </div>

                {/* Total Experience */}
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="totalExperience"
                    label="Total Experience"
                    variant="outlined"
                    value={formData.totalExperience || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        totalExperience: event.target.value,
                      }));
                    }}
                    disabled
                  />
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Hierarchy Information
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        const reportingManagers = [
          { label: "Manager 1", value: "manager1" },
          { label: "Manager 2", value: "manager2" },
        ];

        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Hierarchy Information</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormControl fullWidth>
                  <InputLabel>Reporting Manager</InputLabel>
                  <Select
                    name="reportingManager"
                    label="Reporting Manager"
                    variant="outlined"
                    value={formData.reportingManager}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        reportingManager: event.target.value,
                      }));
                    }}
                  >
                    <MenuItem value="">Select</MenuItem>
                    {reportingManagers.map((manager, index) => (
                      <MenuItem key={index} value={manager.value}>
                        {manager.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </>
        );
      },
    },

    // Personal Details section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        const genders = [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ];
        const maritalStatuses = [
          { label: "Single", value: "single" },
          { label: "Married", value: "married" },
        ];

        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Personal Details</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="Date of Birth"
                      value={formData.dateOfBirth || null}
                      onChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          dateOfBirth: value,
                        }));
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="age"
                    label="Age"
                    variant="outlined"
                    value={formData.age || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        age: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="gender"
                      label="Gender"
                      variant="outlined"
                      value={formData.gender}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          gender: event.target.value,
                        }));
                      }}
                    >
                      {genders.map((gender, index) => (
                        <MenuItem key={index} value={gender.value}>
                          {gender.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl>
                    <FormLabel>Marital Status</FormLabel>
                    <RadioGroup
                      name="maritalStatus"
                      row
                      value={formData.maritalStatus}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          maritalStatus: event.target.value,
                        }));
                      }}
                    >
                      {maritalStatuses.map((status, index) => (
                        <FormControlLabel
                          key={index}
                          value={status.value}
                          control={<Radio />}
                          label={status.label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="aboutMe"
                    label="About Me / Expertise"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={formData.aboutMe || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        aboutMe: event.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Contact Details section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        const countries = [
          { label: "New York", value: "newYork" },
          { label: "San Francisco", value: "sanFrancisco" },
          { label: "London", value: "london" },
          { label: "Berlin", value: "berlin" },
          { label: "Tokyo", value: "tokyo" },
        ];
        const states = [
          { label: "New York", value: "newYork" },
          { label: "San Francisco", value: "sanFrancisco" },
          { label: "London", value: "london" },
          { label: "Berlin", value: "berlin" },
          { label: "Tokyo", value: "tokyo" },
        ];
        const countryCodes = [
          { label: "+1", value: "1" },
          { label: "+2", value: "2" },
          { label: "+3", value: "3" },
        ];

        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Contact Details</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="workPhoneNumber"
                    label="Work Phone Number"
                    variant="outlined"
                    value={formData.workPhoneNumber || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        workPhoneNumber: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="extension"
                    label="Extension"
                    variant="outlined"
                    value={formData.extension || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        extension: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="personalEmailAddress"
                    label="Personal Email Address"
                    variant="outlined"
                    value={formData.personalEmailAddress || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        personalEmailAddress: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="seatingLocation"
                    label="Seating Location"
                    variant="outlined"
                    value={formData.seatingLocation || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        seatingLocation: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="tags"
                    label="Tags"
                    variant="outlined"
                    value={formData.tags || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        tags: event.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="flex flex-row gap-3">
                  <FormControl fullWidth>
                    <InputLabel>Country Code</InputLabel>
                    <Select
                      name="countryCode"
                      label="Country Code"
                      variant="outlined"
                      value={formData.countryCode}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          countryCode: event.target.value,
                        }));
                      }}
                    >
                      {countryCodes.map((code, index) => (
                        <MenuItem key={index} value={code.value}>
                          {code.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    sx={{ width: "100%" }}
                    name="number"
                    label="Number"
                    variant="outlined"
                    value={formData.number || ""}
                    onChange={(event) => {
                      setFormData((prev) => ({
                        ...prev,
                        number: event.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <h1>Present Address</h1>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="presentAddress1"
                      label="Address line 1"
                      variant="outlined"
                      value={formData.presentAddress1 || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          presentAddress1: event.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="presentAddress2"
                      label="Address line 2"
                      variant="outlined"
                      value={formData.presentAddress2 || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          presentAddress2: event.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="presentCity"
                      label="City"
                      variant="outlined"
                      value={formData.presentCity || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          presentCity: event.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel>Country</InputLabel>
                      <Select
                        name="presentAddressCountry"
                        label="Country"
                        variant="outlined"
                        value={formData.presentAddressCountry}
                        onChange={(event) => {
                          setFormData((prev) => ({
                            ...prev,
                            presentAddressCountry: event.target.value,
                          }));
                        }}
                      >
                        {countries.map((country, index) => (
                          <MenuItem key={index} value={country.value}>
                            {country.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel>State</InputLabel>
                      <Select
                        name="presentAddressState"
                        label="State"
                        variant="outlined"
                        value={formData.presentAddressState}
                        onChange={(event) => {
                          setFormData((prev) => ({
                            ...prev,
                            presentAddressState: event.target.value,
                          }));
                        }}
                      >
                        {states.map((state, index) => (
                          <MenuItem key={index} value={state.value}>
                            {state.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="presentPostalCode"
                      label="Postal Code"
                      variant="outlined"
                      value={formData.presentPostalCode || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          presentPostalCode: event.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <FormControl fullWidth margin="normal">
                  <FormLabel component="legend">
                    Same as Present Address
                  </FormLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        placeholder="Same"
                        checked={formData.sameAsPresentAddress || false}
                        onChange={(event) => {
                          const isChecked = event.target.checked;
                          setFormData((prev) => {
                            const updatedFormData = {
                              ...prev,
                              sameAsPresentAddress: isChecked,
                            };

                            if (isChecked) {
                              // Copy Present Address to Permanent Address
                              updatedFormData.permanentAddress1 =
                                prev.presentAddress1 || "";
                              updatedFormData.permanentAddress2 =
                                prev.presentAddress2 || "";
                              updatedFormData.permanentCity =
                                prev.presentCity || "";
                              updatedFormData.permanentAddressCountry =
                                prev.presentAddressCountry || "";
                              updatedFormData.permanentAddressState =
                                prev.presentAddressState || "";
                              updatedFormData.permanentPostalCode =
                                prev.presentPostalCode || "";
                            } else {
                              // Optionally, reset Permanent Address fields when unchecked
                              updatedFormData.permanentAddress1 = "";
                              updatedFormData.permanentAddress2 = "";
                              updatedFormData.permanentCity = "";
                              updatedFormData.permanentAddressCountry = "";
                              updatedFormData.permanentAddressState = "";
                              updatedFormData.permanentPostalCode = "";
                            }

                            return updatedFormData;
                          });
                        }}
                      />
                    }
                    label="Same as Present Address"
                    margin="normal"
                  />
                </FormControl>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <h1>Permanent Address</h1>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="permanentAddress1"
                      label="Address line 1"
                      variant="outlined"
                      value={formData.permanentAddress1 || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          permanentAddress1: event.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="permanentAddress2"
                      label="Address line 2"
                      variant="outlined"
                      value={formData.permanentAddress2 || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          permanentAddress2: event.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="permanentCity"
                      label="City"
                      variant="outlined"
                      value={formData.permanentCity || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          permanentCity: event.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel>Country</InputLabel>
                      <Select
                        name="permanentAddressCountry"
                        label="Country"
                        variant="outlined"
                        value={formData.permanentAddressCountry}
                        onChange={(event) => {
                          setFormData((prev) => ({
                            ...prev,
                            permanentAddressCountry: event.target.value,
                          }));
                        }}
                      >
                        {countries.map((country, index) => (
                          <MenuItem key={index} value={country.value}>
                            {country.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth>
                      <InputLabel>State</InputLabel>
                      <Select
                        name="permanentAddressState"
                        label="State"
                        variant="outlined"
                        value={formData.permanentAddressState}
                        onChange={(event) => {
                          setFormData((prev) => ({
                            ...prev,
                            permanentAddressState: event.target.value,
                          }));
                        }}
                      >
                        {states.map((state, index) => (
                          <MenuItem key={index} value={state.value}>
                            {state.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <TextField
                      sx={{ width: "100%" }}
                      name="permanentPostalCode"
                      label="Postal Code"
                      variant="outlined"
                      value={formData.permanentPostalCode || ""}
                      onChange={(event) => {
                        setFormData((prev) => ({
                          ...prev,
                          permanentPostalCode: event.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Separation Information section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>Separation Information</h1>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      label="Date of Exit"
                      value={formData.dateOfExit || null}
                      onChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          dateOfExit: value,
                        }));
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // System Fields section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <div className="flex flex-col gap-3">
              <div>
                <h1>System Fields</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="addedBy"
                    label="Added By"
                    variant="outlined"
                    value={formData.addedBy || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="addedTime"
                    label="Added Time"
                    variant="outlined"
                    value={formData.addedTime || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="modifiedBy"
                    label="Modified By"
                    variant="outlined"
                    value={formData.modifiedBy || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="modifiedTime"
                    label="Modified Time"
                    variant="outlined"
                    value={formData.modifiedTime || ""}
                    disabled
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: "100%" }}
                    name="onboardingStatus"
                    label="Onboarding Status"
                    variant="outlined"
                    value={formData.onboardingStatus || ""}
                    disabled
                  />
                </div>
              </div>
            </div>
          </>
        );
      },
    },

    // Work experience section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <CustomInputTable
              columns={editProfileWorkExperienceTableColumns}
              data={editWorkExperienceTableData}
              onSubmit={handleEditProfileWorkExperienceTableRowSubmit}
            />
          </>
        );
      },
    },

    // Education Details section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <CustomInputTable
              columns={editEducationDetailsTableColumns}
              data={editEducationDetailsTableData}
              onSubmit={handleEditEducationDetailsTableRowSubmit}
            />
          </>
        );
      },
    },

    // Dependent Details section
    {
      type: "none",
      custom: (formData, setFormData, field, index, handleChange) => {
        return (
          <>
            <CustomInputTable
              columns={editDependentDetailsTableColumns}
              data={editDependentDetailsTableData}
              onSubmit={handleEditDependentDetailsTableRowSubmit}
            />
          </>
        );
      },
    },
  ];

  const handleEditProfileFormSubmit = (data) => {
    console.log("Edit Profile Form Data :- ", {
      data,
      workExperience: editWorkExperienceTableData,
      educationDetails: editEducationDetailsTableData,
      dependentDetails: editDependentDetailsTableData,
    });
    setEditProfileModal(false);
  };

  return (
    <div className="w-full flex flex-col gap-3 justify-center items-center">
      <div className="w-full h-fit flex flex-row gap-2 justify-between items-center ">
        <IconButton onClick={back}>
          <IoArrowBackCircleOutline className="text-2xl" />
        </IconButton>
        <div className="w-full flex flex-row gap-2 justify-start items-center">
          <div>
            <Avatar />
          </div>
          <div>
            <div>
              <h1>S10 - Lindon Smith</h1>
            </div>
            <div>
              <h1>Marketing</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 text-nowrap">
          <Button
            variant="outlined"
            onClick={() => {
              setEditProfileModal(true);
            }}
          >
            Edit Profile
          </Button>
        </div>
      </div>
      <div className="w-full flex justify-start items-center">
        <Tabs value={switchScreen.primary} onChange={handlePrimaryTabChange}>
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </div>
      {switchScreen.primary === "employeeProfileInformation" ? (
        <>
          <EmployeeProfileInformation />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "employeeCareerHistory" ? (
        <>
          <EmployeeCareerHistory />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "employeeAuditHistory" ? (
        <>
          <EmployeeAuditHistory />
        </>
      ) : (
        <></>
      )}
      <CustomModal
        title="Edit Profile"
        fields={editProfileModalFields}
        open={editProfileModal}
        onClose={() => {
          setEditProfileModal(false);
        }}
        onSubmit={handleEditProfileFormSubmit}
        isScrollable={true}
      />
    </div>
  );
}
