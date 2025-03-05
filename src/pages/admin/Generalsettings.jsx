import * as React from "react";
import Box from "@mui/material/Box";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Generalsettings = ({ subheading }) => {
  return (
    <>
      {subheading}
      <div className="flex items-center justify-between md:w-[97%] p-4">
        <div className="p-2">
          <h1 className="text-2xl text-neutral-500">General Settings</h1>
        </div>
        <div className="flex  flex-row items-center bg-# justify-center gap-4">
          <Box sx={{ backgroundColor: "background.view" }}>
            {" "}
            <InfoOutlinedIcon />
          </Box>
        </div>
      </div>

      {/* <div className="w-[90%] m-auto">
        <ul className="w-full flex  items-center justify-between">
          <li className="bg-blue-500 px-3 py-2 rounded">
            <Link to="/generalsetting">General</Link>
          </li>
          <li>
            {" "}
            <Link to="/captcha">Captcha</Link>
          </li>
          <li>
            {" "}
            <Link to="/theme">Theme</Link>
          </li>
          <li>
            <Link to="/fileupload">fileupload</Link>
          </li>
          <li>
            {" "}
            <Link to="/ticket">Ticket</Link>
          </li>
          <li>
            {" "}
            <Link to="/Notification">Notification</Link>
          </li>
          <li>
            {" "}
            <Link to="/emailsetting">Email</Link>
          </li>
          <li>
            {" "}
            <Link to="/chat">Chat</Link>
          </li>

          <li>
            <Link to="/custom"> Custom (CSS/javascript)</Link>
          </li>
        </ul>
      </div> */}
      <Box
        className="w-[95%] overflow-hidden overflow-y-scroll no-scrollbar h-[70vh] mt-12 ml-2 md:ml-5 pt-4 rounded-lg mb-4"
        sx={{ backgroundColor: "background.view" }}
      >
        <p
          className=" mb-4 border-l-4 border-blue-500 pl-4 text-xl"
          gutterBottom
        >
          Basic Settings{" "}
        </p>

        <div className="w-[99%] p-4 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-[13%] flex items-center">
                <p className="text-[16px] whitespace-nowrap">App Title</p>
              </div>
              <div className="w-full border border-gray-300 rounded-lg flex items-center">
                <input
                  type="text"
                  className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                  placeholder="Name"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-[13%] flex items-center">
                <p className="text-[16px] whitespace-nowrap">App Email</p>
              </div>
              <div className="w-full border border-gray-300 rounded-lg flex items-center">
                <input
                  type="text"
                  className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                  placeholder="Name"
                />
              </div>
            </div>
          </div>{" "}
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Admin Panel Language</p>
              </div>
              <div className="w-full md:w-full border border-gray-500 rounded-lg flex flex-row justify-between items-center">
                <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                  <option>Choose Language</option>
                  <option>name1</option>
                  <option>name2</option>
                  <option>name3</option>
                </select>
                <ArrowDropDownIcon
                  style={{ fontSize: "28px" }}
                  className="text-zinc-500"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Site Panel Language</p>
              </div>
              <div className="w-full md:w-full border border-gray-500 rounded-lg flex flex-row justify-between items-center">
                <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                <option>Choose Language</option>
                  <option>name1</option>
                  <option>name2</option>
                  <option>name3</option>
                </select>
                <ArrowDropDownIcon
                  style={{ fontSize: "28px" }}
                  className="text-zinc-500"
                />
              </div>
            </div>
          </div>{" "}
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Select Date Format</p>
              </div>
              {/* <div className="w-full md:w-full border border-gray-500 rounded-lg flex flex-row justify-between items-center">
                <input
                   placeholder="Choose Formate"
                  className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500"
                  label="Choose Formate"
               />
                <ArrowDropDownIcon
                  style={{ fontSize: "28px" }}
                  className="text-zinc-500"
                />
              </div> */}
              <div className="w-full md:w-full border border-gray-500 rounded-lg flex flex-row justify-between items-center">
                <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                <option>Choose Formate</option>
                  <option>name1</option>
                  <option>name2</option>
                  <option>name3</option>
                </select>
                <ArrowDropDownIcon
                  style={{ fontSize: "28px" }}
                  className="text-zinc-500"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Select Time Format</p>
              </div>
              {/* <div className="w-full md:w-full border border-gray-500 rounded-lg flex flex-row justify-between items-center">
                <input
               
                placeholder="Choose Formate"
                  type=""
                  className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500"
                />
                <ArrowDropDownIcon
                  style={{ fontSize: "28px" }}
                  className="text-zinc-500"
                />
              </div> */}

              <div className="w-full md:w-full border border-gray-500 rounded-lg flex flex-row justify-between items-center">
                <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                <option>Choose Formate</option>
                  <option>name1</option>
                  <option>name2</option>
                  <option>name3</option>
                </select>
                <ArrowDropDownIcon
                  style={{ fontSize: "28px" }}
                  className="text-zinc-500"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Email Notification</p>
              </div>
              <div className="w-full md:w-full   items-center">
                <FormGroup>
                  <FormControlLabel
                    className=""
                    sx={{ color: "gray" }}
                    control={<Switch />}
                    label="Enable/Disable"
                  />
                </FormGroup>
                <p className="text-xs  text-gray-700  ">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Email Notification</p>
              </div>
              <div className="w-full md:w-full   items-center">
                <FormGroup>
                  <FormControlLabel
                    className=""
                    sx={{ color: "gray" }}
                    control={<Switch />}
                    label="Enable/Disable"
                  />
                </FormGroup>
                <p className="text-xs  text-gray-700  ">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>{" "}
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Email Notification</p>
              </div>
              <div className="w-full md:w-full   items-center">
                <FormGroup>
                  <FormControlLabel
                    className=""
                    sx={{ color: "gray" }}
                    control={<Switch />}
                    label="Enable/Disable"
                  />
                </FormGroup>
                <p className="text-xs  text-gray-700  ">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>{" "}
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Email Notification</p>
              </div>
              <div className="w-full md:w-full   items-center">
                <FormGroup>
                  <FormControlLabel
                    className=""
                    sx={{ color: "gray" }}
                    control={<Switch />}
                    label="Enable/Disable"
                  />
                </FormGroup>
                <p className="text-xs  text-gray-700  ">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end  ">
            {" "}
            <Stack spacing={2} direction="row">
              <Button
                sx={{ padding: " 10px 50px" }}
                variant="contained"
                size="large"
              >
                Save
              </Button>
              <Button
                sx={{ padding: " 10px 50px" }}
                variant="outlined"
                color="error"
                size="large"
              >
                Cancel
              </Button>
            </Stack>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Generalsettings;
