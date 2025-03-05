import { Avatar, Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

export default function Card({
  id,
  username = "Username",
  type = "Admin",
  question,
  answer,
  handleEdit,
  handleDelete,
}) {
  const [summaryFormData, setSummaryFormData] = useState({ answer: answer });
  const [isEditAnswer, setIsEditAnswer] = useState(false);

  return (
    <div className="w-full p-3 flex flex-col gap-3 justify-between items-center border border-neutral-700 rounded-lg">
      <div className="w-full flex flex-row gap-3 justify-between items-center">
        <div className="flex flex-row gap-3 justify-center items-center">
          <Avatar />
          <div>
            <h1>{username}</h1>
            <h1>{type}</h1>
          </div>
        </div>
        <div className="flex flex-row gap-1 justify-center items-center">
          <IconButton
            onClick={() => {
              setSummaryFormData((prev) => {
                return { ...prev, answer: answer };
              });
              setIsEditAnswer(true);
            }}
          >
            <MdOutlineEdit />
          </IconButton>
          <IconButton onClick={() => handleDelete(id)}>
            {" "}
            {/* Call handleDelete with the id */}
            <MdDeleteOutline />
          </IconButton>
        </div>
      </div>
      {isEditAnswer === true ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEdit({ id, question, answer: summaryFormData.answer });
            setIsEditAnswer(false);
          }}
          className="w-full"
        >
          <TextField
            sx={{ width: "100%" }}
            label="Answer"
            variant="outlined"
            value={summaryFormData.answer}
            onChange={(event) => {
              setSummaryFormData((prev) => {
                return { ...prev, answer: event.target.value };
              });
            }}
          />
          <div className="w-full flex flex-row gap-3 justify-end items-center">
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Button
              onClick={() => {
                setSummaryFormData({ answer: answer });
                setIsEditAnswer(false);
              }}
              variant="outlined"
            >
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <>
          <div className="w-full flex flex-col items-start">
            <h1>{question}</h1>
            <h1>{answer}</h1>
          </div>
        </>
      )}
    </div>
  );
}
