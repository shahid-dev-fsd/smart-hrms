import { Grid } from "@mui/material";
import React from "react";

export default function TeamAvailability() {
  return (
    <Grid
      sx={{
        backgroundColor: "background.default",
        flexDirection: "column",
      }}
      className="w-full h-full flex gap-3 justify-center items-start rounded-lg p-3 border border-gray-800"
    >
      <div>
        <h1>Team Availability</h1>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="text-gray-600">Yet to check-in</h1>
        <h1>5</h1>
      </div>
    </Grid>
  );
}
