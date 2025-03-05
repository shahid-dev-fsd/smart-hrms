import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { RiCalendarScheduleLine } from "react-icons/ri";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function WorkSchedule() {
  const [events, setEvents] = useState([
    { title: "Event 1", date: "2024-12-06T10:00:00" },
    { title: "Event 2", date: "2024-12-07T14:00:00" },
    { title: "Event 3", date: "2024-12-08T16:00:00" },
  ]);

  const handleDateClick = (arg) => {
    alert("Date clicked: " + arg.dateStr);
  };

  return (
    <Grid
      className="w-full flex gap-2 px-2 py-4 justify-between items-center rounded-lg shadow-md border border-gray-800"
      sx={{ backgroundColor: "background.default" }}
    >
      <div className="w-full flex flex-col gap-3 justify-start items-center ">
        <div className="w-full flex gap-3 justify-start items-center ">
          <div className="bg-blue-400 bg-opacity-10 rounded-lg p-2">
            <RiCalendarScheduleLine className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h1>Work Schedule</h1>
          </div>
        </div>
        <div className="w-full max-h-60 overflow-auto">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek" // Week view
            events={events}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek,dayGridMonth",
            }}
            dateClick={handleDateClick}
          />
        </div>
      </div>
    </Grid>
  );
}
