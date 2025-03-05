import React, { useRef, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { IoFilter } from "react-icons/io5";
import { MdFormatListBulleted } from "react-icons/md";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CustomModal from "../../../components/CustomModal";

import dayjs from "dayjs";
import { CiFolderOn } from "react-icons/ci";
import ListView from "./Policies/ListView";
import FolderView from "./Policies/FolderView";

export default function OrganizationPolicies() {
  const [switchScreen, setSwitchScreen] = useState({
    primary: "list",
  });

  const [filterModal, setFilterModal] = useState(false);

  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const [filterFormValues, setFilterFormValues] = useState({
    fileName: "",
    dateFrom: null,
    dateTo: null,
  });

  const handleFilterFormChange = (name, value) => {
    setFilterFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form Values: ", filterFormValues);
    setFilterModal(false);
  };

  const filterModalFields = [
    {
      type: "text",
      name: "fileName",
      label: "Filename",
      defaultValue: "",
    },
    {
      type: "datePicker",
      name: "dateFrom",
      label: "From",
      defaultValue: dayjs(),
    },
    {
      type: "datePicker",
      name: "dateTo",
      label: "To",
      defaultValue: dayjs(),
    },
  ];

  return (
    <div className="w-full h-fit flex flex-col gap-3">
      <div className="w-full flex gap-3 justify-end items-center">
        <Button
          title="List"
          variant={switchScreen.primary === "list" ? "contained" : "outlined"}
          onClick={() => {
            setSwitchScreen({ primary: "list" });
          }}
        >
          <MdFormatListBulleted className="text-2xl" />
        </Button>
        <Button
          title="Folder"
          variant={switchScreen.primary === "folder" ? "contained" : "outlined"}
          onClick={() => {
            setSwitchScreen({ primary: "folder" });
          }}
        >
          <CiFolderOn className="text-2xl" />
        </Button>
        <IconButton
          onClick={() => {
            setFilterModal(true);
          }}
        >
          <IoFilter />
        </IconButton>
      </div>
      {switchScreen.primary === "list" ? (
        <>
          <ListView />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "folder" ? (
        <>
          <FolderView />
        </>
      ) : (
        <></>
      )}

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
        />
      </div>
    </div>
  );
}
