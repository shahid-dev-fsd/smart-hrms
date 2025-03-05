import React, { useState } from "react";
import Single from "./Types/Single";
import Multiple from "./Types/Multiple";
import NPS from "./Types/NPS";
import { Star } from "lucide-react";
import RatingScale from "./Types/RatingScale";
import { Box, Button, TextField } from "@mui/material";
import { isLightColor } from "../../../../style/theme";

export default function ThemePreview({
  type,
  isPreview,
  setIsPreview,
  themeFormData,
  templateFormData,
}) {
  const [demo, setDemo] = useState({
    single: "",
    multiple: "",
    nps: "",
    star: "",
    ratingScale: "",
  });

  const renderQuestion = (question) => {
    switch (question.type) {
      case "single":
        return (
          <Single
            question={question}
            value={demo.single}
            handleChange={(value) => {
              setDemo((prev) => ({ ...prev, single: value }));
            }}
          />
        );
      case "multiple":
        return (
          <Multiple
            question={question}
            value={demo.multiple}
            handleChange={(value) => {
              setDemo((prev) => ({ ...prev, multiple: value }));
            }}
          />
        );
      case "comment":
        return null;
      case "date":
        return null;
      case "nps":
        return (
          <NPS
            question={question}
            value={demo.nps}
            handleChange={(value) => {
              setDemo((prev) => ({ ...prev, nps: value }));
            }}
          />
        );
      case "star":
        return (
          <Star
            question={question}
            value={demo.star}
            handleChange={(value) => {
              setDemo((prev) => ({ ...prev, star: value }));
            }}
          />
        );
      case "ratingScale":
        return (
          <RatingScale
            question={question}
            value={demo.ratingScale}
            handleChange={(value) => {
              setDemo((prev) => ({ ...prev, ratingScale: value }));
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {type === "view" && (
        <>
          {templateFormData?.three?.theme?.layout === "0" && (
            <div
              className="w-full h-[35rem] border border-neutral-700 rounded-lg p-10 overflow-auto text-black"
              style={{
                backgroundColor:
                  templateFormData?.three?.theme?.color?.background,
              }}
            >
              {!isPreview && (
                <div
                  className={`w-full h-full flex flex-col gap-3 justify-center
 ${
   templateFormData.three.theme.intro.align === "start" &&
   "items-start text-start"
 }
 ${
   templateFormData.three.theme.intro.align === "center" &&
   "items-center text-center"
 } 
 ${templateFormData.three.theme.intro.font === "small" && "text-sm"}
 ${templateFormData.three.theme.intro.font === "medium" && "text-base"}
 ${templateFormData.three.theme.intro.font === "large" && "text-lg"}`}
                >
                  <div
                    className={`font-normal flex flex-col ${
                      templateFormData.three.theme.intro.font === "small" &&
                      "text-base"
                    } ${
                      templateFormData.three.theme.intro.font === "medium" &&
                      "text-lg"
                    } ${
                      templateFormData.three.theme.intro.font === "large" &&
                      "text-xl"
                    }`}
                  >
                    <h1>{templateFormData?.one?.name}</h1>
                    <h1>Dear Employee,</h1>
                  </div>
                  <p>
                    This survey is aimed at capturing your honest feedback on
                    your engagement levels in this organization.
                  </p>
                  <p>
                    Your responses mean a lot to us, and will help us improve
                    the employee experience in our organization.
                  </p>
                  <Button
                    className="w-fit"
                    variant="contained"
                    onClick={() => setIsPreview(!isPreview)}
                  >
                    Preview
                  </Button>
                </div>
              )}
              {isPreview && (
                <div className="w-full flex flex-col gap-6">
                  <h1
                    className={`font-normal
   ${templateFormData.three.theme.question.font === "small" && "text-base"}
   ${templateFormData.three.theme.question.font === "medium" && "text-lg"}
   ${templateFormData.three.theme.question.font === "large" && "text-xl"}`}
                  >
                    {templateFormData?.one?.name}
                  </h1>

                  <div className="w-full flex flex-col gap-12 justify-center items-center">
                    {templateFormData.two.questions.map((question, index) => (
                      <div key={index} className="w-full flex flex-col gap-3">
                        <div
                          style={{
                            color:
                              templateFormData?.three?.theme?.color?.question,
                          }}
                          className={`flex flex-row gap-3 
           ${
             templateFormData.three.theme.question.font === "small" && "text-sm"
           }
           ${
             templateFormData.three.theme.question.font === "medium" &&
             "text-base"
           }
           ${
             templateFormData.three.theme.question.font === "large" && "text-lg"
           }`}
                        >
                          <h1>{index + 1}</h1>
                          <h1>{question.question}</h1>
                        </div>
                        <div className="ml-8 flex flex-col gap-3">
                          {renderQuestion(question)}
                          <TextField
                            sx={{
                              margin: 0,
                              padding: 0,
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: isLightColor(
                                    templateFormData.three.theme.color
                                      .background
                                  )
                                    ? "gray"
                                    : "gray",
                                },
                                "&:hover fieldset": {
                                  borderColor: "default",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "default",
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "default",
                              },
                              "& .MuiInputBase-input": {
                                color:
                                  templateFormData?.three?.theme?.color?.answer,
                              },
                              color:
                                templateFormData?.three?.theme?.color?.answer,
                            }}
                            label="Comment"
                            variant="outlined"
                          />
                        </div>
                      </div>
                    ))}
                    <div className="w-full flex justify-center">
                      <Button
                        variant="contained"
                        onClick={() => setIsPreview(!isPreview)}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
      {type === "create" && (
        <>
          {themeFormData?.layout === "0" && (
            <div
              className="w-full h-[35rem] border border-neutral-700 rounded-lg p-10 overflow-auto text-black"
              style={{
                backgroundColor: themeFormData?.color?.background,
              }}
            >
              {!isPreview && (
                <div
                  className={`w-full h-full flex flex-col gap-3 justify-center
               ${
                 themeFormData?.intro?.align === "start" &&
                 "items-start text-start"
               } 
               ${
                 themeFormData?.intro?.align === "center" &&
                 "items-center text-center"
               }
               ${themeFormData?.intro?.font === "small" && "text-sm"}
               ${themeFormData?.intro?.font === "medium" && "text-base"}
               ${themeFormData?.intro?.font === "large" && "text-lg"}`}
                >
                  <div
                    className={`font-normal flex flex-col ${
                      themeFormData?.intro?.font === "small" && "text-base"
                    } ${themeFormData?.intro?.font === "medium" && "text-lg"} ${
                      themeFormData?.intro?.font === "large" && "text-xl"
                    }`}
                  >
                    <h1>{templateFormData?.one?.name}</h1>
                    <h1>Dear Employee,</h1>
                  </div>
                  <p>
                    This survey is aimed at capturing your honest feedback on
                    your engagement levels in this organization.
                  </p>
                  <p>
                    Your responses mean a lot to us, and will help us improve
                    the employee experience in our organization.
                  </p>
                  <Button
                    className="w-fit"
                    variant="contained"
                    onClick={() => setIsPreview(!isPreview)}
                  >
                    Preview
                  </Button>
                </div>
              )}
              {isPreview && (
                <div className="w-full flex flex-col gap-6">
                  <h1
                    className={`font-normal
                 ${themeFormData?.question?.font === "small" && "text-base"}
                 ${themeFormData?.question?.font === "medium" && "text-lg"}
               ${themeFormData?.question?.font === "large" && "text-xl"}`}
                  >
                    {templateFormData?.one?.name}
                  </h1>
                  <div className="w-full flex flex-col gap-12 justify-center items-center">
                    {templateFormData.two.questions.map((question, index) => (
                      <div key={index} className="w-full flex flex-col gap-3">
                        <div
                          style={{
                            color: themeFormData?.color?.question,
                          }}
                          className={`flex flex-row gap-3
           ${themeFormData?.question?.font === "small" && "text-sm"}
           ${themeFormData?.question?.font === "medium" && "text-base"}
           ${themeFormData?.question?.font === "large" && "text-lg"}`}
                        >
                          <h1>{index + 1}</h1>
                          <h1>{question.question}</h1>
                        </div>
                        <div className="ml-8 flex flex-col gap-3">
                          {renderQuestion(question)}
                          <TextField
                            sx={{
                              margin: 0,
                              padding: 0,
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: isLightColor(
                                    themeFormData?.color?.background
                                  )
                                    ? "gray"
                                    : "gray",
                                },
                                "&:hover fieldset": {
                                  borderColor: "default",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "default",
                                },
                              },
                              "& .MuiInputLabel-root": {
                                color: "default",
                              },
                              "& .MuiInputBase-input": {
                                color: themeFormData?.color?.answer,
                              },
                              color: themeFormData?.color?.answer,
                            }}
                            label="Comment"
                            variant="outlined"
                          />
                        </div>
                      </div>
                    ))}
                    <div className="w-full flex justify-center">
                      <Button
                        variant="contained"
                        onClick={() => setIsPreview(!isPreview)}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {themeFormData?.layout === "1" && (
            <div
              className="w-full h-full flex flex-row rounded-lg gap-0"
              style={{
                backgroundColor: themeFormData?.color?.background,
                backgroundImage: `url("${themeFormData?.background?.pattern}")`,
                backgroundSize: "200px 200px",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
              }}
            >
              <div
                className="w-[70%] h-[35rem] rounded-lg p-10 overflow-auto text-black"
                style={{
                  backgroundColor: themeFormData?.color?.background,
                }}
              >
                {!isPreview && (
                  <div
                    className={`w-full h-full flex flex-col gap-3 justify-center
              ${
                themeFormData?.intro?.align === "start" &&
                "items-start text-start"
              } 
              ${
                themeFormData?.intro?.align === "center" &&
                "items-center text-center"
              }
              ${themeFormData?.intro?.font === "small" && "text-sm"}
              ${themeFormData?.intro?.font === "medium" && "text-base"}
              ${themeFormData?.intro?.font === "large" && "text-lg"}`}
                  >
                    <div
                      className={`font-normal flex flex-col ${
                        themeFormData?.intro?.font === "small" && "text-base"
                      } ${
                        themeFormData?.intro?.font === "medium" && "text-lg"
                      } ${themeFormData?.intro?.font === "large" && "text-xl"}`}
                    >
                      <h1>{templateFormData?.one?.name}</h1>
                      <h1>Dear Employee,</h1>
                    </div>
                    <p>
                      This survey is aimed at capturing your honest feedback on
                      your engagement levels in this organization.
                    </p>
                    <p>
                      Your responses mean a lot to us, and will help us improve
                      the employee experience in our organization.
                    </p>
                    <Button
                      className="w-fit"
                      variant="contained"
                      onClick={() => setIsPreview(!isPreview)}
                    >
                      Preview
                    </Button>
                  </div>
                )}
                {isPreview && (
                  <div className="w-full flex flex-col gap-6">
                    <h1
                      className={`font-normal
                ${themeFormData?.question?.font === "small" && "text-base"}
                ${themeFormData?.question?.font === "medium" && "text-lg"}
              ${themeFormData?.question?.font === "large" && "text-xl"}`}
                    >
                      {templateFormData?.one?.name}
                    </h1>
                    <div className="w-full flex flex-col gap-12 justify-center items-center">
                      {templateFormData.two.questions.map((question, index) => (
                        <div key={index} className="w-full flex flex-col gap-3">
                          <div
                            style={{
                              color: themeFormData?.color?.question,
                            }}
                            className={`flex flex-row gap-3
          ${themeFormData?.question?.font === "small" && "text-sm"}
          ${themeFormData?.question?.font === "medium" && "text-base"}
          ${themeFormData?.question?.font === "large" && "text-lg"}`}
                          >
                            <h1>{index + 1}</h1>
                            <h1>{question.question}</h1>
                          </div>
                          <div className="ml-8 flex flex-col gap-3">
                            {renderQuestion(question)}
                            <TextField
                              sx={{
                                margin: 0,
                                padding: 0,
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: isLightColor(
                                      themeFormData?.color?.background
                                    )
                                      ? "gray"
                                      : "gray",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "default",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "default",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: "default",
                                },
                                "& .MuiInputBase-input": {
                                  color: themeFormData?.color?.answer,
                                },
                                color: themeFormData?.color?.answer,
                              }}
                              label="Comment"
                              variant="outlined"
                            />
                          </div>
                        </div>
                      ))}
                      <div className="w-full flex justify-center">
                        <Button
                          variant="contained"
                          onClick={() => setIsPreview(!isPreview)}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {themeFormData?.layout === "2" && (
            <div
              className="w-full h-full flex flex-row rounded-lg justify-end gap-0"
              style={{
                backgroundColor: themeFormData?.color?.background,
                backgroundImage: `url("${themeFormData?.background?.pattern}")`,
                backgroundSize: "200px 200px",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
              }}
            >
              <div
                className="w-[70%] h-[35rem] rounded-lg p-10 overflow-auto text-black"
                style={{
                  backgroundColor: themeFormData?.color?.background,
                }}
              >
                {!isPreview && (
                  <div
                    className={`w-full h-full flex flex-col gap-3 justify-center
              ${
                themeFormData?.intro?.align === "start" &&
                "items-start text-start"
              } 
              ${
                themeFormData?.intro?.align === "center" &&
                "items-center text-center"
              }
              ${themeFormData?.intro?.font === "small" && "text-sm"}
              ${themeFormData?.intro?.font === "medium" && "text-base"}
              ${themeFormData?.intro?.font === "large" && "text-lg"}`}
                  >
                    <div
                      className={`font-normal flex flex-col ${
                        themeFormData?.intro?.font === "small" && "text-base"
                      } ${
                        themeFormData?.intro?.font === "medium" && "text-lg"
                      } ${themeFormData?.intro?.font === "large" && "text-xl"}`}
                    >
                      <h1>{templateFormData?.one?.name}</h1>
                      <h1>Dear Employee,</h1>
                    </div>
                    <p>
                      This survey is aimed at capturing your honest feedback on
                      your engagement levels in this organization.
                    </p>
                    <p>
                      Your responses mean a lot to us, and will help us improve
                      the employee experience in our organization.
                    </p>
                    <Button
                      className="w-fit"
                      variant="contained"
                      onClick={() => setIsPreview(!isPreview)}
                    >
                      Preview
                    </Button>
                  </div>
                )}
                {isPreview && (
                  <div className="w-full flex flex-col gap-6">
                    <h1
                      className={`font-normal
                ${themeFormData?.question?.font === "small" && "text-base"}
                ${themeFormData?.question?.font === "medium" && "text-lg"}
              ${themeFormData?.question?.font === "large" && "text-xl"}`}
                    >
                      {templateFormData?.one?.name}
                    </h1>
                    <div className="w-full flex flex-col gap-12 justify-center items-center">
                      {templateFormData.two.questions.map((question, index) => (
                        <div key={index} className="w-full flex flex-col gap-3">
                          <div
                            style={{
                              color: themeFormData?.color?.question,
                            }}
                            className={`flex flex-row gap-3
          ${themeFormData?.question?.font === "small" && "text-sm"}
          ${themeFormData?.question?.font === "medium" && "text-base"}
          ${themeFormData?.question?.font === "large" && "text-lg"}`}
                          >
                            <h1>{index + 1}</h1>
                            <h1>{question.question}</h1>
                          </div>
                          <div className="ml-8 flex flex-col gap-3">
                            {renderQuestion(question)}
                            <TextField
                              sx={{
                                margin: 0,
                                padding: 0,
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: isLightColor(
                                      themeFormData?.color?.background
                                    )
                                      ? "gray"
                                      : "gray",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "default",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "default",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: "default",
                                },
                                "& .MuiInputBase-input": {
                                  color: themeFormData?.color?.answer,
                                },
                                color: themeFormData?.color?.answer,
                              }}
                              label="Comment"
                              variant="outlined"
                            />
                          </div>
                        </div>
                      ))}
                      <div className="w-full flex justify-center">
                        <Button
                          variant="contained"
                          onClick={() => setIsPreview(!isPreview)}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {themeFormData?.layout === "3" && (
            <div
              className="w-full h-[35rem] flex flex-row rounded-lg p-12 justify-center gap-0"
              style={{
                backgroundColor: themeFormData?.color?.background,
                backgroundImage: `url("${themeFormData?.background?.pattern}")`,
                backgroundSize: "200px 200px",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
              }}
            >
              <div
                className="w-[100%] h-full  rounded-lg p-10 overflow-auto text-black"
                style={{
                  backgroundColor: themeFormData?.color?.background,
                }}
              >
                {!isPreview && (
                  <div
                    className={`w-full h-full flex flex-col gap-3 justify-center
              ${
                themeFormData?.intro?.align === "start" &&
                "items-start text-start"
              } 
              ${
                themeFormData?.intro?.align === "center" &&
                "items-center text-center"
              }
              ${themeFormData?.intro?.font === "small" && "text-sm"}
              ${themeFormData?.intro?.font === "medium" && "text-base"}
              ${themeFormData?.intro?.font === "large" && "text-lg"}`}
                  >
                    <div
                      className={`font-normal flex flex-col ${
                        themeFormData?.intro?.font === "small" && "text-base"
                      } ${
                        themeFormData?.intro?.font === "medium" && "text-lg"
                      } ${themeFormData?.intro?.font === "large" && "text-xl"}`}
                    >
                      <h1>{templateFormData?.one?.name}</h1>
                      <h1>Dear Employee,</h1>
                    </div>
                    <p>
                      This survey is aimed at capturing your honest feedback on
                      your engagement levels in this organization.
                    </p>
                    <p>
                      Your responses mean a lot to us, and will help us improve
                      the employee experience in our organization.
                    </p>
                    <Button
                      className="w-fit"
                      variant="contained"
                      onClick={() => setIsPreview(!isPreview)}
                    >
                      Preview
                    </Button>
                  </div>
                )}
                {isPreview && (
                  <div className="w-full flex flex-col gap-6">
                    <h1
                      className={`font-normal
                ${themeFormData?.question?.font === "small" && "text-base"}
                ${themeFormData?.question?.font === "medium" && "text-lg"}
              ${themeFormData?.question?.font === "large" && "text-xl"}`}
                    >
                      {templateFormData?.one?.name}
                    </h1>
                    <div className="w-full flex flex-col gap-12 justify-center items-center">
                      {templateFormData.two.questions.map((question, index) => (
                        <div key={index} className="w-full flex flex-col gap-3">
                          <div
                            style={{
                              color: themeFormData?.color?.question,
                            }}
                            className={`flex flex-row gap-3
          ${themeFormData?.question?.font === "small" && "text-sm"}
          ${themeFormData?.question?.font === "medium" && "text-base"}
          ${themeFormData?.question?.font === "large" && "text-lg"}`}
                          >
                            <h1>{index + 1}</h1>
                            <h1>{question.question}</h1>
                          </div>
                          <div className="ml-8 flex flex-col gap-3">
                            {renderQuestion(question)}
                            <TextField
                              sx={{
                                margin: 0,
                                padding: 0,
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: isLightColor(
                                      themeFormData?.color?.background
                                    )
                                      ? "gray"
                                      : "gray",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "default",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "default",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: "default",
                                },
                                "& .MuiInputBase-input": {
                                  color: themeFormData?.color?.answer,
                                },
                                color: themeFormData?.color?.answer,
                              }}
                              label="Comment"
                              variant="outlined"
                            />
                          </div>
                        </div>
                      ))}
                      <div className="w-full flex justify-center">
                        <Button
                          variant="contained"
                          onClick={() => setIsPreview(!isPreview)}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {themeFormData?.layout === "4" && (
            <div
              className="w-full h-full flex flex-row rounded-lg gap-0"
              style={{
                backgroundColor: themeFormData?.color?.background,
                backgroundImage: `url("${themeFormData?.background?.pattern}")`,
                backgroundSize: "200px 200px",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
              }}
            >
              <div
                className="w-[90%] h-[35rem] rounded-lg p-10 overflow-auto text-black"
                style={{
                  backgroundColor: themeFormData?.color?.background,
                }}
              >
                {!isPreview && (
                  <div
                    className={`w-full h-full flex flex-col gap-3 justify-center
              ${
                themeFormData?.intro?.align === "start" &&
                "items-start text-start"
              } 
              ${
                themeFormData?.intro?.align === "center" &&
                "items-center text-center"
              }
              ${themeFormData?.intro?.font === "small" && "text-sm"}
              ${themeFormData?.intro?.font === "medium" && "text-base"}
              ${themeFormData?.intro?.font === "large" && "text-lg"}`}
                  >
                    <div
                      className={`font-normal flex flex-col ${
                        themeFormData?.intro?.font === "small" && "text-base"
                      } ${
                        themeFormData?.intro?.font === "medium" && "text-lg"
                      } ${themeFormData?.intro?.font === "large" && "text-xl"}`}
                    >
                      <h1>{templateFormData?.one?.name}</h1>
                      <h1>Dear Employee,</h1>
                    </div>
                    <p>
                      This survey is aimed at capturing your honest feedback on
                      your engagement levels in this organization.
                    </p>
                    <p>
                      Your responses mean a lot to us, and will help us improve
                      the employee experience in our organization.
                    </p>
                    <Button
                      className="w-fit"
                      variant="contained"
                      onClick={() => setIsPreview(!isPreview)}
                    >
                      Preview
                    </Button>
                  </div>
                )}
                {isPreview && (
                  <div className="w-full flex flex-col gap-6">
                    <h1
                      className={`font-normal
                ${themeFormData?.question?.font === "small" && "text-base"}
                ${themeFormData?.question?.font === "medium" && "text-lg"}
              ${themeFormData?.question?.font === "large" && "text-xl"}`}
                    >
                      {templateFormData?.one?.name}
                    </h1>
                    <div className="w-full flex flex-col gap-12 justify-center items-center">
                      {templateFormData.two.questions.map((question, index) => (
                        <div key={index} className="w-full flex flex-col gap-3">
                          <div
                            style={{
                              color: themeFormData?.color?.question,
                            }}
                            className={`flex flex-row gap-3
          ${themeFormData?.question?.font === "small" && "text-sm"}
          ${themeFormData?.question?.font === "medium" && "text-base"}
          ${themeFormData?.question?.font === "large" && "text-lg"}`}
                          >
                            <h1>{index + 1}</h1>
                            <h1>{question.question}</h1>
                          </div>
                          <div className="ml-8 flex flex-col gap-3">
                            {renderQuestion(question)}
                            <TextField
                              sx={{
                                margin: 0,
                                padding: 0,
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: isLightColor(
                                      themeFormData?.color?.background
                                    )
                                      ? "gray"
                                      : "gray",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "default",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "default",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: "default",
                                },
                                "& .MuiInputBase-input": {
                                  color: themeFormData?.color?.answer,
                                },
                                color: themeFormData?.color?.answer,
                              }}
                              label="Comment"
                              variant="outlined"
                            />
                          </div>
                        </div>
                      ))}
                      <div className="w-full flex justify-center">
                        <Button
                          variant="contained"
                          onClick={() => setIsPreview(!isPreview)}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {themeFormData?.layout === "5" && (
            <div
              className="w-full h-full flex flex-row rounded-lg justify-end gap-0"
              style={{
                backgroundColor: themeFormData?.color?.background,
                backgroundImage: `url("${themeFormData?.background?.pattern}")`,
                backgroundSize: "200px 200px",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
              }}
            >
              <div
                className="w-[90%] h-[35rem] rounded-lg p-10 overflow-auto text-black"
                style={{
                  backgroundColor: themeFormData?.color?.background,
                }}
              >
                {!isPreview && (
                  <div
                    className={`w-full h-full flex flex-col gap-3 justify-center
              ${
                themeFormData?.intro?.align === "start" &&
                "items-start text-start"
              } 
              ${
                themeFormData?.intro?.align === "center" &&
                "items-center text-center"
              }
              ${themeFormData?.intro?.font === "small" && "text-sm"}
              ${themeFormData?.intro?.font === "medium" && "text-base"}
              ${themeFormData?.intro?.font === "large" && "text-lg"}`}
                  >
                    <div
                      className={`font-normal flex flex-col ${
                        themeFormData?.intro?.font === "small" && "text-base"
                      } ${
                        themeFormData?.intro?.font === "medium" && "text-lg"
                      } ${themeFormData?.intro?.font === "large" && "text-xl"}`}
                    >
                      <h1>{templateFormData?.one?.name}</h1>
                      <h1>Dear Employee,</h1>
                    </div>
                    <p>
                      This survey is aimed at capturing your honest feedback on
                      your engagement levels in this organization.
                    </p>
                    <p>
                      Your responses mean a lot to us, and will help us improve
                      the employee experience in our organization.
                    </p>
                    <Button
                      className="w-fit"
                      variant="contained"
                      onClick={() => setIsPreview(!isPreview)}
                    >
                      Preview
                    </Button>
                  </div>
                )}
                {isPreview && (
                  <div className="w-full flex flex-col gap-6">
                    <h1
                      className={`font-normal
                ${themeFormData?.question?.font === "small" && "text-base"}
                ${themeFormData?.question?.font === "medium" && "text-lg"}
              ${themeFormData?.question?.font === "large" && "text-xl"}`}
                    >
                      {templateFormData?.one?.name}
                    </h1>
                    <div className="w-full flex flex-col gap-12 justify-center items-center">
                      {templateFormData.two.questions.map((question, index) => (
                        <div key={index} className="w-full flex flex-col gap-3">
                          <div
                            style={{
                              color: themeFormData?.color?.question,
                            }}
                            className={`flex flex-row gap-3
          ${themeFormData?.question?.font === "small" && "text-sm"}
          ${themeFormData?.question?.font === "medium" && "text-base"}
          ${themeFormData?.question?.font === "large" && "text-lg"}`}
                          >
                            <h1>{index + 1}</h1>
                            <h1>{question.question}</h1>
                          </div>
                          <div className="ml-8 flex flex-col gap-3">
                            {renderQuestion(question)}
                            <TextField
                              sx={{
                                margin: 0,
                                padding: 0,
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: isLightColor(
                                      themeFormData?.color?.background
                                    )
                                      ? "gray"
                                      : "gray",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "default",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "default",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: "default",
                                },
                                "& .MuiInputBase-input": {
                                  color: themeFormData?.color?.answer,
                                },
                                color: themeFormData?.color?.answer,
                              }}
                              label="Comment"
                              variant="outlined"
                            />
                          </div>
                        </div>
                      ))}
                      <div className="w-full flex justify-center">
                        <Button
                          variant="contained"
                          onClick={() => setIsPreview(!isPreview)}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {themeFormData?.layout === "6" && (
            <div
              className="w-full h-[35rem] flex flex-row pt-24 rounded-lg gap-0"
              style={{
                backgroundColor: themeFormData?.color?.background,
                backgroundImage: `url("${themeFormData?.background?.pattern}")`,
                backgroundSize: "200px 200px",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
              }}
            >
              <div
                className="w-full rounded-lg p-10 overflow-auto text-black"
                style={{
                  backgroundColor: themeFormData?.color?.background,
                }}
              >
                {!isPreview && (
                  <div
                    className={`w-full h-full flex flex-col gap-3 justify-center
              ${
                themeFormData?.intro?.align === "start" &&
                "items-start text-start"
              } 
              ${
                themeFormData?.intro?.align === "center" &&
                "items-center text-center"
              }
              ${themeFormData?.intro?.font === "small" && "text-sm"}
              ${themeFormData?.intro?.font === "medium" && "text-base"}
              ${themeFormData?.intro?.font === "large" && "text-lg"}`}
                  >
                    <div
                      className={`font-normal flex flex-col ${
                        themeFormData?.intro?.font === "small" && "text-base"
                      } ${
                        themeFormData?.intro?.font === "medium" && "text-lg"
                      } ${themeFormData?.intro?.font === "large" && "text-xl"}`}
                    >
                      <h1>{templateFormData?.one?.name}</h1>
                      <h1>Dear Employee,</h1>
                    </div>
                    <p>
                      This survey is aimed at capturing your honest feedback on
                      your engagement levels in this organization.
                    </p>
                    <p>
                      Your responses mean a lot to us, and will help us improve
                      the employee experience in our organization.
                    </p>
                    <Button
                      className="w-fit"
                      variant="contained"
                      onClick={() => setIsPreview(!isPreview)}
                    >
                      Preview
                    </Button>
                  </div>
                )}
                {isPreview && (
                  <div className="w-full flex flex-col gap-6">
                    <h1
                      className={`font-normal
                ${themeFormData?.question?.font === "small" && "text-base"}
                ${themeFormData?.question?.font === "medium" && "text-lg"}
              ${themeFormData?.question?.font === "large" && "text-xl"}`}
                    >
                      {templateFormData?.one?.name}
                    </h1>
                    <div className="w-full flex flex-col gap-12 justify-center items-center">
                      {templateFormData.two.questions.map((question, index) => (
                        <div key={index} className="w-full flex flex-col gap-3">
                          <div
                            style={{
                              color: themeFormData?.color?.question,
                            }}
                            className={`flex flex-row gap-3
          ${themeFormData?.question?.font === "small" && "text-sm"}
          ${themeFormData?.question?.font === "medium" && "text-base"}
          ${themeFormData?.question?.font === "large" && "text-lg"}`}
                          >
                            <h1>{index + 1}</h1>
                            <h1>{question.question}</h1>
                          </div>
                          <div className="ml-8 flex flex-col gap-3">
                            {renderQuestion(question)}
                            <TextField
                              sx={{
                                margin: 0,
                                padding: 0,
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: isLightColor(
                                      themeFormData?.color?.background
                                    )
                                      ? "gray"
                                      : "gray",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "default",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "default",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: "default",
                                },
                                "& .MuiInputBase-input": {
                                  color: themeFormData?.color?.answer,
                                },
                                color: themeFormData?.color?.answer,
                              }}
                              label="Comment"
                              variant="outlined"
                            />
                          </div>
                        </div>
                      ))}
                      <div className="w-full flex justify-center">
                        <Button
                          variant="contained"
                          onClick={() => setIsPreview(!isPreview)}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {themeFormData?.layout === "7" && (
            <div
              className={`w-full h-[35rem] flex flex-row rounded-lg gap-0 overflow-hidden relative ${themeFormData?.background?.pattern === "" && "bg-neutral-100"}, `}
              style={{
                backgroundImage: `url("${themeFormData?.background?.pattern}")`,
                backgroundSize: "200px 200px",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
              }}
            >
              <div
                className="w-full z-10 rounded-lg m-12 p-10 overflow-auto text-black"
                style={{
                  backgroundColor: themeFormData?.color?.background,
                }}
              >
                {!isPreview && (
                  <div
                    className={`w-full h-full flex flex-col gap-3 justify-center
              ${
                themeFormData?.intro?.align === "start" &&
                "items-start text-start"
              } 
              ${
                themeFormData?.intro?.align === "center" &&
                "items-center text-center"
              }
              ${themeFormData?.intro?.font === "small" && "text-sm"}
              ${themeFormData?.intro?.font === "medium" && "text-base"}
              ${themeFormData?.intro?.font === "large" && "text-lg"}`}
                  >
                    <div
                      className={`font-normal flex flex-col ${
                        themeFormData?.intro?.font === "small" && "text-base"
                      } ${
                        themeFormData?.intro?.font === "medium" && "text-lg"
                      } ${themeFormData?.intro?.font === "large" && "text-xl"}`}
                    >
                      <h1>{templateFormData?.one?.name}</h1>
                      <h1>Dear Employee,</h1>
                    </div>
                    <p>
                      This survey is aimed at capturing your honest feedback on
                      your engagement levels in this organization.
                    </p>
                    <p>
                      Your responses mean a lot to us, and will help us improve
                      the employee experience in our organization.
                    </p>
                    <Button
                      className="w-fit"
                      variant="contained"
                      onClick={() => setIsPreview(!isPreview)}
                    >
                      Preview
                    </Button>
                  </div>
                )}
                {isPreview && (
                  <div className="w-full flex flex-col gap-6">
                    <h1
                      className={`font-normal
                ${themeFormData?.question?.font === "small" && "text-base"}
                ${themeFormData?.question?.font === "medium" && "text-lg"}
              ${themeFormData?.question?.font === "large" && "text-xl"}`}
                    >
                      {templateFormData?.one?.name}
                    </h1>
                    <div className="w-full flex flex-col gap-12 justify-center items-center">
                      {templateFormData.two.questions.map((question, index) => (
                        <div key={index} className="w-full flex flex-col gap-3">
                          <div
                            style={{
                              color: themeFormData?.color?.question,
                            }}
                            className={`flex flex-row gap-3
          ${themeFormData?.question?.font === "small" && "text-sm"}
          ${themeFormData?.question?.font === "medium" && "text-base"}
          ${themeFormData?.question?.font === "large" && "text-lg"}`}
                          >
                            <h1>{index + 1}</h1>
                            <h1>{question.question}</h1>
                          </div>
                          <div className="ml-8 flex flex-col gap-3">
                            {renderQuestion(question)}
                            <TextField
                              sx={{
                                margin: 0,
                                padding: 0,
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: isLightColor(
                                      themeFormData?.color?.background
                                    )
                                      ? "gray"
                                      : "gray",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "default",
                                  },
                                  "&.Mui-focused fieldset": {
                                    borderColor: "default",
                                  },
                                },
                                "& .MuiInputLabel-root": {
                                  color: "default",
                                },
                                "& .MuiInputBase-input": {
                                  color: themeFormData?.color?.answer,
                                },
                                color: themeFormData?.color?.answer,
                              }}
                              label="Comment"
                              variant="outlined"
                            />
                          </div>
                        </div>
                      ))}
                      <div className="w-full flex justify-center">
                        <Button
                          variant="contained"
                          onClick={() => setIsPreview(!isPreview)}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Box
                sx={{ backgroundColor: "background.default" }}
                className="absolute w-full h-[70%] bottom-0 -z-0"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
