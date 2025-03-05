import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TbPhoneCalling } from "react-icons/tb";

export default function Reportee() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const options = ["Chat", "Audio Call", "Video Call"];
  const ITEM_HEIGHT = 48;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Button
      sx={{
        backgroundColor: "background.default",
      }}
      className="w-full h-full flex gap-3 p-3 flex-row justify-center items-center rounded-lg border border-gray-700 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        onClick={() => {
          navigate("/performance/view");
        }}
        className="w-full flex gap-3 p-3 flex-row justify-start items-center text-start"
      >
        <div>
          <Avatar
            alt="Steward Graham"
            sx={{ height: "50px", width: "50px" }}
            src=""
          />
        </div>
        <div className="text-sm">
          <h1>S19 - Michael Johnson</h1>
          <h1 className="text-gray-400">Administration</h1>
          <h1 className="text-red-500 text-xs">Not Yet Clocked-in</h1>
        </div>
      </div>
      <div className="min-w-10">
        {hovered && (
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <TbPhoneCalling />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={handleClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </div>
    </Button>
  );
}
