import React, { useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  TextareaAutosize,
} from "@mui/material";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiExport } from "react-icons/ci";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";

import Card from "./Card";

import CustomModal from "../../../../../components/CustomModal";
import CustomEmptyModal from "../../../../../components/CustomEmptyModal";

export default function Summary() {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuopen = Boolean(menuAnchor);

  const [addSummaryModal, setAddSummaryModal] = useState(false);
  const fields = [
    {
      type: "select",
      name: "question",
      label: "Question",
      options: [
        { label: "Question 1", value: "question_1" },
        { label: "Question 2", value: "question_2" },
      ],
    },
    {
      type: "textarea",
      name: "answer",
      label: "Write Summary here...",
    },
  ];

  const [exportSummaryModal, setExportSummaryModal] = useState(false);
  const [exportFormData, setExportFormData] = useState({ format: "xls" });

  const [summary, setSummary] = useState([
    {
      id: 1,
      question: "What is your favorite color?",
      answer: "My favorite color is blue.",
      updatedAt: "Jan 14 2025 6:57 PM",
    },
    {
      id: 2,
      question: "What is your favorite food?",
      answer: "I love pizza!",
      updatedAt: "Jan 14 2025 6:57 PM",
    },
    {
      id: 3,
      question: "How are You?",
      answer: "I'm Fine. How About You?",
      updatedAt: "Jan 14 2025 6:57 PM",
    },
    {
      id: 4,
      question: "What do you do for fun?",
      answer: "I enjoy reading and hiking.",
      updatedAt: "Jan 14 2025 6:57 PM",
    },
    {
      id: 5,
      question: "What is your favorite color?",
      answer: "My favorite color is blue.",
      updatedAt: "Jan 14 2025 6:57 PM",
    },
    {
      id: 6,
      question: "What is your favorite food?",
      answer: "I love pizza!",
      updatedAt: "Jan 14 2025 6:57 PM",
    },
    {
      id: 7,
      question: "How are You?",
      answer: "I'm Fine. How About You?",
      updatedAt: "Jan 14 2025 6:57 PM",
    },
    {
      id: 8,
      question: "What do you do for fun?",
      answer: "I enjoy reading and hiking.",
      updatedAt: "Jan 14 2025 6:57 PM",
    },
    {
      id: 9,
      question: "What is your favorite color?",
      answer: "My favorite color is blue.",
      updatedAt: "Jan 14 2025 6:57 PM",
    },
    {
      id: 10,
      question: "What is your favorite food?",
      answer: "I love pizza!",
      updatedAt: "Jan 14 2025 6:57 PM",
    },
  ]);

  const handleEdit = (updatedSummary) => {
    setSummary((prevSummary) =>
      prevSummary.map((item) =>
        item.id === updatedSummary.id
          ? { ...item, answer: updatedSummary.answer }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setSummary((prevSummary) => prevSummary.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 justify-start items-center">
      <div className="w-full flex flex-row gap-3 justify-end items-center">
        <Button
          onClick={() => {
            setAddSummaryModal(true);
          }}
          variant="contained"
        >
          Provide Feedback
        </Button>
        <div>
          <IconButton
            id="basic-button"
            aria-controls={isMenuopen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuopen ? "true" : undefined}
            onClick={(event) => {
              setMenuAnchor(event.currentTarget);
            }}
          >
            <HiDotsHorizontal className="text-2xl" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={menuAnchor}
            open={isMenuopen}
            onClose={() => {
              setMenuAnchor(null);
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                setExportSummaryModal(true);
              }}
            >
              <div className="flex flex-row gap-3 justify-between items-center">
                <CiExport className="text-2xl" />
                <h1>Export</h1>
              </div>
            </MenuItem>
          </Menu>
        </div>
      </div>

      <div className="w-full h-[58dvh] flex flex-col gap-3 overflow-scroll">
        {summary && summary.length !== 0 ? (
          <Timeline>
            {summary.map(({ id, question, answer, updatedAt }, index) => (
              <TimelineItem key={id}>
                <div className="w-full flex flex-row gap-3">
                  <div className="flex items-center justify-center ">
                    <p>{updatedAt}</p>
                  </div>
                  <TimelineSeparator>
                    <TimelineDot />
                    {index < summary.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Card
                      id={id}
                      question={question}
                      answer={answer}
                      handleEdit={handleEdit}
                      handleDelete={() => handleDelete(id)} // Pass the handleDelete function
                    />
                  </TimelineContent>
                </div>
              </TimelineItem>
            ))}
          </Timeline>
        ) : (
          <></>
        )}
      </div>

      <CustomModal
        title={"Filter"}
        onClose={() => {
          setAddSummaryModal(false);
        }}
        fields={fields}
        open={addSummaryModal}
        onSubmit={(data) => {
          console.log("Add Summary Form Data :- ", data);
        }}
      />

      <CustomEmptyModal
        open={exportSummaryModal}
        onClose={() => {
          setExportSummaryModal(false);
        }}
        isSmall={true}
      >
        <div className="w-full flex flex-col gap-6 p-4 justify-center items-center">
          <div className="flex flex-col gap-3 justify-center items-center">
            <h1>Export As</h1>
            <h1>Choose the file format to export</h1>
            <div>
              <FormControl>
                <RadioGroup
                  defaultValue={exportFormData.format}
                  onChange={(event) => {
                    setExportFormData({
                      ...exportFormData,
                      format: event.target.value,
                    });
                  }}
                  className="flex gap-3"
                  sx={{ flexDirection: "row" }}
                >
                  <FormControlLabel
                    value="xls"
                    control={<Radio />}
                    label="XLS"
                  />
                  <FormControlLabel
                    value="xlsx"
                    control={<Radio />}
                    label="XLSX"
                  />
                  <FormControlLabel
                    value="csv"
                    control={<Radio />}
                    label="CSV"
                  />
                  <FormControlLabel
                    value="tsv"
                    control={<Radio />}
                    label="TSV"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="w-full flex flex-row gap-6 justify-center items-center">
            <Button
              onClick={() => {
                console.log(exportFormData);
                setExportSummaryModal(false);
              }}
              variant="contained"
            >
              Export
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setExportSummaryModal(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </CustomEmptyModal>
    </div>
  );
}
