import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

export default function CheckInAndOutImportAndExport() {
  return (
    <div className="w-full flex flex-row gap-3 pb-3">
      <div className="w-full min-h-[35rem] flex flex-col gap-3 p-2 justify-center items-center rounded-lg border border-gray-800">
        <img
          className="h-60"
          src="https://static.zohocdn.com/zp5/people5/images/mdimport.708e33a78177db159ba7bc595b2029c6.png"
          alt=""
        />
        <h1>Choose the file to be imported</h1>
        <div className="flex flex-col justify-center items-center">
          <h1>[only xls, xlsx and csv formats are supported]</h1>
          <h1>Maximum upload file size is 5 MB.</h1>
        </div>
        <Button variant="contained">Import</Button>
      </div>
      <div className="w-full min-h-[35rem] flex flex-col gap-3 p-2 justify-center items-center rounded-lg border border-gray-800">
        <img
          className="h-60"
          src="https://static.zohocdn.com/zp5/people5/images/mdexport.d44dd10e0d43182bc5a54aa13b1bc2c1.png"
          alt=""
        />
        <h1>Export as</h1>
        <FormControl>
          <RadioGroup
            sx={{ flexDirection: "row" }}
            defaultValue={"xls"}
            className="flex"
          >
            <FormControlLabel value="xls" control={<Radio />} label="XLS" />
            <FormControlLabel value="xlsx" control={<Radio />} label="XLSX" />
            <FormControlLabel value="csv" control={<Radio />} label="CSV" />
          </RadioGroup>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            required
            control={<Checkbox />}
            label="Include all check-in / check-out entries"
          />
        </FormGroup>
        <Button variant="contained">Export</Button>
      </div>
    </div>
  );
}
