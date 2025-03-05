import {
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";

import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import PersonIcon from "@mui/icons-material/Person";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import ReplyIcon from "@mui/icons-material/Reply";
import { useTheme } from '../../../style/theme';

const Knowledgeview = () => {
  const [messageTab, setMessageTab] = useState(false);
  const [messageTab1, setMessageTab1] = useState(false);
  const { toggleTheme, mode } = useTheme();
  console.log(mode);

  const showMessageTab = () => {
    setMessageTab(!messageTab);
  };
  const showMessageTab1 = () => {
    setMessageTab1(!messageTab1);
  };
  return (
    <Box
      sx={{ backgroundColor: "background.main" }}
      className="h-full md:h-[87vh] overflow-y-scroll overflow-hidden  rounded-[12px]  "
    >
      <div className="flex  justify-between  mt-4 px-4 md:px-14">
        <h2 className="text-[22px] text-gray-400 whitespace-nowrap">
          Knowledge View
        </h2>
        <div>
          <Button sx={{ marginRight: "5px" }} variant="contained">
            Submit Request
          </Button>
          <Tooltip title="info" placement="top">
            <IconButton disableRipple variant="navIcon" sx={{ mr: 0 }}>
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Box
        sx={{ backgroundColor: "background.view" }}
        className="mt-4  overflow-y-scroll overflow-hidden rounded-[15px] mx-8  py-4 "
      >
        <div className=" md:flex          md:justify-between         md:items-center">
          <h1 className="pl-5 border-l-4 py-2 border-l-orange-400 text-[27px]">
            How To Upgrade Plan{" "}
          </h1>
          <div className="flex w-[50%] md:w-[14%] ml-5 border border-gray-400 p-2 pl-5 rounded-[12px] mr-7">
            <div className="border-r-2 w-full px-2">
              <ThumbUpIcon sx={{ color: "green" }} /> 20
            </div>
            <div className="px-2 w-full">
              <ThumbDownIcon sx={{ color: "red" }} /> 0
            </div>
          </div>
        </div>
        <Box>
          {" "}
          <p>
            <ul className="md:flex gap-1 items-center pl-5 py-2">
              <li className="text-sm">
                <AvTimerIcon
                  sx={{ fontSize: "18px", color: "gray", marginRight: "3px" }}
                />
                Last Updated <span className="text-gray-400">1 week ago</span>
              </li>
              <li className="text-sm">
                <PersonIcon
                  sx={{ fontSize: "18px", color: "gray", marginRight: "3px" }}
                />
                Posted By <span className="text-blue-900">Admin</span>
              </li>
              <li className="text-sm">
                <RemoveRedEyeIcon
                  sx={{ fontSize: "18px", color: "gray", marginRight: "3px" }}
                />
                238
              </li>
            </ul>
          </p>
        </Box>
        <Box sx={{ marginX: "27px", marginBottom: "30px" }}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            deserunt soluta sunt dolores delectus vitae autem vero, quisquam
            obcaecati consequatur excepturi voluptas eum error mollitia qui
            esse, eos quasi voluptate? Ullam ipsum commodi culpa expedita,
            consectetur ea nihil voluptates. In eos facere, ipsam labore amet
            excepturi odio aperiam, harum ipsum impedit quidem id illum quo.
            Voluptatum, quo. Nobis, exercitationem aliquam? Assumenda nobis
            accusantium quae consectetur earum, suscipit enim officiis
            consequatur excepturi. Cumque quos at fugit, quaerat amet possimus,
            nobis aliquid totam adipisci, architecto autem sed illo doloremque
          </p>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            deserunt soluta sunt dolores delectus vitae autem vero, quisquam
            obcaecati consequatur excepturi voluptas eum error mollitia qui
            esse, eos quasi voluptate? Ullam ipsum commodi culpa expedita,
            consectetur ea nihil voluptates. In eos facere, ipsam labore amet
            excepturi odio aperiam, harum ipsum impedit quidem id illum quo.
            Voluptatum, quo. Nobis, exercitationem aliquam? Assumenda nobis
            accusantium quae consectetur earum, suscipit enim officiis
            consequatur excepturi. Cumque quos at fugit, quaerat amet possimus,
            nobis aliquid totam adipisci, architecto autem sed illo doloremque
          </p>
        </Box>
        <Box
          sx={{ marginX: "27px", position: "relative", marginBottom: "50px" }}
        >
          <InputLabel sx={{ fontSize: "20px", color: "#fff" }}>
            Files
          </InputLabel>
          <TextField
            fullWidth
            type="file"
            inputProps={{
              sx: { fontSize: "15px", opacity: "-1.3", padding: "25px" },
            }}
            placeholder="Enter Title"
          />
          <div className="absolute top-[46px] md:text-[20px] left-[3px] md:left-11">
            <UploadFileIcon sx={{ color: "red", fontSize: "30px" }} />{" "}
            document.pdf (30kb)
          </div>
          <div className="absolute top-[46px] md:text-[20px] right-[3px] md:right-11">
            <span className={`${mode === "dark" ? "bg-[#202021]" : ""} p-1 rounded mr-2`}>
              {" "}
              <DownloadIcon sx={{ color: "blue", fontSize: "30px" }} />{" "}
            </span>
            <span className={`${mode === "dark" ? "bg-[#202021]" : ""} p-1 rounded `}>

              {" "}
              <DeleteIcon sx={{ fontSize: "30px", color: "red" }} />{" "}
            </span>
          </div>
        </Box>
        <Box sx={{ marginX: "27px" }}>
          <hr></hr>
          <div className="mt-5 flex justify-between">
            <div>
              Was This Helpful? <ThumbUpIcon sx={{ color: "green" }} />{" "}
              <ThumbDownIcon sx={{ color: "red" }} />
            </div>
            <div>Views:50</div>
          </div>
        </Box>
        <Box
          sx={{
            marginX: "27px",
            border: "1px solid gray",
            borderRadius: "15px",
            marginY: "30px",
            padding: "20px",
          }}
        >
          <div className=" md:flex gap-2">
            <div className="md:w-[5%]">
              <img
                className="h-[50px] w-[50px] rounded-[50%]"
                src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                alt=""
              />
            </div>
            <div className="" style={{}}>
              <h2 className="text-lg">Mobile App Developement</h2>
              <p>
                <span className="text-xs text-gray-400 mr-2">
                  <CalendarTodayIcon sx={{ fontSize: "12px" }} /> Mar 11, 2024
                </span>
                <span className="text-xs text-gray-400 mr-2">
                  <AvTimerIcon sx={{ fontSize: "14px" }} /> 10:00AM
                </span>
              </p>
              <p className="mt-5 text-xs md:w-[75%]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Asperiores eos qui eius molestiae architecto, ullam autem
                laborum labore earum id iure ad impedit voluptate deserunt
                facilis quidem.
              </p>
              <div  className={`mt-5`}>
                <Button
                  onClick={showMessageTab}
                  sx={{
                    backgroundColor: mode === "dark" ? "#202021" : "#e2e0e0",
                    color: "gray",
                    fontSize: "12px",
                    marginRight: "25px",
                    borderRadius: "8px",
                    padding: "7px 10px",
                    border:'1px',
                  }}
                >
                  <MapsUgcIcon sx={{ marginRight: "4px" }} /> Comment
                </Button>
                <Button
                  sx={{
                    backgroundColor: mode === "dark" ? "#202021" : "#e2e0e0",
                    color: "gray",
                    fontSize: "12px",
                    marginRight: "25px",
                    borderRadius: "8px",
                    padding: "7px 10px",
                    border:'1px',
                  }}
                >
                  <ReplyIcon sx={{ marginRight: "4px" }} /> Reply
                </Button>
              </div>
              {messageTab && (
                <div className={`  ${mode === "dark" ? "bg-[#202021]" : "e2e0e0"}, p-5  mt-[30px] rounded-[15px] md:w-[87%] rounded-lg border border-zinc-500`}>
                  {" "}
                  <div className="md:flex gap-2">
                    <div className="md:w-[8%]">
                      <img
                        className="h-[50px] w-[50px] rounded-[50%]"
                        src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                        alt=""
                      />
                    </div>
                    <div className="">
                      <h2 className="text-base">Mobile App Developement</h2>
                      <p>
                        <span className="text-[12px] text-gray-400 mr-2">
                          <CalendarTodayIcon sx={{ fontSize: "12px" }} /> Mar
                          11, 2024
                        </span>
                        <span className="text-[12px] text-gray-400 ">
                          <AvTimerIcon sx={{ fontSize: "12px" }} /> 10:00AM
                        </span>
                      </p>
                      <p className="mt-5 text-xs ">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Asperiores eos qui eius molestiae architecto,
                        ullam autem laborum labore earum id iure ad impedit
                        voluptate deserunt facilis quidem.
                      </p>
                      <div className="mt-5">
                        <Button
                          sx={{
                            backgroundColor: mode === "dark" ? "#202021" : "#e2e0e0",
                            color: "gray",
                            fontSize: "10px",
                            marginRight: "25px",
                            borderRadius: "8px",
                            padding: "5px 8px",
                          }}
                        >
                          <MapsUgcIcon sx={{ marginRight: "4px" }} /> Comment
                        </Button>
                        <Button
                          sx={{
                            padding: "5px 8px",

                            backgroundColor: mode === "dark" ? "#202021" : "#e2e0e0",
                            color: "gray",
                            fontSize: "10px",
                            borderRadius: "8px",
                          }}
                        >
                          <ReplyIcon sx={{ marginRight: "4px" }} /> Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Box>
        <Box
          sx={{
            marginX: "27px",
            border: "1px solid gray",
            borderRadius: "15px",
            marginY: "30px",
            padding: "20px",
          }}
        >
          <div className=" md:flex gap-2">
            <div className="md:w-[5%]">
              <img
                className="h-[50px] w-[50px] rounded-[50%]"
                src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                alt=""
              />
            </div>
            <div className="">
              <h2 className="text-lg">Mobile App Developement</h2>
              <p>
                <span className="text-xs text-gray-400 mr-2">
                  <CalendarTodayIcon sx={{ fontSize: "12px" }} /> Mar 11, 2024
                </span>
                <span className="text-xs text-gray-400 mr-2">
                  <AvTimerIcon sx={{ fontSize: "14px" }} /> 10:00AM
                </span>
              </p>
              <p className="mt-5 text-xs md:w-[75%]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Asperiores eos qui eius molestiae architecto, ullam autem
                laborum labore earum id iure ad impedit voluptate deserunt
                facilis quidem.
              </p>
              <div className="mt-5">
                <Button
                  onClick={showMessageTab1}
                  sx={{
                    backgroundColor: mode === "dark" ? "#202021" : "#e2e0e0",
                    color: "gray",
                    fontSize: "12px",
                    marginRight: "25px",
                    borderRadius: "8px",
                    padding: "7px 10px",
                  }}
                >
                  <MapsUgcIcon sx={{ marginRight: "4px" }} /> Comment
                </Button>
                <Button
                  sx={{
                    padding: "7px 10px ",

                    backgroundColor: mode === "dark" ? "#202021" : "#e2e0e0",
                    color: "gray",
                    fontSize: "12px",
                    borderRadius: "8px",
                  }}
                >
                  <ReplyIcon sx={{ marginRight: "4px" }} /> Reply
                </Button>
              </div>
              {messageTab1 && (
                <div className={`  ${mode === "dark" ? "bg-[#202021]" : "e2e0e0"}, p-5  mt-[30px] rounded-[15px] md:w-[87%] rounded-lg border border-zinc-500`}
                >
                  {" "}
                  <div className="md:flex gap-2">
                    <div className="md:w-[8%]">
                      <img
                        className="h-[50px] w-[50px] rounded-[50%]"
                        src="https://images.unsplash.com/photo-1716724854567-9ec995836d19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                        alt=""
                      />
                    </div>
                    <div className="">
                      <h2 className="text-base">Mobile App Developement</h2>
                      <p>
                        <span className="text-[12px] text-gray-400 mr-2">
                          <CalendarTodayIcon sx={{ fontSize: "12px" }} /> Mar
                          11, 2024
                        </span>
                        <span className="text-[12px] text-gray-400 ">
                          <AvTimerIcon sx={{ fontSize: "12px" }} /> 10:00AM
                        </span>
                      </p>
                      <p className="mt-5 text-xs ">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Asperiores eos qui eius molestiae architecto,
                        ullam autem laborum labore earum id iure ad impedit
                        voluptate deserunt facilis quidem.
                      </p>
                      <div className="mt-5">
                        <Button
                          sx={{
                            backgroundColor: mode === "dark" ? "#202021" : "#e2e0e0",
                            color: "gray",
                            fontSize: "10px",
                            marginRight: "25px",
                            borderRadius: "8px",
                            padding: "5px 8px",
                          }}
                        >
                          <MapsUgcIcon sx={{ marginRight: "4px" }} /> Comment
                        </Button>
                        <Button
                          sx={{
                            padding: "5px 8px",

                            backgroundColor: mode === "dark" ? "#202021" : "#e2e0e0",
                            color: "gray",
                            fontSize: "10px",
                            borderRadius: "8px",
                          }}
                        >
                          <ReplyIcon sx={{ marginRight: "4px" }} /> Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Box>
      <Box
        sx={{ backgroundColor: "background.view" }}
        className="mt-4 sm:h-[87vh] mb-4 md:h-[73vh] overflow-y-scroll overflow-hidden rounded-[15px] mx-8  py-4 "
      >
        <h1 className="pl-5 border-l-4 py-2 border-l-orange-400 text-[27px]">
          Comment
        </h1>

        <Box sx={{ margin: "0 28px" }}>
          {" "}
          <TextField
            fullWidth
            inputProps={{ sx: { fontSize: "15px" } }}
            placeholder="Enter Title"
          />
        </Box>
        <Box sx={{ margin: "0 28px" }}>
          {" "}
          <TextField
            fullWidth
            inputProps={{ sx: { fontSize: "15px" } }}
            placeholder="Enter Email"
          />
        </Box>
        <Box sx={{ margin: "0 28px" }}>
          {" "}
          <TextField
            multiline
            rows={4}
            fullWidth
            inputProps={{ sx: { fontSize: "15px" } }}
            placeholder="Enter Comment"
          />
        </Box>
        <Box sx={{ margin: "10px 28px", textAlign: "end" }}>
          {" "}
          <Button variant="contained">Send Comment</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Knowledgeview;