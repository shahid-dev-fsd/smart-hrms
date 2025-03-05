import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomModal from "../../../components/CustomModal";
import dayjs from "dayjs";

export default function Delegation() {
  const [addDelegationModal, setAddDelegationModal] = useState(false);

  const addDelegationModalFields = [
    {
      type: "autocomplete",
      name: "delegator",
      label: "Delegator",
      options: ["Delegatee 1", "Delegatee 2"],
      defaultValue: "",
    },
    {
      type: "autocomplete",
      name: "delegatee",
      label: "Delegatee",
      options: ["Delegatee 1", "Delegatee 2"],
      defaultValue: "",
    },
    {
      type: "select",
      name: "type",
      label: "Type",
      options: [
        { label: "Temporary", value: "temporary" },
        { label: "Permanent", value: "permanent" },
      ],
      defaultValue: "temporary",
      custom: (formData, setFormData, field, index, handleChange) => {
        if (formData.type === "temporary") {
          return (
            <div className="w-full flex flex-row gap-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From"
                  sx={{ width: "100%" }}
                  value={formData.from ? dayjs(formData.from) : null}
                  onChange={(value) => handleChange("from")(null, value)}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth margin="normal" />
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="To"
                  sx={{ width: "100%" }}
                  value={formData.to ? dayjs(formData.to) : null}
                  onChange={(value) => handleChange("to")(null, value)}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth margin="normal" />
                  )}
                />
              </LocalizationProvider>
            </div>
          );
        }
        return null;
      },
    },
    {
      type: "radio",
      name: "notification",
      label: "Notification",
      options: [
        { label: "Delegator And Delegatee", value: "delegatorAndDelegatee" },
        { label: "Delegatee", value: "delegatee" },
      ],
      defaultValue: "delegatorAndDelegatee",
    },
    {
      type: "textarea",
      label: "Description",
      name: "description",
      defaultValue: "",
    },
  ];
  const handleAddDelegationFormSubmit = (data) => {
    console.log("Add Delegation Form :- ", data);
  };

  return (
    <div className="flex flex-col gap-3 pb-3">
      <div className="w-full h-[41.25rem] flex flex-col gap-3 justify-center items-center text-center">
        <div className="w-[30%]">
          <h1>No delegations added currently.</h1>
        </div>
        <div className="w-[30%]">
          <p>
            Delegation lets you reassign approvals from one employee to another
            for a specific time frame.
          </p>
        </div>
        <div>
          <Button
            onClick={() => {
              setAddDelegationModal(true);
            }}
            variant="contained"
          >
            Add Delegation
          </Button>
        </div>
      </div>
      <CustomModal
        title="Add Delegation"
        fields={addDelegationModalFields}
        open={addDelegationModal}
        onClose={() => {
          setAddDelegationModal(false);
        }}
        onSubmit={handleAddDelegationFormSubmit}
        // isScrollable={true}
      />
    </div>
  );
}
