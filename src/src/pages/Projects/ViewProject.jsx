import React, { useEffect, useState } from "react";
import {
  Box,
 
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import ProjectTask from "./ProjectTask";
import ProjectFiles from "./ProjectFiles";
import ProjectMilestone from "./ProjectMilestone";
import ProjectComments from "./ProjectComments";
import ProjectNote from "./ProjectNote";
import ProjectInvoice from "./ProjectInvoice";

const ViewProject = () => {
  const [tab, setTab] = useState("task");
  const [text, setText] = useState("");

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  return (
    <Box sx={{ backgroundColor: "background.main" }}>
      <div className="flex flex-col">
        <div className="flex items-center justify-between md:w-full p-4">
          <div className="p-2">
            <h1 className="text-xs md:text-2xl text-neutral-500">
              Project List
            </h1>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <button className="flex  items-center text-white font-bold text-[8px] md:text-[12px] py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700">
              Create New Project
            </button>
            <InfoOutlinedIcon />
          </div>
        </div>
      </div>

      <div
        className="flex flex-col mb-[-31px]  overflow-y-auto"
        style={{
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none", // for Internet Explorer 10+
          scrollbarWidth: "none", // for Firefox>
        }}
      >
        <div className="flex items-center flex-row md:flex-row  md:w-full p-4">
          <div className="p-2 ml-2">
            <p className="text-[15px] md:text-[15px] text-neutral-200 ">
              OverView
            </p>
          </div>
          {tab == "task" ? (
            <div
              className="p-2 ml-2 "
              onClick={(e) => handleTabChange("task")}
              style={{
                backgroundColor: "rgb(14 165 233 ",
                color: "white",
                borderTopRightRadius: "5px",
                borderTopLeftRadius: "5px",
              }}
            >
              <h1 className="text-[14px] md:text-[15px] w-[50px] text-center  text-white">
                Task
              </h1>
            </div>
          ) : (
            <div className="p-2 ml-2 " onClick={(e) => handleTabChange("task")}>
              <h1 className="text-[14px] md:text-[15px] w-[50px] text-center  text-white">
                Task
              </h1>
            </div>
          )}
          {tab == "files" ? (
            <div
              className="p-2 ml-2"
              onClick={(e) => handleTabChange("files")}
              style={{
                backgroundColor: "rgb(14 165 233 ",
                color: "white",
                borderTopRightRadius: "5px",
                borderTopLeftRadius: "5px",
              }}
            >
              <h1 className="text-[14px] md:text-[15px] text-white-500">
                Files
              </h1>
            </div>
          ) : (
            <div className="p-2 ml-2" onClick={(e) => handleTabChange("files")}>
              <h1 className="text-[14px] md:text-[15px] text-neutral-500">
                Files
              </h1>
            </div>
          )}

          {tab == "milestone" ? (
            <div
              className="p-2 ml-2"
              onClick={(e) => handleTabChange("milestone")}
              style={{
                backgroundColor: "rgb(14 165 233 ",
                color: "white",
                borderTopRightRadius: "5px",
                borderTopLeftRadius: "5px",
              }}
            >
              <h1 className="text-[14px] md:text-[15px] text-white-500">
                milestone
              </h1>
            </div>
          ) : (
            <div
              className="p-2 ml-2"
              onClick={(e) => handleTabChange("milestone")}
            >
              <h1 className="text-[14px] md:text-[15px] text-neutral-500">
                milestone
              </h1>
            </div>
          )}
          {tab == "Comments" ? (
            <div
              className="p-2 ml-2"
              onClick={(e) => handleTabChange("Comments")}
              style={{
                backgroundColor: "rgb(14 165 233 ",
                color: "white",
                borderTopRightRadius: "5px",
                borderTopLeftRadius: "5px",
              }}
            >
              <h1 className="text-[14px] md:text-[15px] text-white-500">
                Comments
              </h1>
            </div>
          ) : (
            <div
              className="p-2 ml-2"
              onClick={(e) => handleTabChange("Comments")}
            >
              <h1 className="text-[14px] md:text-[15px] text-neutral-500">
                Comments
              </h1>
            </div>
          )}
          {tab == "Note" ? (
            <div
              className="p-2 ml-2"
              onClick={(e) => handleTabChange("Note")}
              style={{
                backgroundColor: "rgb(14 165 233 ",
                color: "white",
                borderTopRightRadius: "5px",
                borderTopLeftRadius: "5px",
              }}
            >
              <h1 className="text-[14px] md:text-[15px] text-white-500">
                Note
              </h1>
            </div>
          ) : (
            <div className="p-2 ml-2" onClick={(e) => handleTabChange("Note")}>
              <h1 className="text-[14px] md:text-[15px] text-neutral-500">
                Note
              </h1>
            </div>
          )}

          {tab == "Invoice" ? (
            <div
              className="p-2 ml-2"
              onClick={(e) => handleTabChange("Invoice")}
              style={{
                backgroundColor: "rgb(14 165 233 ",
                color: "white",
                borderTopRightRadius: "5px",
                borderTopLeftRadius: "5px",
              }}
            >
              <h1 className="text-[14px] md:text-[15px] text-white-500">
                Invoice
              </h1>
            </div>
          ) : (
            <div
              className="p-2 ml-2"
              onClick={(e) => handleTabChange("Invoice")}
            >
              <h1 className="text-[14px] md:text-[15px] text-neutral-500">
                Invoice
              </h1>
            </div>
          )}
        </div>
      </div>
      {tab == "task" && <ProjectTask />}

      {tab == "files" && <ProjectFiles />}

      {tab == "milestone" && <ProjectMilestone />}

      {tab == "Invoice" && <ProjectInvoice />}

      {tab == "Comments" && <ProjectComments />}
      {tab == "Note" && <ProjectNote />}
    </Box>
  );
};

export default ViewProject;
