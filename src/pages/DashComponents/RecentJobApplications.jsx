import React from "react";
import { FaPhone, FaEnvelope, FaTrashAlt } from "react-icons/fa";
import { Box } from "@mui/material";

// Sample data for job applications
const jobApplications = [
  {
    id: 1,
    name: "Richard Webber",
    role: "UI/UX Designer",
    experience: "2 Years",
    country: "South Africa",
  },
  {
    id: 2,
    name: "Desmond Jakes",
    role: "Frontend Developer",
    experience: "4 Years",
    country: "South Africa",
  },
  {
    id: 3,
    name: "Jaxson Schleifer",
    role: "Frontend Developer",
    experience: "4 Years",
    country: "United Kingdom",
  },
  {
    id: 4,
    name: "Cynthia Eze",
    role: "Software Engineer",
    experience: "4 Years",
    country: "Nigeria",
  },
  {
    id: 5,
    name: "Erin Herwitz",
    role: "Digital Marketer",
    experience: "4 Years",
    country: "Canada",
  },
  {
    id: 6,
    name: "Omar Bator",
    role: "Backend Developer",
    experience: "4 Years",
    country: "Turkey",
  },
];

// Dropdown component
const Dropdown = ({ label, options }) => (
  <select
    className="bg-gray-700 text-white rounded-md p-2 outline-none"
    defaultValue={label}
  >
    <option disabled>{label}</option>
    {options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
);

// Application row component for each applicant
const ApplicationRow = ({ applicant }) => (
  <div className="flex items-center justify-between py-4 px-4">
    <div className="flex items-center space-x-4">
      {/* Profile Picture */}
      <img
        src={`https://i.pravatar.cc/40?img=${applicant.id}`}
        alt={applicant.name}
        className="w-7 h-7 rounded-full"
      />
      <div>
        <h3 style={{fontFamily:"sans-serif",fontSize:'14.5px'}} className="">{applicant.name}</h3>
        <p style={{fontFamily:"sans-serif",fontSize:'11px'}} className="text-gray-400 ">{applicant.role}</p>
      </div>
    </div>

    {/* Experience */}
    <p style={{fontSize:'13px'}} className="text-gray-300 ">{applicant.experience}</p>

    {/* Country Name and Flag */}
    <div className="flex items-center space-x-2">
      <span className="text-xs">{applicant.country}</span>
    </div>

    {/* Action Buttons */}
    <div className="flex space-x-4">
      <button
        style={{
          backgroundColor: '#1a1f1b',
          padding: '10px',
          borderRadius: '8px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="p-2 bg-green-500 rounded-full"
      >
        <FaPhone style={{ color: '#3ae153', fontSize: '15px' }} />
      </button>
      <button
        style={{
          backgroundColor: '#0e1220',
          padding: '10px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FaEnvelope style={{ color: '#2670E1', fontSize: '15px' }} />
      </button>

      {/* Delete Button */}
      <button
        style={{
          backgroundColor: '#1a1f1b',
          padding: '10px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FaTrashAlt style={{ color: '#ff3b3f', fontSize: '15px' }} />
      </button>
    </div>
  </div>
);

// Main component for recent job applications
const RecentJobApplications = () => {
  return (
    <div style={{ backgroundColor: "background.default", marginTop: '-24px', }}>
      {/* Header section with title and dropdowns */}
      <Box
        sx={{ backgroundColor: "background.view", padding: '14px', borderRadius: "12px" }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 style={{ fontSize: "13px" }} className="text-white  font-semibold">
            Recent Job Applications
          </h1>
          <div className="flex space-x-4 bg-transparent">
            <Dropdown label="Monthly" options={["Weekly", "Monthly", "Yearly"]} />
            <Dropdown
              label="All Jobs"
              options={["Frontend Developer", "Backend Developer", "Designer"]}
            />
          </div>
        </div>

        {/* List of job applications */}
        <div style={{ marginTop: '-18px' }} className="rounded-lg shadow-lg">
          {jobApplications.map((applicant) => (
            <ApplicationRow key={applicant.id} applicant={applicant} />
          ))}
        </div>
      </Box>
    </div>
  );
};

export default RecentJobApplications;
