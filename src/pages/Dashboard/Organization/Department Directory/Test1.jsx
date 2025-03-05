import React, { useRef, useState } from "react";
import { Avatar } from "@mui/material";

export default function Test1() {
  const [data, setData] = useState(true);
  return (
    <div className="w-full h-fit flex flex-col gap-3">
      <div className="w-full flex flex-row p-3 justify-between items-center rounded-lg border border-gray-800">
        {data && (
          <div className="flex gap-3 flex-row justify-center items-center text-nowrap">
            <div>
              <Avatar />
            </div>
            <div className="text-start">
              <h1>Steward graham</h1>
              <div className="flex flex-row gap-2 justify-center items-center text-sm text-gray-400">
                <h1>Department Head</h1>
              </div>
            </div>
          </div>
        )}
        <div className="w-full">
          <h1 className="justify-center flex flex-row items-center">Test1</h1>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center">
          <div className="flex flex-row gap-1 justify-center items-center">
            <div className="text-start">
              <h1>0</h1>
              <div className="flex flex-row gap-2 justify-center items-center text-gray-400">
                <h1>Members</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[20rem] flex flex-col gap-3 justify-center items-center rounded-lg border border-neutral-700">
        <div className="w-[30%] flex flex-col gap-6 justify-center items-center text-center">
          <h1>No users found</h1>
        </div>
      </div>
    </div>
  );
}
