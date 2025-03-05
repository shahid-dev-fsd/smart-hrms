import React, { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Menu,
  MenuItem,
  InputAdornment,
  FormGroup,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import { LiaDotCircle as SingleIcon } from "react-icons/lia";
import { GoMultiSelect as MultipleIcon } from "react-icons/go";
import { PiChatTeardropTextLight as CommentIcon } from "react-icons/pi";
import { IoCalendarOutline as DateIcon } from "react-icons/io5";
import { BsSpeedometer2 as NPSIcon } from "react-icons/bs";
import { LiaStar as StarIcon } from "react-icons/lia";
import { PiScalesLight as RatingScaleIcon } from "react-icons/pi";

import CustomEmptyModal from "../../../../components/CustomEmptyModal";
import QuestionFormModal from "../../../../components/QuestionFormModal";
import { isLightColor } from "../../../../style/theme";
import Single from "./Types/Single";
import Multiple from "./Types/Multiple";
import NPS from "./Types/NPS";
import Star from "./Types/Star";
import RatingScale from "./Types/RatingScale";
import ThemePreview from "./ThemePreview";

const steps = ["Details", "Questions", "Theme"];

const ColorPicker = ({ label, colors, selectedColor, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <h3>{label}</h3>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {colors.map((color, index) => (
          <div className="w-fit h-fit relative" key={index}>
            <div
              key={color.id}
              className={`w-20 h-20 rounded-lg cursor-pointer ${
                selectedColor === color.color_code ? "opacity-50" : ""
              }`}
              style={{ backgroundColor: color.color_code }}
              onClick={() => onChange(color.color_code)}
            />
            {selectedColor === color.color_code && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <IoCheckmarkCircleOutline className="text-2xl text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const AddTemplate = ({ open, onClose }) => {
  const [editCoverImageModal, setEditCoverImageModal] = useState(false);
  const [addQuestionModal, setAddQuestionModal] = useState(false);
  const [addQuestionFromPoolModal, setAddQuestionFromPoolModal] =
    useState(false);
  const [createTheme, setCreateTheme] = useState(false);
  const [editQuestionModal, setEditQuestionModal] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [addQuestionAnchor, setAddQuestionAnchor] = useState(null);
  const [activeStep, setActiveStep] = React.useState(0);

  const coverImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREEy2SM4aXcnqW6Xz9Q2IWsUAubajgDAMCdw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREEy2SM4aXcnqW6Xz9Q2IWsUAubajgDAMCdw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREEy2SM4aXcnqW6Xz9Q2IWsUAubajgDAMCdw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREEy2SM4aXcnqW6Xz9Q2IWsUAubajgDAMCdw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREEy2SM4aXcnqW6Xz9Q2IWsUAubajgDAMCdw&s",
  ];

  const [defaultCoverImage, setDefaultCoverImage] = useState(
    "https://www.freevector.com/uploads/vector/preview/83035/vecteezybackground-line_and_wave-background_no_text-HS1022_generated.jpg"
  );

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const [questionsToAdd, setQuestionToAdd] = useState([]);
  const [editQuestion, setEditQuestion] = useState({});

  useEffect(() => {
    if (Object.keys(editQuestion).length > 0) {
      setEditQuestionModal(true);
    }
  }, [editQuestion]);

  const [templateFormData, setTemplateFormData] = useState({
    one: {
      name: "",
      description: "",
      coverImage: defaultCoverImage,
      layout: "",
    },
    two: {
      introduction: "",
      questions: [
        {
          type: "single",
          id: 1,
          question: "Question 1",
          options: [
            { id: 1, title: "Option 1" },
            { id: 2, title: "Option 2" },
            { id: 3, title: "Option 3" },
          ],
        },
        {
          type: "multiple",
          id: 2,
          question: "Question 2",
          options: [
            { id: 1, title: "Option 1" },
            { id: 2, title: "Option 2" },
            { id: 3, title: "Option 3" },
          ],
        },
        {
          type: "comment",
          id: 3,
          question: "Question 3",
        },
        {
          type: "date",
          id: 4,
          question: "Question 4",
        },
        {
          type: "nps",
          id: 5,
          question: "Question 5",
          minscore_text: "Not at all likely",
          maxscore_text: "Extremely likely",
        },
        {
          type: "star",
          id: 6,
          question: "Question 6",
          max_count: 5,
        },
        {
          type: "ratingScale",
          id: 7,
          question: "Question 7",
          max_count: 5,
          scale_type: "custom",
          scale_view: "card",
          icon_type: "emoji",
          customLabels: [
            { label: "Very Bad" },
            { label: "Bad" },
            { label: "Neutral" },
            { label: "Good" },
            { label: "Very Good" },
          ],
          advance: {
            enable_comment: false,
            comment_mandatory: false,
            score_is: null,
            equal_to: null,
            is_mandatory: false,
          },
        },
      ],
      feedback: "",
    },
    three: {
      theme: {
        id: 1,
        name: "Theme 1",
        layout: "0",
        intro: {
          font: "small",
          align: "left",
        },
        question: {
          font: "small",
        },
        color: {
          question: "#2E3440",
          answer: "#5E81AC",
          background: "#ECEFF4",
        },
        background: {
          pattern: "",
        },
      },
    },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const filteredQuestions = templateFormData?.two?.questions?.filter(
    (question) =>
      question.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const theme = {
    layouts: [
      {
        id: "0",
        image:
          "https://static.zohocdn.com/zp5/people5/images/enps/Layout01.4f25d37450f6de72335481215841b260.png",
      },
      {
        id: "1",
        image:
          "https://static.zohocdn.com/zp5/people5/images/enps/Layout02.896e5b8a3bf2ce0c215433a476abce20.png",
      },
      {
        id: "2",
        image:
          "https://static.zohocdn.com/zp5/people5/images/enps/Layout03.d9c26730d6fe316641c8ff16b7dd2796.png",
      },
      {
        id: "3",
        image:
          "https://static.zohocdn.com/zp5/people5/images/enps/Layout04.637915c320532b4f89ef075351c1051c.png",
      },
      {
        id: "4",
        image:
          "https://static.zohocdn.com/zp5/people5/images/enps/Layout05.5e2c69b867783c04072fcf91126dcbd1.png",
      },
      {
        id: "5",
        image:
          "https://static.zohocdn.com/zp5/people5/images/enps/Layout06.17f1a31054c9095ab891732e8dc4fbc4.png",
      },
      {
        id: "6",
        image:
          "https://static.zohocdn.com/zp5/people5/images/enps/Layout07.93863d366d93e1203debb850e970904b.png",
      },
      {
        id: "7",
        image:
          "https://static.zohocdn.com/zp5/people5/images/enps/Layout08.ad9b6742e2cd182c255d278c08630221.png",
      },
    ],
    intro: {
      fonts: [
        {
          title: "Small",
          value: "small",
        },
        {
          title: "Medium",
          value: "medium",
        },
        {
          title: "Large",
          value: "large",
        },
      ],
      align: [
        {
          title: "Start",
          value: "start",
        },
        {
          title: "Center",
          value: "center",
        },
      ],
    },
    questions: {
      fonts: [
        {
          title: "Small",
          value: "small",
        },
        {
          title: "Medium",
          value: "medium",
        },
        {
          title: "Large",
          value: "large",
        },
      ],
    },
    color: {
      question: [
        {
          id: "1",
          color_code: "#2E3440", // Dark Slate Gray
        },
        {
          id: "2",
          color_code: "#4C566A", // Gray Blue
        },
        {
          id: "3",
          color_code: "#D8DEE9", // Light Gray
        },
        {
          id: "4",
          color_code: "#88C0D0", // Arctic Blue
        },
        {
          id: "5",
          color_code: "#81A1C1", // Soft Blue
        },
      ],
      answer: [
        {
          id: "1",
          color_code: "#5E81AC", // Deep Blue
        },
        {
          id: "2",
          color_code: "#BF616A", // Soft Red
        },
        {
          id: "3",
          color_code: "#D08770", // Peach
        },
        {
          id: "4",
          color_code: "#EBCB8B", // Soft Yellow
        },
        {
          id: "5",
          color_code: "#A3BE8C", // Sage Green
        },
      ],
      background: [
        {
          id: "1",
          color_code: "#ECEFF4", // Light Gray
        },
        {
          id: "2",
          color_code: "#E5E9F0", // Off White
        },
        {
          id: "3",
          color_code: "#D8DEE9", // Light Blue Gray
        },
        {
          id: "4",
          color_code: "#B48EAD", // Soft Purple
        },
        {
          id: "5",
          color_code: "#8FBCBB", // Teal
        },
      ],
    },
    background: {
      patterns: [
        {
          id: "1",
          image:
            "https://static.zohocdn.com/zp5/people5/images/enps/Bunker.933ae02ba2147a98040e5003f06ae186.png",
        },
        {
          id: "2",
          image:
            "https://static.zohocdn.com/zp5/people5/images/enps/BlackRock.278df30260a8bf2fa0b3610d4b98b1c2.png",
        },
        {
          id: "3",
          image:
            "https://static.zohocdn.com/zp5/people5/images/enps/Holly.81df7277ac83a03793751541c11bd7fd.png",
        },
      ],
    },
  };

  const [themeFormData, setThemeFormData] = useState({
    name: "",
    layout: "",
    intro: {
      font: "",
      align: "",
    },
    question: {
      font: "",
    },
    color: {
      question: "",
      answer: "",
      background: "",
    },
    background: {
      pattern: "https://static.zohocdn.com/zp5/people5/images/enps/BlackRock.278df30260a8bf2fa0b3610d4b98b1c2.png",
    },
  });

  const cleanUpCreateTheme = () => {
    setThemeFormData({
      name: "",
      layout: "",
      intro: {
        font: "",
        align: "",
      },
      question: {
        font: "",
      },
      color: {
        question: "",
        answer: "",
        background: "",
      },
      background: {
        pattern: "",
      },
    });
  };

  const themes = {
    default: [
      {
        id: 1,
        name: "Soft Serenity",
        layout: "0",
        intro: {
          font: "small",
          align: "start",
        },
        question: {
          font: "small",
        },
        color: {
          question: "#4A5568", // Soft Gray
          answer: "#63B3ED", // Light Blue
          background: "#F7FAFC", // Very Light Gray
        },
        background: {
          pattern: "",
        },
      },
      {
        id: 2,
        name: "Pastel Harmony",
        layout: "0",
        intro: {
          font: "medium",
          align: "center",
        },
        question: {
          font: "medium",
        },
        color: {
          question: "#718096", // Muted Gray
          answer: "#68D391", // Soft Green
          background: "#EBF8FF", // Light Sky Blue
        },
        background: {
          pattern: "",
        },
      },
      {
        id: 3,
        name: "Minimalist Elegance",
        layout: "0",
        intro: {
          font: "large",
          align: "start",
        },
        question: {
          font: "large",
        },
        color: {
          question: "#2D3748", // Dark Gray
          answer: "#F6AD55", // Soft Orange
          background: "#FFF5F5", // Light Pink
        },
        background: {
          pattern: "",
        },
      },
      {
        id: 4,
        name: "Gentle Breeze",
        layout: "0",
        intro: {
          font: "small",
          align: "left",
        },
        question: {
          font: "small",
        },
        color: {
          question: "#4C566A", // Gray Blue
          answer: "#81E6D9", // Light Teal
          background: "#E6FFFA", // Very Light Teal
        },
        background: {
          pattern: "",
        },
      },
      {
        id: 5,
        name: "Subtle Dawn",
        layout: "0",
        intro: {
          font: "small",
          align: "left",
        },
        question: {
          font: "small",
        },
        color: {
          question: "#2C5282", // Dark Blue
          answer: "#F687B3", // Soft Pink
          background: "#FED7E2", // Light Pink
        },
        background: {
          pattern: "",
        },
      },
    ],
    custom: [],
  };

  const [isPreview, setIsPreview] = useState(false);

  const handleColorChange = (type, color) => {
    setThemeFormData((prev) => ({
      ...prev,
      color: {
        ...prev.color,
        [type]: color,
      },
    }));
  };

  useEffect(()=>{
    console.log(themeFormData)
  },[themeFormData])

  return (
    <div>
      <CustomEmptyModal open={open} onClose={onClose} isScrollable={true}>
        <div className="w-full flex flex-col gap-6 justify-center items-center">
          <Box
            sx={{ backgroundColor: "background.default" }}
            className="w-full min-h-14 flex items-center z-50 sticky top-0 left-0"
          >
            <h1 className="text-xl">Add Template</h1>
          </Box>
          <Stepper className="w-full" activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && (
            <div className="w-full flex flex-col gap-3 items-center">
              <div className="w-full border border-neutral-700 rounded-lg p-3">
                <div>
                  <h1>Details</h1>
                  <p>Give your template a name and a description</p>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    value={templateFormData.one.name}
                    onChange={(event) => {
                      setTemplateFormData((prev) => ({
                        ...prev,
                        one: {
                          ...prev.one,
                          name: event.target.value,
                        },
                      }));
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={2}
                    value={templateFormData.one.description}
                    onChange={(event) => {
                      setTemplateFormData((prev) => ({
                        ...prev,
                        one: {
                          ...prev.one,
                          description: event.target.value,
                        },
                      }));
                    }}
                  />
                </div>
                <div className="w-full flex flex-col gap-3 ">
                  <h1>Display Image</h1>
                  <div className="w-fit flex flex-row gap-16 justify-between items-center border border-neutral-700 rounded-lg p-3">
                    <div className="w-fit flex flex-row gap-3 text-nowrap items-center">
                      <div className="w-20 h-20 cursor-pointer">
                        <img
                          className="w-full h-full object-cover rounded-lg"
                          src={templateFormData?.one?.coverImage}
                          alt=""
                        />
                      </div>
                      <h1>Coral strokes</h1>
                    </div>
                    <IconButton
                      onClick={() => {
                        setEditCoverImageModal(true);
                      }}
                    >
                      <MdOutlineEdit />
                    </IconButton>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                <div>
                  <h1>Preferences</h1>
                  <p>Select the layout that suits your preferences</p>
                </div>
                <FormControl>
                  <FormLabel>Layout</FormLabel>
                  <RadioGroup
                    className="flex"
                    sx={{ flexDirection: "row" }}
                    value={templateFormData.one.layout}
                    onChange={(event) => {
                      setTemplateFormData((prev) => ({
                        ...prev,
                        one: {
                          ...prev.one,
                          layout: event.target.value,
                        },
                      }));
                    }}
                  >
                    <FormControlLabel
                      value="one_question"
                      control={<Radio />}
                      label="One question per page"
                    />
                    <FormControlLabel
                      value="all_question"
                      control={<Radio />}
                      label="All questions in one page"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div className="w-full flex flex-col gap-3">
              <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                <h1>Introduction</h1>
                <div className="w-full bg-white text-black p-4 rounded-lg shadow-sm">
                  <ReactQuill
                    theme="snow"
                    value={templateFormData.two.introduction}
                    onChange={(value) => {
                      setTemplateFormData((prev) => ({
                        ...prev,
                        two: {
                          ...prev.two,
                          introduction: value,
                        },
                      }));
                    }}
                    modules={modules}
                    formats={formats}
                    placeholder="Write your introduction here..."
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                <h1>Questions</h1>
                <div className="w-full flex flex-row gap-3 justify-between items-center text-nowrap">
                  {isSearch ? (
                    <>
                      <TextField
                        label="Search Question"
                        fullWidth
                        variant="outlined"
                        sx={{ margin: 0, padding: 0 }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => {
                                  setIsSearch(!isSearch);
                                }}
                              >
                                <RxCross2 />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex flex-row gap-3 justify-center items-center">
                        <h1>Total Questions : 0</h1>
                        <h1>|</h1>
                        <h1>Metrics Used : 0</h1>
                      </div>
                      <div className="flex flex-row gap-3">
                        <Button
                          variant="contained"
                          endIcon={<MdOutlineKeyboardArrowDown />}
                          onClick={(event) => {
                            setAddQuestionAnchor(event.currentTarget);
                          }}
                        >
                          Questions
                        </Button>
                        <IconButton
                          onClick={() => {
                            setIsSearch(!isSearch);
                          }}
                        >
                          <IoIosSearch />
                        </IconButton>
                        <Menu
                          anchorEl={addQuestionAnchor}
                          open={Boolean(addQuestionAnchor)}
                          onClose={(event) => {
                            setAddQuestionAnchor(null);
                          }}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              setAddQuestionModal(true);
                            }}
                          >
                            Add Question
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setAddQuestionFromPoolModal(true);
                            }}
                          >
                            Add From Question Pool
                          </MenuItem>
                        </Menu>
                      </div>
                    </>
                  )}
                </div>
                {filteredQuestions && filteredQuestions.length != 0 && (
                  <div className="w-full h-40 flex flex-col gap-3 items-center overflow-auto">
                    {filteredQuestions?.map((data, index) => {
                      return (
                        <div
                          key={index}
                          className="w-full flex flex-row gap-3 justify-between items-center border border-neutral-700 rounded-lg p-3"
                        >
                          <div className="flex flex-row gap-3 items-center">
                            {data.type === "single" && (
                              <SingleIcon className="text-3xl" />
                            )}
                            {data.type === "multiple" && (
                              <MultipleIcon className="text-3xl" />
                            )}
                            {data.type === "comment" && (
                              <CommentIcon className="text-3xl" />
                            )}
                            {data.type === "date" && (
                              <DateIcon className="text-3xl" />
                            )}
                            {data.type === "nps" && (
                              <NPSIcon className="text-3xl" />
                            )}
                            {data.type === "star" && (
                              <StarIcon className="text-3xl" />
                            )}
                            {data.type === "ratingScale" && (
                              <RatingScaleIcon className="text-3xl" />
                            )}
                            <h1>{data.question}</h1>
                          </div>
                          <div className="flex flex-row gap-1">
                            <IconButton
                              onClick={() => {
                                setEditQuestion(data);
                                setEditQuestionModal(true);
                              }}
                            >
                              <MdOutlineEdit />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                const updatedQuestions =
                                  templateFormData?.two?.questions?.filter(
                                    (question) => question.id !== data.id
                                  );
                                setTemplateFormData((prev) => ({
                                  ...prev,
                                  two: {
                                    ...prev.two,
                                    questions: updatedQuestions,
                                  },
                                }));
                              }}
                            >
                              <MdDeleteOutline />
                            </IconButton>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {filteredQuestions.length === 0 && (
                  <>
                    <div className="min-h-40 flex flex-col gap-1 justify-center items-center">
                      <h1>No questions are added</h1>
                      <h1>Start building your template by adding questions</h1>
                    </div>
                  </>
                )}
              </div>
              <div className="w-full flex flex-col gap-3 border border-neutral-700 rounded-lg p-3">
                <h1>Post Feedback Message</h1>
                <div className="w-full bg-white text-black p-4 rounded-lg shadow-sm">
                  <ReactQuill
                    theme="snow"
                    value={templateFormData.two.feedback}
                    onChange={(value) => {
                      setTemplateFormData((prev) => ({
                        ...prev,
                        two: {
                          ...prev.two,
                          feedback: value,
                        },
                      }));
                    }}
                    modules={modules}
                    formats={formats}
                    placeholder="Write your Feedback here..."
                  />
                </div>
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div className="w-full flex flex-row gap-3 justify-between items-center">
              <div className="min-w-[30%] max-h-[35rem] min-h-[35rem] flex flex-col gap-10 h-full border border-neutral-700 rounded-lg p-3 overflow-auto">
                <div>
                  {!createTheme && (
                    <>
                      <Button
                        onClick={() => {
                          setThemeFormData({
                            name: themes.default[0].name,
                            layout: themes.default[0].layout,
                            intro: {
                              font: themes.default[0].intro.font,
                              align: themes.default[0].intro.align,
                            },
                            question: {
                              font: themes.default[0].question.font,
                            },
                            color: {
                              question: themes.default[0].color.question,
                              answer: themes.default[0].color.answer,
                              background: themes.default[0].color.background,
                            },
                            background: {
                              pattern: themes.default[0].background.pattern,
                            },
                          });
                          setCreateTheme(true);
                        }}
                        variant="outlined"
                        className="w-full"
                      >
                        Create Theme
                      </Button>
                    </>
                  )}
                  {createTheme && (
                    <div className="flex flex-col gap-3">
                      <div className="w-full flex flex-row justify-between items-center">
                        <IconButton
                          onClick={() => {
                            cleanUpCreateTheme();
                            setCreateTheme(false);
                          }}
                        >
                          <IoArrowBackCircleOutline />
                        </IconButton>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setTemplateFormData((prev) => ({
                              ...prev,
                              three: {
                                ...prev.three,
                                theme: themeFormData,
                              },
                            }));
                            setCreateTheme(false);
                          }}
                        >
                          Save Theme
                        </Button>
                      </div>
                      <div className="flex flex-col gap-6">
                        <TextField
                          fullWidth
                          label="Theme Name"
                          variant="outlined"
                          margin="normal"
                          value={themeFormData?.name}
                          onChange={(event) => {
                            setThemeFormData((prev) => ({
                              ...prev,
                              name: event.target.value,
                            }));
                          }}
                        />
                        <div className="flex flex-col gap-3">
                          <h1>Layout</h1>
                          <div className="w-full grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                            {theme.layouts.map((layout) => {
                              return (
                                <div
                                  className="w-20 h-20 object-contain cursor-pointer relative"
                                  onClick={() => {
                                    setThemeFormData((prev) => ({
                                      ...prev,
                                      layout: layout.id,
                                    }));
                                  }}
                                >
                                  <img
                                    src={layout.image}
                                    alt=""
                                    className={`w-full h-full object-contain ${
                                      layout.id === themeFormData?.layout &&
                                      "opacity-50"
                                    }`}
                                  />
                                  {layout.id === themeFormData?.layout && (
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                      <IoCheckmarkCircleOutline className="text-2xl" />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <h1>Introduction and thank you section</h1>
                          <div className="flex flex-row gap-3">
                            <div className="flex flex-row gap-3">
                              {theme?.intro?.fonts.map((font) => {
                                return (
                                  <div>
                                    <Button
                                      variant={
                                        themeFormData.intro.font === font.value
                                          ? "contained"
                                          : "outlined"
                                      }
                                      onClick={() => {
                                        setThemeFormData((prev) => ({
                                          ...prev,
                                          intro: {
                                            ...prev.intro,
                                            font: font.value,
                                          },
                                        }));
                                      }}
                                    >
                                      {font.title}
                                    </Button>
                                  </div>
                                );
                              })}
                            </div>
                            <Divider orientation="vertical" flexItem />
                            <div className="flex flex-row gap-3">
                              {theme?.intro?.align.map((align) => {
                                return (
                                  <div>
                                    <Button
                                      variant={
                                        themeFormData.intro.align ===
                                        align.value
                                          ? "contained"
                                          : "outlined"
                                      }
                                      onClick={() => {
                                        setThemeFormData((prev) => ({
                                          ...prev,
                                          intro: {
                                            ...prev.intro,
                                            align: align.value,
                                          },
                                        }));
                                      }}
                                    >
                                      {align.title}
                                    </Button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <h1>Question and answer section</h1>
                          <div className="flex flex-row gap-3">
                            <div className="flex flex-row gap-3">
                              {theme?.questions?.fonts.map((font) => {
                                return (
                                  <div>
                                    <Button
                                      variant={
                                        themeFormData.question.font ===
                                        font.value
                                          ? "contained"
                                          : "outlined"
                                      }
                                      onClick={() => {
                                        setThemeFormData((prev) => ({
                                          ...prev,
                                          question: {
                                            ...prev.question,
                                            font: font.value,
                                          },
                                        }));
                                      }}
                                    >
                                      {font.title}
                                    </Button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <h1>Color</h1>
                          <ColorPicker
                            label="Question"
                            colors={theme.color.question}
                            selectedColor={themeFormData.color.question}
                            onChange={(color) =>
                              handleColorChange("question", color)
                            }
                          />
                          <ColorPicker
                            label="Answer"
                            colors={theme.color.question}
                            selectedColor={themeFormData.color.answer}
                            onChange={(color) =>
                              handleColorChange("answer", color)
                            }
                          />
                          <ColorPicker
                            label="Background"
                            colors={theme.color.question}
                            selectedColor={themeFormData.color.background}
                            onChange={(color) =>
                              handleColorChange("background", color)
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <h1>Background</h1>
                          <div className="flex flex-col gap-3">
                            <h1>None</h1>
                            <div
                              className="w-20 h-20 cursor-pointer relative border border-neutral-700 rounded-lg"
                              onClick={() => {
                                setThemeFormData((prev) => ({
                                  ...prev,
                                  
                                  background: {
                                    ...prev.background,
                                    pattern: "",
                                  },
                                }));
                              }}
                            >
                              {themeFormData.background.pattern === "" && (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                  <IoCheckmarkCircleOutline className="text-2xl text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col gap-3">
                            <h1>Patterns</h1>
                            <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                              {theme.background.patterns.map((pattern) => {
                                return (
                                  <div
                                    className="w-20 h-20 cursor-pointer relative"
                                    onClick={() => {
                                      setThemeFormData((prev) => ({
                                        ...prev,
                                        background: {
                                          ...prev.background,
                                          pattern: pattern.image,
                                        },
                                      }));
                                    }}
                                  >
                                    <img
                                      className={`w-full h-full object-cover rounded-lg ${
                                        pattern.id ===
                                          themeFormData.background.pattern &&
                                        "opacity-50"
                                      } `}
                                      src={pattern.image}
                                      alt=""
                                    />
                                    {pattern.image ===
                                      themeFormData.background.pattern && (
                                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <IoCheckmarkCircleOutline className="text-2xl text-white" />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {!createTheme && (
                  <>
                    <div className="flex flex-col gap-1">
                      <h1>Default Theme</h1>
                      <div className="w-full grid gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center self-center place-content-center place-items-center place-self-center">
                        {themes.default.map((theme, index) => {
                          return (
                            <div
                              key={index}
                              className="w-full flex flex-col gap-1 justify-center items-center"
                            >
                              <div
                                className={`w-full border border-neutral-700 rounded-lg cursor-pointer relative`}
                                onClick={() => {
                                  setTemplateFormData((prev) => ({
                                    ...prev,
                                    three: {
                                      ...prev.three,
                                      theme: theme,
                                    },
                                  }));
                                }}
                              >
                                {templateFormData?.three?.theme?.layout !==
                                  "0" && theme.hasOwnProperty("background") ? (
                                  <>
                                    <img
                                      className={`w-full min-h-24 max-h-24 object-cover rounded-lg ${
                                        theme.id ===
                                          templateFormData?.three?.theme?.id &&
                                        "opacity-50"
                                      }`}
                                      src={
                                        theme.background?.image ||
                                        theme.background?.pattern
                                      }
                                      alt=""
                                    />
                                  </>
                                ) : (
                                  <>
                                    <div
                                      className={`w-full min-h-24 max-h-24 rounded-lg ${
                                        theme.id ===
                                          templateFormData?.three?.theme?.id &&
                                        "opacity-50"
                                      }`}
                                      style={{
                                        backgroundColor:
                                          templateFormData?.three?.theme
                                            ?.layout === "0" &&
                                          theme.color.background,
                                      }}
                                    />
                                  </>
                                )}
                                {theme.id ===
                                  templateFormData?.three?.theme?.id && (
                                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <IoCheckmarkCircleOutline className="text-2xl" />
                                  </div>
                                )}
                              </div>
                              <h1>{theme.name}</h1>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1>Custom Theme</h1>
                      <div className="w-full grid gap-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center self-center place-content-center place-items-center place-self-center">
                        {themes.default.map((theme, index) => {
                          return (
                            <div
                              key={index}
                              className="w-full flex flex-col gap-1 justify-center items-center"
                            >
                              <div
                                className={`w-full border border-neutral-700 rounded-lg cursor-pointer relative`}
                                onClick={() => {
                                  setTemplateFormData((prev) => ({
                                    ...prev,
                                    three: {
                                      ...prev.three,
                                      theme: theme,
                                    },
                                  }));
                                }}
                              >
                                {templateFormData?.three?.theme?.layout !==
                                  "0" && theme.hasOwnProperty("background") ? (
                                  <>
                                    <img
                                      className={`w-full min-h-24 max-h-24 object-cover rounded-lg ${
                                        theme.id ===
                                          templateFormData?.three?.theme?.id &&
                                        "opacity-50"
                                      }`}
                                      src={
                                        theme.background?.image ||
                                        theme.background?.pattern
                                      }
                                      alt=""
                                    />
                                  </>
                                ) : (
                                  <>
                                    <div
                                      className={`w-full min-h-24 max-h-24 rounded-lg ${
                                        theme.id ===
                                          templateFormData?.three?.theme?.id &&
                                        "opacity-50"
                                      }`}
                                      style={{
                                        backgroundColor:
                                          templateFormData?.three?.theme
                                            ?.layout === "0" &&
                                          theme.color.background,
                                      }}
                                    />
                                  </>
                                )}
                                {theme.id ===
                                  templateFormData?.three?.theme?.id && (
                                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <IoCheckmarkCircleOutline className="text-2xl" />
                                  </div>
                                )}
                              </div>
                              <h1>{theme.name}</h1>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
              {!createTheme && (
                <ThemePreview
                  type={"view"}
                  isPreview={isPreview}
                  setIsPreview={setIsPreview}
                  themeFormData={themeFormData}
                  templateFormData={templateFormData}
                />
              )}
              {createTheme && (
                <ThemePreview
                  type={"create"}
                  isPreview={isPreview}
                  setIsPreview={setIsPreview}
                  themeFormData={themeFormData}
                  templateFormData={templateFormData}
                />
              )}
            </div>
          )}
          <Box
            sx={{ backgroundColor: "background.default" }}
            className="w-full min-h-14 flex items-center z-50 sticky bottom-0 left-0"
          >
            <div className="w-full flex flex-row gap-3 justify-end items-center">
              {activeStep !== 0 && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setActiveStep((prevActiveStep) => prevActiveStep - 1);
                  }}
                >
                  Previous
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    // setActiveStep(0);
                    console.log(templateFormData);
                  }}
                >
                  Reset
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                  }}
                >
                  Next
                </Button>
              )}
            </div>
          </Box>
        </div>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={editCoverImageModal}
        onClose={() => {
          setEditCoverImageModal(false);
        }}
        isSmall={true}
      >
        <div className="w-full flex flex-col gap-6 justify-center items-center py-3">
          <div className="w-full">
            <h1 className="text-xl">Select Cover Image</h1>
          </div>
          <div className="w-full grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {coverImages && coverImages.length != 0 && (
              <>
                {coverImages.map((url, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full h-20 cursor-pointer relative"
                      onClick={() => {
                        setTemplateFormData((prev) => ({
                          ...prev,
                          one: {
                            ...prev.one,
                            coverImage: url,
                          },
                        }));
                      }}
                    >
                      {url === templateFormData?.one?.coverImage && (
                        <div className="absolute top-[38%] left-[45%]">
                          <IoCheckmarkCircleOutline className="text-2xl" />
                        </div>
                      )}
                      <img
                        className={`w-full h-full object-cover rounded-lg ${
                          url === templateFormData?.one?.coverImage
                            ? "opacity-50"
                            : "opacity-100"
                        }`}
                        src={url}
                        alt=""
                      />
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div className="w-full flex flex-row justify-center items-center">
            <Button
              variant="outlined"
              onClick={() => {
                setEditCoverImageModal(false);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </CustomEmptyModal>

      <CustomEmptyModal
        open={addQuestionFromPoolModal}
        onClose={() => {
          setAddQuestionFromPoolModal(false);
        }}
        isScrollable={true}
      >
        <div className="w-full flex flex-col gap-6 justify-center items-center">
          <div className="w-full">
            <h1 className="text-xl">Question Pool</h1>
          </div>
          <div className="w-full flex flex-col gap-3">
            {questionsToAdd && questionsToAdd.length != 0 && (
              <>
                <div className="w-full flex flex-row justify-between items-center border border-neutral-700 rounded-lg p-3">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setQuestionToAdd([]);
                      const allQuestions = [
                        ...questionsToAdd,
                        ...templateFormData?.two?.questions,
                      ];
                      const uniqueQuestions = allQuestions?.filter(
                        (question, index, self) =>
                          index === self.findIndex((q) => q.id === question.id)
                      );
                      setTemplateFormData((prev) => ({
                        ...prev,
                        two: {
                          ...prev.two,
                          questions: uniqueQuestions,
                        },
                      }));
                      setAddQuestionFromPoolModal(false);
                    }}
                  >
                    Add Questions
                  </Button>
                  <IconButton
                    onClick={() => {
                      setQuestionToAdd([]);
                    }}
                  >
                    <RxCross2 />
                  </IconButton>
                </div>
              </>
            )}
            <div className="w-full flex flex-col gap-3">
              {templateFormData?.two?.questions?.map((data, index) => (
                <Accordion key={index}>
                  <AccordionSummary>
                    <div className="w-full h-[6rem] flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center">
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(event) => {
                                  const isChecked = event.target.checked;
                                  if (isChecked) {
                                    setQuestionToAdd((prev) => [...prev, data]);
                                  } else {
                                    const updatedQuestions =
                                      questionsToAdd.filter(
                                        (question) => question.id !== data.id
                                      );
                                    setQuestionToAdd(updatedQuestions);
                                  }
                                }}
                              />
                            }
                          />
                        </FormGroup>
                        <div className="flex flex-row gap-3 items-center">
                          {data.type === "single" && (
                            <SingleIcon className="text-3xl" />
                          )}
                          {data.type === "multiple" && (
                            <MultipleIcon className="text-3xl" />
                          )}
                          {data.type === "comment" && (
                            <CommentIcon className="text-3xl" />
                          )}
                          {data.type === "date" && (
                            <DateIcon className="text-3xl" />
                          )}
                          {data.type === "nps" && (
                            <NPSIcon className="text-3xl" />
                          )}
                          {data.type === "star" && (
                            <StarIcon className="text-3xl" />
                          )}
                          {data.type === "ratingScale" && (
                            <RatingScaleIcon className="text-3xl" />
                          )}
                          <h1>{data.question}</h1>
                        </div>
                      </div>
                      <div className="flex flex-row gap-1">
                        <IconButton
                          onClick={() => {
                            setEditQuestion(data);
                            setEditQuestionModal(true);
                          }}
                        >
                          <MdOutlineEdit />
                        </IconButton>
                        <IconButton>
                          <MdDeleteOutline />
                        </IconButton>
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    {data.type === "single" && (
                      <>
                        <Single question={data} />
                      </>
                    )}
                    {data.type === "multiple" && (
                      <>
                        <Multiple question={data} />
                      </>
                    )}
                    {data.type === "nps" && (
                      <>
                        <NPS question={data} />
                      </>
                    )}
                    {data.type === "star" && (
                      <>
                        <Star question={data} />
                      </>
                    )}
                    {data.type === "ratingScale" && (
                      <>
                        <RatingScale question={data} />
                      </>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </CustomEmptyModal>

      <QuestionFormModal
        title={"Add Question"}
        open={addQuestionModal}
        onClose={() => {
          setAddQuestionModal(false);
        }}
        onSubmit={(data) => {
          data.id = 10;
          setTemplateFormData((prev) => ({
            ...prev,
            two: {
              ...prev.two,
              questions: [...prev.two.questions, data],
            },
          }));
          setAddQuestionModal(false);
        }}
      />
      {Object.keys(editQuestion).length > 0 && (
        <QuestionFormModal
          title={"Edit Question"}
          isEdit={true}
          open={editQuestionModal}
          onClose={() => {
            setEditQuestion({});
            setEditQuestionModal(false);
          }}
          onSubmit={(data) => {
            const updatedQuestions = templateFormData?.two?.questions?.map(
              (question) => (question.id === data.id ? data : question)
            );
            setTemplateFormData((prev) => ({
              ...prev,
              two: {
                ...prev.two,
                questions: [...prev.two.questions, ...(updatedQuestions || [])],
              },
            }));
            setEditQuestion({});
            setEditQuestionModal(false);
          }}
          editFormData={editQuestion}
          setEditFormData={setEditQuestion}
        />
      )}
    </div>
  );
};

export default AddTemplate;
