import React, { useState, useEffect } from "react";
import { FormControlLabel, FormGroup, IconButton, Switch } from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

export default function Card({
  type = "default",
  data = {},
  handleSelect = () => {},
  handleEdit = () => {},
  handleDelete = () => {},
}) {
  const [cardData, setCardData] = useState(data);

  useEffect(() => {
    setCardData(data);
  }, [data]);

  return (
    <>
      {type === "default" && (
        <div className="w-[15rem] h-fit flex flex-col gap-3 p-3 items-center border border-neutral-700 rounded-lg">
          <div
            className="w-full h-[8rem] cursor-pointer"
            onClick={() => {
              handleSelect(cardData);
            }}
          >
            <img
              className="w-full h-full object-cover rounded-lg"
              src={cardData.backgroundImage}
              alt=""
            />
          </div>
          <div className="w-full flex flex-col">
            <h1 className="truncate">{cardData.title}</h1>
            <h1 className="truncate">{cardData.questionsNumbers} Questions</h1>
          </div>
        </div>
      )}
      {type === "custom" && (
        <div className="w-[15rem] h-fit flex flex-col gap-3 p-3 items-center border border-neutral-700 rounded-lg">
          <div
            className="w-full h-[8rem] cursor-pointer"
            onClick={() => {
              handleSelect(cardData);
            }}
          >
            <img
              className="w-full h-full object-cover rounded-lg"
              src={cardData.backgroundImage}
              alt=""
            />
          </div>
          <div className="w-full flex flex-row justify-between items-center">
            <div>
              <h1 className="truncate">{cardData.title}</h1>
              <h1 className="truncate">
                {cardData.questionsNumbers} Questions
              </h1>
            </div>
            <div>
              <IconButton onClick={() => handleEdit(cardData)}>
                <MdOutlineEdit />
              </IconButton>
              <IconButton onClick={() => handleDelete(cardData)}>
                <MdDeleteOutline />
              </IconButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
