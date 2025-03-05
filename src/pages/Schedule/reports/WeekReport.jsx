import React from "react";

const weekData = [
  {
    day: "Mon 22",
    shifts: [
      { status: "On-time", time: "12PM - 8PM" },
      { status: "Early", time: "2PM - 10PM" },
      { status: "Early", time: "12PM - 8PM" },
      { status: "On-time", time: "9PM - 5AM" },
      { status: "Late", time: "9PM - 5AM" },
    ],
  },
  {
    day: "Tue 23",
    shifts: [
      { status: "On-time", time: "12PM - 8PM" },
      { status: "Early", time: "2PM - 10PM" },
      { status: "Late", time: "12PM - 8PM" },
      { status: "On-time", time: "9PM - 5AM" },
      { status: "On-time", time: "9PM - 5AM" },
    ],
  },
  {
    day: "Wed 24",
    shifts: [
      { status: "On-time", time: "12PM - 8PM" },
      { status: "Early", time: "2PM - 10PM" },
      { status: "On-time", time: "12PM - 8PM" },
      { status: "On-time", time: "9PM - 5AM" },
      { status: "On-time", time: "9PM - 5AM" },
    ],
  },
  {
    day: "Thu 25",
    shifts: [
      { status: "On-time", time: "12PM - 8PM" },
      { status: "On-time", time: "2PM - 10PM" },
      { status: "On-time", time: "12PM - 8PM" },
      { status: "On-time", time: "9PM - 5AM" },
      { status: "On-time", time: "9PM - 5AM" },
    ],
  },
  {
    day: "Fri 26",
    shifts: [
      { status: "On-time", time: "12PM - 8PM" },
      { status: "On-time", time: "2PM - 10PM" },
      { status: "Absent", time: "All day" },
      { status: "On-time", time: "12PM - 8PM" },
      { status: "On-time", time: "9PM - 5AM" },
    ],
  },
  {
    day: "Sat 27",
    shifts: [
      { status: "Weekend Break", time: "All day" },
      { status: "Weekend Break", time: "All day" },
    ],
  },
  {
    day: "Sun 28",
    shifts: [
      { status: "Weekend Break", time: "All day" },
      { status: "Weekend Break", time: "All day" },
    ],
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "On-time":
      return "bg-[rgba(55,103,177,0.8)] text-white"; // #3767B1 with 80% opacity
    case "Early":
      return "bg-[rgba(55,103,177,0.8)] text-white"; // #3767B1 with 80% opacity
    case "Late":
      return "bg-red-500 text-white";
    case "Absent":
      return "bg-orange-400 text-white";
    case "Weekend Break":
      return "bg-pink-500 text-white";
    case "On Leave":
      return "bg-green-500 text-white";
    default:
      return "";
  }
};

const getDotColor = (status) => {
  switch (status) {
    case "On-time":
      return "bg-green-500";
    case "Early":
      return "bg-blue-500";
    case "Late":
      return "bg-red-500";
    case "Absent":
    case "Weekend Break":
    case "On Leave":
      return "bg-gray-400"; // Different color for non-time-based statuses
    default:
      return "";
  }
};

const WeekReport = () => {
  return (
    <div className="p-8" style={{ marginTop: '-76px', width: '127%', marginLeft: '-93px' }}>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead style={{ border: '1px solid gray' }}>
            <tr >
              {weekData.map((day, index) => (
                <th
                style={{ fontSize: '13px', fontWeight: 'normal' }}
                  key={index}
                  className="border border-gray-300 p-2 text-lg font-semibold"
                >
                  {day.day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {weekData.map((day, colIndex) => (
                  <td
                    key={colIndex}
                    className={`p-4 text-center ${getStatusColor(day.shifts[rowIndex]?.status || "")}`}
                    style={{
                      borderRadius: '10px', // Rounded corners
                      border: '1px solid gray', // Border color
                      overflow: 'hidden',
                      minWidth: '110px', // Adjust column width
                      height:'13px'
                    }}
                  >
                    {/* Flexbox container to control the height and alignment */}
                    <div 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        minHeight: '12px' // Set minimum height here
                      }}
                    >
                      {/* Status dot and text */}
                      <div style={{ fontSize: '8px' }} className="text-sm font-bold">
                        Shift:    
                        <span
                          className={`inline-block w-2 h-2 mr-2 rounded-full ${getDotColor(day.shifts[rowIndex]?.status || "")}`}
                        ></span> 
                        {day.shifts[rowIndex]?.status || ""}
                      </div>
                      <div style={{ fontSize: '10px' }} className="text-xs mt-1">
                        {day.shifts[rowIndex]?.time || ""}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeekReport;
