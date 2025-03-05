import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function EmployeeAuditHistory() {
  return (
    <div className="w-full flex gap-3 flex-col justify-center items-center ">
      <div className="w-full flex justify-end">
        <div>
          <FormControl sx={{ width: "200px" }}>
            <InputLabel>History</InputLabel>
            <Select label="History">
              <MenuItem value={"all"}>All</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
