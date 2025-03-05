import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ProjectActivity = ({overview}) => {
  console.log("overVie" , overview)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [setSelectedYear] = useState("2024");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setDropdownOpen(false);
  };

  const jobs = [
    {
      title: "Mobile App design page was ...",
      description: 'From "robertsmith@gmail.com", DevOps',
      username: "Emma Stone",
    },
    {
      title: "Short Leave Mail",
      description: 'From "Richard Miller" QAtester conference leave on 20th..',
      username: "Emma Stone",
    },
    {
      title: "Received Mail",
      description:
        'Emergency leave for "George Anderson" from Development team.',
      username: "Emma Stone",
    },
    {
      title: "Job Application mMil",
      description: 'From "Mohammedali@gmail.com", Technical Support',
      username: "Emma Stone",
    },
    {
      title: "Job Application Mail",
      description: 'From "stevesmith@gmail.com", UI DesignServices.',
      username: "Emma Stone",
    },
  ];

  const formatDate = (dateString) => {
    if (dateString && dateString.length >= 10) {
      const datePart = dateString.substring(0, 10);
      const date = new Date(datePart);
      return date.toDateString(); // Change the format as needed
    }
    return '';
  };
  

  return (
    <Box
      className="rounded-lg mb-4 shadow-md pr-8 pt-4 pb-4"
      sx={{ backgroundColor: "background.view", borderRadius: "8px" }}
    >
      <div className="flex  md:flex-row gap-4 mb-4 items-center justify-between">
        <div className="border-l-4 border-[#4B47E4] pl-3 md:pl-4 w-full text-[18px] md:text-[18px] md:font-[500] md:leading-[32.55px]">
          Activity
        </div>
        <div
          className=" border border-gray-600 rounded-[5px] px-2 py-3"
          style={{}}
        >
          <Typography
            sx={{ fontSize: "10px", fontWeight: "400", lineHeight: "13.02px" }}
            className="text-[10px] text-nowrap gap-[25px] items-center flex font-[400] leading-[13.02px] md:text-[12px]"
          >
            <div className="text-[10px]  font-[400] leading-[13.02px] md:text-[12px] md:leading-[19.53px]  ">
              View All
            </div>
            <KeyboardArrowDownIcon
              sx={{
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
      <div className="w-full pl-6 md:pl-9">
        {overview.map((job, index) => (
          <div key={index} className="mb-4">
            <div className="flex  md:gap-4 justify-center items-center  mt-[18px] ">
              <div
                style={{
                  height: "50px",
                  width: "64px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  alt=""
                  className=" w-[45px] rounded-[3px]"
                  src="https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg"
                />
              </div>
              <div className="w-4/5">
                <h1 className="text-[15px] font-[500] leading-[19.23px] md:text-[14px] md:leading-[26.04px] ">
                  {job.title}
                </h1>
                <div className="flex gap-2 px-2 md:px-0 items-center flex-row ">
                  <img
                    alt=""
                    src="https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg"
                    className=" w-[18px] rounded-[50%]"
                  />{" "}
                  <p className="text-[10px] font-[400] leading-[13px]   text-gray-500">
                    {job.username}
                  </p>
                  <p className="text-[10px] md:hidden font-[400] leading-[13px] text-center text-zinc-500">
                {formatDate(job.createdAt)}
                  </p>
                </div>
              </div>
              <div className="hidden md:block w-1/5">
                <p className="text-[10px] font-[400] leading-[13px] text-end text-zinc-500">
                {formatDate(job.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ProjectActivity;
