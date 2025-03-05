import React, { useState, useEffect } from "react";
import { FormControlLabel, FormGroup, IconButton, Switch } from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

export default function Card({
  type = "default",
  id = "",
  title = "",
  isActive = true,
  handleActive = () => {},
  handleEdit = () => {},
  handleDelete = () => {},
}) {
  const [data, setData] = useState({
    id: id,
    title: title,
    isActive: isActive,
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      id: id,
      title: title,
      isActive: isActive,
    }));
  }, [id, title, isActive]);

  return (
    <>
      {type === "default" && (
        <div className="w-[25rem] h-fit flex flex-row gap-3 p-3 items-center border border-neutral-700 rounded-lg">
          <FormGroup>
            <FormControlLabel
              onChange={(event) => {
                handleActive({ id, title, isActive: event.target.checked });
              }}
              control={<Switch checked={data.isActive} />}
              sx={{ margin: 0, padding: 0 }}
            />
          </FormGroup>
          <div className="w-52">
            <h1 className="truncate">{data.title}</h1>
          </div>
        </div>
      )}
      {type === "custom" && (
        <div className="w-[25rem] h-fit flex flex-row gap-3 p-3 justify-between items-center border border-neutral-700 rounded-lg">
          <div className="w-full flex flex-row gap-3 items-center">
            <FormGroup>
              <FormControlLabel
                onChange={(event) => {
                  setData((prev) => ({
                    ...prev,
                    isActive: event.target.checked,
                  }));
                  handleActive(data);
                }}
                control={<Switch checked={data.isActive} />}
                sx={{ margin: 0, padding: 0 }}
              />
            </FormGroup>
            <div className="w-52">
              <h1 className="truncate">{data.title}</h1>
            </div>
          </div>
          <div className="flex flex-row gap-3 ">
            <IconButton
              onClick={async () => {
                const updatedData = await handleEdit(data);
                setData((prev) => ({
                  ...prev,
                  title: updatedData?.metricName || data.title,
                }));
              }}
            >
              <MdOutlineEdit />
            </IconButton>
            <IconButton
              onClick={() => {
                handleDelete(data);
              }}
            >
              <MdDeleteOutline />
            </IconButton>
          </div>
        </div>
      )}
    </>
  );
}
