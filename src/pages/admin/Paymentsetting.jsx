import * as React from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const Paymentsetting = ({ sub }) => {
  return (
    <div>
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
          Paypal Settings
        </p>

        <div className="w-[99%] p-4 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-full flex items-center">
                <p className="text-[16px]">Paypal</p>
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
    </div>
  );
};

export default Paymentsetting;
