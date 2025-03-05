import React, { useState } from "react";
import {
  AllReporteesGridList,
  AllReporteesTableList,
  DirectReporteesGridList,
  DirectReporteesTableList,
  AllSeniority,
  DirectSeniority,
  AllDepartment,
  DirectDepartment,
  AllDesignation,
  DirectDesignation,
} from "../../../components";
import { Button, Menu, MenuItem } from "@mui/material";
import { CiGrid41, CiViewTable, CiSearch, CiFilter } from "react-icons/ci";
import { TiFlowMerge } from "react-icons/ti";

export default function Reportees() {
  const [view, setView] = useState({ first: "all", second: "grid" });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMenuItemClick = (value) => {
    setSelectedValue(value);
    setOpen(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonMapping = [
    {
      title: "Grid View",
      value: { ...view, second: "grid" },
      child: <CiGrid41 />,
    },
    {
      title: "Table View",
      value: { ...view, second: "table" },
      child: <CiViewTable />,
    },
    {
      title: "Kanban View",
      value: { ...view, second: "kanban" },
      child: (
        <>
          <div id="demo-positioned-button" onClick={handleClick}>
            <TiFlowMerge />
          </div>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={() => handleMenuItemClick("seniority")}>
              Seniority
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("department")}>
              Department
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("designation")}>
              Designation
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <div className="h-full w-full flex gap-3 p-3 flex-col justify-center items-center rounded-lg">
      <div className="w-full flex flex-row gap-6 pb-3 mt-[-1rem] justify-end items-center">
        <div className="flex flex-row gap-2">
          <Button
            title={"All"}
            variant={view.first === "all" ? "contained" : "outlined"}
            onClick={() => {
              setView({ ...view, first: "all" });
            }}
          >
            <div>All 9</div>
          </Button>
          <Button
            title={"Direct"}
            variant={view.first === "direct" ? "contained" : "outlined"}
            onClick={() => {
              setView({ ...view, first: "direct" });
            }}
          >
            <div>Direct 4</div>
          </Button>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center">
          {buttonMapping.map((button, index) => {
            return (
              <Button
                key={index}
                title={button.title}
                variant={
                  view.second === button.value.second ? "contained" : "outlined"
                }
                onClick={() => {
                  setView({ ...view, second: button.value.second });
                }}
              >
                <div
                  className={
                    button.value.second === "grid" ||
                    button.value.second === "table" ||
                    button.value.second === "kanban"
                      ? "text-2xl"
                      : ""
                  }
                >
                  {button.child}
                </div>
                {/* <div className="text-2xl">{button.child}</div> */}
              </Button>
            );
          })}
        </div>
      </div>

      {view.first === "all" && view.second === "grid" ? (
        <>
          <AllReporteesGridList />
        </>
      ) : (
        <></>
      )}
      {view.first === "all" && view.second === "table" ? (
        <>
          <AllReporteesTableList />
        </>
      ) : (
        <></>
      )}

      {view.first === "direct" && view.second === "grid" ? (
        <>
          <DirectReporteesGridList />
        </>
      ) : (
        <></>
      )}
      {view.first === "direct" && view.second === "table" ? (
        <>
          <DirectReporteesTableList />
        </>
      ) : (
        <></>
      )}

      {view.first === "all" &&
      view.second === "kanban" &&
      selectedValue === "seniority" ? (
        <>
          <AllSeniority />
        </>
      ) : (
        <></>
      )}
      {view.first === "all" &&
      view.second === "kanban" &&
      selectedValue === "department" ? (
        <>
          <AllDepartment />
        </>
      ) : (
        <></>
      )}
      {view.first === "all" &&
      view.second === "kanban" &&
      selectedValue === "designation" ? (
        <>
          <AllDesignation />
        </>
      ) : (
        <></>
      )}

      {view.first === "direct" &&
      view.second === "kanban" &&
      selectedValue === "seniority" ? (
        <>
          <DirectSeniority />
        </>
      ) : (
        <></>
      )}
      {view.first === "direct" &&
      view.second === "kanban" &&
      selectedValue === "department" ? (
        <>
          <DirectDepartment />
        </>
      ) : (
        <></>
      )}
      {view.first === "direct" &&
      view.second === "kanban" &&
      selectedValue === "designation" ? (
        <>
          <DirectDesignation />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
