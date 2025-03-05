import { IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { PiLessThanBold } from "react-icons/pi";
import { PiGreaterThanBold } from "react-icons/pi";
import { IoCalendarOutline } from "react-icons/io5";

export default function DateButton({ mode, onDateChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Calculate the date range based on the mode
  const getDateRange = () => {
    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);

    if (mode === "year") {
      startDate.setMonth(0, 1); // First day of the year
      endDate.setMonth(11, 31); // Last day of the year
    } else if (mode === "month") {
      startDate.setDate(1); // First day of the month
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0); // Last day of the month
    } else if (mode === "week") {
      const dayOfWeek = startDate.getDay();
      startDate.setDate(startDate.getDate() - dayOfWeek); // Start of the week (Sunday)
      endDate.setDate(startDate.getDate() + 6); // End of the week (Saturday)
    } else if (mode === "day") {
      // For day mode, start and end dates are the same
      endDate.setDate(startDate.getDate());
    }

    return {
      start: startDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      end: endDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
  };

  // Notify the parent component of the initial date range on mount
  useEffect(() => {
    if (onDateChange) {
      const { start, end } = getDateRange();
      onDateChange({ start, end });
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Notify the parent component whenever the date changes
  useEffect(() => {
    if (onDateChange) {
      const { start, end } = getDateRange();
      onDateChange({ start, end });
    }
  }, [currentDate, mode]);

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (mode === "year") {
      newDate.setFullYear(newDate.getFullYear() - 1);
    } else if (mode === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (mode === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else if (mode === "day") {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (mode === "year") {
      newDate.setFullYear(newDate.getFullYear() + 1);
    } else if (mode === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (mode === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else if (mode === "day") {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const { start, end } = getDateRange();

  return (
    <div className="flex flex-row gap-3 justify-center items-center">
      <div className="flex flex-row justify-center items-center gap-1 px-2 rounded-lg border border-neutral-700">
        <IconButton onClick={handlePrevious}>
          <PiLessThanBold className="text-sm" />
        </IconButton>
        <IconButton>
          <IoCalendarOutline />
        </IconButton>
        <IconButton onClick={handleNext}>
          <PiGreaterThanBold className="text-sm" />
        </IconButton>
      </div>
      <div>
        <Typography>
          {start} - {end}
        </Typography>
      </div>
    </div>
  );
}