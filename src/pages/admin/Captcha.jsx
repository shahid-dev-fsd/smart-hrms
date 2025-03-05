import * as React from "react";
import Box from "@mui/material/Box";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { FormControl } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const Captcha = () => {
  return (
    <>
      {" "}
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
      <Box
        className="w-[95%] overflow-hidden overflow-y-scroll no-scrollbar h-[70vh] mt-12 ml-2 md:ml-5 pt-4 rounded-lg mb-4"
        sx={{ backgroundColor: "background.view" }}
      >
        <p
          className=" mb-4 border-l-4 border-blue-500 pl-4 text-xl"
          gutterBottom
        >
          Captcha Settings{" "}
        </p>

        <div className="w-[99%] p-4 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-[13%] flex items-center">
                <p className="text-[16px] whitespace-nowrap">Captcha Type</p>
              </div>
              <div className="w-full  flex items-center">
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Default"
                      control={<Radio />}
                      label="Default"
                    />
                    <FormControlLabel
                      value="Google-Recaptcha"
                      control={<Radio />}
                      label="Google-Recaptcha"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-[13%] flex items-center">
                <p className="text-[16px] whitespace-nowrap">Captcha String</p>
              </div>
              <div className="w-full  flex items-center">
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Numeric"
                      control={<Radio />}
                      label="Numeric"
                    />
                    <FormControlLabel
                      value="Alpha Numeric"
                      control={<Radio />}
                      label="Alpha Numeric"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Select Length</p>
              </div>
              <div className="w-full md:w-full border border-gray-500 rounded-lg flex flex-row justify-between items-center">
                <select className="appearance-none bg-transparent w-[90%] text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500">
                  <option>Captcha Length</option>
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
                <p className="text-[16px]">Client Login </p>
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
                <p className="text-[16px]">Guest Ticket </p>
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
                <p className="text-[16px]">Client Registration </p>
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
                <p className="text-[16px]">Admin Login</p>
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
                <p className="text-[16px]">Admin Registration </p>
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

export default Captcha;
