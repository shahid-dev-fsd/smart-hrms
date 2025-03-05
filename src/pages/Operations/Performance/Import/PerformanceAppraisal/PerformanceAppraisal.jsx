import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Card from "./Card";

export default function PerformanceAppraisal() {
  const [formData, setFormData] = useState({
    appraisalName: "",
    appraisalPeriod: null,
    rating: ["", "", "", "", ""],
  });

  const [errors, setErrors] = useState({
    appraisalName: false,
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRatingChange = (index, value) => {
    const updatedRatings = [...formData.rating];
    updatedRatings[index] = value;
    setFormData({ ...formData, rating: updatedRatings });
  };

  const handleImport = () => {
    let hasError = false;

    if (!formData.appraisalName) {
      setErrors((prev) => ({ ...prev, appraisalName: true }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, appraisalName: false }));
    }

    if (!hasError) {
      console.log("Form Submitted", formData);
      // Handle the import logic here
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 pb-3 justify-center items-center ">
      <div className="w-full flex flex-row justify-end items-center gap-3">
        <Button onClick={handleImport} variant="contained">
          Import
        </Button>
      </div>
      <div className="w-full h-full flex flex-row justify-between items-center overflow-auto">
        <div className="h-full w-[25rem] flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
          <h1>Appraisal cycle data of a completed appraisal cycle</h1>
          <FormControl
            sx={{ width: "100%", margin: 0, padding: 0 }}
            error={errors.appraisalName}
          >
            <InputLabel>Appraisal Name</InputLabel>
            <Select
              value={formData.appraisalName}
              onChange={(e) =>
                handleInputChange("appraisalName", e.target.value)
              }
              label="Appraisal Name"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Appraisal 1">Appraisal 1</MenuItem>
              <MenuItem value="Appraisal 2">Appraisal 2</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider
            sx={{ width: "100%", margin: 0, padding: 0 }}
            dateAdapter={AdapterDayjs}
          >
            <DatePicker
              label="Appraisal Period"
              value={formData.appraisalPeriod}
              onChange={(newValue) =>
                handleInputChange("appraisalPeriod", newValue)
              }
            />
          </LocalizationProvider>
          <div className="w-full flex flex-col gap-3">
            <h1>Rating</h1>
            {formData.rating.map((rating, index) => (
              <TextField
                key={index}
                sx={{ width: "100%", margin: 0, padding: 0 }}
                variant="outlined"
                value={rating}
                onChange={(e) => handleRatingChange(index, e.target.value)}
              />
            ))}
          </div>
        </div>
        <div className="h-full flex flex-col justify-between gap-3 border border-neutral-700 rounded-lg p-3">
          <Card
            title={"Supported Formats"}
            para={"XLS, XLSX & CSV File Formats."}
          />
          <Card
            title={"Important "}
            para={
              "Please ensure that your file size does not exceed 5 MB. In the case of XLS files, only MS Excel 97 - 2003 formats are supported. The first row in the given file will be considered as field names. Unexpected errors may occur if the XLS file contains any special controls like combo filters or images embedded in it. Duplicate Records if found will be handled during the import."
            }
          />
          <Card
            title={"Date Values (For CSV File Formats)"}
            para={
              "Date values should be in the same format as specified in the Company Details page under Display Settings. Other date formats will be ignored."
            }
          />
        </div>
      </div>
    </div>
  );
}
