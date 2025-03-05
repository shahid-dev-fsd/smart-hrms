import React from "react";
import { Avatar } from "@mui/material";

export default function Management() {
  return (
    <div className="w-full flex gap-3 p-3 flex-col justify-center items-center">
      <div className="flex flex-col gap-3 justify-center items-center">
        <Avatar
          alt="Steward Graham"
          sx={{ height: "7rem", width: "7rem" }}
          src="/static/images/avatar/1.jpg"
        />
        <h1>Management</h1>
      </div>
    </div>
  );
}
