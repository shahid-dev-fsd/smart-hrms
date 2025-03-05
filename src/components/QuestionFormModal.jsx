import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tab,
  Tabs,
  TextField,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LiaStarSolid } from "react-icons/lia";
import { MdDeleteOutline, MdOutlineCircle } from "react-icons/md";

import CustomEmptyModal from "./CustomEmptyModal";

export default function QuestionFormModal({
  title = "",
  type = "template",
  open = null,
  onClose = () => {},
  onSubmit = () => {},
  isEdit = false,
  editFormData = {},
  setEditFormData = () => {},
}) {
  const [switchType, setSwitchType] = useState({
    primary: editFormData?.type || "single",
  });
  const primaryTypes = [
    {
      label: "Single",
      value: "single",
    },
    {
      label: "Multiple",
      value: "multiple",
    },
    {
      label: "Comment",
      value: "comment",
    },
    {
      label: "Date",
      value: "date",
    },
    {
      label: "NPS",
      value: "nps",
    },
    {
      label: "Star",
      value: "star",
    },
    {
      label: "Rating Scale",
      value: "ratingScale",
    },
  ];
  const [snackbars, setSnackbars] = useState({
    questionType: false,
  });

  const [singleFormData, setSingleFormData] = useState({
    type: "single",
    question: "",
    choices: [
      {
        label: "Choice",
        value: "",
      },
      {
        label: "Choice",
        value: "",
      },
    ],
    advance: {
      enable_comment: false,
      comment_mandatory: false,
      is_mandatory: false,
    },
    metric: "",
  });
  const [multipleFormData, setMultipleFormData] = useState({
    type: "multiple",
    question: "",
    choices: [
      {
        label: "Choice",
        value: "",
      },
      {
        label: "Choice",
        value: "",
      },
    ],
    advance: {
      enable_comment: false,
      comment_mandatory: false,
      is_mandatory: false,
    },
    metric: "",
  });
  const [commentFormData, setCommentFormData] = useState({
    type: "comment",
    question: "",
    advance: {
      is_mandatory: false,
    },
    metric: "",
  });
  const [dateFormData, setDateFormData] = useState({
    type: "date",
    question: "",
    date_format: "mm-dd-yyyy",
    select_range: false,
    start_range: "",
    end_range: "",
    advance: {
      enable_comment: false,
      comment_mandatory: false,
      is_mandatory: false,
    },
  });
  const [npsFormData, setNPSFormData] = useState({
    type: "nps",
    metric: "",
    question: "",
    minscore_text: "Not at all likely",
    maxscore_text: "Extremely likely",
    max_count: 10,
    advance: {
      enable_comment: false,
      comment_mandatory: false,
      score_is: null,
      equal_to: null,
      is_mandatory: false,
    },
  });
  const [starFormData, setStarFormData] = useState({
    type: "star",
    metric: "",
    question: "",
    minscore_text: "Not at all likely",
    maxscore_text: "Extremely likely",
    max_count: 10,
    advance: {
      enable_comment: false,
      comment_mandatory: false,
      score_is: null,
      equal_to: null,
      is_mandatory: false,
    },
  });
  const [ratingScaleFormData, setRatingScaleFormData] = useState({
    type: "ratingScale",
    metric: "",
    question: "",
    max_count: 3,
    scale_type: "agreement_scale",
    scale_view: "card",
    icon_type: "number",
    advance: {
      enable_comment: false,
      comment_mandatory: false,
      score_is: null,
      equal_to: null,
      is_mandatory: false,
    },
  });

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

  const cleanUp = () => {
    setSingleFormData({
      type: "single",
      question: "",
      choices: [
        {
          label: "Choice",
          value: "",
        },
        {
          label: "Choice",
          value: "",
        },
      ],
      advance: {
        enable_comment: false,
        comment_mandatory: false,
        is_mandatory: false,
      },
      metric: "",
    });

    setMultipleFormData({
      type: "multiple",
      question: "",
      choices: [
        {
          label: "Choice",
          value: "",
        },
        {
          label: "Choice",
          value: "",
        },
      ],
      advance: {
        enable_comment: false,
        comment_mandatory: false,
        is_mandatory: false,
      },
      metric: "",
    });

    setCommentFormData({
      type: "comment",
      question: "",
      advance: {
        is_mandatory: false,
      },
      metric: "",
    });

    setDateFormData({
      type: "date",
      question: "",
      date_format: "mm-dd-yyyy",
      select_range: false,
      start_range: "",
      end_range: "",
      advance: {
        enable_comment: false,
        comment_mandatory: false,
        is_mandatory: false,
      },
    });

    setNPSFormData({
      type: "nps",
      metric: "",
      question: "",
      minscore_text: "Not at all likely",
      maxscore_text: "Extremely likely",
      max_count: 10,
      advance: {
        enable_comment: false,
        comment_mandatory: false,
        score_is: null,
        equal_to: null,
        is_mandatory: false,
      },
    });

    setStarFormData({
      type: "star",
      metric: "",
      question: "",
      minscore_text: "Not at all likely",
      maxscore_text: "Extremely likely",
      max_count: 10,
      advance: {
        enable_comment: false,
        comment_mandatory: false,
        score_is: null,
        equal_to: null,
        is_mandatory: false,
      },
    });

    setRatingScaleFormData({
      type: "ratingScale",
      metric: "",
      question: "",
      max_count: 3,
      scale_type: "agreement_scale",
      scale_view: "card",
      icon_type: "number",
      advance: {
        enable_comment: false,
        comment_mandatory: false,
        score_is: null,
        equal_to: null,
        is_mandatory: false,
      },
    });
  };

  useEffect(() => {
    if (isEdit && editFormData) {
      switch (editFormData.type) {
        case "single":
          setSingleFormData((prev) => ({
            ...prev,
            ...editFormData,
            advance: {
              ...prev.advance,
              ...editFormData.advance,
            },
          }));
          break;
        case "multiple":
          setMultipleFormData((prev) => ({
            ...prev,
            ...editFormData,
            advance: {
              ...prev.advance,
              ...editFormData.advance,
            },
          }));
          break;
        case "comment":
          setCommentFormData((prev) => ({
            ...prev,
            ...editFormData,
            advance: {
              ...prev.advance,
              ...editFormData.advance,
            },
          }));
          break;
        case "date":
          setDateFormData((prev) => ({
            ...prev,
            ...editFormData,
            advance: {
              ...prev.advance,
              ...editFormData.advance,
            },
          }));
          break;
        case "nps":
          setNPSFormData((prev) => ({
            ...prev,
            ...editFormData,
            advance: {
              ...prev.advance,
              ...editFormData.advance,
            },
          }));
          break;
        case "star":
          setStarFormData((prev) => ({
            ...prev,
            ...editFormData,
            advance: {
              ...prev.advance,
              ...editFormData.advance,
            },
          }));
          break;
        case "ratingScale":
          setRatingScaleFormData((prev) => ({
            ...prev,
            ...editFormData,
            advance: {
              ...prev.advance,
              ...editFormData.advance,
            },
          }));
          break;
        default:
          break;
      }
    }
  }, [isEdit]);

  return (
    <div>
      <Snackbar
        open={snackbars.questionType}
        autoHideDuration={5000}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setSnackbars((prev) => ({ ...prev, questionType: false }));
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setSnackbars((prev) => ({ ...prev, questionType: false }));
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          You can't change the Question Type while editing.
        </Alert>
      </Snackbar>
      <CustomEmptyModal open={open} onClose={onClose} isScrollable={true}>
        <form
          className="w-full h-full relative"
          onSubmit={(event) => {
            event.preventDefault();

            let data = null;

            switch (switchType.primary) {
              case "single":
                data = singleFormData;
                break;
              case "multiple":
                data = multipleFormData;
                break;
              case "comment":
                data = commentFormData;
                break;
              case "date":
                data = dateFormData;
                break;
              case "nps":
                data = npsFormData;
                break;
              case "star":
                data = starFormData;
                break;
              case "ratingScale":
                data = ratingScaleFormData;
                break;
              default:
                data = null;
            }
            onSubmit(data);
            cleanUp();
          }}
        >
          <div className="flex flex-col gap-3">
            <Box
              sx={{ backgroundColor: "background.default" }}
              className="w-full min-h-14 flex items-center z-50 sticky top-0 left-0"
            >
              <h1 className="text-xl">{title}</h1>
            </Box>
            <div className="w-full">
              <Tabs
                value={switchType.primary}
                onChange={(event, newValue) => {
                  if (isEdit) {
                    setSnackbars((prev) => ({ ...prev, questionType: true }));
                  } else {
                    setSwitchType({ ...switchType, primary: newValue });
                  }
                }}
              >
                {primaryTypes.map((tab, index) => (
                  <Tab key={index} label={tab.label} value={tab.value} />
                ))}
              </Tabs>
            </div>
            {switchType.primary === "single" && (
              <div className="w-full flex flex-col gap-3">
                <div>
                  {type === "template" && (
                    <>
                      <FormControl fullWidth>
                        <InputLabel>Metrics</InputLabel>
                        <Select
                          value={singleFormData.metric}
                          onChange={(event) => {
                            setSingleFormData((prev) => ({
                              ...prev,
                              metric: event.target.value,
                            }));
                          }}
                          label="Metrics"
                        >
                          <MenuItem value={"metric_1"}>Metric 1</MenuItem>
                          <MenuItem value={"metric_2"}>Metric 2</MenuItem>
                          <MenuItem value={"metric_3"}>Metric 3</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}
                </div>
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Question</h1>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    sx={{ margin: 0, padding: 0 }}
                    value={singleFormData.question}
                    onChange={(event) => {
                      setSingleFormData((prev) => ({
                        ...prev,
                        question: event.target.value,
                      }));
                    }}
                    multiline
                  />
                </div>
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Answer</h1>
                  <div className="w-full flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                      {singleFormData.choices.map((choice, index) => (
                        <div
                          key={index}
                          className="w-full flex flex-row gap-3 justify-between items-center"
                        >
                          <TextField
                            label={`Choice ${index + 1}`}
                            fullWidth
                            variant="outlined"
                            sx={{ margin: 0, padding: 0 }}
                            value={choice.value}
                            onChange={(event) =>
                              setSingleFormData((prevSingle) => {
                                const newChoices = [...prevSingle.choices];
                                newChoices[index].value = event.target.value;
                                return { ...prevSingle, choices: newChoices };
                              })
                            }
                          />
                          <IconButton
                            onClick={() => {
                              if (index !== 0 && index !== 1) {
                                setSingleFormData((prevSingle) => ({
                                  ...prevSingle,
                                  choices: prevSingle.choices.filter(
                                    (_, i) => i !== index
                                  ),
                                }));
                              }
                            }}
                          >
                            <MdDeleteOutline />
                          </IconButton>
                        </div>
                      ))}
                    </div>
                    <div>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setSingleFormData((prevSingle) => ({
                            ...prevSingle,
                            choices: [
                              ...prevSingle.choices,
                              { label: "Choice", value: "" },
                            ],
                          }));
                        }}
                      >
                        Add Choice
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Advanced Options</h1>
                  <div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={singleFormData.advance.enable_comment}
                            onChange={(event) => {
                              setSingleFormData((prev) => ({
                                ...prev,
                                advance: {
                                  ...prev.advance,
                                  enable_comment: event.target.checked,
                                  comment_mandatory: false,
                                },
                              }));
                            }}
                          />
                        }
                        label="Enable Comments"
                      />
                      {singleFormData.advance.enable_comment === true && (
                        <>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  singleFormData.advance.comment_mandatory
                                }
                                onChange={(event) => {
                                  setSingleFormData((prev) => ({
                                    ...prev,
                                    advance: {
                                      ...prev.advance,
                                      comment_mandatory: event.target.checked,
                                    },
                                  }));
                                }}
                              />
                            }
                            label="Make Comment Mandatory"
                          />
                        </>
                      )}

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={singleFormData.advance.is_mandatory}
                            onChange={(event) => {
                              setSingleFormData((prev) => ({
                                ...prev,
                                advance: {
                                  ...prev.advance,
                                  is_mandatory: event.target.checked,
                                },
                              }));
                            }}
                          />
                        }
                        label="Mark As Mandatory"
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            )}
            {switchType.primary === "multiple" && (
              <div className="w-full flex flex-col gap-3">
                <div>
                  {type === "template" && (
                    <>
                      <FormControl fullWidth>
                        <InputLabel>Metrics</InputLabel>
                        <Select
                          value={multipleFormData.metric}
                          onChange={(event) => {
                            setMultipleFormData((prev) => ({
                              ...prev,
                              metric: event.target.value,
                            }));
                          }}
                          label="Metrics"
                        >
                          <MenuItem value={"metric_1"}>Metric 1</MenuItem>
                          <MenuItem value={"metric_2"}>Metric 2</MenuItem>
                          <MenuItem value={"metric_3"}>Metric 3</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}
                </div>
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Question</h1>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    sx={{ margin: 0, padding: 0 }}
                    value={multipleFormData.question}
                    onChange={(event) => {
                      setMultipleFormData((prev) => ({
                        ...prev,
                        question: event.target.value,
                      }));
                    }}
                    multiline
                  />
                </div>
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Answer</h1>
                  <div className="w-full flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                      {multipleFormData.choices.map((choice, index) => (
                        <div
                          key={index}
                          className="w-full flex flex-row gap-3 justify-between items-center"
                        >
                          <TextField
                            label={`Choice ${index + 1}`}
                            fullWidth
                            variant="outlined"
                            sx={{ margin: 0, padding: 0 }}
                            value={choice.value}
                            onChange={(event) =>
                              setMultipleFormData((prevSingle) => {
                                const newChoices = [...prevSingle.choices];
                                newChoices[index].value = event.target.value;
                                return { ...prevSingle, choices: newChoices };
                              })
                            }
                          />
                          <IconButton
                            onClick={() => {
                              if (index !== 0 && index !== 1) {
                                setMultipleFormData((prevSingle) => ({
                                  ...prevSingle,
                                  choices: prevSingle.choices.filter(
                                    (_, i) => i !== index
                                  ),
                                }));
                              }
                            }}
                          >
                            <MdDeleteOutline />
                          </IconButton>
                        </div>
                      ))}
                    </div>
                    <div>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setMultipleFormData((prevSingle) => ({
                            ...prevSingle,
                            choices: [
                              ...prevSingle.choices,
                              { label: "Choice", value: "" },
                            ],
                          }));
                        }}
                      >
                        Add Choice
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Advanced Options</h1>
                  <div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={multipleFormData.advance.enable_comment}
                            onChange={(event) => {
                              setMultipleFormData((prev) => ({
                                ...prev,
                                advance: {
                                  ...prev.advance,
                                  enable_comment: event.target.checked,
                                  comment_mandatory: false,
                                },
                              }));
                            }}
                          />
                        }
                        label="Enable Comments"
                      />
                      {multipleFormData.advance.enable_comment === true && (
                        <>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  multipleFormData.advance.comment_mandatory
                                }
                                onChange={(event) => {
                                  setMultipleFormData((prev) => ({
                                    ...prev,
                                    advance: {
                                      ...prev.advance,
                                      comment_mandatory: event.target.checked,
                                    },
                                  }));
                                }}
                              />
                            }
                            label="Make Comment Mandatory"
                          />
                        </>
                      )}

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={multipleFormData.advance.is_mandatory}
                            onChange={(event) => {
                              setMultipleFormData((prev) => ({
                                ...prev,
                                advance: {
                                  ...prev.advance,
                                  is_mandatory: event.target.checked,
                                },
                              }));
                            }}
                          />
                        }
                        label="Mark As Mandatory"
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            )}
            {switchType.primary === "comment" && (
              <div className="w-full flex flex-col gap-3">
                <div>
                  {type === "template" && (
                    <>
                      <FormControl fullWidth>
                        <InputLabel>Metrics</InputLabel>
                        <Select
                          value={commentFormData.metric}
                          onChange={(event) => {
                            setCommentFormData((prev) => ({
                              ...prev,
                              metric: event.target.value,
                            }));
                          }}
                          label="Metrics"
                        >
                          <MenuItem value={"metric_1"}>Metric 1</MenuItem>
                          <MenuItem value={"metric_2"}>Metric 2</MenuItem>
                          <MenuItem value={"metric_3"}>Metric 3</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}
                </div>
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Question</h1>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    sx={{ margin: 0, padding: 0 }}
                    value={commentFormData.question}
                    onChange={(event) => {
                      setCommentFormData((prev) => ({
                        ...prev,
                        question: event.target.value,
                      }));
                    }}
                    multiline
                  />
                </div>
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Advanced Options</h1>
                  <div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={commentFormData.advance.is_mandatory}
                            onChange={(event) => {
                              setCommentFormData((prev) => ({
                                ...prev,
                                advance: {
                                  ...prev.advance,
                                  is_mandatory: event.target.checked,
                                },
                              }));
                            }}
                          />
                        }
                        label="Mark As Mandatory"
                      />
                    </FormGroup>
                  </div>
                </div>
                <Box
                  sx={{ backgroundColor: "background.default" }}
                  className="w-full min-h-14 flex items-center z-50 sticky top-0 left-0"
                >
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      cleanUp();
                      onClose();
                    }}
                  >
                    Cancle
                  </Button>
                </Box>
              </div>
            )}
            {switchType.primary === "date" && (
              <div className="w-full flex flex-col gap-3">
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Question</h1>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    sx={{ margin: 0, padding: 0 }}
                    value={dateFormData.question}
                    onChange={(event) => {
                      setDateFormData((prev) => ({
                        ...prev,
                        question: event.target.value,
                      }));
                    }}
                    multiline
                  />
                  <h1>Date Format</h1>
                  <FormControl fullWidth>
                    <Select
                      value={dateFormData.date_format}
                      onChange={(event) => {
                        setDateFormData((prev) => ({
                          ...prev,
                          date_format: event.target.value,
                        }));
                      }}
                    >
                      <MenuItem value={"mm-dd-yyyy"}>mm-dd-yyyy</MenuItem>
                      <MenuItem value={"dd-mm-yyyy"}>dd-mm-yyyy</MenuItem>
                      <MenuItem value={"dd-MMM-yyyy"}>dd-MMM-yyyy</MenuItem>
                      <MenuItem value={"dd-MMM-yy"}>dd-MMM-yy</MenuItem>
                      <MenuItem value={"mm/dd/yyyy"}>mm/dd/yyyy</MenuItem>
                      <MenuItem value={"dd/mm/yyyy"}>dd/mm/yyyy</MenuItem>
                      <MenuItem value={"yyyy-mm-dd"}>yyyy-mm-dd</MenuItem>
                      <MenuItem value={"yyyy/mm/dd"}>yyyy/mm/dd</MenuItem>
                      <MenuItem value={"dd.mm.yyyy"}>dd.mm.yyyy</MenuItem>
                    </Select>
                  </FormControl>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={dateFormData.select_range}
                          onChange={(event) => {
                            const isChecked = event.target.checked;
                            setDateFormData((prev) => ({
                              ...prev,
                              select_range: isChecked,
                              start_date: isChecked ? dayjs() : null,
                              end_date: isChecked
                                ? dayjs().add(1, "month")
                                : null,
                            }));
                          }}
                        />
                      }
                      label="Select Range"
                    />
                  </FormGroup>
                  {dateFormData.select_range === true && (
                    <div className="w-full flex flex-row gap-3 justify-between items-center">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ width: "100%" }}
                          label="From"
                          value={dateFormData.start_date}
                          onChange={(newValue) => {
                            setDateFormData((prev) => ({
                              ...prev,
                              start_date: newValue,
                            }));
                          }}
                        />
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ width: "100%" }}
                          label="To"
                          value={dateFormData.end_date}
                          onChange={(newValue) => {
                            setDateFormData((prev) => ({
                              ...prev,
                              end_date: newValue,
                            }));
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                  )}
                </div>
                {/* <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3"></div> */}
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Advanced Options</h1>
                  <div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={dateFormData.advance.enable_comment}
                            onChange={(event) => {
                              setDateFormData((prev) => ({
                                ...prev,
                                advance: {
                                  ...prev.advance,
                                  enable_comment: event.target.checked,
                                  comment_mandatory: false,
                                },
                              }));
                            }}
                          />
                        }
                        label="Enable Comments"
                      />
                      {dateFormData.advance.enable_comment === true && (
                        <>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={dateFormData.advance.comment_mandatory}
                                onChange={(event) => {
                                  setDateFormData((prev) => ({
                                    ...prev,
                                    advance: {
                                      ...prev.advance,
                                      comment_mandatory: event.target.checked,
                                    },
                                  }));
                                }}
                              />
                            }
                            label="Make Comment Mandatory"
                          />
                        </>
                      )}

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={dateFormData.advance.is_mandatory}
                            onChange={(event) => {
                              setDateFormData((prev) => ({
                                ...prev,
                                advance: {
                                  ...prev.advance,
                                  is_mandatory: event.target.checked,
                                },
                              }));
                            }}
                          />
                        }
                        label="Mark As Mandatory"
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            )}
            {switchType.primary === "nps" && (
              <div className="w-full flex flex-col gap-3">
                <div>
                  {type === "template" && (
                    <>
                      <FormControl fullWidth>
                        <InputLabel>Metrics</InputLabel>
                        <Select
                          value={npsFormData.metric}
                          onChange={(event) => {
                            setNPSFormData((prev) => ({
                              ...prev,
                              metric: event.target.value,
                            }));
                          }}
                          label="Metrics"
                        >
                          <MenuItem value={"metric_1"}>Metric 1</MenuItem>
                          <MenuItem value={"metric_2"}>Metric 2</MenuItem>
                          <MenuItem value={"metric_3"}>Metric 3</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}
                </div>
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Question</h1>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    sx={{ margin: 0, padding: 0 }}
                    value={npsFormData.question}
                    onChange={(event) => {
                      setNPSFormData((prev) => ({
                        ...prev,
                        question: event.target.value,
                      }));
                    }}
                    multiline
                  />
                </div>
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Answer Score</h1>
                  <div className="w-full flex flex-row justify-between items-center gap-3">
                    {Array.from(
                      { length: npsFormData.max_count },
                      (_, index) => ({})
                    ).map((_, index) => {
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
                    })}
                  </div>
                  <div className="flex flex-row gap-3">
                    <TextField
                      fullWidth
                      required
                      variant="outlined"
                      sx={{ margin: 0, padding: 0 }}
                      value={npsFormData.minscore_text}
                      onChange={(event) => {
                        setNPSFormData((prev) => ({
                          ...prev,
                          minscore_text: event.target.value,
                        }));
                      }}
                      multiline
                    />
                    <TextField
                      fullWidth
                      required
                      variant="outlined"
                      sx={{ margin: 0, padding: 0 }}
                      value={npsFormData.maxscore_text}
                      onChange={(event) => {
                        setNPSFormData((prev) => ({
                          ...prev,
                          maxscore_text: event.target.value,
                        }));
                      }}
                      multiline
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Advanced Options</h1>
                  <div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={npsFormData.advance.enable_comment}
                            onChange={(event) => {
                              const isChecked = event.target.checked;
                              setNPSFormData((prev) => ({
                                ...prev,
                                advance: {
                                  ...prev.advance,
                                  enable_comment: event.target.checked,
                                  score_is: isChecked ? "<" : null,
                                  equal_to: isChecked ? "6" : null,
                                  comment_mandatory: false,
                                },
                              }));
                            }}
                          />
                        }
                        label="Enable Comments"
                      />
                      {npsFormData.advance.enable_comment === true && (
                        <div className="flex flex-row gap-3 text-nowrap">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={npsFormData.advance.comment_mandatory}
                                onChange={(event) => {
                                  setNPSFormData((prev) => ({
                                    ...prev,
                                    advance: {
                                      ...prev.advance,
                                      comment_mandatory: event.target.checked,
                                    },
                                  }));
                                }}
                              />
                            }
                            label="Make Comment Mandatory If The Score Is"
                          />
                          <FormControl fullWidth>
                            <Select
                              value={npsFormData.advance.score_is}
                              onChange={(event) => {
                                setNPSFormData((prev) => ({
                                  ...prev,
                                  advance: {
                                    ...prev.advance,
                                    score_is: event.target.value,
                                  },
                                }));
                              }}
                            >
                              <MenuItem value={"<"}>Less Then</MenuItem>
                              <MenuItem value={">"}>Greater Then</MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            fullWidth
                            required
                            variant="outlined"
                            sx={{ margin: 0, padding: 0 }}
                            value={npsFormData.advance.equal_to}
                            onChange={(event) => {
                              const value = event.target.value;
                              if (value === "" || (value >= 1 && value <= 9)) {
                                setNPSFormData((prev) => ({
                                  ...prev,
                                  advance: {
                                    ...prev.advance,
                                    equal_to: value === "" ? "" : Number(value),
                                  },
                                }));
                              }
                            }}
                            type="number"
                            slotProps={{
                              input: {
                                type: "number",
                                min: 1,
                                max: 9,
                              },
                            }}
                            multiline
                          />
                        </div>
                      )}

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={npsFormData.advance.is_mandatory}
                            onChange={(event) => {
                              setNPSFormData((prev) => ({
                                ...prev,
                                advance: {
                                  ...prev.advance,
                                  is_mandatory: event.target.checked,
                                },
                              }));
                            }}
                          />
                        }
                        label="Mark As Mandatory"
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            )}
            {switchType.primary === "star" && (
              <div className="w-full flex flex-col gap-3">
                <div>
                  {type === "template" && (
                    <>
                      <FormControl fullWidth>
                        <InputLabel>Metrics</InputLabel>
                        <Select
                          value={starFormData.metric}
                          onChange={(event) => {
                            setStarFormData((prev) => ({
                              ...prev,
                              metric: event.target.value,
                            }));
                          }}
                          label="Metrics"
                        >
                          <MenuItem value={"metric_1"}>Metric 1</MenuItem>
                          <MenuItem value={"metric_2"}>Metric 2</MenuItem>
                          <MenuItem value={"metric_3"}>Metric 3</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}
                </div>
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Question</h1>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    sx={{ margin: 0, padding: 0 }}
                    value={starFormData.question}
                    onChange={(event) => {
                      setStarFormData((prev) => ({
                        ...prev,
                        question: event.target.value,
                      }));
                    }}
                    multiline
                  />
                </div>
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Star levels</h1>
                  <FormControl fullWidth>
                    <Select
                      value={starFormData.max_count}
                      onChange={(event) => {
                        setStarFormData((prev) => ({
                          ...prev,
                          max_count: event.target.value,
                        }));
                      }}
                    >
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                    </Select>
                  </FormControl>
                  <div className="flex flex-col gap-3">
                    <h1>Representation</h1>
                    <div className="flex flex-row items-center gap-3">
                      {Array.from(
                        { length: starFormData.max_count },
                        (_, index) => ({})
                      ).map((_, index) => {
                        return (
                          <>
                            <LiaStarSolid className="text-yellow-300 text-2xl" />
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Advanced Options</h1>
                  <div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={starFormData.advance.enable_comment}
                            onChange={(event) => {
                              const isChecked = event.target.checked;
                              setStarFormData((prev) => ({
                                ...prev,
                                advance: {
                                  ...prev.advance,
                                  enable_comment: event.target.checked,
                                  score_is: isChecked ? "<" : null,
                                  equal_to: isChecked ? "6" : null,
                                  comment_mandatory: false,
                                },
                              }));
                            }}
                          />
                        }
                        label="Enable Comments"
                      />
                      {starFormData.advance.enable_comment === true && (
                        <div className="flex flex-row gap-3 text-nowrap">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={starFormData.advance.comment_mandatory}
                                onChange={(event) => {
                                  setStarFormData((prev) => ({
                                    ...prev,
                                    advance: {
                                      ...prev.advance,
                                      comment_mandatory: event.target.checked,
                                    },
                                  }));
                                }}
                              />
                            }
                            label="Make Comment Mandatory If The Score Is"
                          />
                          <FormControl fullWidth>
                            <Select
                              value={starFormData.advance.score_is}
                              onChange={(event) => {
                                setStarFormData((prev) => ({
                                  ...prev,
                                  advance: {
                                    ...prev.advance,
                                    score_is: event.target.value,
                                  },
                                }));
                              }}
                            >
                              <MenuItem value={"<"}>Less Then</MenuItem>
                              <MenuItem value={">"}>Greater Then</MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            fullWidth
                            required
                            variant="outlined"
                            sx={{ margin: 0, padding: 0 }}
                            value={starFormData.advance.equal_to}
                            onChange={(event) => {
                              const value = event.target.value;
                              if (value === "" || (value >= 1 && value <= 9)) {
                                setStarFormData((prev) => ({
                                  ...prev,
                                  advance: {
                                    ...prev.advance,
                                    equal_to: value === "" ? "" : Number(value),
                                  },
                                }));
                              }
                            }}
                            type="number"
                            slotProps={{
                              input: {
                                type: "number",
                                min: 1,
                                max: 9,
                              },
                            }}
                            multiline
                          />
                        </div>
                      )}

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={starFormData.advance.is_mandatory}
                            onChange={(event) => {
                              setStarFormData((prev) => ({
                                ...prev,
                                advance: {
                                  ...prev.advance,
                                  is_mandatory: event.target.checked,
                                },
                              }));
                            }}
                          />
                        }
                        label="Mark As Mandatory"
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            )}
            {switchType.primary === "ratingScale" && (
              <div className="w-full flex flex-col gap-3">
                <div>
                  {type === "template" && (
                    <>
                      <FormControl fullWidth>
                        <InputLabel>Metrics</InputLabel>
                        <Select
                          value={ratingScaleFormData.metric}
                          onChange={(event) => {
                            setRatingScaleFormData((prev) => ({
                              ...prev,
                              metric: event.target.value,
                            }));
                          }}
                          label="Metrics"
                        >
                          <MenuItem value={"metric_1"}>Metric 1</MenuItem>
                          <MenuItem value={"metric_2"}>Metric 2</MenuItem>
                          <MenuItem value={"metric_3"}>Metric 3</MenuItem>
                        </Select>
                      </FormControl>
                    </>
                  )}
                </div>
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Question</h1>
                  <TextField
                    fullWidth
                    required
                    variant="outlined"
                    sx={{ margin: 0, padding: 0 }}
                    value={ratingScaleFormData.question}
                    onChange={(event) => {
                      setRatingScaleFormData((prev) => ({
                        ...prev,
                        question: event.target.value,
                      }));
                    }}
                    multiline
                  />
                  <FormControl>
                    <FormLabel>Scale level</FormLabel>
                    <RadioGroup
                      className="flex gap-3"
                      sx={{ flexDirection: "row" }}
                      value={ratingScaleFormData.max_count}
                      onChange={(event) => {
                        setRatingScaleFormData((prev) => ({
                          ...prev,
                          max_count: event.target.value,
                        }));
                      }}
                    >
                      <FormControlLabel
                        value={3}
                        control={<Radio />}
                        label="3"
                      />
                      <FormControlLabel
                        value={5}
                        control={<Radio />}
                        label="5"
                      />
                      <FormControlLabel
                        value={7}
                        control={<Radio />}
                        label="7"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Scale View</InputLabel>
                    <Select
                      value={ratingScaleFormData.scale_type}
                      onChange={(event) => {
                        setRatingScaleFormData((prev) => ({
                          ...prev,
                          scale_type: event.target.value,
                        }));
                      }}
                      label="Scale View"
                    >
                      <MenuItem value={"agreement_scale"}>
                        Agreement Scale
                      </MenuItem>
                      <MenuItem value={"satisfaction_scale"}>
                        Satisfaction Scale
                      </MenuItem>
                      <MenuItem value={"frequency_scale"}>
                        Frequency Scale
                      </MenuItem>
                      <MenuItem value={"custom"}>Custom</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Scale View</FormLabel>
                    <RadioGroup
                      className="flex gap-3"
                      sx={{ flexDirection: "row" }}
                      value={ratingScaleFormData.scale_view}
                      onChange={(event) => {
                        setRatingScaleFormData((prev) => ({
                          ...prev,
                          scale_view: event.target.value,
                        }));
                      }}
                    >
                      <FormControlLabel
                        value={"card"}
                        control={<Radio />}
                        label="Card"
                      />
                      <FormControlLabel
                        value={"button"}
                        control={<Radio />}
                        label="Button"
                      />
                    </RadioGroup>
                  </FormControl>
                  {ratingScaleFormData.scale_type === "custom" && (
                    <div className="flex flex-col gap-3">
                      <FormControl>
                        <FormLabel>Representation Type</FormLabel>
                        <RadioGroup
                          className="flex gap-3"
                          sx={{ flexDirection: "row" }}
                          value={ratingScaleFormData.icon_type}
                          onChange={(event) => {
                            setRatingScaleFormData((prev) => ({
                              ...prev,
                              icon_type: event.target.value,
                            }));
                          }}
                        >
                          <FormControlLabel
                            value={"number"}
                            control={<Radio />}
                            label="Number"
                          />
                          <FormControlLabel
                            value={"emoji"}
                            control={<Radio />}
                            label="Emoji"
                          />
                        </RadioGroup>
                      </FormControl>
                      <div className="w-full flex flex-col gap-3">
                        <h1>Modify Rating Labels</h1>
                        <div className="w-full flex flex-col gap-3">
                          {Array.from(
                            { length: ratingScaleFormData.max_count },
                            (_, index) => (
                              <div
                                key={index}
                                className="w-full flex flex-row gap-3 items-center"
                              >
                                <div className="w-12 h-12 flex justify-center items-center p-3 border rounded-lg bg-neutral-800">
                                  {ratingScaleFormData.icon_type ===
                                  "number" ? (
                                    <h1>{index + 1}</h1>
                                  ) : (
                                    <span className="text-2xl">
                                      {ratingScaleSetting[
                                        ratingScaleFormData.scale_type
                                      ]?.[ratingScaleFormData.max_count]?.[
                                        index
                                      ]?.icon || "😐"}
                                    </span>
                                  )}
                                </div>
                                <TextField
                                  fullWidth
                                  sx={{ margin: 0, padding: 0 }}
                                  variant="outlined"
                                  value={
                                    ratingScaleFormData.customLabels?.[index]
                                      ?.label || ""
                                  }
                                  onChange={(event) => {
                                    const newLabels = [
                                      ...(ratingScaleFormData.customLabels ||
                                        []),
                                    ];
                                    newLabels[index] = {
                                      ...newLabels[index],
                                      label: event.target.value,
                                    };
                                    setRatingScaleFormData((prev) => ({
                                      ...prev,
                                      customLabels: newLabels,
                                    }));
                                  }}
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="w-full flex flex-col gap-3">
                    <h1>Representation</h1>
                    <div className="w-full grid grid-cols-4 gap-3">
                      {ratingScaleFormData.scale_type === "custom"
                        ? // Custom Representation
                          Array.from(
                            { length: ratingScaleFormData.max_count },
                            (_, index) => {
                              const customLabel =
                                ratingScaleFormData.customLabels?.[index]
                                  ?.label || `Label ${index + 1}`;
                              const icon =
                                ratingScaleFormData.icon_type === "number"
                                  ? index + 1
                                  : ratingScaleSetting.custom[
                                      ratingScaleFormData.max_count
                                    ]?.[index]?.icon || "😐";

                              return (
                                <div
                                  key={index}
                                  className={`flex ${
                                    ratingScaleFormData.scale_view === "card"
                                      ? "flex-col justify-between items-center rounded-lg border h-[8rem] w-[10rem]"
                                      : "flex-row gap-3 p-3 justify-center items-center border rounded-lg"
                                  } ${
                                    ratingScaleSetting.custom[
                                      ratingScaleFormData.max_count
                                    ]?.[index]?.border || "border-neutral-700"
                                  } ${
                                    ratingScaleSetting.custom[
                                      ratingScaleFormData.max_count
                                    ]?.[index]?.bg || "bg-neutral-800"
                                  } bg-opacity-5`}
                                >
                                  <span
                                    className={`${
                                      ratingScaleFormData.scale_view === "card"
                                        ? "h-full flex justify-center items-center text-3xl"
                                        : "text-2xl"
                                    }`}
                                  >
                                    {icon}
                                  </span>
                                  <h1
                                    className={`${
                                      ratingScaleFormData.scale_view === "card"
                                        ? "w-full flex justify-center items-center text-center p-2 h-full text-wrap rounded-b-lg bg-neutral-950"
                                        : "w-full truncate"
                                    }`}
                                  >
                                    {customLabel}
                                  </h1>
                                </div>
                              );
                            }
                          )
                        : // Default Representation (agreement_scale, satisfaction_scale, frequency_scale)
                          ratingScaleSetting[ratingScaleFormData.scale_type]?.[
                            ratingScaleFormData.max_count
                          ]?.map(({ icon, label, bg, border }, index) => (
                            <div
                              key={index}
                              className={`flex ${
                                ratingScaleFormData.scale_view === "card"
                                  ? "flex-col justify-between items-center rounded-lg border h-[8rem] w-[10rem]"
                                  : "flex-row gap-3 p-3 justify-center items-center border rounded-lg"
                              } ${border} ${bg} bg-opacity-5`}
                            >
                              <span
                                className={`${
                                  ratingScaleFormData.scale_view === "card"
                                    ? "h-full flex justify-center items-center text-3xl"
                                    : "text-2xl"
                                }`}
                              >
                                {icon}
                              </span>
                              <h1
                                className={`${
                                  ratingScaleFormData.scale_view === "card"
                                    ? "w-full flex justify-center items-center text-center p-2 h-full text-wrap rounded-b-lg bg-neutral-950"
                                    : "w-full truncate"
                                }`}
                              >
                                {label}
                              </h1>
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                  <h1>Advanced Options</h1>
                  <div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={ratingScaleFormData.advance.enable_comment}
                            onChange={(event) => {
                              const isChecked = event.target.checked;
                              setRatingScaleFormData((prev) => ({
                                ...prev,
                                advance: {
                                  ...prev.advance,
                                  enable_comment: event.target.checked,
                                  score_is: isChecked ? "<" : null,
                                  equal_to: isChecked ? "6" : null,
                                  comment_mandatory: false,
                                },
                              }));
                            }}
                          />
                        }
                        label="Enable Comments"
                      />
                      {ratingScaleFormData.advance.enable_comment === true && (
                        <div className="flex flex-row gap-3 text-nowrap">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={
                                  ratingScaleFormData.advance.comment_mandatory
                                }
                                onChange={(event) => {
                                  setRatingScaleFormData((prev) => ({
                                    ...prev,
                                    advance: {
                                      ...prev.advance,
                                      comment_mandatory: event.target.checked,
                                    },
                                  }));
                                }}
                              />
                            }
                            label="Make Comment Mandatory If The Score Is"
                          />
                          <FormControl fullWidth>
                            <Select
                              value={ratingScaleFormData.advance.score_is}
                              onChange={(event) => {
                                setRatingScaleFormData((prev) => ({
                                  ...prev,
                                  advance: {
                                    ...prev.advance,
                                    score_is: event.target.value,
                                  },
                                }));
                              }}
                            >
                              <MenuItem value={"<"}>Less Then</MenuItem>
                              <MenuItem value={">"}>Greater Then</MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            fullWidth
                            required
                            variant="outlined"
                            sx={{ margin: 0, padding: 0 }}
                            value={ratingScaleFormData.advance.equal_to}
                            onChange={(event) => {
                              const value = event.target.value;
                              if (value === "" || (value >= 1 && value <= 9)) {
                                setRatingScaleFormData((prev) => ({
                                  ...prev,
                                  advance: {
                                    ...prev.advance,
                                    equal_to: value === "" ? "" : Number(value),
                                  },
                                }));
                              }
                            }}
                            type="number"
                            slotProps={{
                              input: {
                                type: "number",
                                min: 1,
                                max: 9,
                              },
                            }}
                            multiline
                          />
                        </div>
                      )}

                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={ratingScaleFormData.advance.is_mandatory}
                            onChange={(event) => {
                              setRatingScaleFormData((prev) => ({
                                ...prev,
                                advance: {
                                  ...prev.advance,
                                  is_mandatory: event.target.checked,
                                },
                              }));
                            }}
                          />
                        }
                        label="Mark As Mandatory"
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            )}
            <Box
              sx={{ backgroundColor: "background.default" }}
              className="w-full min-h-14 flex items-center z-50 sticky bottom-0 left-0"
            >
              <div className="w-full flex flex-row justify-between items-center">
                <Button type="submit" variant="contained">
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    cleanUp();
                    onClose();
                  }}
                >
                  Cancle
                </Button>
              </div>
            </Box>
          </div>
        </form>
      </CustomEmptyModal>
    </div>
  );
}
