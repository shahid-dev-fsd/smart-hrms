import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import Card from "../../../components/Dashboard/Team/Reportees/Card";
import Reportee from "../../../components/Dashboard/Team/Reportees/Reportee";

export default function Department() {
  const departments = ["IT", "Management"];
  const locations = ["London", "Canada"];
  const [selectedDepartment, setSelectedDepartment] = useState("Management");

  const data = [<Reportee />, <Reportee />, <Reportee />];

  return (
    <div className="h-fit w-full flex gap-3 flex-col justify-center items-center rounded-lg shadow-md bg">
      <Grid
        sx={{
          backgroundColor: "background.default",
        }}
        className="w-full flex flex-row justify-between items-center h-full p-3 rounded-lg border border-gray-800"
      >
        <div className="flex gap-3 flex-row">
          <Autocomplete
            disablePortal
            options={departments}
            sx={{ width: 300 }}
            value={selectedDepartment}
            renderInput={(params) => (
              <TextField {...params} label="Department" />
            )}
            onChange={(event, newValue) => {
              console.log(newValue);
              setSelectedDepartment(newValue);
            }}
          />
          <Autocomplete
            disablePortal
            options={locations}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Locations" />
            )}
          />
        </div>
        <div className="text-center">
          <h1>5</h1>
          <h1>Members</h1>
        </div>
      </Grid>

      <div className="w-full flex gap-3 flex-row">
        <Card title={"CEO"} number={1} datas={[<Reportee />]} />
        {selectedDepartment === "Management" ? (
          <>
            <Card title={"Management"} number={3} datas={data} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
