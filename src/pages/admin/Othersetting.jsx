import * as React from "react";
import Box from "@mui/material/Box";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FormControl } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link } from "react-router-dom";

const Othersetting = () => {
  return (
    <>
      <div className="flex items-center  justify-between md:w-[97%] p-4">
        <div className="p-2">
          <h1 className="text-2xl text-neutral-500">API Settings</h1>
        </div>
        <div className="flex  flex-row items-center bg-# justify-center gap-4">
          <Box sx={{ backgroundColor: "background.view" }}>
            {" "}
            <InfoOutlinedIcon />
          </Box>
        </div>
      </div>

      <Box
        className="w-[95%] mt-12 ml-2 md:ml-5 pt-4 relative h-[70vh] rounded-lg mb-4"
        sx={{ backgroundColor: "background.view" }}
      >
        <p
          className=" mb-4 border-l-4 border-blue-500 pl-4 text-xl"
          gutterBottom
        >
          Other Settings
        </p>

        <div className="w-[99%] p-4 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">API Type</p>
              </div>
              <div className="w-full  flex items-center">
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Old Token"
                      control={<Radio />}
                      label="Old Token"
                    />
                    <FormControlLabel
                      value="Personal"
                      control={<Radio />}
                      label="Personal"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-[13%] flex items-center">
                <p className="text-[16px]">API Token</p>
              </div>
              <div className="w-full border border-gray-300 rounded-lg flex items-center">
                <input
                  type="text"
                  className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                  placeholder="Token"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Support Expiry</p>
              </div>
              <div className="w-full md:w-full   items-center">
                <FormGroup>
                  <FormControlLabel
                    sx={{ color: "gray" }}
                    className=""
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
          <div className="absolute bottom-5 right-5">
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
        </div>
      </Box>
    </>
  );
};

export default Othersetting;
