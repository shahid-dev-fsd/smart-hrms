import { Grid, Avatar, TextField } from "@mui/material";
import React from "react";

export default function CreaatePost() {
  return (
    <Grid
      sx={{ backgroundColor: "background.default" }}
      className="w-full h-fit flex p-3 gap-3 justify-start items-center rounded-lg border border-gray-800"
    >
      <div>
        <Avatar
          alt="Steward Graham"
          sx={{ height: "50px", width: "50px" }}
          src=""
        />
      </div>
      <div className="w-full">
        <TextField
          label="Post a messaage to your department"
          variant="outlined"
          className="h-8 w-full rounded-lg"
          type="text"
        />
      </div>
    </Grid>
  );
}
