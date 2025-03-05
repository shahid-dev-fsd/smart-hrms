import React from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  TableBody,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

export default function HRFormsAndTemplates() {
  const HRFormsAndTemplates = () => {
    const columns = ["Name", "Description", "Actions"];

    const data = [
      {
        name: "Company Handbook Template Created on 26-Nov-2024",
        description:
          "A sample company handbook that can be edited and used to guide your employees and convey your company's vision, mission and operating policies.",
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
        style={{ overflowX: "auto", marginTop: "8px" }}
        className="text-nowrap"
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} style={{ whiteSpace: "nowrap" }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <>
                <StyledTableRow>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                  <StyledTableCell className="w-4">
                    <div className="flex flex-row gap-2">
                      <IconButton>
                        <MdOutlineModeEdit />
                      </IconButton>
                      <IconButton>
                        <MdDeleteOutline />
                      </IconButton>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div className="w-full flex flex-col">
      <HRFormsAndTemplates />
    </div>
  );
}
