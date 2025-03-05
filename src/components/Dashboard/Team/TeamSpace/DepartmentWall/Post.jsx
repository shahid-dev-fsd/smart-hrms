import { Grid, Skeleton } from "@mui/material";
import React from "react";

export default function Post() {
  return (
    <Grid
      sx={{ backgroundColor: "background.default" }}
      className="w-full h-fit flex p-3 gap-3 justify-start items-center rounded-lg border border-gray-800"
    >
      <Skeleton variant="circular" width={50} height={50} animation="wave" />
      <div className="w-full h-fit">
        <Skeleton className="w-full" animation="wave" />
        <Skeleton className="w-3/4" animation="wave" />
        <Skeleton className="w-2/4" animation="wave" />
      </div>
    </Grid>
  );
}
