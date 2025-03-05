import React from "react";
import { Checkbox, IconButton, TextField } from "@mui/material";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

export default function Card({
  type = "kraLibrary",
  id,
  title = "Demo",
  description = "Hello",
  checked = false,
  weightage = 0,
  handleAdd,
  handleEdit,
  handleDelete,
  handleWeightage,
  handleCompetencyEdit,
  handleCompetencyDelete,
}) {
  return (
    <>
      {type === "add" ? (
        <div className="w-full">
          <div className="flex flex-row gap-1 p-2 items-center border border-neutral-700 rounded-lg">
            <Checkbox
              checked={checked}
              onChange={(event) => {
                if (event.target.checked) {
                  handleAdd(id, title);
                } else {
                  handleDelete(id);
                }
              }}
            />
            <h1>{title}</h1>
          </div>
        </div>
      ) : (
        <></>
      )}
      {type === "edit" ? (
        <>
          <div className="w-full">
            <div className="flex flex-row gap-1 p-2 justify-between items-center border border-neutral-700 rounded-lg">
              <h1>{title}</h1>
              <div>
                <TextField
                  label={"Weightage"}
                  name={"weightage"}
                  placeholder={"Weightage"}
                  value={weightage}
                  onChange={(event) => {
                    const value = event.target.value;
                    handleWeightage(id, value);
                  }}
                  fullWidth
                  margin="normal"
                  type="number"
                  inputProps={{
                    min: 0,
                    max: 100,
                  }}
                />
              </div>
              <IconButton
                onClick={() => {
                  handleDelete(id);
                }}
              >
                <MdOutlineDeleteOutline />
              </IconButton>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {type === "kraLibrary" ? (
        <>
          <div className="w-full flex flex-row gap-1 p-2 justify-between items-center border border-neutral-700 rounded-lg">
            <div className="flex flex-row gap-2 justify-center items-center">
              <Checkbox
                checked={checked}
                onChange={(event) => {
                  if (event.target.checked) {
                    handleAdd(id, title, description);
                  } else {
                    handleDelete(id);
                  }
                }}
              />
              <div>
                <h1>{title}</h1>
                <h1>{description}</h1>
              </div>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
              <IconButton>
                <MdOutlineEdit
                  onClick={() => {
                    handleCompetencyEdit({ id, title, description });
                  }}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleCompetencyDelete(id);
                }}
              >
                <MdOutlineDeleteOutline />
              </IconButton>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
