import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

let walkover = [
  {
    image: "walkover1.png",
    title: "Effortless application Management",
    descriptions:
      "Track the progress of job applications from the issuance of offer letters to interview invitations ensuring a streamlined and organized hiring process",
      width :500
    },

  {
    image: "walkover2.png",
    title: "Precise Attendance Tracking",
    descriptions:
      "Clikkle HR allows you to effortlessly record daily attendance with detailed notes providing a comprehensive overview of employee activities",
      width :500
    },
  {
    image: "walkover3.png",
    title: "Dynamic Job List Creation and Editing",
    descriptions:
      "Create and edit job details effortlessly, ensuring that your team has access to the most up-to-date information for effective collaboration",
      width :600
    },
  {
    image: "walkover4.png",
    title: "  Recognition and Rewards",
    descriptions:
      " Recognize outstanding contributions and motivate your Workforce with a dedicated platform for acknowledging accomplishments",
      width :600
    },
];

const WalkoverHeader = () => {
  const location = useLocation();

  let logoSrc = "https://cdn.clikkle.com/images/hr/logo/2023/hr.png",
    name = "Clikkle",
    smallerText = false;

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <Box className="w-screen  flex items-center justify-center relative overflow-hidden bg-white">
      <Box className="absolute w-full h-full flex items-center justify-center">
        <div className="absolute right-0 w-full h-full scale-125 bg-[#ebfbff] rounded-full transform translate-x-[76%]"></div>
      </Box>
      <div className="z-10 flex  w-full h-full justify-between ">
        <div className="w-1/2 pl-16 py-10">
          <div className="flex items-center ">
            <img className={`w-14 `} src={logoSrc} alt={name} />

            <h1
              className={`text-gray-400 mx-2 dark:text-white text-center align-middle sm:text-xl md:text-xl lg:text-xl font-normal text-sm`}
            >
              <span className="text-gray-500 font-medium"> Clikkle </span> Hr
              Platform
            </h1>
          </div>

          <div className="mt-44">
            <Typography variant="h3" gutterBottom>{walkover[currentIndex].title}</Typography>
          </div>
          <div className="my-5">
            <div className="font-medium text-gray-500 text-xl">{walkover[currentIndex].descriptions}</div>
          </div>
          <div className="my-8">
            {currentIndex === 3 && (
              <Button
                variant="contained"
                sx={{ borderRadius: 3, px: 3, py: 1.5 }}
              >
                Get Started
              </Button>
            )}
          </div>

          <div className="flex mt-2 gap-4">
            <div className="p-px w-fit h-fit rounded-full bg-gray-300">
              <IconButton
                onClick={handlePrev}
                disabled={currentIndex === 0}
                color="primary"
                className="rounded-full"
              >
                <ArrowBackIos />
              </IconButton>
            </div>
            <div className="p-px w-fit h-fit rounded-full bg-gray-300">
              <IconButton
                disabled={currentIndex === 3}
                onClick={handleNext}
                color="primary"
                className="rounded-full"
              >
                <ArrowForwardIos />
              </IconButton>
            </div>
          </div>
          <Box className="flex mt-10">
            {[0, 1, 2, 3].map((_, index) => (
              <Box
                key={index}
                className={`mx-1 transition-all h-3 duration-300 ${
                  currentIndex === index
                    ? "w-8  bg-blue-500"
                    : "w-3  bg-gray-300"
                } rounded-full`}
              ></Box>
            ))}
          </Box>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <img
            className={`my-auto origin-center`}
            style={{ width :walkover[currentIndex].width }}
            src= {"/images/ASSETS/" + walkover[currentIndex].image}
            alt={name}
          />
        </div>
      </div>
    </Box>
  );
};

export default WalkoverHeader;
