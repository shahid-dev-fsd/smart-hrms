import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Grid } from "@mui/material";

export default function MonthCalendar() {
  return (
    <Grid
      sx={{ backgroundColor: "background.default" }}
      className="h-full w-full p-2 rounded-lg"
    >
      <FullCalendar
        style={{ height: "100%", width: "100%" }}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
      />
    </Grid>
  );
}
