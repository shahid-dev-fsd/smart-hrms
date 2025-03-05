import React, { useState } from "react";
import { Avatar, Button, IconButton, TextareaAutosize } from "@mui/material";
import CustomEmptyModal from "../../../../../components/CustomEmptyModal";
import {
  IoEyeOutline,
  IoFilterOutline,
  IoTrophyOutline,
} from "react-icons/io5";
import ReceivedFeedback from "./ReceivedFeedback";
import GivenFeedback from "./GivenFeedback";
import CustomModal from "../../../../../components/CustomModal";
import {
  getToday,
  getYesterday,
  getThisWeek,
  getThisMonth,
  getLastWeek,
  getLastMonth,
} from "../../../../../utilities/date";
import Card from "./Card";
import { VscThumbsdown, VscThumbsup } from "react-icons/vsc";
import { CiStar } from "react-icons/ci";

export default function Feedback() {
  const [provideFeedbackModal, setProvideFeedbackModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);

  const [switchScreen, setSwitchScreen] = useState({
    primary: "receivedFeedback",
  });

  const filterFields = [
    {
      type: "select",
      name: "period",
      label: "Period",
      options: [
        { label: "Today", value: getToday() },
        { label: "Yesterday", value: getYesterday() },
        { label: "This Week", value: getThisWeek() },
        { label: "This Month", value: getThisMonth() },
        { label: "Last Week", value: getLastWeek() },
        { label: "Last Month", value: getLastMonth() },
      ],
      defaultValue: getToday(),
    },
  ];

  const [feedbackFormData, setFeedbackFormData] = useState({
    comment: "",
    rating: "",
  });

  const handleCardClick = (rating) => {
    setFeedbackFormData((prev) => ({
      ...prev,
      rating: rating,
    }));
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 justify-start items-center">
      <div className="w-full flex flex-row gap-3 justify-between items-center">
        <div className="flex flex-row gap-3 justify-center items-center text-nowrap">
          <Button
            variant={`${
              switchScreen.primary === "receivedFeedback"
                ? "contained"
                : "outlined"
            }`}
            onClick={() => {
              setSwitchScreen((prev) => ({
                ...prev,
                primary: "receivedFeedback",
              }));
            }}
          >
            Received Feedback
          </Button>
          <Button
            variant={`${
              switchScreen.primary === "givenFeedback"
                ? "contained"
                : "outlined"
            }`}
            onClick={() => {
              setSwitchScreen((prev) => ({
                ...prev,
                primary: "givenFeedback",
              }));
            }}
          >
            Given Feedback
          </Button>
        </div>
        <div className="flex flex-row gap-3 justify-center items-center">
          <Button
            onClick={() => {
              setProvideFeedbackModal(true);
            }}
            variant="contained"
          >
            Provide Feedback
          </Button>

          <IconButton
            onClick={() => {
              setFilterModal(true);
            }}
          >
            <IoFilterOutline />
          </IconButton>
        </div>
      </div>

      {switchScreen.primary === "receivedFeedback" ? (
        <>
          <ReceivedFeedback />
        </>
      ) : (
        <></>
      )}
      {switchScreen.primary === "givenFeedback" ? (
        <>
          <GivenFeedback />
        </>
      ) : (
        <></>
      )}

      <CustomModal
        title={"Filter"}
        onClose={() => {
          setFilterModal(false);
        }}
        fields={filterFields}
        open={filterModal}
        onSubmit={(data) => {
          console.log("Filter Data :- ", data);
        }}
      />

      <CustomEmptyModal
        open={provideFeedbackModal}
        onClose={() => {
          setProvideFeedbackModal(false);
        }}
        isScrollable={false}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Feedback Form Data :- ", feedbackFormData);
          }}
        >
          <div className="w-full flex flex-col gap-6 justify-center items-center">
            <div className="w-full text-xl">
              <h1>Provide Feedback</h1>
            </div>

            <div className="w-full flex flex-col gap-3">
              <div className="w-full flex flex-row gap-3 justify-start items-center">
                <Avatar />
                <h1>Username</h1>
              </div>
              <div className="w-full">
                <TextareaAutosize
                  className="w-full bg-transparent rounded-[0.3rem] border border-gray-400 border-opacity-50 mb-2 px-3 py-4"
                  placeholder={"Comment"}
                  value={feedbackFormData.comment}
                  onChange={(event) => {
                    setFeedbackFormData((prev) => ({
                      ...prev,
                      comment: event.target.value,
                    }));
                  }}
                />
                <div className="w-full flex gap-3 justify-between items-center">
                  <div
                    onClick={() => handleCardClick("positive")}
                    className="cursor-pointer"
                  >
                    <Card
                      type={"display"}
                      title={"Positive"}
                      icon={<VscThumbsup className="text-2xl m-1" />}
                      rating={0}
                      selected={feedbackFormData.rating === "positive"}
                    />
                  </div>
                  <div
                    onClick={() => handleCardClick("negative")}
                    className="cursor-pointer"
                  >
                    <Card
                      type={"display"}
                      title={"Negative"}
                      icon={<VscThumbsdown className="text-2xl m-1" />}
                      rating={0}
                      selected={feedbackFormData.rating === "negative"}
                    />
                  </div>
                  <div
                    onClick={() => handleCardClick("training")}
                    className="cursor-pointer"
                  >
                    <Card
                      type={"display"}
                      title={"Training"}
                      icon={<CiStar className="text-2xl m-1" />}
                      rating={0}
                      selected={feedbackFormData.rating === "training"}
                    />
                  </div>
                  <div
                    onClick={() => handleCardClick("observation")}
                    className="cursor-pointer"
                  >
                    <Card
                      type={"display"}
                      title={"Observation"}
                      icon={<IoEyeOutline className="text-2xl m-1" />}
                      rating={0}
                      selected={feedbackFormData.rating === "observation"}
                    />
                  </div>
                  <div
                    onClick={() => handleCardClick("reward")}
                    className="cursor-pointer"
                  >
                    <Card
                      type={"display"}
                      title={"Reward"}
                      icon={<IoTrophyOutline className="text-2xl m-1" />}
                      rating={0}
                      selected={feedbackFormData.rating === "reward"}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-row justify-between items-center">
              <Button type="submit" variant="contained">
                Post
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setProvideFeedbackModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </CustomEmptyModal>
    </div>
  );
}
