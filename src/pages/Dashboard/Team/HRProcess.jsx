import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
} from "@mui/material";

const ProcessTable = () => {
  const columns = [
    "Status",
    "Employee",
    "Department",
    "Effective Date",
    "Location",
    "Reporting Manager",
    "Reason",
  ];
  const data = [
    {
      status: "E001",
      employee: "John",
      department: "Doe",
      effectiveDate: "Johnny",
      location: "john.doe@example.com",
      reportingManager: "HR",
      reason: "Manager",
    },
    {
      status: "E001",
      employee: "John",
      department: "Doe",
      effectiveDate: "Johnny",
      location: "john.doe@example.com",
      reportingManager: "HR",
      reason: "Manager",
    },
    {
      status: "E001",
      employee: "John",
      department: "Doe",
      effectiveDate: "Johnny",
      location: "john.doe@example.com",
      reportingManager: "HR",
      reason: "Manager",
    },
    {
      status: "E001",
      employee: "John",
      department: "Doe",
      effectiveDate: "Johnny",
      location: "john.doe@example.com",
      reportingManager: "HR",
      reason: "Manager",
    },
  ];
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <TableContainer
      style={{ overflowX: "auto", width: "100%" }}
      className="text-nowrap"
      component={Paper}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{row.status}</StyledTableCell>
              <StyledTableCell>{row.employee}</StyledTableCell>
              <StyledTableCell>{row.department}</StyledTableCell>
              <StyledTableCell>{row.effectiveDate}</StyledTableCell>
              <StyledTableCell>{row.location}</StyledTableCell>
              <StyledTableCell>{row.reportingManager}</StyledTableCell>
              <StyledTableCell>{row.reason}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function HRProcess() {
  const [process, setProcess] = useState("allChange");
  const handleProcess = (event) => {
    setProcess(event.target.value);
  };

  return (
    <div className="w-full h-full gap-3 flex flex-col justify-center items-start">
      <div>
        <FormControl style={{ minWidth: "160px" }}>
          <InputLabel id="process">Process</InputLabel>
          <Select
            labelId="process"
            id="process"
            value={process}
            label="Process"
            onChange={handleProcess}
          >
            <MenuItem value={"allChange"}>All</MenuItem>
            <MenuItem value={"locationChange"}>Location Change</MenuItem>
            <MenuItem value={"departmentChange"}>Department Change</MenuItem>
            <MenuItem value={"designationChange"}>Designation Change</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="w-full">{ProcessTable()}</div>
    </div>
  );
}
