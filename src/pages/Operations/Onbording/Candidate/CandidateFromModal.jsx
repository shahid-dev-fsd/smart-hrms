import React, { useRef, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

import CustomInputTable from "../../../../components/CustomInputTable";
import CustomEmptyModal from "../../../../components/CustomEmptyModal";

export default function CandidateFromModal({
  title,
  open,
  onClose,
  onSubmit,
  editFormData,
  viewFormData,
  handleEdit,
}) {
  const isViewMode = Boolean(viewFormData);
  const isEditMode = Boolean(editFormData);

  const [formData, setFormData] = useState(
    editFormData ||
      viewFormData || {
        candidate: {
          email: "",
          firstName: "",
          lastName: "",
          countryCode: "",
          number: "",
          officalEmail: "",
          photo: null,
        },
        presentAddress: {
          address1: "",
          address2: "",
          city: "",
          country: "",
          state: "",
          postalCode: "",
        },
        permanentAddress: {
          address1: "",
          address2: "",
          city: "",
          country: "",
          state: "",
          postalCode: "",
          sameAsPresentAddress: false,
        },
        professional: {
          experience: "",
          currentSalary: "",
          location: "",
          department: "",
          sourceOfHire: "",
          skillSet: "",
          highestQualification: "",
          offerLetter: null,
          tentativeJoiningDate: null,
          title: "",
        },
        education: [
          {
            instituteName: "",
            degree: "",
            specialization: "",
            additionalNotes: "",
            dateOfCompletion: dayjs(),
          },
        ],
        experience: [
          {
            occupation: "",
            company: "",
            duration: "",
            summary: "",
            currentlyWorkHere: "",
          },
        ],
      }
  );

  const photoFileRef = useRef(null);
  const offerLetterRef = useRef(null);

  const educationTableColumns = [
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
    {
      type: "textarea",
      label: "Additional Notes",
      name: "additionalNotes",
      defaultValue: "",
    },
    ...(!isViewMode
      ? [{ name: "actions", label: "Actions", type: "actions" }]
      : []),
  ];
  const experienceTableColumns = [
    {
      type: "text",
      label: "Occupation",
      name: "occupation",
      defaultValue: "",
    },
    {
      type: "text",
      label: "Company",
      name: "company",
      defaultValue: "",
    },
    {
      type: "text",
      label: "Duration",
      name: "duration",
      defaultValue: "",
    },
    {
      type: "textarea",
      label: "Summary",
      name: "summary",
      defaultValue: "",
    },
    {
      type: "select",
      label: "Currently Work Here",
      name: "currentlyWorkHere",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
      defaultValue: "",
    },
    ...(!isViewMode
      ? [{ name: "actions", label: "Actions", type: "actions" }]
      : []),
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };
  const renderFormFields = () => {
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
    const sourcesOfHire = [
      { label: "Referral", value: "referral" },
      { label: "Job Portal", value: "jobPortal" },
      { label: "Campus", value: "campus" },
      { label: "Agency", value: "agency" },
    ];
    const countries = [
      { label: "USA", value: "usa" },
      { label: "UK", value: "uk" },
      { label: "Germany", value: "germany" },
      { label: "Japan", value: "japan" },
    ];
    const states = [
      { label: "California", value: "california" },
      { label: "New York", value: "newYork" },
      { label: "Texas", value: "texas" },
      { label: "Florida", value: "florida" },
    ];
    const countryCodes = [
      { label: "+1", value: "1" },
      { label: "+44", value: "44" },
      { label: "+49", value: "49" },
      { label: "+81", value: "81" },
    ];

    return (
      <>
        {/* Candidate */}
        <div className="flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
          <div>
            <h1>Candidate Details</h1>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <TextField
              sx={{ width: "100%" }}
              name="email"
              label="Email"
              variant="outlined"
              value={formData.candidate.email || ""}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  candidate: {
                    ...formData.candidate,
                    email: event.target.value,
                  },
                })
              }
              disabled={isViewMode}
            />
            <TextField
              sx={{ width: "100%" }}
              name="firstName"
              label="First Name"
              variant="outlined"
              value={formData.candidate.firstName || ""}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  candidate: {
                    ...formData.candidate,
                    firstName: event.target.value,
                  },
                })
              }
              disabled={isViewMode}
            />
            <div className="flex flex-row gap-3">
              <FormControl sx={{ width: "100px" }}>
                <Select
                  name="countryCode"
                  value={formData.candidate.countryCode || ""}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      candidate: {
                        ...formData.candidate,
                        countryCode: event.target.value,
                      },
                    })
                  }
                  disabled={isViewMode}
                >
                  {countryCodes.map((code) => (
                    <MenuItem key={code.value} value={code.value}>
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
                value={formData.candidate.number || ""}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    candidate: {
                      ...formData.candidate,
                      number: event.target.value,
                    },
                  })
                }
                disabled={isViewMode}
              />
            </div>
            <TextField
              sx={{ width: "100%" }}
              name="lastName"
              label="Last Name"
              variant="outlined"
              value={formData.candidate.lastName || ""}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  candidate: {
                    ...formData.candidate,
                    lastName: event.target.value,
                  },
                })
              }
              disabled={isViewMode}
            />
            <div>
              {formData.candidate.photo ? (
                <div className="flex p-3 border border-gray-800 rounded-lg items-center justify-between">
                  <span>{formData.candidate.photo.name}</span>
                  <IconButton
                    variant="outlined"
                    onClick={() => {
                      if (photoFileRef.current) photoFileRef.current.value = "";
                    }}
                  >
                    <MdDeleteOutline />
                  </IconButton>
                </div>
              ) : (
                <Button
                  sx={{ width: "100%", height: "50px" }}
                  variant="outlined"
                  component="label"
                  className="flex flex-col text-center"
                >
                  <h1>Upload Candidate Photo</h1>
                  <h1>
                    Files supported: JPG, PNG, GIF, JPEG Max. size is 5 MB
                  </h1>
                  <input
                    type="file"
                    hidden
                    ref={photoFileRef}
                    onChange={() => {
                      const file = photoFileRef.current?.files[0];
                      if (file) {
                        setFormData({
                          ...formData,
                          candidate: { ...formData.candidate, photo: file },
                        });
                      }
                    }}
                  />
                </Button>
              )}
            </div>
            <TextField
              sx={{ width: "100%" }}
              name="officalEmail"
              label="Offical Email"
              variant="outlined"
              value={formData.candidate.officalEmail || ""}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  candidate: {
                    ...formData.candidate,
                    officalEmail: event.target.value,
                  },
                })
              }
              disabled={isViewMode}
            />
            {(isViewMode || isEditMode) && (
              <>
                <TextField
                  sx={{ width: "100%" }}
                  name="modifiedBy"
                  label="Modified By"
                  variant="outlined"
                  value={formData.candidate.modifiedBy || ""}
                  disabled={isViewMode}
                />
                <TextField
                  sx={{ width: "100%" }}
                  name="modifiedTime"
                  label="Modified Time"
                  variant="outlined"
                  value={formData.candidate.modifiedTime || ""}
                  disabled={isViewMode}
                />
                <TextField
                  sx={{ width: "100%" }}
                  name="onboardingStatus"
                  label="Onboarding Status"
                  variant="outlined"
                  value={formData.candidate.onboardingStatus || ""}
                  disabled={isViewMode}
                />
                <TextField
                  sx={{ width: "100%" }}
                  name="addedBy"
                  label="Added By"
                  variant="outlined"
                  value={formData.candidate.addedBy || ""}
                  disabled={isViewMode}
                />
                <TextField
                  sx={{ width: "100%" }}
                  name="addedTime"
                  label="Added Time"
                  variant="outlined"
                  value={formData.candidate.addedTime || ""}
                  disabled={isViewMode}
                />
              </>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col border border-neutral-700 rounded-lg p-3">
          <div className="flex flex-col gap-3">
            <div>
              <h1>Present Address</h1>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <TextField
                sx={{ width: "100%" }}
                name="presentAddress1"
                label="Address line 1"
                variant="outlined"
                value={formData.presentAddress.address1 || ""}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    presentAddress: {
                      ...formData.presentAddress,
                      address1: event.target.value,
                    },
                  })
                }
                disabled={isViewMode}
              />
              <TextField
                sx={{ width: "100%" }}
                name="presentAddress2"
                label="Address line 2"
                variant="outlined"
                value={formData.presentAddress.address2 || ""}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    presentAddress: {
                      ...formData.presentAddress,
                      address2: event.target.value,
                    },
                  })
                }
                disabled={isViewMode}
              />
              <TextField
                sx={{ width: "100%" }}
                name="presentCity"
                label="City"
                variant="outlined"
                value={formData.presentAddress.city || ""}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    presentAddress: {
                      ...formData.presentAddress,
                      city: event.target.value,
                    },
                  })
                }
                disabled={isViewMode}
              />
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  name="presentAddressCountry"
                  label="Country"
                  value={formData.presentAddress.country || ""}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      presentAddress: {
                        ...formData.presentAddress,
                        country: event.target.value,
                      },
                    })
                  }
                  disabled={isViewMode}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  name="presentAddressState"
                  label="State"
                  value={formData.presentAddress.state || ""}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      presentAddress: {
                        ...formData.presentAddress,
                        state: event.target.value,
                      },
                    })
                  }
                  disabled={isViewMode}
                >
                  {states.map((state) => (
                    <MenuItem key={state.value} value={state.value}>
                      {state.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                sx={{ width: "100%" }}
                name="presentPostalCode"
                label="Postal Code"
                variant="outlined"
                value={formData.presentAddress.postalCode || ""}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    presentAddress: {
                      ...formData.presentAddress,
                      postalCode: event.target.value,
                    },
                  })
                }
                disabled={isViewMode}
              />
            </div>
          </div>
          <div>
            {!isViewMode && (
              <FormControl fullWidth margin="normal">
                <FormLabel component="legend">
                  Same as Present Address
                </FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        formData.permanentAddress.sameAsPresentAddress || false
                      }
                      onChange={(event) => {
                        const isChecked = event.target.checked;
                        setFormData((prev) => {
                          const updatedFormData = {
                            ...prev,
                            permanentAddress: {
                              ...prev.permanentAddress,
                              sameAsPresentAddress: isChecked,
                            },
                          };

                          if (isChecked) {
                            updatedFormData.permanentAddress.address1 =
                              prev.presentAddress.address1 || "";
                            updatedFormData.permanentAddress.address2 =
                              prev.presentAddress.address2 || "";
                            updatedFormData.permanentAddress.city =
                              prev.presentAddress.city || "";
                            updatedFormData.permanentAddress.country =
                              prev.presentAddress.country || "";
                            updatedFormData.permanentAddress.state =
                              prev.presentAddress.state || "";
                            updatedFormData.permanentAddress.postalCode =
                              prev.presentAddress.postalCode || "";
                          } else {
                            updatedFormData.permanentAddress.address1 = "";
                            updatedFormData.permanentAddress.address2 = "";
                            updatedFormData.permanentAddress.city = "";
                            updatedFormData.permanentAddress.country = "";
                            updatedFormData.permanentAddress.state = "";
                            updatedFormData.permanentAddress.postalCode = "";
                          }

                          return updatedFormData;
                        });
                      }}
                    />
                  }
                  label="Same"
                  margin="normal"
                />
              </FormControl>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1>Permanent Address</h1>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <TextField
                sx={{ width: "100%" }}
                name="permanentAddress1"
                label="Address line 1"
                variant="outlined"
                value={formData.permanentAddress.address1 || ""}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    permanentAddress: {
                      ...formData.permanentAddress,
                      address1: event.target.value,
                    },
                  })
                }
                disabled={isViewMode}
              />
              <TextField
                sx={{ width: "100%" }}
                name="permanentAddress2"
                label="Address line 2"
                variant="outlined"
                value={formData.permanentAddress.address2 || ""}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    permanentAddress: {
                      ...formData.permanentAddress,
                      address2: event.target.value,
                    },
                  })
                }
                disabled={isViewMode}
              />
              <TextField
                sx={{ width: "100%" }}
                name="permanentCity"
                label="City"
                variant="outlined"
                value={formData.permanentAddress.city || ""}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    permanentAddress: {
                      ...formData.permanentAddress,
                      city: event.target.value,
                    },
                  })
                }
                disabled={isViewMode}
              />
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  name="permanentAddressCountry"
                  label="Country"
                  value={formData.permanentAddress.country || ""}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      permanentAddress: {
                        ...formData.permanentAddress,
                        country: event.target.value,
                      },
                    })
                  }
                  disabled={isViewMode}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  name="permanentAddressState"
                  label="State"
                  value={formData.permanentAddress.state || ""}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      permanentAddress: {
                        ...formData.permanentAddress,
                        state: event.target.value,
                      },
                    })
                  }
                  disabled={isViewMode}
                >
                  {states.map((state) => (
                    <MenuItem key={state.value} value={state.value}>
                      {state.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                sx={{ width: "100%" }}
                name="permanentPostalCode"
                label="Postal Code"
                variant="outlined"
                value={formData.permanentAddress.postalCode || ""}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    permanentAddress: {
                      ...formData.permanentAddress,
                      postalCode: event.target.value,
                    },
                  })
                }
                disabled={isViewMode}
              />
            </div>
          </div>
        </div>

        {/* Professional */}
        <div className="flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
          <div>
            <h1>Professional Details</h1>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <TextField
              sx={{ width: "100%" }}
              name="experience"
              label="Experience"
              variant="outlined"
              value={formData.professional.experience || ""}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  professional: {
                    ...formData.professional,
                    experience: event.target.value,
                  },
                })
              }
              disabled={isViewMode}
            />
            <TextField
              sx={{ width: "100%" }}
              name="currentSalary"
              label="Current Salary"
              variant="outlined"
              value={formData.professional.currentSalary || ""}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  professional: {
                    ...formData.professional,
                    currentSalary: event.target.value,
                  },
                })
              }
              disabled={isViewMode}
            />
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                name="location"
                label="Location"
                value={formData.professional.location || ""}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    professional: {
                      ...formData.professional,
                      location: event.target.value,
                    },
                  })
                }
                disabled={isViewMode}
              >
                {locations.map((loc) => (
                  <MenuItem key={loc.value} value={loc.value}>
                    {loc.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                name="department"
                label="Department"
                value={formData.professional.department || ""}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    professional: {
                      ...formData.professional,
                      department: event.target.value,
                    },
                  })
                }
                disabled={isViewMode}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Source of Hire</InputLabel>
              <Select
                name="sourceOfHire"
                label="Source of Hire"
                value={formData.professional.sourceOfHire || ""}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    professional: {
                      ...formData.professional,
                      sourceOfHire: event.target.value,
                    },
                  })
                }
                disabled={isViewMode}
              >
                {sourcesOfHire.map((source) => (
                  <MenuItem key={source.value} value={source.value}>
                    {source.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              sx={{ width: "100%" }}
              name="skillSet"
              label="Skill Set"
              variant="outlined"
              value={formData.professional.skillSet || ""}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  professional: {
                    ...formData.professional,
                    skillSet: event.target.value,
                  },
                })
              }
              multiline
              disabled={isViewMode}
            />
            <TextField
              sx={{ width: "100%" }}
              name="highestQualification"
              label="Highest Qualification"
              variant="outlined"
              value={formData.professional.highestQualification || ""}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  professional: {
                    ...formData.professional,
                    highestQualification: event.target.value,
                  },
                })
              }
              disabled={isViewMode}
            />
            <div>
              {formData.professional.offerLetter ? (
                <div className="flex p-3 border border-gray-800 rounded-lg items-center justify-between">
                  <span>{formData.professional.offerLetter.name}</span>
                  <IconButton
                    variant="outlined"
                    onClick={() => {
                      if (offerLetterRef.current)
                        offerLetterRef.current.value = "";
                    }}
                  >
                    <MdDeleteOutline />
                  </IconButton>
                </div>
              ) : (
                <Button
                  sx={{ width: "100%", height: "50px" }}
                  variant="outlined"
                  component="label"
                  className="flex flex-col text-center"
                >
                  <h1>Upload Offer Letter</h1>
                  <h1>Max. size is 5 MB</h1>
                  <input
                    type="file"
                    hidden
                    ref={offerLetterRef}
                    onChange={() => {
                      const file = offerLetterRef.current?.files[0];
                      if (file) {
                        setFormData({
                          ...formData,
                          professional: {
                            ...formData.professional,
                            offerLetter: file,
                          },
                        });
                      }
                    }}
                  />
                </Button>
              )}
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Tentative Joining Date"
                value={formData.professional.tentativeJoiningDate || null}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    professional: {
                      ...formData.professional,
                      tentativeJoiningDate: value,
                    },
                  })
                }
                disabled={isViewMode}
              />
            </LocalizationProvider>
            <FormControl disabled={isViewMode}>
              <FormLabel>Title</FormLabel>
              <RadioGroup
                sx={{ flexDirection: "row" }}
                className="flex"
                value={formData.professional.title || ""}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    professional: {
                      ...formData.professional,
                      title: event.target.value,
                    },
                  })
                }
              >
                <FormControlLabel value="as" control={<Radio />} label="As" />
                <FormControlLabel
                  value="fullstackHead"
                  control={<Radio />}
                  label="Fullstack Head"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        {/* Education Section */}
        <div className="flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
          <div className="w-full flex items-center justify-between">
            <h1>Education</h1>
            {!isViewMode && (
              <Button
                variant="contained"
                onClick={() => {
                  const newRow = {
                    instituteName: "",
                    degree: "",
                    specialization: "",
                    additionalNotes: "",
                    dateOfCompletion: dayjs(),
                  };
                  setFormData((prev) => ({
                    ...prev,
                    education: [...prev.education, newRow],
                  }));
                }}
              >
                Add Row
              </Button>
            )}
          </div>
          <CustomInputTable
            columns={educationTableColumns}
            data={formData.education}
            onSubmit={(rowData, index) => {
              const updatedEducation = [...formData.education];
              updatedEducation[index] = rowData;
              setFormData((prev) => ({
                ...prev,
                education: updatedEducation,
              }));
            }}
          />
        </div>

        {/* Experience Section */}
        <div className="flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
          <div className="w-full flex justify-between">
            <h1>Experience</h1>
            {!isViewMode && (
              <Button
                variant="contained"
                onClick={() => {
                  const newRow = {
                    occupation: "",
                    company: "",
                    duration: "",
                    summary: "",
                    currentlyWorkHere: "",
                  };
                  setFormData((prev) => ({
                    ...prev,
                    experience: [...prev.experience, newRow],
                  }));
                }}
              >
                Add Row
              </Button>
            )}
          </div>
          <CustomInputTable
            columns={experienceTableColumns}
            data={formData.experience}
            onSubmit={(rowData, index) => {
              const updatedExperience = [...formData.experience];
              updatedExperience[index] = rowData;
              setFormData((prev) => ({
                ...prev,
                experience: updatedExperience,
              }));
            }}
          />
        </div>
      </>
    );
  };

  return (
    <CustomEmptyModal isScrollable={true} open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Box
          sx={{ backgroundColor: "background.default" }}
          className="w-full min-h-14 flex items-center z-50 sticky top-0 left-0 py-2"
        >
          <div className="w-full flex justify-between items-center">
            <h1 className="text-xl">{title}</h1>
            {isViewMode && (
              <IconButton onClick={handleEdit}>
                <MdOutlineEdit />
              </IconButton>
            )}
          </div>
        </Box>
        {renderFormFields()}
        {!isViewMode && (
          <Box
            sx={{ backgroundColor: "background.default" }}
            className="w-full min-h-14 z-50 sticky bottom-0 left-0 pt-4"
          >
            <div className="w-full flex flex-row gap-3 justify-between items-center">
              <div className="flex flex-row gap-3">
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <Button type="submit" variant="contained">
                  Submit And New
                </Button>
                <Button type="submit" variant="contained">
                  Save Draft
                </Button>
              </div>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </Box>
        )}
      </form>
    </CustomEmptyModal>
  );
}
