import { Box } from "@mui/material";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "12px",
        backgroundColor: "background.default",
        width: "280px",
        fontFamily: "Arial, sans-serif",
        ".react-calendar": {
          backgroundColor: "background.default",
          border: "none",
          borderRadius: "12px",
        },
        ".react-calendar__tile": {
          color: "gray",
          borderRadius: "50%",
          padding: "10px",
        },
        ".react-calendar__tile--active": {
          color: "white",
          borderRadius: "50%",
        },
        ".react-calendar__tile--now": {
          backgroundColor: "#3767B180",
          color: "white",
          borderRadius: "50%",
        },
        ".react-calendar__month-view__weekdays": {
          color: "gray",
        },
        ".react-calendar__navigation": {
          display: "none",
        },
      }}
    >
      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        showNavigation={false}
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString(locale, { weekday: "short" }).slice(0, 2)
        }
      />
    </Box>
  );
};

export default MyCalendar;
