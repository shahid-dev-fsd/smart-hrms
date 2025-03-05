import * as React from "react";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { FormControl } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const Theme = () => {
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
          Layout & Color Settings{" "}
        </p>

        <div className="w-[99%] p-4 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-[13%] flex items-center">
                <p className="text-[16px] whitespace-nowrap">
                  Application Layout
                </p>
              </div>
              <div className="w-full  flex items-center">
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Boxed "
                      control={<Radio />}
                      label="Boxed"
                    />
                    <FormControlLabel
                      value="Full Width"
                      control={<Radio />}
                      label="Full Width"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Theme Color</p>
              </div>
              <div className="w-[12%] md:w-[10%] border border-gray-500 rounded-lg flex flex-row justify-between items-center">
                <input
                  type="color"
                  value="#00C8FA"
                  className=" bg-transparent w-full text-gray-700 pl-2 py-2 h-14 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500"
                />
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
                <p className="text-[16px]">Text Color</p>
              </div>
              <div className="w-[12%] md:w-[10%] border border-gray-500 rounded-lg flex flex-row justify-between items-center">
                <input
                  type="color"
                  value="#ffffff"
                  className=" bg-transparent w-full text-gray-700 pl-2 py-2 h-14 rounded leading-tight focus:outline-none text-[12px] focus:border-gray-500"
                />
                <ArrowDropDownIcon
                  style={{ fontSize: "28px" }}
                  className="text-zinc-500"
                />
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

export default Theme;
