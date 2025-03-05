import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import CustomEmptyModal from "../../../../components/CustomEmptyModal";
import { MdOutlineCircle } from "react-icons/md";
import { LiaDotCircle as Single } from "react-icons/lia";
import { GoMultiSelect as Multiple } from "react-icons/go";
import { PiChatTeardropTextLight as Comment } from "react-icons/pi";
import { IoCalendarOutline as Date } from "react-icons/io5";
import { BsSpeedometer2 as NPS } from "react-icons/bs";
import { LiaStar as Star } from "react-icons/lia";
import { PiScalesLight as RatingScale } from "react-icons/pi";
import { LiaStarSolid } from "react-icons/lia";

const ViewTemplate = ({ selectedTemplate, open, onClose }) => {
  const ratingScaleSetting = {
    agreement_scale: {
      3: [
        {
          icon: "😡",
          label: "Disagree",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: "😐",
          label: "Neutral",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: "😃",
          label: "Agree",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
      5: [
        {
          icon: "😡",
          label: "Strongly Disagree",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: "😢",
          label: "Disagree",
          bg: "bg-red-300",
          border: "border-red-300",
        },
        {
          icon: "😐",
          label: "Neutral",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: "🙂",
          label: "Agree",
          bg: "bg-green-300",
          border: "border-green-300",
        },
        {
          icon: "😃",
          label: "Strongly Agree",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
      7: [
        {
          icon: "😡",
          label: "Strongly Disagree",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: "😢",
          label: "Disagree",
          bg: "bg-red-300",
          border: "border-red-300",
        },
        {
          icon: "☹️",
          label: "Somewhat Disagree",
          bg: "bg-yellow-100",
          border: "border-yellow-100",
        },
        {
          icon: "😐",
          label: "Neither Agree Nor Disagree",
          bg: "bg-yellow-300",
          border: "border-yellow-300",
        },
        {
          icon: "🙂",
          label: "Somewhat Agree",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: "😄",
          label: "Agree",
          bg: "bg-green-300",
          border: "border-green-300",
        },
        {
          icon: "😁",
          label: "Strongly Agree",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
    },
    satisfaction_scale: {
      3: [
        {
          icon: "😡",
          label: "Dissatisfied",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: "😐",
          label: "Neutral",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: "😃",
          label: "Satisfied",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
      5: [
        {
          icon: "😡",
          label: "Very Dissatisfied",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: "😢",
          label: "Dissatisfied",
          bg: "bg-red-300",
          border: "border-red-300",
        },
        {
          icon: "😐",
          label: "Neutral",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: "🙂",
          label: "Satisfied",
          bg: "bg-green-300",
          border: "border-green-300",
        },
        {
          icon: "😃",
          label: "Very Satisfied",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
      7: [
        {
          icon: "😡",
          label: "Very Dissatisfied",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: "😢",
          label: "Dissatisfied",
          bg: "bg-red-300",
          border: "border-red-300",
        },
        {
          icon: "☹️",
          label: "Somewhat Dissatisfied",
          bg: "bg-yellow-100",
          border: "border-yellow-100",
        },
        {
          icon: "😐",
          label: "Neutral",
          bg: "bg-yellow-300",
          border: "border-yellow-300",
        },
        {
          icon: "🙂",
          label: "Somewhat Satisfied",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: "😄",
          label: "Satisfied",
          bg: "bg-green-300",
          border: "border-green-300",
        },
        {
          icon: "😁",
          label: "Very Satisfied",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
    },
    frequency_scale: {
      3: [
        {
          icon: <MdOutlineCircle />,
          label: "Never",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Sometimes",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Always",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
      5: [
        {
          icon: <MdOutlineCircle />,
          label: "Never",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Rarely",
          bg: "bg-red-300",
          border: "border-red-300",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Sometimes",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Often",
          bg: "bg-green-300",
          border: "border-green-300",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Always",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
      7: [
        {
          icon: <MdOutlineCircle />,
          label: "Never",
          bg: "bg-red-500",
          border: "border-red-500",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Very Rarely",
          bg: "bg-red-300",
          border: "border-red-300",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Rarely",
          bg: "bg-yellow-100",
          border: "border-yellow-100",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Sometimes",
          bg: "bg-yellow-300",
          border: "border-yellow-300",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Often",
          bg: "bg-yellow-500",
          border: "border-yellow-500",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Very Often",
          bg: "bg-green-300",
          border: "border-green-300",
        },
        {
          icon: <MdOutlineCircle />,
          label: "Always",
          bg: "bg-green-500",
          border: "border-green-500",
        },
      ],
    },
    custom: {
      3: [
        { icon: "😡", label: "Label 1" },
        { icon: "😐", label: "Label 2" },
        { icon: "😃", label: "Label 3" },
      ],
      5: [
        { icon: "😡", label: "Label 1" },
        { icon: "😢", label: "Label 2" },
        { icon: "😐", label: "Label 3" },
        { icon: "🙂", label: "Label 4" },
        { icon: "😃", label: "Label 5" },
      ],
      7: [
        { icon: "😡", label: "Label 1" },
        { icon: "😢", label: "Label 2" },
        { icon: "☹️", label: "Label 3" },
        { icon: "😐", label: "Label 4" },
        { icon: "🙂", label: "Label 5" },
        { icon: "😄", label: "Label 6" },
        { icon: "😁", label: "Label 7" },
      ],
    },
  };

  return (
    <CustomEmptyModal open={open} onClose={onClose} isScrollable={true}>
      <div className="w-full flex flex-col gap-6 justify-center items-center">
        <div className="w-full flex flex-col gap-3">
          <h1 className="text-xl">{selectedTemplate?.title || "N/A"}</h1>
          <div className="p-3 border border-neutral-700 rounded-lg">
            <h1>Total Questions {selectedTemplate.questions?.length}</h1>
          </div>
        </div>
        {selectedTemplate?.questions && (
          <div className="w-full flex flex-col gap-3 p-3 border border-neutral-700 rounded-lg">
            <h1>Metrics Used</h1>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {selectedTemplate?.questions?.map(({ metric }, index) => (
                <>
                  {metric && (
                    <>
                      <div
                        key={index}
                        className="w-fit px-3 py-1 border border-neutral-700 rounded-lg"
                      >
                        <h1>{metric.metricName}</h1>
                      </div>
                    </>
                  )}
                </>
              ))}
            </div>
          </div>
        )}
        <div className="w-full flex flex-col gap-3 p-3 border border-neutral-700 rounded-lg">
          {selectedTemplate?.questions?.map(
            (
              {
                type,
                id,
                question,
                metric,
                options,
                minscore_text,
                maxscore_text,
                max_count,
                scale_type,
                scale_view,
                icon_type,
                customLabels,
              },
              index
            ) => {
              return (
                <React.Fragment key={index}>
                  <Accordion>
                    <AccordionSummary>
                      <div className="w-full h-[6rem] flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-3 items-center">
                          {type === "single" && <Single className="text-3xl" />}
                          {type === "multiple" && (
                            <Multiple className="text-3xl" />
                          )}
                          {type === "comment" && (
                            <Comment className="text-3xl" />
                          )}
                          {type === "date" && <Date className="text-3xl" />}
                          {type === "nps" && <NPS className="text-3xl" />}
                          {type === "star" && <Star className="text-3xl" />}
                          {type === "ratingScale" && (
                            <RatingScale className="text-3xl" />
                          )}
                          <h1>{question}</h1>
                        </div>
                        {metric && (
                          <div className="p-3 border border-neutral-700 rounded-lg">
                            <h1>{metric.metricName}</h1>
                          </div>
                        )}
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {type === "single" && (
                        <FormControl>
                          <RadioGroup
                            className="flex"
                            sx={{ flexDirection: "row" }}
                          >
                            {options?.map(({ id, title }) => (
                              <FormControlLabel
                                key={id}
                                control={<Radio checked={false} />}
                                label={title}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      )}
                      {type === "multiple" && (
                        <FormControl
                          className="flex"
                          sx={{ flexDirection: "row" }}
                        >
                          {options?.map(({ id, title }) => (
                            <FormControlLabel
                              key={id}
                              control={<Checkbox checked={false} />}
                              label={title}
                            />
                          ))}
                        </FormControl>
                      )}
                      {type === "nps" && (
                        <div className="w-full flex flex-col gap-5">
                          <div className="w-full flex flex-row gap-3 justify-between items-center">
                            {Array.from({ length: 10 }, (_, index) => ({})).map(
                              (_, index) => {
                                let borderColor = "";
                                let bgColor = "";

                                if (index >= 0 && index <= 5) {
                                  bgColor = "bg-red-500";
                                  borderColor = "border-red-500";
                                } else if (index >= 6 && index <= 7) {
                                  bgColor = "bg-yellow-500";
                                  borderColor = "border-yellow-500";
                                } else if (index >= 8 && index <= 9) {
                                  bgColor = "bg-green-500";
                                  borderColor = "border-green-500";
                                }

                                return (
                                  <div
                                    key={index}
                                    className={`w-12 h-12 flex justify-center items-center p-3 border rounded-lg ${borderColor} ${bgColor} bg-opacity-5`}
                                  >
                                    <h1>{index + 1}</h1>
                                  </div>
                                );
                              }
                            )}
                          </div>
                          <div className="w-full flex flex-row justify-between items-center">
                            <h1>{minscore_text}</h1>
                            <h1>{maxscore_text}</h1>
                          </div>
                        </div>
                      )}
                      {type === "star" && (
                        <div className="w-full flex flex-row gap-3 justify-start items-center">
                          {Array.from(
                            { length: max_count },
                            (_, index) => ({})
                          ).map((_, index) => (
                            <LiaStarSolid
                              key={index}
                              className="text-4xl text-yellow-300"
                            />
                          ))}
                        </div>
                      )}
                      {type === "ratingScale" && (
                        <>
                          {scale_view === "button" && (
                            <div className="w-full grid grid-cols-4 gap-3 justify-start items-center">
                              {scale_type === "custom"
                                ? customLabels?.map(({ label }, index) => (
                                    <div
                                      key={index}
                                      className={`flex flex-row gap-3 p-3 justify-center items-center border border-neutral-700 rounded-lg bg-neutral-800 bg-opacity-5`}
                                    >
                                      <span className="text-2xl">
                                        {icon_type === "number"
                                          ? index + 1
                                          : ratingScaleSetting.custom[
                                              max_count
                                            ]?.[index]?.icon || "😐"}
                                      </span>
                                      <h1 className="w-full truncate">
                                        {label}
                                      </h1>
                                    </div>
                                  ))
                                : ratingScaleSetting[scale_type]?.[
                                    max_count
                                  ]?.map(
                                    ({ icon, label, bg, border }, index) => (
                                      <div
                                        key={index}
                                        className={`flex flex-row gap-3 p-3 justify-center items-center border ${
                                          border || "border-neutral-700"
                                        } rounded-lg ${
                                          bg || "bg-neutral-800"
                                        } bg-opacity-5`}
                                      >
                                        <span className="text-2xl">{icon}</span>
                                        <h1 className="w-full truncate">
                                          {label}
                                        </h1>
                                      </div>
                                    )
                                  )}
                            </div>
                          )}
                          {scale_view === "card" && (
                            <div className="w-full grid grid-cols-4 gap-3 justify-start items-center">
                              {scale_type === "custom"
                                ? customLabels?.map(({ label }, index) => (
                                    <div
                                      key={index}
                                      className={`w-[10rem] h-[8rem] flex flex-col justify-between items-center rounded-lg border border-neutral-700 bg-neutral-800 bg-opacity-5`}
                                    >
                                      <span className="h-full flex justify-center items-center text-3xl">
                                        {icon_type === "number"
                                          ? index + 1
                                          : ratingScaleSetting.custom[
                                              max_count
                                            ]?.[index]?.icon || "😐"}
                                      </span>
                                      <h1 className="w-full flex justify-center items-center text-center p-2 h-full text-wrap rounded-b-lg bg-neutral-950">
                                        {label}
                                      </h1>
                                    </div>
                                  ))
                                : ratingScaleSetting[scale_type]?.[
                                    max_count
                                  ]?.map(
                                    ({ icon, label, bg, border }, index) => (
                                      <div
                                        key={index}
                                        className={`w-[10rem] h-[8rem] flex flex-col justify-between items-center rounded-lg border ${
                                          border || "border-neutral-700"
                                        } bg-opacity-5 ${
                                          bg || "bg-neutral-800"
                                        }`}
                                      >
                                        <span className="h-full flex justify-center items-center text-3xl">
                                          {icon}
                                        </span>
                                        <h1 className="w-full flex justify-center items-center text-center p-2 h-full text-wrap rounded-b-lg bg-neutral-950">
                                          {label}
                                        </h1>
                                      </div>
                                    )
                                  )}
                            </div>
                          )}
                        </>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </React.Fragment>
              );
            }
          )}
        </div>
      </div>
    </CustomEmptyModal>
  );
};

export default ViewTemplate;
