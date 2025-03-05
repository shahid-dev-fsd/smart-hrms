import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Bars = ({ barsData }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [ setSelectedYear] = useState('2024');

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setDropdownOpen(false);
    };

    
    

    const [percentageLines, setPercentageLines] = useState([]);

    useEffect(() => {
       
        const lines = [30, 60, 90, 120,]; 

        setPercentageLines(lines);
    }, []);

    return (
        <Box  sx ={{ backgroundColor: 'background.view',}} className= 'rounded-lg  h-full'>
            <div className="rounded-lg pt-4 pb-4 pr-4 mb-4">
                <div className="flex flex-col md:flex-row gap-4 mb-4 items-start md:items-center justify-between">
                    <Typography variant='h5' className="w-1/3 border-l-4 border-blue-500 pl-2 whitespace-nowrap" gutterBottom>
                        Project Overview
                    </Typography>
                    
                    <div className="w-1/2 md:w-1/3 flex items-start md:items-center justify-between rounded-lg p-2 ml-auto">
                        <div className="flex items-center relative w-full">
                            <div className="border border-gray-600 rounded-lg p-1">
                                <Typography variant="h7">Week <KeyboardArrowDownIcon className="md:ml-2 cursor-pointer text-9333ea" onClick={toggleDropdown} /></Typography>
                                
                            </div>
                            {dropdownOpen && (
                                <div className="absolute top-10 right-0 mt-1 w-[70px] bg-neutral-900 rounded-lg border border-gray-600 z-10">
                                    <div className="p-2 flex flex-col gap-2 justify-center items-center">
                                        <Typography variant="h7" className="cursor-pointer" onClick={() => handleYearSelect('2024')}>
                                            Sun
                                        </Typography>
                                        <Typography variant="h7" className="cursor-pointer" onClick={() => handleYearSelect('2023')}>
                                            Mon
                                        </Typography>
                                        <Typography variant="h7" className="cursor-pointer" onClick={() => handleYearSelect('2023')}>
                                            Tue
                                        </Typography>
                                        <Typography variant="h7" className="cursor-pointer" onClick={() => handleYearSelect('2023')}>
                                            Wed
                                        </Typography>
                                        <Typography variant="h7" className="cursor-pointer" onClick={() => handleYearSelect('2023')}>
                                            Thu
                                        </Typography>
                                        <Typography variant="h7" className="cursor-pointer" onClick={() => handleYearSelect('2023')}>
                                            Fri
                                        </Typography>
                                        <Typography variant="h7" className="cursor-pointer" onClick={() => handleYearSelect('2023')}>
                                            Sat
                                        </Typography>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={267}>
                    <BarChart data={barsData}>
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        {percentageLines.map((line, index) => (
                            <ReferenceLine key={index} y={line} stroke="#27272a" strokeDasharray="solid" />
                        ))}
                        <Tooltip />
                        <Bar dataKey="inProgress" stackId="a" fill="#93c5fd" barSize={8}/>
                        <Bar dataKey="pending" stackId="a" fill="#1d4ed8" barSize={8}/>
                        <Bar dataKey="completed" stackId="a" fill="#34d399" barSize={8}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Box>
    );
};

export default Bars;
