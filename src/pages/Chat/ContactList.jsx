import React, { useCallback, useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/material";
import axios from "axios";

const ContactList = ({ setCurrentChatUser, contacts }) => {

  const handleClick = (item) => {
    // console.log("first", item);
    setCurrentChatUser(item);
  };
  return (
    <>
      {contacts?.map((item, index) => {
        const nametodisplay = item.firstName + " " + item.lastName;

        return (
          <div key={index}>
            <div className="flex gap-4 items-center p-1 my-3">
              <div className="h-[31px] w-[31px] md:h-[40px]  md:w-[50px] relative">
                <img
                  className="w-full h-full rounded-full object-cover object-top"
                  src={`https://ui-avatars.com/api/?name=${nametodisplay}`}
                  alt={item.email}
                />
              </div>
              <div className="flex w-full flex-row justify-between items-center">
                <div
                  onClick={() => handleClick(item)}
                  className="w-full font-bold"
                >
                  <div className="text-base md:text-xs ">
                    {nametodisplay}
                  </div>

                  <div className="mt-1 line-clamp-1 text-xs text-[#434343] md:text-[9px]">
                    {item.email}
                  </div>
                </div>

                <MoreVertIcon
                  sx={{ width: "18px", height: "18px" }}
                  className="text-[35px] md:text-[20px]"
                />
              </div>
            </div>
            <p className="h-[1px] md:hidden bg-[#111111] w-full"></p>
          </div>
        )
      })}
    </>
  );
};

export default ContactList;
