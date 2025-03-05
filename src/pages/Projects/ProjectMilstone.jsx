import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Document from "../../../src/assets/Icons/fluent_document-48-regular.png";
import bag from "../../../src/assets/Icons/Vector.png";
import mobile from "../../../src/assets/Icons/mynaui_mobile.png";
import dekstop from "../../../src/assets/Icons/mynaui_desktop.png";
import mobileupload from "../../assets/Icons/mobi.png";
import psdupload from "../../assets/Icons/psdd.png";
import uiupload from "../../assets/Icons/uiup.png";
import flutterupload from "../../assets/Icons/flut.png";

const ProjectMilesTone = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2024");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setDropdownOpen(false);
  };

  const jobs = [
    {
      title: "Flutter",
      description: "Deadline: 2 days left",
      img: flutterupload,
      bgstyle: "#61896a",
    },
    {
      title: "Mobile app design",
      description: "Deadline: 2 days left",
      img: mobileupload,
      bgstyle: "#7b85b3",
    },
    {
      title: "UI upload",
      description: "Deadline: 2 days left",
      img: uiupload,
      bgstyle: "#789174",
    },
    {
      title: "PSD Document",
      description: "Deadline: 2 days left",
      img: psdupload,
      bgstyle: "#9b8c83",
    },
  ];

  return (
    <Box
      className="rounded-lg mb-4 shadow-md pr-4 pt-4 pb-4"
      sx={{
        backgroundColor: "background.view",
        borderRadius: "8px",
      }}
    >
      <div className="flex  md:flex-row gap-4 mb-6 items-center justify-between">
        <div className="border-l-4 border-[#4B47E4] pl-3 md:pl-4 w-full text-[18px] md:text-[18px] md:font-[500] md:leading-[32.55px]">
          Milestones
        </div>
        <div
          className="border border-gray-600 rounded-lg p-1"
          style={{ padding: "13px 7px" }}
        >
          <Typography
            sx={{ fontSize: "10px", fontWeight: "400", lineHeight: "13.02px" }}
            className="text-[10px]  md:text-[15px] md:leading-[19.53px] text-nowrap gap-[25px] items-center flex font-[400] leading-[13.02px] "
          >
            <div className="text-[10px]  font-[400] leading-[13.02px] md:text-[12px] md:leading-[19.53px]  ">
              View All
            </div>
            <KeyboardArrowDownIcon
              sx={{
                fontSize: "15px",
                fontWeight: "400",
                lineHeight: "13.02px",
              }}
              className="cursor-pointer text-9333ea"
              onClick={toggleDropdown}
            />
          </Typography>
          {dropdownOpen && (
            <div className="absolute top-10 right-0 mt-1 w-20 bg-neutral-900 rounded-lg border border-gray-600 z-10">
              <div className="p-2 flex flex-col gap-2 justify-center items-center">
                <Typography
                  variant="h7"
                  className="cursor-pointer"
                  onClick={() => handleYearSelect("2024")}
                >
                  Sun
                </Typography>
                <Typography
                  variant="h7"
                  className="cursor-pointer"
                  onClick={() => handleYearSelect("2023")}
                >
                  Mon
                </Typography>
                <Typography
                  variant="h7"
                  className="cursor-pointer"
                  onClick={() => handleYearSelect("2023")}
                >
                  Tue
                </Typography>
                <Typography
                  variant="h7"
                  className="cursor-pointer"
                  onClick={() => handleYearSelect("2023")}
                >
                  Wed
                </Typography>
                <Typography
                  variant="h7"
                  className="cursor-pointer"
                  onClick={() => handleYearSelect("2023")}
                >
                  Thu
                </Typography>
                <Typography
                  variant="h7"
                  className="cursor-pointer"
                  onClick={() => handleYearSelect("2023")}
                >
                  Fri
                </Typography>
                <Typography
                  variant="h7"
                  className="cursor-pointer"
                  onClick={() => handleYearSelect("2023")}
                >
                  Sat
                </Typography>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full pl-3 mb-6">
        {jobs.map((job, index) => (
          <div key={index} className="mb-1">
            <div className="flex gap-1 justify-center items-center">
              <div
              // style={{ borderRadius: "4px", backgroundColor: job.bgstyle }}
              >
                <img
                  src={job.img}
                  alt={job.title}
                  className=" w-[60px]"
                  style={{ padding: "8px" }}
                />
              </div>
              <div className="w-4/5">
                <h1 className="text-[15px] font-[500] leading-[19.53px] md:text-[17px] md:leading-[32.55px]">
                  {job.title}
                </h1>
                <p className=" text-[10px] font-[400] leading-[13.02px] md:text-[13px] md:leading-[15px] text-gray-500">
                  {job.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ProjectMilesTone;
