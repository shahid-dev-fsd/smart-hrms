import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Crop54Icon from "@mui/icons-material/Crop54";

const ProjectChart = ({ barsData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [setSelectedYear] = useState("2024");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setDropdownOpen(false);
  };

  const [percentageLines, setPercentageLines] = useState([]);

  useEffect(() => {
    const lines = [30, 60, 90, 120];

    setPercentageLines(lines);
  }, []);

  return (
    <Box
      sx={{ backgroundColor: "background.view", borderRadius: "8px" }}
      className="rounded-lg"
    >
      <div className="rounded-lg pt-4 pb-4 pr-4 mb-4">
        <div
          className="flex flex-col md:items-center md:flex-row gap-4 mb-8"
          style={{ justifyContent: "space-between" }}
        >
          <div>
            {" "}
            <div className="border-l-4 border-[#4B47E4] pl-3 md:pl-4 w-full text-[18px] leading-[26.04px] md:text-[18px] md:font-[500] md:leading-[32.55px]">
              Statistics
            </div>
          </div>
          <div className="flex justify-center ml-3 md:ml-0  md:flex-row gap-4 mb-4 md:mb-0">
            <div className=" flex items-center justify-center border border-gray-600 rounded-[5px] px-2 py-3 gap-6">
              <div className="bg-[#C2CCFF] w-[15px] h-[15px] rounded-[3px]"></div>
              <div className="text-[10px] font-[400] leading-[13.02px] md:text-[12px] md:leading-[19.53px]  ">
                Ongoing
              </div>
            </div>
            <div className=" flex items-center justify-center border border-gray-600 rounded-[5px] px-2 py-3 gap-6">
              <div className="bg-[#004DBF] w-[15px] h-[15px] rounded-[3px]"></div>
              <div className="text-[10px] font-[400] leading-[13.02px] md:text-[12px] md:leading-[19.53px]  ">
                Completed
              </div>
            </div>
            <div className="  flex items-center justify-between border border-gray-600 rounded-[5px] px-2 py-3">
              <div className="flex items-center justify-between relative">
                <div className="text-[10px] font-[400] leading-[13.02px] md:text-[12px] md:leading-[19.53px]  ">
                  Year
                </div>
                {dropdownOpen && (
                  <div className="absolute top-10 right-0 mt-1 w-20 bg-neutral-900 rounded-lg border border-gray-600 z-10">
                    <div className="p-2 flex flex-col gap-2 justify-center items-center">
                      <Typography
                        variant="h7"
                        className="cursor-pointer"
                        onClick={() => handleYearSelect("2024")}
                      >
                        2023
                      </Typography>
                      <Typography
                        variant="h7"
                        className="cursor-pointer"
                        onClick={() => handleYearSelect("2023")}
                      >
                        2024
                      </Typography>
                      <Typography
                        variant="h7"
                        className="cursor-pointer"
                        onClick={() => handleYearSelect("2023")}
                      >
                        2025
                      </Typography>
                      <Typography
                        variant="h7"
                        className="cursor-pointer"
                        onClick={() => handleYearSelect("2023")}
                      >
                        2026
                      </Typography>
                      <Typography
                        variant="h7"
                        className="cursor-pointer"
                        onClick={() => handleYearSelect("2023")}
                      >
                        2027
                      </Typography>
                      <Typography
                        variant="h7"
                        className="cursor-pointer"
                        onClick={() => handleYearSelect("2023")}
                      >
                        2028
                      </Typography>
                    </div>
                  </div>
                )}
                <KeyboardArrowDownIcon
                  className="ml-12 cursor-pointer text-9333ea"
                  onClick={toggleDropdown}
                />
              </div>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={267}>
          <BarChart data={barsData}>
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${value}%`} />
            {percentageLines.map((line, index) => (
              <ReferenceLine
                key={index}
                y={line}
                stroke="#27272a"
                strokeDasharray="solid"
              />
            ))}
            <Tooltip />
            <Bar dataKey="inProgress" stackId="a" fill="#93c5fd" barSize={8} />
            <Bar dataKey="pending" stackId="a" fill="#1d4ed8" barSize={8} />
            <Bar dataKey="completed" stackId="a" fill="#34d399" barSize={8} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
};

export default ProjectChart;
