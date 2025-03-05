import { Button } from "@mui/material";
import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function Card({
  type,
  title,
  content,
  plane = [],
  handleCreate = () => {},
  handleView = () => {},
  handleApply = () => {},
}) {
  return (
    <>
      {type === "create" && (
        <>
          <div className="w-full min-h-[20rem] flex flex-col gap-3 justify-between items-center text-start border border-neutral-700 rounded-lg p-2">
            <div className="flex flex-col gap-3">
              <h1>{title}</h1>
              <h1>{content}</h1>
            </div>
            <Button className="w-fit" variant="outlined" onClick={handleCreate}>
              Create New Appraisal Cycle
            </Button>
          </div>
        </>
      )}
      {type === "select" && (
        <>
          <div className="w-full min-h-[20rem] flex flex-col gap-3 justify-between items-center text-start border border-neutral-700 rounded-lg p-3">
            <div className="w-full flex flex-col gap-3">
              <h1>{title}</h1>
              <div className="flex flex-col gap-2">
                {plane && plane.length != 0 ? (
                  <>
                    {plane.map(({ title, isAvailable }) => {
                      return (
                        <div className="w-full flex flex-row gap-3 justify-start items-center">
                          <div>
                            {isAvailable === true ? (
                              <>
                                <IoCheckmarkCircleOutline className="text-2xl text-green-400" />
                              </>
                            ) : (
                              <>
                                <IoIosCloseCircleOutline className="text-2xl text-red-400" />
                              </>
                            )}
                          </div>
                          <h1>{title}</h1>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="w-full flex flex-row gap-3 justify-between items-center">
              <Button className="w-fit" variant="outlined" onClick={handleView}>
                View Details
              </Button>
              <Button
                className="w-fit"
                variant="outlined"
                onClick={handleApply}
              >
                Apply
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
