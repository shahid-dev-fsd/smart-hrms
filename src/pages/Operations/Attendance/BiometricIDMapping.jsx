import React, { useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  Grid,
  Modal,
  Autocomplete,
  TextField,
} from "@mui/material";
import { LiaTrashAlt } from "react-icons/lia";
import { styled } from "@mui/material/styles";

export default function BiometricIDMapping() {
  const [addUserIDMappingModal, setAddUserIDMappingModal] = useState(false);
  const employees = ["S1 - Clarkson Walter", "S2 - Alan Walter"];
  const EmployeeBiometricViewTable = () => {
    const columns = ["Employee", "Mapper ID", , "", ""];
    const data = [
      {
        employee: "1 - steward graham",
        mapperID: "XYZ",
      },
      {
        employee: "1 - steward graham",
        mapperID: "XYZ",
      },
      {
        employee: "1 - steward graham",
        mapperID: "XYZ",
      },
      {
        employee: "1 - steward graham",
        mapperID: "XYZ",
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
              <StyledTableRow>
                <StyledTableCell className="w-1/4">
                  {row.employee}
                </StyledTableCell>
                <StyledTableCell className="w-1/4">
                  {row.mapperID}
                </StyledTableCell>
                <StyledTableCell className="w-full" />
                <StyledTableCell>
                  <IconButton>
                    <LiaTrashAlt />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  return (
    <div className="w-full flex flex-col gap-3 justify-center items-center pb-2">
      <div className="w-full flex flex-row gap-3 justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1>Biometric ID mapping</h1>
          <h1>
            Map biometric user IDs to Zoho People User IDs to facilitate
            biometric based check-in system for employees
          </h1>
        </div>
        <div>
          <Button
            onClick={() => {
              setAddUserIDMappingModal(true);
            }}
            variant="contained"
          >
            Add User ID Mapping
          </Button>
        </div>
      </div>
      <div className="w-full">
        <EmployeeBiometricViewTable />
      </div>
      <div>
        <Modal
          open={addUserIDMappingModal}
          onClose={() => {
            setAddUserIDMappingModal(false);
          }}
          aria-labelledby="addUserIDMappingModal"
          aria-describedby="addUserIDMappingModal"
        >
          <Grid
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "background.default",
              flexDirection: "column",
            }}
            className="w-1/2 p-4 flex flex-col gap-4 rounded-lg border border-gray-800"
          >
            <div>
              <h1>Add User ID Mapping</h1>
            </div>
            <div>
              <Autocomplete
                sx={{ width: "100%" }}
                disablePortal
                options={employees}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Employees"
                    placeholder="Employees"
                  />
                )}
              />
            </div>
            <div>
              <TextField
                sx={{ width: "100%" }}
                required
                label="Mapper ID"
                placeholder="Mapper ID"
              />
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <div>
                <Button variant="contained">Submit</Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    setAddUserIDMappingModal(false);
                  }}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Grid>
        </Modal>
      </div>
    </div>
  );
}
