import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Button,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { LiaTrashAlt } from "react-icons/lia";
import { MdOutlineModeEdit } from "react-icons/md";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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

export default function CustomInputTable({
  columns = [],
  data = [],
  onSubmit = () => {},
  isView = false,
}) {
  // Ensure data is always an array, even if empty
  const initialValues = (data.length > 0 ? data : [{}]).map((row) =>
    columns.reduce((acc, column) => {
      acc[column.name] = row[column.name] || column.defaultValue || "";
      return acc;
    }, {})
  );

  const [formData, setFormData] = useState(initialValues);
  const [editableRow, setEditableRow] = useState(null);

  useEffect(() => {
    const updatedFormData = (data.length > 0 ? data : [{}]).map((row) =>
      columns.reduce((acc, column) => {
        acc[column.name] = row[column.name] || column.defaultValue || "";
        return acc;
      }, {})
    );
    setFormData(updatedFormData);
  }, [data, columns]);

  const handleEdit = (rowIndex) => {
    setEditableRow(rowIndex);
  };

  const handleSave = (rowIndex) => {
    onSubmit(formData[rowIndex], rowIndex); // Pass the specific row's data
    setEditableRow(null);
  };

  const handleChange = (event, columnName, rowIndex) => {
    const updatedFormData = [...formData];
    updatedFormData[rowIndex] = {
      ...updatedFormData[rowIndex],
      [columnName]: event.target?.value,
    };
    setFormData(updatedFormData);
  };

  const handleDateChange = (date, columnName, rowIndex) => {
    const updatedFormData = [...formData];
    updatedFormData[rowIndex] = {
      ...updatedFormData[rowIndex],
      [columnName]: date,
    };
    setFormData(updatedFormData);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <StyledTableCell key={index}>{column.label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {formData.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {columns.map((column, index) => (
                <StyledTableCell
                  key={index}
                  style={column.type === "actions" ? { width: "5rem" } : {}}
                >
                  {(() => {
                    switch (column.type) {
                      case "text":
                        return (
                          <TextField
                            sx={{
                              minWidth: "200px",
                              width: "100%",
                              padding: 0,
                              margin: 0,
                            }}
                            label={column.label}
                            name={column.name}
                            placeholder={column.label}
                            value={row[column.name] || ""}
                            onChange={(event) =>
                              handleChange(event, column.name, rowIndex)
                            }
                            fullWidth
                            margin="normal"
                            disabled={
                              isView ||
                              column.disabled ||
                              editableRow !== rowIndex
                            }
                          />
                        );
                      case "textarea":
                        return (
                          <TextareaAutosize
                            sx={{
                              minWidth: "200px",
                              width: "100%",
                              padding: 0,
                              margin: 0,
                            }}
                            className="h-full bg-transparent rounded-[0.3rem] border border-gray-400 border-opacity-50 px-3 py-4"
                            label={column.label}
                            name={column.name}
                            placeholder={column.label}
                            value={row[column.name] || ""}
                            onChange={(event) =>
                              handleChange(event, column.name, rowIndex)
                            }
                            disabled={
                              isView ||
                              column.disabled ||
                              editableRow !== rowIndex
                            }
                          />
                        );
                      case "datePicker":
                        return (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              sx={{
                                minWidth: "200px",
                                width: "100%",
                                padding: 0,
                                margin: 0,
                              }}
                              key={index}
                              label={column.label}
                              name={column.name}
                              value={dayjs(row[column.name])}
                              onChange={(date) =>
                                handleDateChange(date, column.name, rowIndex)
                              }
                              disabled={
                                isView ||
                                column.disabled ||
                                editableRow !== rowIndex
                              }
                            />
                          </LocalizationProvider>
                        );
                      case "select":
                        return (
                          <FormControl
                            key={index}
                            sx={{
                              minWidth: "200px",
                              width: "100%",
                              padding: 0,
                              margin: 0,
                            }}
                          >
                            <InputLabel>{column.label}</InputLabel>
                            <Select
                              label={column.label}
                              name={column.name}
                              value={row[column.name] || ""}
                              onChange={(event) => {
                                const updatedFormData = [...formData];
                                updatedFormData[rowIndex] = {
                                  ...updatedFormData[rowIndex],
                                  [column.name]: event.target.value,
                                };
                                setFormData(updatedFormData);
                              }}
                              disabled={
                                isView ||
                                column.disabled ||
                                editableRow !== rowIndex
                              }
                            >
                              {column.options.map((option, idx) => (
                                <MenuItem key={idx} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        );
                      case "actions":
                        return (
                          <div className="flex flex-row gap-3">
                            {!isView ? (
                              <>
                                {editableRow === rowIndex ? (
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleSave(rowIndex)}
                                  >
                                    Save
                                  </Button>
                                ) : (
                                  <IconButton
                                    onClick={() => handleEdit(rowIndex)}
                                  >
                                    <MdOutlineModeEdit />
                                  </IconButton>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                            <IconButton>
                              <LiaTrashAlt />
                            </IconButton>
                          </div>
                        );

                      default:
                        return null;
                    }
                  })()}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
