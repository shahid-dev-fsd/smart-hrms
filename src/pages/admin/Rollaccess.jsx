import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
const columns = [
  { id: "srno", label: "No", minWidth: 80 },

  { id: "name", label: "Roll Name", minWidth: 150 },
  { id: "code", label: "Super Admin", minWidth: 150 },
  {
    id: "population",
    label: "Admin",
    minWidth: 80,
  },
  {
    id: "size",
    label: "HR",
    minWidth: 80,
  },
  {
    id: "client",
    label: "Client",
    minWidth: 80,
  },
];

function createData(srno, name, code, population, size, client) {
  return { srno, name, code, population, size, client };
}
const check = (
  <CheckIcon
    sx={{
      backgroundColor: "green",
      borderRadius: "50%",
      color: "black",
      padding: "2px",
    }}
  />
);

const cross = (
  <ClearIcon
    sx={{
      backgroundColor: "gray",
      borderRadius: "5px",
      color: "red",
      padding: "2px",
    }}
  />
);

const rows = [
  createData("1", "Admin Dashboard", check, check, check, cross),
  createData("2", "Admin Settings", check, check, check, cross),
  createData("3", "Modify", check, check, check, cross),
  createData("4", "New Customers Fields", check, check, check, cross),
  createData("5", "Edit Customer Fields", check, check, cross, cross),
  createData("6", "Email Templates", check, check, cross, cross),
  createData("7", "Security Settings", check, check, cross, cross),
  createData("8", "Modify Settings", check, check, check, cross),
  createData("9", "Theme Settings", check, check, check, cross),
  createData("10", "Modify Theme", check, check, check, cross),
];
const Rollaccess = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
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
        className="w-[95%] overflow-hidden overflow-y-scroll no-scrollbar h-[70vh]  ml-2 md:ml-5 pt-4 rounded-lg mb-4"
        sx={{ backgroundColor: "background.view" }}
      >
        <div className="w-[99%] p-4 flex flex-col gap-4">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <div className="relative">
              <div className="flex justify-between mt-12 mb-12">
                <div className="text-sm">
                  Rows per page: 10{" "}
                  <ArrowDropDownIcon
                    style={{ fontSize: "28px" }}
                    className="text-zinc-500"
                  />{" "}
                </div>
                <div className="">
                  <div>
                    {" "}
                    <input
                      placeholder="search"
                      className="sm:w-[100%] md:w-[25%] bg-transparent text-xs p-2 right-2 absolute rounded-[8px] border border-gray-500 "
                    />
                    <SearchIcon
                      sx={{ position: "absolute", top: "5px", right: "21px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        sx={{
                          border: "1px solid gray",
                        }}
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                sx={{
                                  border: "1px solid gray",
                                }}
                                key={column.id}
                                align={column.align}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="flex justify-between mt-12 mb-12">
              <div className="text-sm">Showing Rows: 1-10 of 20</div>
              <div className="">
                <KeyboardArrowLeftIcon />{" "}
                <span className="bg-blue-500  rounded-[50%] text-sm px-[6px] py-[4px]">
                  1
                </span>{" "}
                <span className="text-sm ">2</span> <KeyboardArrowRightIcon />
              </div>
            </div>
          </Paper>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-[13%] flex items-center">
                <p className="text-[16px] whitespace-nowrap">Select Property</p>
              </div>
              <div className="w-full border border-gray-300 rounded-lg flex items-center">
                <input
                  type="text"
                  className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                  placeholder="select property"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex flex-col w-full md:w-full  gap-2 ">
              <div className="w-[13%] flex items-center">
                <p className="text-[16px] whitespace-nowrap">Select Value</p>
              </div>
              <div className="w-full border border-gray-300 rounded-lg flex items-center">
                <input
                  type="text"
                  className="w-full rounded-lg bg-transparent focus:outline-none p-2"
                  placeholder="select value"
                />
              </div>
            </div>
          </div>{" "}
          <div className="flex mt-12  ">
            {" "}
            <Stack spacing={2} direction="row">
              <Button
                sx={{ padding: " 10px 50px" }}
                variant="contained"
                size="large"
              >
                Search
              </Button>
              <Button
                sx={{ padding: " 10px 50px" }}
                variant="outlined"
                color="error"
                size="large"
              >
                Reset
              </Button>
            </Stack>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Rollaccess;
