import { Box } from '@mui/material';
import React from 'react';

const NoticeBoard = ({ eventData }) => {
    console.log(eventData)
   const demoEvent =  [
        {
            "date": "5 Mar",
            "title": "Board Meeting",
            "description": "Attend board meeting with company manager.",
            "backgroundColor": "#fbbf24"
        },
        {
            "date": "9 Mar",
            "title": "Design Team Meeting",
            "description": "Attend design team meeting with team mates and HOD.",
            "backgroundColor": "#dc2626"
        },
        {
            "date": "7 Feb",
            "title": "Tech Conference",
            "description": "Attend conference with teammates and other departments.",
            "backgroundColor": "#f97316"
        },
        {
            "date": "4 Mar",
            "title": "Development Team Pitch",
            "description": "Pitch idea on new development to the company board,",
            "backgroundColor": "#3b82f6"
        }
    ]
    return (
        <Box sx={{
            backgroundColor: 'background.view', 
           
           }} className="rounded-lg">
        <div className="rounded-lg pt-4 mb-4 shadow-md h-96 overflow-hidden relative">
            <p className=" mb-4 border-l-4 border-blue-500 pl-2 text-2xl" gutterBottom>
                Notice Boards
            </p>
            <div className="px-1 p-4 overflow-y-auto">
                <div className=''>
                    {eventData?eventData:demoEvent.map((event, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex gap-4 justify-center items-center">
                                <div className="w-1/4 h-[60px] flex items-center justify-center text-white rounded-lg" style={{ backgroundColor: event.backgroundColor }}>
                                    <div className="w-[97%] h-[57px] flex items-center justify-center border-2 border-gray-900 rounded-lg p-0">
                                        <p className='p-1 text-gray-900 font-semibold text-center gap-0'>{event.date}</p>
                                    </div>
                                </div>
                                <div className="w-4/5">
                                    <h1 className="text-sm">{event.title}</h1>
                                    <p className="text-xs text-gray-500">{event.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                
                .overflow-y-auto::-webkit-scrollbar {
                    display: none;
                }

                
                .overflow-y-auto {
                    scrollbar-width: none;
                }
            `}</style>
        </div>
        </Box>
    );
};

export default NoticeBoard;
