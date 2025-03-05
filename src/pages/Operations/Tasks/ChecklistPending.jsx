import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { IoFilter } from "react-icons/io5";
import CustomModal from "../../../components/CustomModal";

export default function ChecklistPending() {
  const [filterModal, setFilterModal] = useState(false);

  const filterModalFields = [
    {
      type: "multipleSelect",
      name: "relatedForms",
      label: "Related Forms",
      options: ["Related Forms 1", "Related Forms 2"],
      defaultValue: [],
    },
    {
      type: "multipleSelect",
      name: "checklistInitiator",
      label: "Checklist Initiator",
      options: ["Checklist Initiator 1", "Checklist Initiator 2"],
      defaultValue: "",
    },
  ];
  const handleFilterFormSubmit = (data) => {
    console.log("Filter Form :- ", data);
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
      <div className="w-full h-40 flex flex-col justify-center items-center">
        <h1>No checklists to list here</h1>
      </div>
      <div>
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
      </div>
    </div>
  );
}
