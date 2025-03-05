import React, { useState } from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import CustomEmptyModal from "../../../components/CustomEmptyModal";

export default function CustomizeBalance() {
  const [customizePolicyMode, setCustomizePolicyModel] = useState(false);
  const employees = ["S1 - Clarkson Walter", "S2 - Alan Walter"];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-3 pb-3">
      <div className="w-full flex justify-end items-center"></div>
      <div className="min-h-60 w-full flex flex-col gap-3 justify-center items-center">
        <div>
          <h1>No Data Found</h1>
        </div>
        <div>
          <Button
            onClick={() => {
              setCustomizePolicyModel(true);
            }}
            variant="contained"
          >
            Customize Policy
          </Button>
        </div>
      </div>
      <div>
        <CustomEmptyModal
          open={customizePolicyMode}
          onClose={() => {
            setCustomizePolicyModel(false);
          }}
        >
          <div className="w-full flex flex-row justify-between">
            <div>
              <h1>Customize Policy</h1>
            </div>
            <div>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Status</InputLabel>
                <Select value={"both"} label="Status">
                  <MenuItem value="both">Both</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="deleted">Deleted</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div>
            <div>
              <Autocomplete
                sx={{ width: "100%" }}
                disablePortal
                options={employees}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Employees"
                    placeholder="Employees"
                  />
                )}
              />
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="min-h-40 flex flex-col justify-center items-center">
              <h1>No Data Found</h1>
            </div>
          </div>
        </CustomEmptyModal>
      </div>
    </div>
  );
}
