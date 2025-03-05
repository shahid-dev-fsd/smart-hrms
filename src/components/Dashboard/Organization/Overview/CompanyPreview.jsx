import React from "react";
import { Avatar, Grid } from "@mui/material";

export default function CompanyPreview() {
  return (
    <Grid
      sx={{ backgroundColor: "background.default", flexDirection: "column" }}
      className="min-w-64 h-fit flex flex-col gap-3 justify-center items-center text-center rounded-lg p-5 border border-gray-800 "
    >
      <div>
        <Avatar
          style={{
            width: "130px",
            height: "130px",
          }}
        />
      </div>
      <div>
        <h1>steward corp </h1>
        <h1>Canada</h1>
      </div>
    </Grid>
  );
}
