import React, { useState } from "react";
import CustomModal from "../../../components/CustomModal";
import { IconButton } from "@mui/material";
import { IoFilter } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";

export default function ActivityLog() {
  const [filterModal, setFilterModal] = useState(false);
  const [logs, setLogs] = useState([
    {
      date: "01/01/2001",
      data: [
        {
          time: "02:00 PM",
          type: "add",
          username: "steward graham",
          message: "has added a new category asasasas.",
        },
        {
          time: "02:00 PM",
          type: "update",
          username: "steward graham",
          message: "has added a new category asasasas.",
        },
        {
          time: "02:00 PM",
          type: "delete",
          username: "steward graham",
          message: "has added a new category asasasas.",
        },
        {
          time: "02:00 PM",
          type: "view",
          username: "steward graham",
          message: "has added a new category asasasas.",
        },
      ],
    },
    {
      date: "01/01/2001",
      data: [
        {
          time: "02:00 PM",
          type: "add",
          username: "steward graham",
          message: "has added a new category asasasas.",
        },
        {
          time: "02:00 PM",
          type: "update",
          username: "steward graham",
          message: "has added a new category asasasas.",
        },
        {
          time: "02:00 PM",
          type: "delete",
          username: "steward graham",
          message: "has added a new category asasasas.",
        },
        {
          time: "02:00 PM",
          type: "view",
          username: "steward graham",
          message: "has added a new category asasasas.",
        },
      ],
    },
  ]);

  const filterModalFields = [
    {
      type: "autocomplete",
      name: "priority",
      label: "Priority",
      options: ["Priority 1", "Priority 2"],
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "relatedForms",
      label: "Related Forms",
      options: ["Related Forms 1", "Related Forms 2"],
      defaultValue: "",
    },
  ];

  const handleFilterFormSubmit = (data) => {
    console.log("Filter Form :- ", data);
  };

  const renderLogs = () => {
    return logs.map((log, index) => (
      <div key={index} className="flex flex-col px-6">
        <div className="px-14 py-3">
          <span className="font-bold text-lg">{log.date}</span>
        </div>
        <div className="w-fit px-[6.05rem] py-1 flex flex-col justify-center items-center">
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
          <div className="w-[0.1rem] h-5 bg-gray-300 rounded-lg" />
        </div>
        <div className="flex flex-col">
          {log.data.map((entry, idx) => (
            <div>
              <div key={idx} className="flex flex-row gap-3 items-center">
                <span className="text-gray-400">{entry.time}</span>
                <IconButton>
                  <MdOutlineEdit />
                </IconButton>
                <div className="flex flex-row gap-3">
                  <span className="text-blue-300">{entry.username}</span>
                  <span>{entry.message}</span>
                </div>
              </div>
              {idx !== log.data.length - 1 && (
                <div className="px-[6.25rem] py-1">
                  <div className="w-[0.1rem] h-5 bg-gray-300 rounded-lg" />
                </div>
              )}
            </div>
          ))}
          <div className="w-fit px-[6.05rem] py-1 flex flex-col justify-center items-center">
            <div className="w-[0.1rem] h-5 bg-gray-300 rounded-lg" />
            <div className="w-2 h-2 bg-gray-300 rounded-full" />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="w-full min-h-80 flex flex-col">
      <div className="w-full flex gap-3 justify-end items-center">
        <IconButton
          onClick={() => {
            setFilterModal(true);
          }}
          title="Filter"
        >
          <IoFilter />
        </IconButton>
      </div>
      <CustomModal
        title="Filter"
        submitLabel="Apply"
        fields={filterModalFields}
        open={filterModal}
        onClose={() => {
          setFilterModal(false);
        }}
        onSubmit={handleFilterFormSubmit}
        // isScrollable={true}
      />
      <div className="flex flex-col h-[40rem] overflow-scroll">{renderLogs()}</div>
    </div>
  );
}
