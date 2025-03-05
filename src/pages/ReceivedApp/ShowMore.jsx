import React, { useState } from "react";
import { Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import profile from "./profile.png";
import view from "./viewicon.png";
//import Calendar from './Calender';
import UserTime from "./UserTime";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const ShowMorePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [scheduleButtonText, setScheduleButtonText] =
    useState("Schedule Interview");
  const [scheduleDisabled, setScheduleDisabled] = useState(false);
  const navigate = useNavigate();

  const toggleButtonText = () => {
    setScheduleDisabled(true);
    setShowPopup(true);
    if (scheduleButtonText === "Schedule Interview") {
      setScheduleButtonText("Send Offer Letter");
    }
  };

  const handleSendOfferLetter = () => {
    if (scheduleButtonText === "Send Offer Letter") {
      navigate(`/showmore:id/sendofferletter`);
    }
  };
  return (
    <div className="container mx-auto overscroll-auto overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <div>
          <h1 className="text-sm md:text-3xl text-zinc-400">
            Job Application Details
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            disabled={scheduleDisabled}
            onClick={toggleButtonText}
            className="text-white font-bold text-[8px] md:text-[14px] py-1 md:py-2 px-2 md:px-4 rounded bg-sky-500 hover:bg-sky-700"
          >
            {scheduleButtonText}
          </button>
          <InfoOutlinedIcon />
        </div>
      </div>
      <div className="flex flex-col md:flex-row p-4 items-start justify-start">
        <div className="w-full md:w-1/3 flex flex-col gap-2 p-4">
          <div className="flex justify-start md:justify-start">
            <img
              src={profile}
              alt="Profile"
              className=" w-[50%] md:w-full max-w-[200px] h-auto"
            />
          </div>
          <div className="w-full">
            <h1 className="text-blue-500 text-xs md:text-[22px]">
              George Kepner
            </h1>
            <p className="text-[10px] md:text-[16px]">Full Stack Developer</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-2 w-full md:w-2/3">
          <div className="w-full flex flex-row items-center justify-start gap-10">
            <div className="w-1/2">
              <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                Full Name:
              </h1>
            </div>
            <div className="w-1/2">
              <p className="text-[12px] md:text-[20px]">George Kepner</p>
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-start gap-10">
            <div className="w-1/2">
              <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                Resume:
              </h1>
            </div>
            <div className="w-1/2">
              <button className="flex items-center text-blue-500 font-semibold text-[8px] md:text-[10px] py-1 md:py-1 px-2 md:px-3 border border-blue-500 rounded hover:bg-blue-100">
                <SaveAltIcon className="w-2 h-2 md:w-4 md:h-4 mr-2" />
                Download
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-10">
            <div className="w-1/2">
              <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                Job Title:
              </h1>
            </div>
            <div className="w-1/2">
              <p className="text-[12px] md:text-[20px]">Full Stack Developer</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-10">
            <div className="w-1/2">
              <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                Years of Experience:
              </h1>
            </div>
            <div className="w-1/2">
              <p className="text-[12px] md:text-[20px]">3</p>
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-start gap-10">
            <div className="w-1/2">
              <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                Email:
              </h1>
            </div>
            <div className="w-1/2">
              <p className="text-[10px] md:text-[20px]">
                georgekepner@gmail.com
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-10">
            <div className="w-1/2">
              <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                Phone:
              </h1>
            </div>
            <div className="w-1/2">
              <p className="text-[12px] md:text-[20px]">+234 245 952 3219</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-10">
            <div className="w-1/2">
              <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                LinkedIn Account:
              </h1>
            </div>
            <div className="w-1/2">
              <button className="flex  items-center text-white font-bold text-[10px] md:text-[12px] py-1 md:py-1 px-2 md:px-3 rounded bg-sky-500 hover:bg-sky-700">
                <LinkedInIcon fontSize="small" className="text-white mr-2" />
                LinkedIn Profile
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-10">
            <div className="w-1/2">
              <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                Documents:
              </h1>
            </div>
            <div className="w-1/2">
              <button className="flex items-center text-blue-500 font-semibold text-[9px] md:text-[10px] py-1 md:py-2 px-2 md:px-4 border border-blue-500 rounded hover:bg-blue-100">
                <img src={view} alt="view" className="w-4 h-4 mr-2" />
                View
              </button>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-10">
            <div className="w-1/2">
              <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                Applied at:
              </h1>
            </div>
            <div className="w-1/2">
              <p className="text-[12px] md:text-[20px]">23/10/2023, 15:39:16</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-10">
            <div className="w-1/2">
              <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                Candidate Sign:
              </h1>
            </div>
            <div className="w-1/2">
              <p className="text-[12px] md:text-[20px]">George Kepner</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-10">
            <div className="w-1/2">
              <h1 className="text-neutral-500 text-[12px] md:text-[20px]">
                Interview Score:
              </h1>
            </div>
            <div className="w-1/2">
              <p className="text-blue-500 text-[12px] md:text-[20px]">0%</p>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-neutral-900 bg-opacity-50 absolute inset-0"></div>
          <Box
            className="p-4 md:p-8 w-[85%] md:w-1/3  h-auto relative z-10 border border-zinc-100 rounded-lg"
            sx={{ backgroundColor: "background.view" }}
          >
            <div className="w-full flex flex-col gap-4 md:gap-10">
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-sm md:text-lg text-center">
                  Select Your Preferred Time and Date
                </h1>
                <p className="text-zinc-500 text-xs md:text-sm text-center">
                  When do you want your Interview to be conducted? Select a
                  date.
                </p>
              </div>
              <div className="flex justify-center items-center w-full gap-4 md:gap-10">
                <UserTime />
              </div>
            </div>
            <div className="flex justify-end pt-3 md:pt-5">
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  toggleButtonText();
                  setShowPopup(false);
                  handleSendOfferLetter();
                }}
              >
                Schedule
              </Button>
            </div>
          </Box>
        </div>
      )}
    </div>
  );
};

export default ShowMorePage;
