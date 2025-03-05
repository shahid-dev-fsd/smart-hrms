import React from "react";
import { Button, Grid } from "@mui/material";
import { IoCalendarOutline } from "react-icons/io5";

export default function ClockInReminder() {
  return (
    <Grid
      className="w-full flex gap-2 px-2 py-4 justify-between items-center rounded-lg shadow-md border border-gray-800"
      sx={{ backgroundColor: "background.default" }}
    >
      <div className="w-full flex gap-3 justify-start items-center ">
        <div className="bg-blue-400 bg-opacity-10 rounded-lg p-2">
          <IoCalendarOutline className="h-6 w-6 text-blue-400" />
        </div>
        <div>
          <h1>Clock-in reminder</h1>
          <h1 className="text-xs text-zinc-400">Your shift has already started</h1>
        </div>
      </div>
      <div className="w-full flex gap-10 justify-end items-center">
        <div>
          <h1>General</h1>
          <h1 className="text-xs text-zinc-400">09:00AM - 05:00PM</h1>
        </div>
        <div>
          <Button variant="contained" sx={{ px: "1.6rem", py: "0.2rem" }}>
            Clock-in
          </Button>
        </div>
      </div>
    </Grid>
  );
}
