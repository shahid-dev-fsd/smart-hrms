import React, { useRef, useState } from "react";
import { Avatar, Grid } from "@mui/material";

export default function Management() {
  const [data, setData] = useState(true);
  return (
    <div className="w-full h-fit flex flex-col gap-3">
      <div className="w-full flex flex-row p-3 justify-between items-center rounded-lg border border-gray-800">
        <div className="w-full">
          <h1 className="justify-center flex flex-row items-center">
            Management
          </h1>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center">
          <div className="flex flex-row gap-1 justify-center items-center">
            <div className="text-start">
              <h1>4</h1>
              <div className="flex flex-row gap-2 justify-center items-center text-gray-400">
                <h1>Members</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-4 gap-3 justify-center items-center ">
        <Grid
          sx={{
            backgroundColor: "background.default",
            flexDirection: "column",
          }}
          className="min-w-64 h-fit flex flex-col gap-3 justify-center items-center text-center rounded-lg p-5 border border-gray-800 "
        >
          <div>
            <Avatar
              style={{
                width: "130px",
                height: "130px",
              }}
            />
          </div>
          <div>
            <h1>1-steward corp</h1>
            <h1>Canada</h1>
            <h1>CEO</h1>
            <h1>Management</h1>
          </div>
        </Grid>
        <Grid
          sx={{
            backgroundColor: "background.default",
            flexDirection: "column",
          }}
          className="min-w-64 h-fit flex flex-col gap-3 justify-center items-center text-center rounded-lg p-5 border border-gray-800 "
        >
          <div>
            <Avatar
              style={{
                width: "130px",
                height: "130px",
              }}
            />
          </div>
          <div>
            <h1>1-steward corp</h1>
            <h1>Canada</h1>
            <h1>CEO</h1>
            <h1>Management</h1>
          </div>
        </Grid>
        <Grid
          sx={{
            backgroundColor: "background.default",
            flexDirection: "column",
          }}
          className="min-w-64 h-fit flex flex-col gap-3 justify-center items-center text-center rounded-lg p-5 border border-gray-800 "
        >
          <div>
            <Avatar
              style={{
                width: "130px",
                height: "130px",
              }}
            />
          </div>
          <div>
            <h1>1-steward corp</h1>
            <h1>Canada</h1>
            <h1>CEO</h1>
            <h1>Management</h1>
          </div>
        </Grid>
        <Grid
          sx={{
            backgroundColor: "background.default",
            flexDirection: "column",
          }}
          className="min-w-64 h-fit flex flex-col gap-3 justify-center items-center text-center rounded-lg p-5 border border-gray-800 "
        >
          <div>
            <Avatar
              style={{
                width: "130px",
                height: "130px",
              }}
            />
          </div>
          <div>
            <h1>1-steward corp</h1>
            <h1>Canada</h1>
            <h1>CEO</h1>
            <h1>Management</h1>
          </div>
        </Grid>
      </div>
    </div>
  );
}
