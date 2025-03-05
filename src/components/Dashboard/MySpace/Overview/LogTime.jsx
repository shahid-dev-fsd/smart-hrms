import React from "react";
import { Button, Grid } from "@mui/material";
import { IoMdTime } from "react-icons/io";

export default function LogTime() {
  return (
    <Grid
      className="w-full flex gap-2 px-2 py-4 justify-between items-center rounded-lg shadow-md border border-gray-800"
      sx={{ backgroundColor: "background.default" }}
    >
      <div className="w-full flex gap-3 justify-start items-center ">
        <div className="bg-blue-400 bg-opacity-10 rounded-lg p-2">
          <IoMdTime className="h-6 w-6 text-blue-400" />
        </div>
        <div>
          <h1>You have not submitted your time log today!</h1>
          <h1 className="text-xs text-zinc-400">Click the button now to log in your time.</h1>
        </div>
      </div>
      <div className="w-full flex gap-10 justify-end items-center text-center">
        <div>
          <Button variant="contained" sx={{ px: "1.6rem", py: "0.2rem" }}>
            Log Time
          </Button>
        </div>
      </div>
    </Grid>
  );
}
