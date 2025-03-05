import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (datePart, value) => {
    const newDate = new Date(selectedDate);
    if (datePart === 'day') {
      newDate.setDate(value);
    } else if (datePart === 'month') {
      newDate.setMonth(value - 1);
    } else if (datePart === 'year') {
      newDate.setFullYear(value);
    } else if (datePart === 'hours') {
      newDate.setHours(value);
    } else if (datePart === 'minutes') {
      newDate.setMinutes(value);
    } else if (datePart === 'ampm') {
      const hours = newDate.getHours();
      if (value === 'AM' && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === 'PM' && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }
    setSelectedDate(newDate);
  };

  const renderDateSelector = (label, value, datePart) => {
    return (
      <div className="flex items-center flex-col">
        <button onClick={() => handleDateChange(datePart, value - 1)}><ArrowDropUpIcon /></button>
        <span> {value}</span>
        <button onClick={() => handleDateChange(datePart, value + 1)}><ArrowDropDownIcon /></button>
      </div>
    );
  };

  const renderTimeSelector = (label, value, datePart) => {
    return (
      <div className="flex items-center flex-col">
        <button onClick={() => handleDateChange(datePart, value === 1 ? 12 : value - 1)}><ArrowDropUpIcon /></button>
        <span> {value < 10 ? `0${value}` : value}</span>
        <button onClick={() => handleDateChange(datePart, value === 12 ? 1 : value + 1)}><ArrowDropDownIcon /></button>
      </div>
    );
  };

  return (
    <div className="flex">
      <div className="flex flex-row mr-8">
        {renderDateSelector('Day', selectedDate.getDate(), 'day')}
        {renderDateSelector('Month', selectedDate.getMonth() + 1, 'month')}
        {renderDateSelector('Year', selectedDate.getFullYear(), 'year')}
      </div>
      <div className="flex flex-row">
        {renderTimeSelector('Hours', selectedDate.getHours(), 'hours')}
        {renderTimeSelector('Minutes', selectedDate.getMinutes(), 'minutes')}
        <div className="flex items-center flex-col">
          <button onClick={() => handleDateChange('ampm', selectedDate.getHours() >= 12 ? 'AM' : 'PM')}><ArrowDropUpIcon /></button>
          <span>{selectedDate.getHours() >= 12 ? 'PM' : 'AM'}</span>
          <button onClick={() => handleDateChange('ampm', selectedDate.getHours() >= 12 ? 'AM' : 'PM')}><ArrowDropDownIcon /></button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
