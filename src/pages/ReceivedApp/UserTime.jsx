import { Button } from "@mui/material";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const UserTime = () => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('10:00');

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
    };

    const handleTimeChange = (selectedTime) => {
        setTime(selectedTime);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Date:", date);
        console.log("Time:", time);
    };

    return (
        <div className="container text-white">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <DatePicker 
                        selected={date} 
                        onChange={handleDateChange} 
                        dateFormat="dd/MM/yyyy" 
                        className="bg-neutral-900 rounded p-2 text-white" 
                    />
                </div>
                <div className="mb-4">
                    <TimePicker 
                        value={time} 
                        onChange={handleTimeChange} 
                        className="bg-neutral-900 rounded p-2 text-white"
                    />
                </div>
                <Button 
                    type="submit" 
                    variant="outlined"
                >
                    confirm
                </Button>
            </form>
        </div>
    );
};

export default UserTime;
